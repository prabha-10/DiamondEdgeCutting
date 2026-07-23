import { defineField, defineType } from 'sanity'
import { OrderInput } from '../components/OrderInput'
import { uniqueOrder } from '../lib/uniqueOrder'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Name',
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
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'projectCategory' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Dubai", "Abu Dhabi", "Sohar, Oman"'
    }),
    defineField({
      name: 'startDate',
      title: 'Start (Month & Year)',
      type: 'date',
      options: { dateFormat: 'MMM yyyy' },
      description: 'When the project started. Pick any day in the month — only the month and year show on the site. Optional.'
    }),
    defineField({
      name: 'endDate',
      title: 'End (Month & Year)',
      type: 'date',
      options: { dateFormat: 'MMM yyyy' },
      description: 'When the project completed. Optional — leave blank for a single date or an ongoing project.'
    }),
    defineField({
      name: 'scopeSummary',
      title: 'Scope Summary (one line)',
      type: 'string',
      description: 'Shown on the project card grid'
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      rows: 6
    }),
    defineField({
      name: 'keyHighlights',
      title: 'Key Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: '3 to 5 bullet points of notable outcomes'
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: '4 to 5 additional project images'
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Free-text tags to cross-link to demolition services'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Values already used by another project are disabled.',
      components: { input: OrderInput },
      validation: Rule => uniqueOrder(Rule, { label: 'Order' })
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
      description: 'Show this project in the homepage grid'
    }),
    defineField({
      name: 'homepageOrder',
      title: 'Homepage Slot',
      type: 'number',
      description:
        'Which of the six homepage slots this project fills, left to right. Slots taken by another featured project are disabled.',
      components: { input: OrderInput },
      // Six slots because the homepage grid is 3 columns x 2 rows. Scoped to
      // featured projects so un-featuring one releases its slot.
      options: { slots: 6, scope: 'featured == true' },
      hidden: ({ parent }) => !parent?.featured,
      validation: Rule =>
        uniqueOrder(Rule, {
          field: 'homepageOrder',
          label: 'Homepage slot',
          scope: 'featured == true',
          appliesTo: doc => doc?.featured === true
        })
    })
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Start date (newest first)',
      name: 'startDesc',
      by: [{ field: 'startDate', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'heroImage'
    }
  }
})
