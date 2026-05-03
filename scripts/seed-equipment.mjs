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

const categories = [
  {
    _type: 'category',
    _id: 'cat-robotic-demolition-machines',
    title: 'Brokk and Husqvarna DXR',
    slug: { _type: 'slug', current: 'robotic-demolition-machines' },
    h1: 'Brokk and Husqvarna DXR Robotic Demolition Machine Rental',
    overview: 'We operate the largest specialist robotic demolition fleet in the region. These remote-controlled electric machines provide unmatched power-to-weight ratios, allowing heavy demolition in confined, sensitive, or occupied environments.',
    description: 'We operate the largest specialist robotic demolition fleet in the region.',
    useCases: [
      'Airport works and live terminal modifications',
      'Mall refurbishments and retail strip-outs',
      'Refractory demolition (cement plants, steel plants)',
      'Occupied-building works with low noise and zero emissions',
      'High-vibration-sensitive environments'
    ],
    terms: 'Available for daily, weekly, or monthly hire. All robotic machines are supplied with fully trained, HSE-certified operators to ensure safe and efficient execution.',
    faqs: [
      { _key: 'faq1', question: 'Do you supply operators with the Brokk machines?', answer: 'Yes, all our robotic demolition machines are rented with our own highly trained and certified operators. We do not dry-hire these specialist machines.' },
      { _key: 'faq2', question: 'What power supply is required?', answer: 'Brokk and DXR machines require a 3-phase power supply (32A or 63A depending on the model). We can provide guidance on site setup.' },
      { _key: 'faq3', question: 'Can these machines fit in a standard service elevator?', answer: 'Yes, our smaller models (like the Brokk 160, 170, and DXR 145) are designed specifically to fit through standard doorways and into service elevators.' }
    ],
    order: 1,
    metaTitle: 'Robotic Demolition Machine Rental UAE | Brokk & Husqvarna DXR',
    metaDescription: 'Rent the GCC\'s largest fleet of robotic demolition machines. Brokk 500 to Brokk 160, Husqvarna DXR 300, 305, 145, with trained operators. Dubai & Abu Dhabi.'
  },
  {
    _type: 'category',
    _id: 'cat-excavators',
    title: 'Excavators',
    slug: { _type: 'slug', current: 'excavators' },
    h1: 'Excavator Rental Across Dubai & UAE',
    overview: 'Our heavy excavator fleet is purpose-built for major demolition works. Equipped with advanced safety features and maintained to the highest standards, they deliver reliable performance on the toughest sites.',
    description: 'Our heavy excavator fleet is purpose-built for major demolition works.',
    useCases: [
      'Heavy structural demolition',
      'High-rise and chimney tower demolition (Long Reach)',
      'Large-scale earthworks and site clearance',
      'Infrastructure and bridge removal'
    ],
    terms: 'Available for dry hire or with certified operators. Long-reach machines always include specialist operators. Minimum hire periods apply.',
    faqs: [
      { _key: 'faq1', question: 'Do you offer dry hire for excavators?', answer: 'Yes, standard 14 to 50-ton excavators are available for dry hire to approved clients. However, our 26-metre long-reach rigs are strictly wet hire only.' },
      { _key: 'faq2', question: 'Are your excavators approved for Dubai Municipality sites?', answer: 'Absolutely. All our heavy equipment is fully certified, registered, and compliant with DM and Abu Dhabi Municipality regulations.' },
      { _key: 'faq3', question: 'Do the excavators come with attachments?', answer: 'Excavators come with a standard bucket. Specialist demolition attachments (breakers, crushers, shears) are rented separately based on your project needs.' }
    ],
    order: 2,
    metaTitle: 'Excavator Rental Dubai & UAE | 14 to 50 Ton, Operators Available',
    metaDescription: 'Rent 14 to 50-ton excavators and 26-metre long-reach demolition rigs in Dubai and the UAE. Operators available.'
  },
  {
    _type: 'category',
    _id: 'cat-mini-excavators',
    title: 'Mini Excavators',
    slug: { _type: 'slug', current: 'mini-excavators' },
    h1: 'Mini Excavator Rental in Dubai & UAE',
    overview: 'Compact but powerful, our mini excavator fleet provides the perfect solution for tight-access sites, indoor demolition, and precision earthworks.',
    description: 'Compact but powerful, our mini excavator fleet provides the perfect solution for tight-access sites.',
    useCases: [
      'Residential demolition and renovations',
      'Urban tight-access works',
      'Landscaping and utilities trenching',
      'Small-scale earthworks and site prep'
    ],
    terms: 'Available for short-term or long-term hire. Can be supplied with or without operators based on client preference.',
    faqs: [
      { _key: 'faq1', question: 'What is the minimum hire period?', answer: 'We offer flexible terms starting from a single day hire up to multi-month contracts.' },
      { _key: 'faq2', question: 'Do they come with rubber tracks?', answer: 'Yes, our mini excavators are equipped with rubber tracks to prevent damage to finished surfaces and roads.' },
      { _key: 'faq3', question: 'Can I rent a breaker for the mini excavator?', answer: 'Absolutely. We stock perfectly matched hydraulic breakers for all our mini excavator models.' }
    ],
    order: 3,
    metaTitle: 'Mini Excavator Rental Dubai | KOBELCO & Hitachi, Operators Included',
    metaDescription: 'Rent KOBELCO and Hitachi mini excavators in Dubai. Ideal for tight-access demolition and residential works.'
  },
  {
    _type: 'category',
    _id: 'cat-skid-steers',
    title: 'Skid Steers',
    slug: { _type: 'slug', current: 'skid-steers' },
    h1: 'Skid Steer Rental for Demolition and Site Works',
    overview: 'The workhorse of any demolition or construction site. Our skid steers offer unmatched agility for moving debris, loading skips, and supporting interior strip-outs.',
    description: 'The workhorse of any demolition or construction site.',
    useCases: [
      'Site clearance and debris removal',
      'Indoor demolition support (fitting through standard doors)',
      'Material handling and loading',
      'Sweeping and site finishing'
    ],
    terms: 'Available for wet or dry hire. Supplied with a standard bucket, with sweeper attachments available on request.',
    faqs: [
      { _key: 'faq1', question: 'Are sweeper attachments available?', answer: 'Yes, we can supply enclosed sweeper attachments with our skid steers for efficient site cleaning.' },
      { _key: 'faq2', question: 'Can they operate indoors?', answer: 'Yes, providing there is adequate ventilation. For completely unventilated spaces, we recommend our electric robotic fleet instead.' },
      { _key: 'faq3', question: 'Do you provide operators for skid steers?', answer: 'Yes, we have a pool of experienced skid steer operators available for daily or monthly hire.' }
    ],
    order: 4,
    metaTitle: 'Skid Steer Rental Dubai | Compact Loaders for Demolition & Site Works',
    metaDescription: 'Rent skid steer loaders in Dubai for site clearance, indoor demolition support, and material handling.'
  },
  {
    _type: 'category',
    _id: 'cat-wheel-loaders',
    title: 'Wheel Loaders',
    slug: { _type: 'slug', current: 'wheel-loaders' },
    h1: 'Wheel Loader Rental Across the UAE',
    overview: 'When you need to move massive volumes of material quickly, our wheel loaders deliver. Ideal for major demolition sites, quarries, and infrastructure projects.',
    description: 'When you need to move massive volumes of material quickly, our wheel loaders deliver.',
    useCases: [
      'Large-scale demolition debris handling',
      'Aggregate and material loading',
      'Major site clearance',
      'Infrastructure and road projects'
    ],
    terms: 'Typically supplied with our experienced operators to ensure maximum productivity and safety on busy sites.',
    faqs: [
      { _key: 'faq1', question: 'What bucket capacities are available?', answer: 'We offer a range of sizes. Please contact our rental team with your volume requirements so we can specify the correct machine.' },
      { _key: 'faq2', question: 'Are the loaders road registered?', answer: 'Yes, our wheel loaders are road registered for moving between adjacent sites or operating on public infrastructure projects.' },
      { _key: 'faq3', question: 'Is fuel included in the rental price?', answer: 'No, fuel is typically charged separately or provided by the client on-site. We can arrange fueling services if requested.' }
    ],
    order: 5,
    metaTitle: 'Wheel Loader Rental Dubai & UAE | Heavy-Duty Material Handling',
    metaDescription: 'Rent heavy-duty wheel loaders across the UAE for large-scale debris handling, aggregate loading, and site clearance.'
  },
  {
    _type: 'category',
    _id: 'cat-waste-removal',
    title: 'Waste Removal Skips and Lorries',
    slug: { _type: 'slug', current: 'waste-removal' },
    h1: 'Demolition Waste Removal & Disposal',
    overview: "We don't just demolish; we clear the site. Our fleet of skips and tipper lorries ensures seamless debris removal, keeping your project moving while adhering to strict environmental disposal regulations.",
    description: "We don't just demolish; we clear the site.",
    useCases: [
      'Continuous site clearance during demolition',
      'Bulk debris removal',
      'Recycling-led disposal pathways',
      'Post-demolition site handover prep'
    ],
    terms: 'Skips can be hired on a per-trip or dedicated monthly basis. Lorries are supplied with drivers. We handle all landfill and recycling tipping fees and documentation.',
    faqs: [
      { _key: 'faq1', question: 'Do you handle the tipping fees and paperwork?', answer: 'Yes, our service is fully inclusive of municipality tipping fees, and we provide waste manifest documentation for your environmental reporting.' },
      { _key: 'faq2', question: 'How quickly can you replace a full skip?', answer: 'For dedicated site contracts, we typically operate on a 24-hour turnaround, or we can stage multiple skips on-site to ensure zero downtime.' },
      { _key: 'faq3', question: 'Do you recycle demolition waste?', answer: 'Yes, we prioritize recycling pathways for concrete, steel, and timber, diverting maximum volumes away from general landfill.' }
    ],
    order: 6,
    metaTitle: 'Demolition Waste Removal Dubai | 12CBM & 22CBM Skips, 3T to 18CBM Lorries',
    metaDescription: 'Demolition waste removal in Dubai. 12CBM to 22CBM skips, 3T to 18CBM lorries. Recycling-led disposal pathways.'
  }
]

