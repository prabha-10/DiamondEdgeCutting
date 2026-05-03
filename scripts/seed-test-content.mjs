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
  const tx = client.transaction()

  // --- Equipment: New category + 2 items ---
  tx.createOrReplace({
    _type: 'category',
    _id: 'cat-concrete-cutting',
    title: 'Concrete Cutting & Sawing',
    slug: { _type: 'slug', current: 'concrete-cutting' },
    h1: 'Concrete Cutting & Sawing Equipment Rental',
    overview: 'Precision diamond wire and wall saws for controlled concrete cutting. Ideal for creating openings, removing sections, and modifying structures without vibration damage to surrounding areas.',
    description: 'Precision diamond wire and wall saws for controlled concrete cutting.',
    useCases: [
      'Door, window, and HVAC openings in concrete walls',
      'Controlled slab removal without structural damage',
      'Bridge deck and parapet cutting',
      'Lift shaft and stairwell modifications',
      'Underwater cutting for marine structures'
    ],
    terms: 'All concrete cutting equipment is supplied wet-hire only with our specialist operators. Daily and weekly rates available. Minimum one-day hire.',
    faqs: [
      { _key: 'faq1', question: 'Can you cut reinforced concrete?', answer: 'Yes. Our diamond wire and wall saws cut through heavily reinforced concrete including rebar up to 40mm diameter. Cutting speed depends on rebar density and concrete strength.' },
      { _key: 'faq2', question: 'Is there dust during cutting?', answer: 'Our saws use water suppression, so dust is minimal. This makes them suitable for occupied buildings, hospitals, and clean environments.' },
      { _key: 'faq3', question: 'What thickness can you cut?', answer: 'Wall saws handle up to 730mm depth in a single pass. Diamond wire saws have no depth limitation and are used for cutting entire structural members.' }
    ],
    crossSells: [
      { _key: 'cs0', _type: 'reference', _ref: 'cat-robotic-demolition-machines' },
      { _key: 'cs1', _type: 'reference', _ref: 'cat-waste-removal' }
    ],
    order: 7,
    metaTitle: 'Concrete Cutting & Sawing Rental Dubai | Diamond Wire & Wall Saws',
    metaDescription: 'Rent precision concrete cutting equipment in Dubai and UAE. Diamond wire saws, wall saws, floor saws with trained operators. Zero vibration cutting.'
  })

  tx.createOrReplace({
    _type: 'equipment',
    _id: 'equip-diamond-wire-saw',
    title: 'Diamond Wire Saw System',
    slug: { _type: 'slug', current: 'diamond-wire-saw' },
    category: { _type: 'reference', _ref: 'cat-concrete-cutting' },
    keySpec: 'Cuts any thickness of reinforced concrete, steel, or stone. No depth limitation.',
    description: 'Hydraulic diamond wire saw for cutting large concrete sections, columns, beams, and foundations. Uses a continuous loop of diamond-impregnated wire to slice through any material regardless of thickness.',
    order: 1,
    available: true
  })

  tx.createOrReplace({
    _type: 'equipment',
    _id: 'equip-wall-saw',
    title: 'Husqvarna WS 482 HF Wall Saw',
    slug: { _type: 'slug', current: 'husqvarna-ws-482-hf' },
    category: { _type: 'reference', _ref: 'cat-concrete-cutting' },
    keySpec: 'High-frequency electric wall saw, 730mm cutting depth, low noise for occupied buildings.',
    description: 'The Husqvarna WS 482 HF is a high-frequency electric wall saw designed for precision cutting in sensitive environments. Track-mounted for straight, accurate cuts in walls and floors.',
    order: 2,
    available: true
  })

  // --- Projects: New category + 1 project ---
  tx.createOrReplace({
    _type: 'projectCategory',
    _id: 'projcat-commercial',
    title: 'Commercial',
    slug: { _type: 'slug', current: 'commercial' },
    order: 1
  })

  tx.createOrReplace({
    _type: 'project',
    _id: 'proj-meena-plaza',
    title: 'Meena Plaza Tower Demolition',
    slug: { _type: 'slug', current: 'meena-plaza-tower' },
    category: { _type: 'reference', _ref: 'projcat-commercial' },
    location: 'Abu Dhabi, UAE',
    year: 2023,
    scopeSummary: 'Full demolition of 14-storey commercial tower in dense urban CBD',
    description: 'Diamond Edge Cutting was contracted to demolish the 14-storey Meena Plaza commercial tower in downtown Abu Dhabi. The project required careful top-down demolition using long-reach excavators and robotic demolition machines due to the building\'s proximity to occupied structures, live utilities, and major roads. A fleet of Brokk machines handled the interior strip-out while 26-metre long-reach excavators managed the controlled structural demolition floor by floor.',
    keyHighlights: [
      'Zero safety incidents across 8-month programme',
      '95% material recovery rate through on-site crushing and recycling',
      'Maintained full public road access throughout demolition',
      'Brokk 500 and Brokk 300 deployed for internal strip-out',
      'Completed 3 weeks ahead of contractual deadline'
    ],
    relatedServices: ['Robotic Demolition', 'High-Rise Demolition', 'Waste Removal & Recycling'],
    order: 1,
    featured: true
  })

  await tx.commit()
  console.log('Test content seeded successfully!')
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
