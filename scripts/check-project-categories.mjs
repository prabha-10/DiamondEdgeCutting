// Read-only diagnostic: verify project → projectCategory references resolve.
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const cats = await client.fetch(
  `*[_type == "projectCategory"] | order(order asc) { _id, title, "slug": slug.current, order }`
)
console.log(`projectCategory docs: ${cats.length}`)
for (const c of cats) console.log(`  - ${c.title} (slug: ${c.slug}, order: ${c.order ?? '—'}, id: ${c._id})`)

const projects = await client.fetch(
  `*[_type == "project"] | order(title asc) {
    title,
    "slug": slug.current,
    featured,
    "catRef": category._ref,
    "catType": category->_type,
    "catTitle": category->title
  }`
)
console.log(`\nproject docs: ${projects.length}`)
const broken = projects.filter((p) => !p.catRef || !p.catTitle)
const wrongType = projects.filter((p) => p.catType && p.catType !== 'projectCategory')

for (const p of projects) {
  const flag = !p.catRef ? 'NO CATEGORY SET' : !p.catTitle ? `BROKEN REF → ${p.catRef}` : ''
  console.log(`  - ${p.title}: ${p.catTitle ?? '???'} ${flag ? `[${flag}]` : ''}${p.featured ? ' [featured]' : ''}`)
}

console.log(`\nSummary: ${broken.length} project(s) with missing/broken category, ${wrongType.length} pointing at a non-projectCategory doc.`)
if (wrongType.length) for (const p of wrongType) console.log(`  wrong type: ${p.title} → ${p.catType}`)

// Orphan check: drafts of categories, duplicate titles
const titles = cats.map((c) => c.title)
const dupes = titles.filter((t, i) => titles.indexOf(t) !== i)
if (dupes.length) console.log(`Duplicate category titles: ${[...new Set(dupes)].join(', ')}`)
