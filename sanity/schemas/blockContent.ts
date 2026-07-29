// Portable Text body — the project's first rich-text field, used by `post.body`.
//
// Deliberately narrow: h2/h3, the two list types, bold/italic, links, a pull
// quote and an inline image. Everything an editor can pick here has a matching
// renderer in src/components/sections/blog/PostBody.tsx, so nothing added in
// Studio can come out unstyled on the page.
//
// h1 is intentionally absent — the article title is the page's only h1, and a
// second one in the body would flatten the heading outline for search engines.
// h2 is also what the article's table of contents is built from, so keeping the
// list short keeps the TOC meaningful.

import { defineArrayMember, defineField, defineType } from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading', value: 'h2' },
        { title: 'Sub-heading', value: 'h3' },
        { title: 'Quote', value: 'blockquote' }
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' }
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' }
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                description:
                  'Full https:// address, or a path on this site such as /contact.',
                validation: Rule =>
                  Rule.required().uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                    allowRelative: true
                  })
              })
            ]
          })
        ]
      }
    }),
    defineArrayMember({
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            'Describes the image for screen readers and search engines. Required.',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Optional — shown in small type beneath the image.'
        })
      ]
    })
  ]
})
