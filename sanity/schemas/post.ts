// Blog post. Drives three surfaces from one document:
//   1. /blog          — the featured card and the archive grid
//   2. /blog/[slug]    — the full article, table of contents and share row
//   3. BlogPosting JSON-LD — the structured data on the article page
//
// Unlike services/projects there is no checked-in fallback file: an unpublished
// blog renders a designed empty state rather than placeholder articles, because
// invented copy about permits and pricing has no business on a contractor's
// live site. See src/lib/blog.ts.

import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'The article headline. Aim for under 70 characters so it is not truncated in search results.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description:
        'The URL, e.g. /blog/villa-demolition-cost-dubai. Changing it after publishing breaks existing links.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'postCategory' }],
      description: 'Sets the badge colour and which filter pill shows this post.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description:
        'One or two sentences. Used on the card, as the lede under the headline, and as the page description in Google.',
      validation: Rule => Rule.required().max(220)
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description:
        'Cropped to 16:10 on cards and 16:9 on the article — set the hotspot to keep the subject in frame.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'Controls the running order — newest first.',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description:
        'The article itself. Every "Heading" becomes an entry in the table of contents beside the text.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Blog',
      type: 'boolean',
      initialValue: false,
      description:
        'Shows this post in the large card at the top of /blog. If several are switched on, the newest wins.'
    })
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ],
  preview: {
    select: { title: 'title', subtitle: 'category.title', media: 'heroImage' }
  }
})
