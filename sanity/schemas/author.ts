// Blog author. Referenced by every `post` and rendered twice on the article
// page: as a small byline beside the date, and as a bio panel at the foot of
// the piece. Google's article guidance leans on a named, credentialed author,
// so this is a document type rather than a free-text string — one edit to the
// bio updates every article the person has written.

import { defineField, defineType } from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Blog Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      description: 'Used internally. There is no author archive page.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. Operations Director, Diamond Edge Cutting',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description:
        'Square crop — set the hotspot on the face. Optional; the byline falls back to initials.'
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 4,
      description:
        'One or two sentences of relevant experience. Shown at the foot of every article by this author.',
      validation: Rule => Rule.max(400)
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Optional — adds a LinkedIn link to the bio panel.'
    })
  ],
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }]
    }
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' }
  }
})
