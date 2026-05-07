import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'node:fs'
import path from 'node:path'

dotenv.config({ path: '.env.local' })

// ─── Source data (mirrors src/data/projects.ts) ─────────────────────────────
const projectsData = [
  { slug: 'meena-plaza', title: 'Meena Plaza', category: 'Commercial', location: 'Abu Dhabi', scope: 'Controlled demolition, wrapping, protection', year: '2020' },
  { slug: 'vale-oman-pelletiser', title: 'Vale Oman Pelletiser Plant', category: 'Industrial', location: 'Sohar, Oman', scope: 'Refractory linings removal', year: '2019' },
  { slug: 'al-manhal-palace', title: 'Al Manhal Palace', category: 'Commercial', location: 'Abu Dhabi', scope: 'Controlled demolition (crunching), debris disposal', year: '2018' },
  { slug: 'dwc-al-maktoum-airport', title: 'DWC Al Maktoum International Airport', category: 'Airport', location: 'Dubai', scope: 'Façade demolition', year: '2019' },
  { slug: 'cleveland-clinic', title: 'Cleveland Clinic', category: 'Commercial', location: 'Abu Dhabi', scope: 'Controlled demolition (cut & carve), debris disposal', year: '2018' },
  { slug: 'marsa-al-arab', title: 'Marsa Al Arab', category: 'Commercial', location: 'Dubai', scope: '3600 Bar, Verdana Beach building, breakwater + slipway', year: '2021' },
  { slug: 'jumeirah-beach-hotel', title: 'Jumeirah Beach Hotel', category: 'Hotel', location: 'Dubai', scope: 'Strip out + debris disposal', year: '2018' },
  { slug: 'icd-brookfield', title: 'ICD Brookfield', category: 'Commercial', location: 'Dubai', scope: 'Robotic demolition', year: '2019' },
  { slug: 'dubai-mall-fashion-dome', title: 'Dubai Mall Fashion Dome', category: 'Commercial', location: 'Dubai', scope: 'Return shop units to shell & core (9,692m²) + debris disposal', year: '2017' },
  { slug: 'one-zaabeel', title: "One Za'abeel", category: 'Commercial', location: 'Dubai', scope: 'Wire sawing and controlled demolition of Waler Beams', year: '2020' },
  { slug: 'expo-2020-enabling', title: 'Expo 2020 Enabling Works', category: 'Infrastructure', location: 'Dubai', scope: 'Concrete demolition and recycling', year: '2017' },
  { slug: 'deira-city-centre', title: 'Deira City Centre Cinema Expansion', category: 'Commercial', location: 'Dubai', scope: 'Controlled heavy + soft demolition, debris removal', year: '2016' },
  { slug: 'dxb-concourse-4', title: 'Dubai International Airport, Concourse 4', category: 'Airport', location: 'Dubai', scope: 'Controlled demolition of 23 Northern Apron Buildings', year: '2015' },
  { slug: 'dubai-festival-city', title: 'Dubai Festival City Upgrade Ph 1 & 2', category: 'Commercial', location: 'Dubai', scope: 'Controlled heavy + soft demolition, debris removal', year: '2015' },
  { slug: 'auh-airport-a380', title: 'Abu Dhabi International Airport, A380 Stands', category: 'Airport', location: 'Abu Dhabi', scope: 'Concrete cutting/drilling, heavy + soft demolition', year: '2014' },
  { slug: 'dxb-t2-expansion', title: 'Dubai International Airport Expansion T2', category: 'Airport', location: 'Dubai', scope: 'Concrete cutting/drilling, demolition, debris removal', year: '2013' },
  { slug: 'mall-of-emirates-remerch', title: 'Mall of the Emirates Remerchandising', category: 'Commercial', location: 'Dubai', scope: 'Strip out + debris removal', year: '2014' },
  { slug: 'jebel-ali-chimney-tower', title: 'Concrete Chimney Tower, Jebel Ali', category: 'Infrastructure', location: 'Dubai', scope: '90m concrete chimney to ground using custom spider robotic machine', year: '2022' }
]

// ─── Helpers ────────────────────────────────────────────────────────────────
const kebab = (s) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function buildDescription(p) {
  return `Diamond Edge Cutting was appointed to deliver ${p.scope.toLowerCase()} for ${p.title} in ${p.location}. Completed in ${p.year}, the project required stringent safety protocols, careful access management, and full authority compliance — executed on programme without disrupting adjacent operations.`
}

