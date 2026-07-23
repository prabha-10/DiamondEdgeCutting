// Rental equipment category card. Deliberately lean: the /rental-equipment page
// is a flat card grid, so this holds only what a card renders. It is NOT the old
// `category` type removed in 603f2bf — that one carried attachment tabs, parent
// references and per-category routes that no longer exist.
// Falls back to the inline list in src/app/rental-equipment/page.tsx when empty.

import { defineField, defineType } from 'sanity'
import { OrderInput } from '../components/OrderInput'
import { uniqueOrder } from '../lib/uniqueOrder'

export const rentalCategory = defineType({
  name: 'rentalCategory',
  title: 'Rental Equipment Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'Used as the card key. Not currently a route.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Cropped to 16:10 — set the hotspot to keep the machine in frame.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Two or three sentences describing the fleet in this category.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'ctaLink',
      title: 'Card Link',
      type: 'string',
      description:
        'Where the card goes. Leave blank to use the default enquiry link (/contact?inquiry=Equipment+Rental).'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Values already used by another category are disabled.',
      components: { input: OrderInput },
      validation: Rule => uniqueOrder(Rule)
    })
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image'
    }
  }
})
