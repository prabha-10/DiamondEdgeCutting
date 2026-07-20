// Demolition service schema. Drives three surfaces from one document:
//   1. /demolition-services  — the detail card grid (ServiceDetails)
//   2. /                     — the homepage "Our Services" grid (Services)
//   3. Service JSON-LD       — the SEO graph on /demolition-services
// Falls back to src/data/services.ts when Sanity is empty or unconfigured.

import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Demolition Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description:
        'Also used as the on-page anchor, e.g. /demolition-services#robotic-demolition. Changing it breaks existing links to this service.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      options: { hotspot: true },
      description:
        'Shown on both the homepage and the services page. Cropped to 16:10 — set the hotspot to keep the subject in frame.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description (homepage card)',
      type: 'text',
      rows: 2,
      description: 'One line. Keep it under ~120 characters so the homepage cards stay level.',
      validation: Rule => Rule.required().max(200)
    }),
    defineField({
      name: 'description',
      title: 'Full Description (services page card)',
      type: 'text',
      rows: 5,
      description: 'The lead paragraph. Also used as the description in the Service SEO schema.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'keyPoints',
      title: 'Key Points',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Where this service shines. The services page card shows the first 3, so lead with the strongest.'
    }),
    defineField({
      name: 'equipment',
      title: 'Equipment Used',
      type: 'text',
      rows: 3,
      description: 'Optional. Plant and attachments typically deployed on this service.'
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      description: 'e.g. "Discuss Your Robotic Demolition Project". Used as the card\'s accessible label.',
      initialValue: 'Discuss Your Project'
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      initialValue: '/contact'
    }),
    defineField({
      name: 'crossSellText',
      title: 'Cross-sell Link Text',
      type: 'string',
      description: 'Optional. e.g. "View Robotic Fleet".'
    }),
    defineField({
      name: 'crossSellLink',
      title: 'Cross-sell Link URL',
      type: 'string',
      description: 'Optional. e.g. "/rental-equipment".'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first, on both the homepage and the services page.'
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
      subtitle: 'shortDescription',
      media: 'image'
    }
  }
})
