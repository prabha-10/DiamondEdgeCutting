import { defineField, defineType } from 'sanity'

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
      name: 'year',
      title: 'Year',
      type: 'number'
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
      type: 'number'
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
      description: 'Show this project in the homepage rotation'
    })
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Year (newest first)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }]
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
