import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Equipment Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'h1',
      title: 'Page Heading (H1)',
      type: 'string',
      description: 'Main heading on the category detail page'
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 4,
      description: 'Paragraph shown below the H1 and on the category card'
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'One paragraph used on the category landing tile and SEO description'
    }),
    defineField({
      name: 'shortLabel',
      title: 'Card Tag Label',
      type: 'string',
      description: 'Short tag shown on the card image, e.g. "Specialist Fleet", "14 to 50 Ton"'
    }),
    defineField({
      name: 'trustTags',
      title: 'Trust Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Small chips shown on the card, e.g. "13 models", "Operator-led"'
    }),
    defineField({
      name: 'imageUrl',
      title: 'Card Image URL',
      type: 'url',
      description: 'External image URL for the category card (used until real photos are uploaded)'
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'useCases',
      title: 'Use Cases / Capabilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet list of what this equipment category can do'
    }),
    defineField({
      name: 'terms',
      title: 'Rental Terms',
      type: 'text',
      rows: 3,
      description: 'Hire terms paragraph shown on the detail page'
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string', validation: Rule => Rule.required() }),
          defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: Rule => Rule.required() })
        ]
      }]
    }),
    defineField({
      name: 'crossSells',
      title: 'Cross-sell Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      description: '"Pairs Well With" sidebar links'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first'
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO Meta Title',
      type: 'string',
      description: 'Max 60 characters'
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'string',
      description: 'Max 155 characters'
    })
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
})
