import { defineField, defineType } from 'sanity'

export const equipment = defineType({
  name: 'equipment',
  title: 'Equipment Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Equipment Name',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g. Brokk 500, Hitachi ZX350H-5G'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subcategory',
      title: 'Sub-category (optional)',
      type: 'string',
      description: 'Optional grouping within a category, e.g. "Lorries" or "Skip Lorries" inside Waste Removal'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'keySpec',
      title: 'Key Spec (one line)',
      type: 'string',
      description: 'Headline spec shown on the card, e.g. "22kW, fits through standard doorways"'
    }),
    defineField({
      name: 'image',
      title: 'Equipment Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Display Order Within Category',
      type: 'number'
    }),
    defineField({
      name: 'available',
      title: 'Available for Inquiry',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide from the website without deleting the record'
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
      subtitle: 'category.title',
      media: 'image'
    }
  }
})
