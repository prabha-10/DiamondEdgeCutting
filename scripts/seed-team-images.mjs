// Generates a SAMPLE realistic headshot for each `teamMember` and (a) saves it
// to public/team/<slug>.jpg for the code fallback and (b) uploads it to Sanity,
// patching the document's `image`.
//
//   node scripts/seed-team-images.mjs            # members without a photo
//   node scripts/seed-team-images.mjs --replace  # overwrite existing photos too
//
// Faces are AI-GENERATED (this-person-does-not-exist.com) — they are synthetic
// and depict no real individual. Swap for real headshots in Studio when ready.

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token =
  process.env.SANITY_API_TOKEN ?? process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_TOKEN

if (!projectId || !dataset || !token) {
  console.error(
    'Missing Sanity credentials. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and a write token (SANITY_API_TOKEN) in .env.local.'
  )
  process.exit(1)
}

const replace = process.argv.includes('--replace')
// Optional: restrict to specific members, e.g. --only "Carl Riley"
const onlyIdx = process.argv.indexOf('--only')
const only = onlyIdx > -1 ? process.argv.slice(onlyIdx + 1).filter((a) => !a.startsWith('--')) : null

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const UA = { 'User-Agent': 'Mozilla/5.0' }
const FACE_BASE = 'https://this-person-does-not-exist.com'
const OUT_DIR = path.join(process.cwd(), 'public', 'team')
const slugify = (name) => name.trim().replace(/\s+/g, '-').toLowerCase()
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// All current team members are male; vary age/ethnicity for a bit of realism.
async function fetchFace() {
  const ages = ['25-35', '35-45', '45-60']
  const age = ages[Math.floor(Math.random() * ages.length)]
  const meta = await fetch(`${FACE_BASE}/new?gender=male&age=${age}&etnic=all`, { headers: UA })
  const { src } = await meta.json()
  const url = src.startsWith('http') ? src : FACE_BASE + src
  const img = await fetch(url, { headers: UA })
  if (!img.ok) throw new Error(`face image fetch failed: ${img.status}`)
  return Buffer.from(await img.arrayBuffer())
}

async function run() {
  console.log(`Seeding realistic team photos into ${projectId}/${dataset}${replace ? ' (--replace)' : ''}\n`)
  await mkdir(OUT_DIR, { recursive: true })

  const members = await client.fetch(
    '*[_type == "teamMember"]|order(order asc){_id, name, "hasImage": defined(image)}'
  )

  let added = 0
  let skipped = 0

  for (const member of members) {
    if (only && !only.includes(member.name)) {
      skipped++
      continue
    }
    if (member.hasImage && !replace && !only) {
      console.log(`  · ${member.name} — already has a photo, left alone`)
      skipped++
      continue
    }

    const slug = slugify(member.name)
    const buffer = await fetchFace()

    // (a) local fallback file
    await writeFile(path.join(OUT_DIR, `${slug}.jpg`), buffer)

    // (b) Sanity asset + patch
    const asset = await client.assets.upload('image', buffer, { filename: `${slug}.jpg` })
    await client
      .patch(member._id)
      .set({ image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
      .commit()

    console.log(`  · ${member.name} — photo ${member.hasImage ? 'replaced' : 'added'} (public/team/${slug}.jpg + Sanity)`)
    added++
    await sleep(600) // space calls so each face is distinct
  }

  console.log(`\n${added} updated, ${skipped} left alone`)
  console.log('Faces are AI-generated placeholders — replace with real headshots in Studio.')
}

run().catch((error) => {
  console.error('\nSeed failed:', error.message)
  process.exit(1)
})
