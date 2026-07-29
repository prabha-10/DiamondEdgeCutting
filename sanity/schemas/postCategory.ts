// Blog category. Drives two surfaces from one document:
//   1. /blog       — the filter pills, in Display Order
//   2. /blog + /blog/[slug] — the coloured badge on every card and article header
//
// The badge colour is the one place on /blog that isn't brand red: structure
// (eyebrows, CTAs, active pills) stays red, while each category gets its own
// chip so the archive is scannable at a glance.

import { defineField, defineType } from 'sanity'
import { OrderInput } from '../components/OrderInput'
import { uniqueOrder } from '../lib/uniqueOrder'

export const postCategory = defineType({
  name: 'postCategory',
  title: 'Blog Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. Cost Guides, Permits & Compliance, Industry Insights',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Internal note for editors. Not shown on the site.'
    }),
    defineField({
      name: 'color',
      title: 'Badge Colour',
      type: 'string',
      description:
        "Colour of this category's badge on blog cards and article headers. Give each category a different one.",
      options: {
        list: [
          { title: 'Red (brand)', value: 'red' },
          { title: 'Blue', value: 'blue' },
          { title: 'Orange', value: 'orange' },
          { title: 'Teal', value: 'teal' },
          { title: 'Charcoal', value: 'charcoal' }
        ],
        layout: 'radio'
      },
      initialValue: 'red',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description:
        'Lower numbers appear first in the /blog filter row. Values already used by another category are disabled.',
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
    select: { title: 'title', subtitle: 'color' }
  }
})
