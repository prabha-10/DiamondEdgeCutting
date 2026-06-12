// Read-only: which category doc id does each project reference?
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
  `*[_type == "project"] { title, "ref": category._ref } | order(ref asc)`
)
const byRef = {}
for (const r of rows) (byRef[r.ref] ??= []).push(r.title)
for (const [ref, titles] of Object.entries(byRef)) {
  console.log(`${ref}  (${titles.length})`)
  for (const t of titles) console.log(`   - ${t}`)
}
