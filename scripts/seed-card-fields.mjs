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

const updates = [
  {
    _id: 'cat-robotic-demolition-machines',
    shortLabel: 'Specialist Fleet',
    trustTags: ['13 models', 'Operator-led'],
    imageUrl: 'https://images.unsplash.com/photo-1711618732376-416cf6af54f6?w=1200&q=80&auto=format&fit=crop'
  },
  {
    _id: 'cat-excavators',
    shortLabel: '14 to 50 Ton',
    trustTags: ['26m reach', 'Wet or dry hire'],
    imageUrl: 'https://images.unsplash.com/photo-1583024011792-b165975b52f5?w=1200&q=80&auto=format&fit=crop'
  },
  {
    _id: 'cat-mini-excavators',
    shortLabel: 'Tight Access',
    trustTags: ['Indoor-capable', 'Day to month'],
    imageUrl: 'https://images.unsplash.com/photo-1649829809465-d358fce60ebd?w=1200&q=80&auto=format&fit=crop'
  },
  {
    _id: 'cat-skid-steers',
    shortLabel: 'Indoor-Capable',
    trustTags: ['Compact', 'Wet or dry'],
    imageUrl: 'https://images.unsplash.com/photo-1545426373-6588267475be?w=1200&q=80&auto=format&fit=crop'
  },
  {
    _id: 'cat-wheel-loaders',
    shortLabel: 'Heavy Load-Out',
    trustTags: ['High capacity', 'With operator'],
    imageUrl: 'https://images.unsplash.com/photo-1630288214032-2c4cc2c080ca?w=1200&q=80&auto=format&fit=crop'
  },
  {
    _id: 'cat-waste-removal',
    shortLabel: 'Site-Direct',
    trustTags: ['Recycling-led', 'Drivers included'],
    imageUrl: 'https://images.unsplash.com/photo-1746349086423-06ea6b4d73f7?w=1200&q=80&auto=format&fit=crop'
  },
  {
    _id: 'cat-concrete-cutting',
    shortLabel: 'Precision Cutting',
    trustTags: ['Zero vibration', 'Operator-led'],
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop'
  }
]

async function seed() {
  for (const u of updates) {
    await client.patch(u._id).set({
      shortLabel: u.shortLabel,
      trustTags: u.trustTags,
      imageUrl: u.imageUrl
    }).commit()
    console.log(`Updated ${u._id}`)
  }
  console.log('Done!')
}

seed().catch(err => { console.error(err); process.exit(1) })
