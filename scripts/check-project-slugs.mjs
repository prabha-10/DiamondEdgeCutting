// Read-only: list every project doc (including drafts) with slug + publish state.
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

const rows = await client.fetch(
  `*[_type == "project"] | order(title asc) {
    _id, title, "slug": slug.current, "cat": category->title,
    "isDraft": _id in path("drafts.**")
  }`
)
for (const r of rows) {
  console.log(`${r.isDraft ? 'DRAFT    ' : 'published'}  ${r.title}  | slug: ${r.slug ?? 'MISSING'} | cat: ${r.cat}`)
}
console.log(`total: ${rows.length}`)
