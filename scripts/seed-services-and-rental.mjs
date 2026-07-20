// Seeds the `service` and `rentalCategory` documents from the copy and imagery
// that previously lived in the code (src/data/services.ts and the inline list on
// /rental-equipment), so Studio opens with the live site's content already in it.
//
//   node scripts/seed-services-and-rental.mjs           # create missing only
//   node scripts/seed-services-and-rental.mjs --replace # overwrite existing docs
//
// Idempotent: documents use deterministic _ids. Images are uploaded once and
// re-used on later runs by matching the uploaded filename, so re-running does
// not pile up duplicate assets.

import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
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

// ─── Content ────────────────────────────────────────────────────────────────

const services = [
  {
    slug: 'robotic-demolition',
    title: 'Robotic Demolition',
    image: 'service-robotic-demolition.jpg',
    shortDescription:
      "GCC's largest Brokk fleet for confined, high-precision, and emission-controlled environments.",
    description:
      'DEC operates the largest robotic demolition fleet in the GCC. Trained operators perform demolition away from the workface with total control of high-risk environments. Electric machines make our robotic fleet ideal where noise and emissions are constraints, including airports, malls, and occupied buildings.',
    keyPoints: [
      'Confined spaces and partial structures',
      'Sensitive or occupied environments (low noise, low vibration)',
      'Refractory removal in cement plants, steel plants, aluminium plants',
      'Underground tunnel works and confined-space dismantling',
    ],
    equipment:
      'Brokk 500 (flagship), Brokk 400, Brokk 300, Brokk 260, Brokk 200, Brokk 170, Brokk 160. Husqvarna DXR 300, DXR 305, DXR 145. Hydraulic breakers, crushers, grapples, and shears.',
    ctaText: 'Discuss Your Robotic Demolition Project',
    ctaLink: '/contact',
    crossSellText: 'View Robotic Fleet',
    crossSellLink: '/rental-equipment',
  },
  {
    slug: 'controlled-demolition',
    title: 'Controlled & Structural Demolition',
    image: 'service-controlled-demolition.jpg',
    shortDescription:
      'Large machinery and engineered sequencing for safe, predictable structural takedowns.',
    description:
      'Major demolition of concrete and steel structures using large machinery, engineered sequencing, and rigorous safety controls. We deliver high-rise buildings, chimney towers, hotels, bridges, and infrastructure to ground, on programme, with full authority compliance.',
    keyPoints: [
      'High-rise tower demolition',
      'Concrete chimney towers',
      'Bridge and infrastructure demolition',
      'Fire-damaged buildings',
      '26-metre long-reach demolition',
    ],
    equipment:
      '14 to 50 ton excavators, 26-metre long-reach demolition rigs, hydraulic breakers, crushers, shears.',
    ctaText: 'Plan Your Controlled Demolition',
    ctaLink: '/contact',
    crossSellText: 'View Excavator Fleet',
    crossSellLink: '/rental-equipment',
  },
  {
    slug: 'wire-sawing',
    title: 'Wire Sawing',
    image: 'service-wire-sawing.jpg',
    shortDescription:
      'Diamond wire saws for bridges, dams, and heavily reinforced concrete with no depth limit.',
    description:
      'Environmentally friendly cutting solution with minimal noise and air pollution and no depth limit. We use wire sawing where access, depth, or environmental sensitivity rule out conventional methods.',
    keyPoints: [
      'Bridge sections, large beams, columns',
      'Openings in dams and retaining walls',
      'Underwater pipes, piles, and pier walls',
      'Steel tanks and shafts',
    ],
    ctaText: 'Discuss Your Wire Sawing Project',
    ctaLink: '/contact',
  },
  {
    slug: 'wall-sawing',
    title: 'Wall Sawing & Track Sawing',
    image: 'service-wall-sawing.jpg',
    shortDescription:
      'Track-mounted wall saws for fast, clean openings in reinforced concrete and masonry.',
    description:
      'Track-mounted wall saws cut fast, clean openings in reinforced concrete, brick, block, and masonry. No dust, no vibration, smooth flush cuts to existing structures.',
    keyPoints: [
      'Door and window openings in existing structures',
      'Vertical and horizontal cuts in reinforced concrete walls',
      'Cutting flush to slabs, beams, columns',
    ],
    ctaText: 'Discuss Your Wall Sawing Project',
    ctaLink: '/contact',
  },
  {
    slug: 'core-drilling',
    title: 'Core Drilling',
    image: 'service-core-drilling.jpg',
    shortDescription:
      'Accurate holes from 14mm to 600mm, up to 24m deep, with no dust or vibration.',
    description:
      'Electric, hydraulic, or pneumatic drill rigs deliver accurate holes with no dust or vibration. Holes from 14mm to 600mm diameter, up to 24 metres deep, vertical, horizontal, or angled. Custom sizes available.',
    keyPoints: [
      'Service holes for pipes, conduits, and cables',
      'Core samples for engineering assessment',
      'Runway light rebates',
      'Drilling through masonry, reinforced concrete, steel beams, granite, tiles, asphalt',
    ],
    ctaText: 'Request Core Drilling Quote',
    ctaLink: '/contact',
  },
  {
    slug: 'refractory-kiln',
    title: 'Refractory, Kiln & Tunnelling',
    image: 'service-refractory-kiln.jpg',
    shortDescription:
      'Confined-space robotic demolition for refractory linings, kilns, and tunnel cross-passages.',
    description:
      'Specialist confined-space robotic demolition for industrial assets across the GCC. We are mandated for refractory work at cement plants, steel plants, and aluminium plants, and execute underground tunnelling cross-passages with the same robotic fleet.',
    keyPoints: [
      'Refractory linings removal in pelletiser plants, cement kilns, steel furnaces, aluminium plants',
      'Underground tunnel cross-passages',
      'Confined-space demolition where conventional plant cannot operate',
    ],
    ctaText: 'Discuss Your Refractory Project',
    ctaLink: '/contact',
    crossSellText: 'View Industrial Projects',
    crossSellLink: '/projects',
  },
  {
    slug: 'floor-sawing',
    title: 'Floor & Road / Apron Sawing & Sealing',
    image: 'service-floor-sawing.jpg',
    shortDescription:
      'Petrol, diesel, and electric saws for expansion joints, trench lines, and slab openings.',
    description:
      'Petrol and diesel saws for outdoor cutting, electric floor saws for indoor and sensitive areas. Water-cooled blades. Used for expansion joints, trench excavation break lines, and large openings in floor slabs across roads, runways, bridges, and piers.',
    keyPoints: [],
    ctaText: 'Discuss Your Floor Sawing Project',
    ctaLink: '/contact',
  },
  {
    slug: 'strip-out',
    title: 'Soft Demolition & Strip Out (Shell & Core)',
    image: 'service-strip-out.jpg',
    shortDescription:
      'Whole or selective strip-out back to shell and core for refurbishments and change-of-use.',
    description:
      'Whole-package strip-out back to shell and core, or selective strip per requirement. Applies to refurbishments, design changes, and change-of-use across hotels, airports, malls, residential, and commercial assets. Eco-friendly methodology that maximises recyclable salvage.',
    keyPoints: [
      'Hotel and mall refurbishment',
      'Airport terminal strip-out',
      'Office change-of-use',
      'Heritage protection scenarios where the structural shell must remain intact',
    ],
    ctaText: 'Discuss Your Strip Out Project',
    ctaLink: '/contact',
  },
]

