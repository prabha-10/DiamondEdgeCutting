// Inquiry schema. Each document is a rental-equipment inquiry submission
// (multi-item cart: editor sees an array of equipment refs in one submission).
// Created by app/api/inquiries/route.ts when a visitor submits the form.

import { defineField, defineType } from 'sanity'

export const inquiry = defineType({
  name: 'inquiry',
  title: 'Equipment Inquiry',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (r) => r.required().email(),
    }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'company', title: 'Company', type: 'string' }),
    defineField({
      name: 'equipment',
      title: 'Equipment requested',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'equipment' }] }],
      description:
        'One or more equipment models. The on-site cart lets visitors line up multiple items in a single inquiry.',
    }),
    defineField({ name: 'projectLocation', title: 'Project location', type: 'string' }),
    defineField({ name: 'rentalDuration', title: 'Rental duration', type: 'string' }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 4 }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted at',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['new', 'contacted', 'quoted', 'won', 'lost'] },
      initialValue: 'new',
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'company', email: 'email' },
    prepare({ title, subtitle, email }) {
      return { title: title || email, subtitle: subtitle || email }
    },
  },
})