// crossSells are references — set them after categories exist
const crossSellMap = {
  'cat-robotic-demolition-machines': ['cat-excavators'],
  'cat-excavators': ['cat-wheel-loaders', 'cat-mini-excavators'],
  'cat-mini-excavators': ['cat-skid-steers', 'cat-excavators'],
  'cat-skid-steers': ['cat-mini-excavators', 'cat-waste-removal'],
  'cat-wheel-loaders': ['cat-excavators', 'cat-waste-removal'],
  'cat-waste-removal': ['cat-wheel-loaders', 'cat-skid-steers']
}

const equipmentItems = [
  // Robotic Demolition
  { _type: 'equipment', title: 'Brokk 500', slug: { _type: 'slug', current: 'brokk-500' }, category: { _type: 'reference', _ref: 'cat-robotic-demolition-machines' }, keySpec: 'The most powerful Brokk in our fleet, ideal for heavy concrete and refractory work.', order: 1, available: true },
  { _type: 'equipment', title: 'Brokk 400 & 300', slug: { _type: 'slug', current: 'brokk-400-300' }, category: { _type: 'reference', _ref: 'cat-robotic-demolition-machines' }, keySpec: 'Mid-to-heavy range machines for versatile structural demolition.', order: 2, available: true },
  { _type: 'equipment', title: 'Brokk 260, 200, 170, 160', slug: { _type: 'slug', current: 'brokk-260-200-170-160' }, category: { _type: 'reference', _ref: 'cat-robotic-demolition-machines' }, keySpec: 'Compact machines for confined spaces and indoor works.', order: 3, available: true },
  { _type: 'equipment', title: 'Husqvarna DXR 300 & 305', slug: { _type: 'slug', current: 'husqvarna-dxr-300-305' }, category: { _type: 'reference', _ref: 'cat-robotic-demolition-machines' }, keySpec: 'High power-to-weight ratio for tough environments.', order: 4, available: true },
  { _type: 'equipment', title: 'Husqvarna DXR 145', slug: { _type: 'slug', current: 'husqvarna-dxr-145' }, category: { _type: 'reference', _ref: 'cat-robotic-demolition-machines' }, keySpec: 'Ultra-compact 360-degree rotating arm machine.', order: 5, available: true },
  // Excavators
  { _type: 'equipment', title: '14 to 25 Ton Excavators', slug: { _type: 'slug', current: '14-to-25-ton-excavators' }, category: { _type: 'reference', _ref: 'cat-excavators' }, keySpec: 'Versatile machines for standard demolition and earthworks.', order: 1, available: true },
  { _type: 'equipment', title: '30 to 50 Ton Excavators', slug: { _type: 'slug', current: '30-to-50-ton-excavators' }, category: { _type: 'reference', _ref: 'cat-excavators' }, keySpec: 'Heavy-duty carriers for major structural removal.', order: 2, available: true },
  { _type: 'equipment', title: '26-Metre Long Reach', slug: { _type: 'slug', current: '26-metre-long-reach' }, category: { _type: 'reference', _ref: 'cat-excavators' }, keySpec: 'Specialist rigs for high-rise controlled demolition.', order: 3, available: true },
  // Mini Excavators
  { _type: 'equipment', title: 'KOBELCO Mini Excavators', slug: { _type: 'slug', current: 'kobelco-mini-excavators' }, category: { _type: 'reference', _ref: 'cat-mini-excavators' }, keySpec: 'Highly maneuverable, zero tail swing models.', order: 1, available: true },
  { _type: 'equipment', title: 'Hitachi Mini Excavators', slug: { _type: 'slug', current: 'hitachi-mini-excavators' }, category: { _type: 'reference', _ref: 'cat-mini-excavators' }, keySpec: 'Reliable performance for precision digging and breaking.', order: 2, available: true },
  // Skid Steers
  { _type: 'equipment', title: 'Standard Skid Steers', slug: { _type: 'slug', current: 'standard-skid-steers' }, category: { _type: 'reference', _ref: 'cat-skid-steers' }, keySpec: 'Wheeled loaders for general site works.', order: 1, available: true },
  { _type: 'equipment', title: 'Compact Models', slug: { _type: 'slug', current: 'compact-skid-steers' }, category: { _type: 'reference', _ref: 'cat-skid-steers' }, keySpec: 'Narrow-width models for indoor works.', order: 2, available: true },
  // Wheel Loaders
  { _type: 'equipment', title: 'Heavy Wheel Loaders', slug: { _type: 'slug', current: 'heavy-wheel-loaders' }, category: { _type: 'reference', _ref: 'cat-wheel-loaders' }, keySpec: 'High-capacity buckets for rapid truck loading.', order: 1, available: true },
  // Waste Removal
  { _type: 'equipment', title: 'Roll-on / Roll-off Skips', slug: { _type: 'slug', current: 'roll-on-roll-off-skips' }, category: { _type: 'reference', _ref: 'cat-waste-removal' }, keySpec: '12CBM and 22CBM capacities.', order: 1, available: true },
  { _type: 'equipment', title: 'Tipper Lorries', slug: { _type: 'slug', current: 'tipper-lorries' }, category: { _type: 'reference', _ref: 'cat-waste-removal' }, keySpec: '3 Ton up to 18CBM heavy tippers.', order: 2, available: true }
]

async function seed() {
  console.log('Seeding categories...')
  const tx = client.transaction()

  for (const cat of categories) {
    tx.createOrReplace(cat)
  }

  for (const item of equipmentItems) {
    const id = `equip-${item.slug.current}`
    tx.createOrReplace({ _id: id, ...item })
  }

  await tx.commit()
  console.log('Categories and equipment seeded.')

  // Now patch crossSells as references
  console.log('Setting cross-sell references...')
  for (const [catId, refs] of Object.entries(crossSellMap)) {
    await client.patch(catId).set({
      crossSells: refs.map((ref, i) => ({ _key: `cs${i}`, _type: 'reference', _ref: ref }))
    }).commit()
  }

  console.log('Done! All data seeded successfully.')
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
