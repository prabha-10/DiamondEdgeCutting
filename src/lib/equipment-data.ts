export type EquipmentCategory = {
  slug: string
  title: string
  description: string
  shortLabel: string
  modelCount: number
  trustTags: string[]
  imageUrl: string
  metaTitle: string
  metaDescription: string
  order: number
}

export const equipmentCategories: EquipmentCategory[] = [
  {
    slug: 'robotic-demolition-machines',
    title: 'Robotic Demolition Machines',
    description: 'Brokk and Husqvarna DXR remote-controlled rigs for confined, low-noise, low-vibration demolition. The largest specialist fleet in the GCC.',
    shortLabel: 'Specialist Fleet',
    modelCount: 13,
    trustTags: ['13 models', 'Operator-led'],
    imageUrl: 'https://images.unsplash.com/photo-1711618732376-416cf6af54f6?w=1200&q=80&auto=format&fit=crop',
    metaTitle: 'Robotic Demolition Machine Rental UAE | Brokk & Husqvarna DXR',
    metaDescription: "Rent the GCC's largest fleet of robotic demolition machines. Brokk 500 to 90, Husqvarna DXR 305 to 95. With trained operators. Dubai & Abu Dhabi.",
    order: 1
  },
  {
    slug: 'excavators',
    title: 'Excavators',
    description: '14 to 50 ton excavators including 26-metre long-reach for high-clearance demolition. Komatsu, Daewoo, Develon, Hitachi.',
    shortLabel: '14 to 50 Ton',
    modelCount: 7,
    trustTags: ['26m reach', 'Wet or dry hire'],
    imageUrl: 'https://images.unsplash.com/photo-1583024011792-b165975b52f5?w=1200&q=80&auto=format&fit=crop',
    metaTitle: 'Excavator Rental Dubai & UAE | 14 to 50 Ton, Operators Available',
    metaDescription: 'Rent 14 to 50 ton excavators across the UAE. Komatsu, Daewoo, Develon, Hitachi. Includes 26m long-reach for tower demolition. Operator-ready.',
    order: 2
  },
  {
    slug: 'mini-excavators',
    title: 'Mini Excavators',
    description: 'KOBELCO and Hitachi compact mini excavators for basements, podium decks, and tight-access refurbishment. Indoor-capable.',
    shortLabel: 'Tight Access',
    modelCount: 5,
    trustTags: ['Indoor-capable', 'Day to month'],
    imageUrl: 'https://images.unsplash.com/photo-1649829809465-d358fce60ebd?w=1200&q=80&auto=format&fit=crop',
    metaTitle: 'Mini Excavator Rental Dubai | KOBELCO & Hitachi, Operators',
    metaDescription: 'Mini excavator rental across Dubai and UAE. KOBELCO SK and Hitachi ZX models. Indoor-capable for basement, podium, tight-access work.',
    order: 3
  },
  {
    slug: 'skid-steers',
    title: 'Skid Steers',
    description: 'Bobcat and Caterpillar compact loaders for strip-out, debris handling, and post-demolition site clearance.',
    shortLabel: 'Indoor-Capable',
    modelCount: 6,
    trustTags: ['Compact', 'Wet or dry'],
    imageUrl: 'https://images.unsplash.com/photo-1545426373-6588267475be?w=1200&q=80&auto=format&fit=crop',
    metaTitle: 'Skid Steer Rental Dubai | Bobcat & Caterpillar Compact Loaders',
    metaDescription: 'Skid steer hire in Dubai and UAE. Bobcat S70 to S770 plus Caterpillar 226B3. Compact loaders for site clearance and indoor demolition support.',
    order: 4
  },
  {
    slug: 'wheel-loaders',
    title: 'Wheel Loaders',
    description: 'Heavy load-out and material handling for live demolition and enabling-works packages. CAT and Develon.',
    shortLabel: 'Heavy Load-Out',
    modelCount: 2,
    trustTags: ['High capacity', 'With operator'],
    imageUrl: 'https://images.unsplash.com/photo-1630288214032-2c4cc2c080ca?w=1200&q=80&auto=format&fit=crop',
    metaTitle: 'Wheel Loader Rental Dubai & UAE | Heavy-Duty Material Handling',
    metaDescription: 'Wheel loader rental across Dubai and UAE. CAT IT14F and Develon DL320A-7M for heavy load-out, aggregate, and post-demolition clearance.',
    order: 5
  },
  {
    slug: 'waste-removal',
    title: 'Waste Removal Skips and Lorries',
    description: '12 and 22 CBM skips, 3 to 18 CBM tipper lorries. Site-direct debris clearance with recycling-led disposal.',
    shortLabel: 'Site-Direct',
    modelCount: 8,
    trustTags: ['Recycling-led', 'Drivers included'],
    imageUrl: 'https://images.unsplash.com/photo-1746349086423-06ea6b4d73f7?w=1200&q=80&auto=format&fit=crop',
    metaTitle: 'Demolition Waste Removal Dubai | 12 & 22 CBM Skips, Lorries',
    metaDescription: 'Demolition waste removal across Dubai and UAE. 12 and 22 CBM skips. 3 to 18 CBM lorries. Recycling-led disposal, drivers and tipping fees included.',
    order: 6
  }
]