const rentalCategories = [
  {
    slug: 'robotic-demolition-machines',
    title: 'Robotic Demolition Machines',
    image: 'rental-robotic-demolition.jpeg',
    description:
      'Brokk 500, 400, 300, and 160 alongside Husqvarna DXR series. Remote-operated, emission-free machines built for confined spaces, high-precision structural work, and environments inaccessible to conventional plant.',
  },
  {
    slug: 'excavators',
    title: 'Excavators',
    image: 'rental-excavators.jpeg',
    description:
      '13 to 50-tonne excavators for structural demolition, bulk dig, and site clearance across the GCC. Every machine supplied with a trained, site-inducted operator and full safety documentation.',
  },
  {
    slug: 'mini-excavators',
    title: 'Mini Excavators',
    image: 'rental-mini-excavators.jpeg',
    description:
      'Compact 1.5 to 6-tonne machines designed for tight access, basement strip-outs, and congested urban sites where larger plant cannot operate safely.',
  },
  {
    slug: 'skid-steers',
    title: 'Skid Steers',
    image: 'rental-skid-steers.jpeg',
    description:
      'Wheeled and tracked skid steers for debris handling, grading, and site preparation. Fast to mobilise, easy to manoeuvre in restricted yards and below-grade structures.',
  },
  {
    slug: 'wheel-loaders',
    title: 'Wheel Loaders',
    image: 'rental-wheel-loaders.jpeg',
    description:
      'Heavy-duty front loaders for bulk material handling, aggregate loading, and spoil removal. Available with a range of bucket configurations to match your programme.',
  },
  {
    slug: 'waste-removal',
    title: 'Waste Removal',
    image: 'rental-waste-removal.jpeg',
    description:
      'Roll-on/roll-off skips and tipper lorries for demolition rubble, concrete spoil, and mixed construction waste. Scheduled collections or on-call — sized to your output.',
  },
]

