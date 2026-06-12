/**
 * One-off cleanup: delete the rental-equipment catalogue from the dataset.
 * Companion to removing the equipment/category schemas from Studio.
 *
 * Scope (per user confirmation 2026-06-12): equipment + category docs only.
 * Inquiry documents (customer leads) are KEPT — their equipment references
 * are converted to weak references so they no longer block the deletes.
 *
 * Run either way:
 *   npx sanity exec scripts/clear-rental-cms.mjs --with-user-token  (CLI login)
 *   node scripts/clear-rental-cms.mjs   (needs Editor token in .env.local)
 *
 * Order:
 *   1. Patch inquiries: equipment[]._weak = true   (lead data untouched)
 *   2. Delete all equipment docs (one transaction)
 *   3. Delete all category docs  (one transaction; inter-category refs
 *      resolve because they're removed together)
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId =
  process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset =
  process.env.SANITY_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const token =
  process.env.SANITY_API_TOKEN ?? process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_TOKEN

// Prefer the CLI user token when run via `sanity exec --with-user-token`;
// fall back to the .env.local API token under plain `node`.
let client = null
try {
  const { getCliClient } = await import('sanity/cli')
  client = getCliClient({ apiVersion: '2024-01-01' })
} catch {
  // Not running under `sanity exec`.
}
if (!client) {
  if (!projectId || !token) {
    console.error('Missing SANITY project id or token in .env.local')
    process.exit(1)
  }
  client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })
}

// 1. Weaken inquiry → equipment references so they don't block deletion.
const inquiries = await client.fetch(
  `*[_type == "inquiry" && count(equipment) > 0]{ _id, equipment }`
)
if (inquiries.length > 0) {
  const tx = client.transaction()
  for (const inq of inquiries) {
    tx.patch(inq._id, (p) =>
      p.set({ equipment: inq.equipment.map((ref) => ({ ...ref, _weak: true })) })
    )
  }
  await tx.commit()
  console.log(`inquiry: weakened equipment refs on ${inquiries.length} document(s) (no leads deleted)`)
} else {
  console.log('inquiry: no equipment references to weaken')
}

// 2 + 3. Delete the catalogue.
for (const type of ['equipment', 'category']) {
  const ids = await client.fetch(`*[_type == $type]._id`, { type })
  if (ids.length === 0) {
    console.log(`${type}: nothing to delete`)
    continue
  }
  const tx = ids.reduce((t, id) => t.delete(id), client.transaction())
  await tx.commit({ visibility: 'async' })
  console.log(`${type}: deleted ${ids.length} document(s)`)
}

console.log('Done. Inquiry documents were preserved.')