function buildKeyHighlights(p) {
  const scope = p.scope.toLowerCase()
  const cat = p.category.toLowerCase()
  const detected = []
  const seen = new Set()
  const push = (b) => {
    if (!seen.has(b)) {
      seen.add(b)
      detected.push(b)
    }
  }
  if (scope.includes('robotic')) push('Robotic demolition fleet deployed for low-vibration, high-precision execution')
  if (scope.includes('wire saw') || scope.includes('concrete cutting') || scope.includes('cutting/drilling')) push('Diamond wire sawing for noise- and vibration-sensitive cuts')
  if (scope.includes('controlled') || scope.includes('crunching')) push('Engineered controlled-demolition sequencing with structural monitoring')
  if (scope.includes('refractory')) push('Refractory linings removed under shutdown programme constraints')
  if (scope.includes('strip out')) push('Soft demolition and strip-out delivered to shell-and-core handover')
  if (cat === 'airport') push('Live-airside operations maintained throughout the works')
  if (cat === 'infrastructure') push('Coordinated with utilities, traffic management, and authority approvals')

  // Top up to 3 detected bullets if we don't have enough.
  const fillers = [
    'Site-specific risk assessment, method statement, and HSE plan',
    'End-to-end debris removal and recycling-led disposal',
    'Coordinated with main contractor for zero programme impact'
  ]
  for (const f of fillers) {
    if (detected.length >= 3) break
    push(f)
  }

  // Always conclude with the compliance line.
  push('Delivered on programme with full authority compliance (ISO 9001 / 14001 / 45001)')

  return detected.slice(0, 4)
}

function buildRelatedServices(p) {
  const scope = p.scope.toLowerCase()
  const services = []
  const seen = new Set()
  const push = (s) => {
    if (!seen.has(s)) {
      seen.add(s)
      services.push(s)
    }
  }
  if (scope.includes('robotic')) push('Robotic Demolition')
  if (scope.includes('controlled') || scope.includes('demolition')) push('Controlled & Structural Demolition')
  if (scope.includes('wire saw')) push('Wire Sawing')
  if (scope.includes('wall saw') || scope.includes('track saw')) push('Wall & Track Sawing')
  if (scope.includes('core drill') || scope.includes('concrete drilling') || scope.includes('cutting/drilling')) push('Core Drilling')
  if (scope.includes('refractory')) push('Refractory, Kiln & Tunnelling')
  if (scope.includes('strip out')) push('Soft Demolition & Strip Out')
  if (scope.includes('floor saw') || scope.includes('apron saw')) push('Floor & Apron Sawing')

  if (services.length === 0) return ['Controlled & Structural Demolition']
  return services.slice(0, 4)
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('✗ SANITY_API_TOKEN missing in .env.local — needs an Editor token to write.')
    process.exit(1)
  }
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'demo-fallback') {
    console.error('✗ NEXT_PUBLIC_SANITY_PROJECT_ID is missing or still set to the placeholder.')
    process.exit(1)
  }

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false
  })

  // 1. Build category docs (one per unique category, deterministic IDs).
  const uniqueCategories = [...new Set(projectsData.map((p) => p.category))]
  const categoryTx = client.transaction()
  uniqueCategories.forEach((title, i) => {
    const slug = kebab(title)
    categoryTx.createOrReplace({
      _id: `projectCategory-${slug}`,
      _type: 'projectCategory',
      title,
      slug: { _type: 'slug', current: slug },
      order: i
    })
  })
  await categoryTx.commit()
  console.log(`✓ Upserted ${uniqueCategories.length} project categories: ${uniqueCategories.join(', ')}`)

  // 2. Upload one shared placeholder hero image (re-used across all projects).
  //    Editors swap with real photography in Studio later.
  const placeholderPath = path.resolve('public/header-logo.png')
  const placeholderBuffer = fs.readFileSync(placeholderPath)
  const placeholderAsset = await client.assets.upload('image', placeholderBuffer, {
    filename: 'placeholder-hero.png'
  })
  const heroAssetRef = placeholderAsset._id
  console.log(`✓ Uploaded placeholder hero asset: ${heroAssetRef}`)

  // 3. Upsert all projects with starter copy.
  const projectTx = client.transaction()
  projectsData.forEach((p, i) => {
    const yearNum = parseInt(p.year, 10)
    projectTx.createOrReplace({
      _id: `project-${p.slug}`,
      _type: 'project',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      category: { _type: 'reference', _ref: `projectCategory-${kebab(p.category)}` },
      location: p.location,
      year: Number.isFinite(yearNum) ? yearNum : undefined,
      scopeSummary: p.scope,
      description: buildDescription(p),
      keyHighlights: buildKeyHighlights(p),
      relatedServices: buildRelatedServices(p),
      heroImage: { _type: 'image', asset: { _type: 'reference', _ref: heroAssetRef } },
      order: i,
      featured: false
    })
  })
  await projectTx.commit()
  console.log(`✓ Upserted ${projectsData.length} project documents.`)
  console.log(`\nDone. Open http://localhost:3000/studio to see the data.`)
}

main().catch((err) => {
  console.error('✗ Import failed:', err)
  process.exit(1)
})