// ─── Image upload (cached by filename) ──────────────────────────────────────

const assetCache = new Map()

async function uploadImage(filename) {
  if (assetCache.has(filename)) return assetCache.get(filename)

  // Re-use an asset already uploaded by a previous run rather than duplicating it.
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename }
  )
  if (existing) {
    assetCache.set(filename, existing)
    console.log(`  · reusing asset for ${filename}`)
    return existing
  }

  const filePath = path.resolve('public', filename)
  if (!fs.existsSync(filePath)) {
    throw new Error(`Image not found: ${filePath}`)
  }
  const asset = await client.assets.upload('image', fs.readFileSync(filePath), { filename })
  assetCache.set(filename, asset._id)
  console.log(`  · uploaded ${filename}`)
  return asset._id
}

function imageField(assetId) {
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
}

// ─── Seed ───────────────────────────────────────────────────────────────────

async function seedType(label, docs, buildDoc) {
  console.log(`\n${label}`)
  let created = 0
  let updated = 0
  let skipped = 0

  for (const [index, item] of docs.entries()) {
    const assetId = await uploadImage(item.image)
    const doc = buildDoc(item, index, assetId)

    const exists = await client.fetch(`defined(*[_id == $id][0]._id)`, { id: doc._id })
    if (exists && !replace) {
      skipped++
      continue
    }

    await client.createOrReplace(doc)
    if (exists) updated++
    else created++
  }

  console.log(`  ${created} created, ${updated} replaced, ${skipped} left alone`)
}

async function run() {
  console.log(`Seeding ${projectId}/${dataset}${replace ? ' (--replace)' : ''}`)

  await seedType('Demolition services', services, (item, index, assetId) => ({
    _id: `service-${item.slug}`,
    _type: 'service',
    title: item.title,
    slug: { _type: 'slug', current: item.slug },
    image: imageField(assetId),
    shortDescription: item.shortDescription,
    description: item.description,
    keyPoints: item.keyPoints ?? [],
    ...(item.equipment ? { equipment: item.equipment } : {}),
    ctaText: item.ctaText,
    ctaLink: item.ctaLink,
    ...(item.crossSellText ? { crossSellText: item.crossSellText } : {}),
    ...(item.crossSellLink ? { crossSellLink: item.crossSellLink } : {}),
    order: index + 1,
  }))

  await seedType('Rental equipment categories', rentalCategories, (item, index, assetId) => ({
    _id: `rental-category-${item.slug}`,
    _type: 'rentalCategory',
    title: item.title,
    slug: { _type: 'slug', current: item.slug },
    image: imageField(assetId),
    description: item.description,
    order: index + 1,
  }))

  console.log('\nDone. Open /studio to edit.')
}

run().catch((error) => {
  console.error('\nSeed failed:', error.message)
  process.exit(1)
})
