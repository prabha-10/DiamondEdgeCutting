// Equipment schema. Each document represents one rental model.
// 89 models seeded from rental-equipment-content.json. Sub-category strings
// are denormalized (no separate sub-category document) and rendered as
// section headings by grouping at query time.

import { defineField, defineType } from 'sanity'

export const equipment = defineType({
  name: 'equipment',
  title: 'Equipment',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Brokk 500", "DXR 145", "Komatsu PC138".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: '1-line positioning, e.g. "Heavy-class electric robotic demolition machine".',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subCategory',
      title: 'Sub-category',
      type: 'string',
      description:
        'Optional grouping inside the category, e.g. "Brokk Family", "Breakers", "Lorries". Equipment with the same value clusters together on the category page.',
    }),
    defineField({
      name: 'subCategoryOrder',
      title: 'Sub-category display order',
      type: 'number',
      description: 'Order of this sub-category section within the category.',
    }),
    defineField({
      name: 'order',
      title: 'Display order within (sub-)category',
      type: 'number',
      description: 'Lower numbers come first.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'manufacturer',
      title: 'Manufacturer',
      type: 'string',
      description: 'e.g. "Brokk", "Husqvarna", "KOBELCO". Used for the Filter by manufacturer feature.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: '2-4 sentences. Used on the model detail page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'useCases',
      title: 'Use cases',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bulleted use cases or typical applications.',
    }),
    defineField({
      name: 'unitsInStock',
      title: 'Units in stock',
      type: 'number',
      description: 'Optional. Public stock count.',
    }),
    defineField({
      name: 'assetNumbers',
      title: 'Asset numbers',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Internal DEC-FA-XXX asset numbers. NOT shown on public pages. For internal reconciliation only.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      description: 'Single hero image used on cards and the model detail page.',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Up to 6 additional images for the model detail page.',
    }),
    defineField({
      name: 'specSheet',
      title: 'Spec sheet (PDF)',
      type: 'file',
      options: { accept: 'application/pdf' },
      description: 'Optional manufacturer spec sheet PDF.',
    }),
    defineField({
      name: 'specs',
      title: 'Specs',
      type: 'array',
      description: 'Key-value pairs shown on the model detail page (e.g. weight, reach, power).',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured on category landing?',
      type: 'boolean',
      initialValue: false,
      description: 'Surfaces this model as a hero pick on the category landing page.',
    }),
  ],
  orderings: [
    {
      title: 'Sub-category, then order',
      name: 'subCatThenOrder',
      by: [
        { field: 'subCategoryOrder', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'heroImage',
      manufacturer: 'manufacturer',
    },
    prepare({ title, subtitle, media, manufacturer }) {
      return {
        title,
        subtitle: manufacturer ? `${manufacturer}, ${subtitle}` : subtitle,
        media,
      }
    },
  },
})
