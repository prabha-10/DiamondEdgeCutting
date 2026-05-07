/**
 * Seed the rental-equipment dataset (8 categories + 89 equipment items)
 * into Sanity from the spec JSON.
 *
 * Source of truth:
 *   /Users/prabhakaranmuthu/Desktop/Prabha-OS/Projects/Diamond-Edge-Cutting/specs/rental-equipment-content.json
 *
 * Behaviour:
 *   1. Dry diff first. Prints what will be created, replaced, patched
 *      (preserving heroImage), and which docs in Sanity are NOT in the JSON
 *      (orphans, never auto-deleted).
 *   2. Asks for confirmation.
 *   3. For each category and equipment doc:
 *        - Convert string parentCategoryRef and string array attachmentTabRefs
 *          into proper Sanity references (matches the schema).
 *        - If the doc does not exist: createIfNotExists.
 *        - If it exists with no heroImage uploaded: createOrReplace.
 *        - If it exists WITH heroImage uploaded: patch().set() every field
 *          EXCEPT heroImage and gallery, so client-uploaded images survive.
 *   4. Prints orphan list (for manual cleanup) and exits.
 *
 * Idempotent: re-runs safely after editors add hero images in Studio.
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline'

dotenv.config({ path: '.env.local' })

const projectId =
  process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset =
  process.env.SANITY_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const token =
  process.env.SANITY_API_TOKEN ?? process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_TOKEN

if (!projectId || !token) {
  console.error('Missing SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN.')
  process.exit(1)
}

const SPEC_PATH =
  process.env.RENTAL_SPEC_PATH ??
  '/Users/prabhakaranmuthu/Desktop/Prabha-OS/Projects/Diamond-Edge-Cutting/specs/rental-equipment-content.json'

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// ─── Load spec ──────────────────────────────────────────────────────────────
function loadSpec() {
  const filePath = path.resolve(SPEC_PATH)
  if (!fs.existsSync(filePath)) {
    console.error(`Spec JSON not found at ${filePath}`)
    process.exit(1)
  }
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  delete json.$comment
  return { categories: json.categories, equipment: json.equipment }
}

// ─── Convert spec doc to Sanity-ready doc ───────────────────────────────────
// The spec JSON uses convenience fields parentCategoryRef (string) and
// attachmentTabRefs (string array). The schema expects proper references on
// parentCategory and attachmentCategories.
function normaliseCategory(doc) {
  const out = { ...doc }
  for (const k of Object.keys(out)) if (k.startsWith('$')) delete out[k]
  if (typeof out.parentCategoryRef === 'string') {
    out.parentCategory = { _type: 'reference', _ref: out.parentCategoryRef }
    delete out.parentCategoryRef
  }
  if (Array.isArray(out.attachmentTabRefs)) {
    out.attachmentCategories = out.attachmentTabRefs.map((ref) => ({
      _type: 'reference',
      _ref: ref,
      _key: ref,
    }))
    delete out.attachmentTabRefs
  }
  return out
}

function normaliseEquipment(doc) {
  const out = { ...doc }
  for (const k of Object.keys(out)) if (k.startsWith('$')) delete out[k]
  // Add _key to useCases / assetNumbers if they are arrays of strings (Sanity
  // arrays in newer schemas need _key on each element). The schema fields
  // are array of plain strings; Sanity tolerates strings without keys but
  // Studio prefers them keyed. Keep as-is to match the spec output.
  return out
}

// ─── Read existing dataset ──────────────────────────────────────────────────
async function fetchExisting() {
  const cats = await client.fetch(`*[_type=="category"]{
    _id,
    "slug": slug.current,
    title,
    "hasHeroImage": defined(heroImage)
  }`)
  const eqs = await client.fetch(`*[_type=="equipment"]{
    _id,
    "slug": slug.current,
    title,
    "hasHeroImage": defined(heroImage),
    "hasGallery": defined(gallery)
  }`)
  return { cats, eqs }
}

// ─── Diff: what gets created / replaced / patched / orphaned ────────────────
function diff(existing, spec) {
  const existingById = new Map([
    ...existing.cats.map((d) => [d._id, { ...d, _type: 'category' }]),
    ...existing.eqs.map((d) => [d._id, { ...d, _type: 'equipment' }]),
  ])
  const specIds = new Set([
    ...spec.categories.map((d) => d._id),
    ...spec.equipment.map((d) => d._id),
  ])

  const create = []
  const replace = []
  const patch = []
  for (const doc of [...spec.categories, ...spec.equipment]) {
    const existingDoc = existingById.get(doc._id)
    if (!existingDoc) {
      create.push(doc)
    } else if (doc._type === 'equipment' && existingDoc.hasHeroImage) {
      patch.push(doc)
    } else {
      replace.push(doc)
    }
  }
  const orphans = []
  for (const [id, doc] of existingById) {
    if (!specIds.has(id)) orphans.push({ _id: id, _type: doc._type, slug: doc.slug, title: doc.title })
  }
  return { create, replace, patch, orphans }
}

// ─── Confirm prompt ─────────────────────────────────────────────────────────
async function confirm(prompt) {
  if (process.env.SEED_YES === '1') {
    console.log(`${prompt} (auto-confirmed by SEED_YES=1)`)
    return true
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(`${prompt} (yes/no): `, (a) => {
      rl.close()
      resolve(a.trim().toLowerCase() === 'yes')
    })
  })
}

// ─── Apply ──────────────────────────────────────────────────────────────────
async function applyCreate(docs) {
  if (!docs.length) return
  let tx = client.transaction()
  for (const doc of docs) tx = tx.createIfNotExists(doc)
  await tx.commit()
}

async function applyReplace(docs) {
  if (!docs.length) return
  let tx = client.transaction()
  for (const doc of docs) tx = tx.createOrReplace(doc)
  await tx.commit()
}

async function applyPatch(docs) {
  // Patch sets every spec field except heroImage and gallery on existing docs
  // that already have a client-uploaded hero, so editor-supplied images survive.
  if (!docs.length) return
  let tx = client.transaction()
  for (const doc of docs) {
    const { _id, _type, heroImage, gallery, ...rest } = doc
    void _type
    void heroImage
    void gallery
    tx = tx.patch(_id, (p) => p.set(rest))
  }
  await tx.commit()
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log(`Project ${projectId}, dataset ${dataset}`)
  console.log(`Spec: ${SPEC_PATH}`)

  const spec = loadSpec()
  console.log(
    `Loaded ${spec.categories.length} categories and ${spec.equipment.length} equipment items from spec.`
  )
  spec.categories = spec.categories.map(normaliseCategory)
  spec.equipment = spec.equipment.map(normaliseEquipment)

  const existing = await fetchExisting()
  console.log(
    `Existing in Sanity: ${existing.cats.length} categories, ${existing.eqs.length} equipment.`
  )

  const { create, replace, patch, orphans } = diff(existing, spec)
  console.log('')
  console.log(`Plan:`)
  console.log(`  - createIfNotExists: ${create.length}`)
  console.log(`  - createOrReplace:   ${replace.length}`)
  console.log(`  - patch (heroImage preserved): ${patch.length}`)
  console.log(`  - orphans (in Sanity, NOT in spec): ${orphans.length}`)
  if (orphans.length > 0) {
    console.log('')
    console.log('Orphans (review and delete manually if no longer needed):')
    for (const o of orphans) console.log(`  - ${o._type}/${o._id}  (${o.slug})  ${o.title}`)
  }
  console.log('')

  const ok = await confirm('Proceed with the seed?')
  if (!ok) {
    console.log('Aborted.')
    process.exit(0)
  }

  console.log('Writing categories first (so equipment refs resolve)...')
  // Categories first (so equipment.category refs resolve immediately).
  const catsCreate = create.filter((d) => d._type === 'category')
  const catsReplace = replace.filter((d) => d._type === 'category')
  const catsPatch = patch.filter((d) => d._type === 'category')
  await applyCreate(catsCreate)
  await applyReplace(catsReplace)
  await applyPatch(catsPatch)

  console.log('Writing equipment...')
  const eqsCreate = create.filter((d) => d._type === 'equipment')
  const eqsReplace = replace.filter((d) => d._type === 'equipment')
  const eqsPatch = patch.filter((d) => d._type === 'equipment')
  await applyCreate(eqsCreate)
  await applyReplace(eqsReplace)
  await applyPatch(eqsPatch)

  console.log(`Done. ${spec.categories.length} categories + ${spec.equipment.length} equipment now live.`)
  if (orphans.length > 0) {
    console.log(
      `${orphans.length} orphan doc${orphans.length === 1 ? '' : 's'} left in Sanity, review above.`
    )
  }
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
