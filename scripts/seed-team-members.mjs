// Seeds the `teamMember` documents from the fallback list that has been driving
// the homepage Leadership section (src/components/sections/home/Leadership.tsx),
// so editors can manage the team in Studio instead of in code.
//
//   node scripts/seed-team-members.mjs           # create missing only
//   node scripts/seed-team-members.mjs --replace # overwrite existing docs
//
// No profile photos: none exist in the repo, and the schema treats `image` as
// optional — LeadershipCards falls back to the member's initials, which is what
// the site already shows today. Editors upload photos in Studio when ready.

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

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

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Order follows the schema's guidance: CEO = 1, MD = 2, then the functional
// leads. `featured: true` keeps them all on the homepage.
const team = [
  {
    key: 'anthony-keever',
    name: 'Anthony Keever',
    role: 'Chief Executive Officer',
    bio: 'Established Diamond Edge Cutting in Ireland in 1997 and relocated the company to the UAE in 2008. Under his leadership, DEC has grown year on year to become one of the leading and best-known names in GCC demolition, with an exceptional clients list, an enviable track record and a highly skilled workforce.',
    years: '30+ years · concrete cutting, drilling, demolition',
  },
  {
    key: 'robert-aylward',
    name: 'Robert Aylward',
    role: 'Managing Director',
    bio: "Drives day-to-day leadership across operations, projects, and client relationships. Robert brings deep specialist demolition expertise across Ireland, Europe, and the GCC, with hands-on programme delivery on the region's most technically challenging jobs.",
    years: '25+ years · demolition & project delivery',
  },
  {
    key: 'conor-wade',
    name: 'Conor Wade',
    role: 'Operations Manager',
    bio: "Oversees DEC's operational delivery on every active site, from method statements and HSE plans to plant deployment and crew scheduling. Conor ensures every project runs on programme, on safety, and within the approved scope.",
    years: '20+ years · site operations & HSE',
  },
  {
    key: 'carl-riley',
    name: 'Carl Riley',
    role: 'Commercial Manager',
    bio: "Leads DEC's commercial function, contracts, cost control, and strategic pricing across tenders, variations, and final account. Carl combines value engineering with rigorous commercial discipline to protect margin and deliver outcomes that work for clients and DEC alike.",
    years: '18+ years · construction commercial',
  },
  {
    key: 'laxmikant-prajapat',
    name: 'Laxmikant Prajapat',
    role: 'Finance Manager',
    bio: "Manages the company's financial operations, reporting, and statutory compliance across UAE entities. Laxmikant brings disciplined cash management, audit readiness, and finance partnering to project teams across the business.",
    years: '15+ years · finance & compliance',
  },
]

async function run() {
  console.log(`Seeding team members into ${projectId}/${dataset}${replace ? ' (--replace)' : ''}\n`)

  let created = 0
  let updated = 0
  let skipped = 0

  for (const [index, member] of team.entries()) {
    const _id = `team-member-${member.key}`
    const exists = await client.fetch(`defined(*[_id == $id][0]._id)`, { id: _id })

    if (exists && !replace) {
      console.log(`  · ${member.name} — already exists, left alone`)
      skipped++
      continue
    }

    await client.createOrReplace({
      _id,
      _type: 'teamMember',
      name: member.name,
      role: member.role,
      bio: member.bio,
      years: member.years,
      order: index + 1,
      featured: true,
    })

    console.log(`  · ${member.name} — ${exists ? 'replaced' : 'created'}`)
    if (exists) updated++
    else created++
  }

  console.log(`\n${created} created, ${updated} replaced, ${skipped} left alone`)
  console.log('Add profile photos in Studio — cards show initials until then.')
}

run().catch((error) => {
  console.error('\nSeed failed:', error.message)
  process.exit(1)
})
