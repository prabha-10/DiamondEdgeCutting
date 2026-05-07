// Equipment Category schema. Defined per the rental-equipment PRD spec.
// 8 categories total: 6 routable + 2 attachment-only (no standalone route,
// surfaced as a tab on the parent carrier category).

import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Equipment Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: '1-8. Lower numbers come first on the landing page.',
      validation: (rule) => rule.required().min(1).max(8),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
      description: '1-2 sentences. Used on the landing page category card.',
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: 'description',
      title: 'Full description',
      type: 'text',
      rows: 6,
      description: 'Used at the top of the category page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional. Used as the category page banner.',
    }),
    defineField({
      name: 'isAttachmentCategory',
      title: 'Is this an attachment category?',
      type: 'boolean',
      initialValue: false,
      description:
        'Mark true for Brokk/DXR Attachments and Excavator Attachments. These do not get standalone routes; they appear as a tab on the parent category page.',
    }),
    defineField({
      name: 'parentCategory',
      title: 'Parent category',
      type: 'reference',
      to: [{ type: 'category' }],
      description:
        'Only set for attachment categories. Points to the carrier category that hosts the Attachments tab.',
      hidden: ({ document }) => !document?.isAttachmentCategory,
    }),
    defineField({
      name: 'hasAttachmentTab',
      title: 'Has attachment tab?',
      type: 'boolean',
      initialValue: false,
      description:
        'Mark true on the carrier category (Robotic Demolition Machines, Excavators) so the front end renders the Attachments tab.',
    }),
    defineField({
      name: 'attachmentCategories',
      title: 'Attachment categories shown in tab',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      description:
        "References to the attachment category documents that appear in this category's Attachments tab.",
      hidden: ({ document }) => !document?.hasAttachmentTab,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'shortDescription', media: 'heroImage' },
  },
})
