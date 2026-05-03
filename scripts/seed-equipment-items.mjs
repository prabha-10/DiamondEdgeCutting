import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false
})

async function seed() {
  // Delete all existing equipment items first
  const existing = await client.fetch('*[_type == "equipment"]._id')
  if (existing.length > 0) {
    console.log(`Deleting ${existing.length} existing equipment items...`)
    const tx = client.transaction()
    for (const id of existing) {
      tx.delete(id)
    }
    await tx.commit()
  }

  // Seed exactly 6 items (one per category)
  const items = [
    {
      _id: 'equip-brokk-500',
      _type: 'equipment',
      title: 'Brokk 500',
      slug: { _type: 'slug', current: 'brokk-500' },
      category: { _type: 'reference', _ref: 'cat-robotic-demolition-machines' },
      description: 'Our flagship robotic demolition machine. Most powerful Brokk in the GCC fleet, built for large-scale controlled demolition where conventional plant cannot reach safely.',
      keySpec: '22 kW, 5,200 kg, electric',
      order: 1,
      available: true
    },
    {
      _id: 'equip-hitachi-zx350h-5g',
      _type: 'equipment',
      title: 'Hitachi ZX350H-5G',
      slug: { _type: 'slug', current: 'hitachi-zx350h-5g' },
      category: { _type: 'reference', _ref: 'cat-excavators' },
      description: '35-ton heavy excavator for structural demolition and infrastructure works. Reliable workhorse for live demolition packages across the UAE.',
      keySpec: '35 ton, hydraulic breaker compatible',
      order: 1,
      available: true
    },
    {
      _id: 'equip-kobelco-sk17sr-6',
      _type: 'equipment',
      title: 'KOBELCO SK1.7SR-6',
      slug: { _type: 'slug', current: 'kobelco-sk17sr-6' },
      category: { _type: 'reference', _ref: 'cat-mini-excavators' },
      description: 'Compact 1.7-ton mini excavator for indoor demolition, basement and podium-deck works, and tight-access refurbishment. Fits through standard doorways.',
      keySpec: '1.7 ton, 980 mm wide, indoor-capable',
      order: 1,
      available: true
    },
    {
      _id: 'equip-bobcat-s550b',
      _type: 'equipment',
      title: 'Bobcat S550B',
      slug: { _type: 'slug', current: 'bobcat-s550b' },
      category: { _type: 'reference', _ref: 'cat-skid-steers' },
      description: 'Mid-size skid steer loader for strip-out, debris handling, and post-demolition site clearance. Compact, manoeuvrable, indoor-capable with proper ventilation.',
      keySpec: 'Mid-size, multi-attachment, wet or dry hire',
      order: 1,
      available: true
    },
    {
      _id: 'equip-cat-it14f',
      _type: 'equipment',
      title: 'CAT IT14F',
      slug: { _type: 'slug', current: 'cat-it14f' },
      category: { _type: 'reference', _ref: 'cat-wheel-loaders' },
      description: 'Caterpillar wheel loader for heavy load-out and material handling on live demolition and enabling-works packages. Operator included.',
      keySpec: 'High capacity, integrated tool carrier',
      order: 1,
      available: true
    },
    {
      _id: 'equip-man-hook-loader',
      _type: 'equipment',
      title: 'MAN Hook Loader Truck',
      slug: { _type: 'slug', current: 'man-hook-loader' },
      category: { _type: 'reference', _ref: 'cat-waste-removal' },
      subcategory: 'Skip Lorries',
      description: 'Hook loader truck for skip-direct waste removal across Dubai and UAE. Pairs with our 12 and 22 CBM skips for site-direct demolition disposal.',
      keySpec: '22 CBM compatible, drivers included',
      order: 1,
      available: true
    }
  ]

  console.log('Seeding 6 equipment items...')
  const tx = client.transaction()
  for (const item of items) {
    tx.createOrReplace(item)
  }
  await tx.commit()
  console.log('Done! 6 items seeded (one per category).')
}

seed().catch(err => { console.error(err); process.exit(1) })
