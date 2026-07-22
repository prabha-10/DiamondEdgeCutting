import { defineField, defineType } from 'sanity'
import { OrderInput } from '../components/OrderInput'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description: 'e.g. "Chief Executive Officer"',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional. If not provided, the card will fall back to the member\'s initials.'
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 4,
      description: 'Optional. Used in extended profile views.'
    }),
    defineField({
      name: 'years',
      title: 'Years & Specialty',
      type: 'string',
      description: 'e.g. "30+ years · concrete cutting, drilling, demolition"'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description:
        'Lower numbers appear first. Slots 1 and 2 are the featured leadership positions (CEO and Managing Director). Values already used by another member are disabled.',
      options: { slotLabels: { 1: 'CEO', 2: 'Managing Director' } },
      components: { input: OrderInput }
    }),
    defineField({
      name: 'featured',
      title: 'Show on Homepage',
      type: 'boolean',
      initialValue: true
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
      title: 'name',
      subtitle: 'role',
      media: 'image'
    }
  }
})
