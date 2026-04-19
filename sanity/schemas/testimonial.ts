import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Getuigenis',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'Voornaam',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categorie',
      type: 'string',
      options: {
        list: [
          {title: 'Stress & Burn-out', value: 'burnout'},
          {title: 'Loopbaanbegeleiding', value: 'career'},
          {title: 'Leiderschapscoaching', value: 'leadership'},
          {title: 'Life coaching', value: 'life'},
          {title: 'Algemeen', value: 'general'},
        ],
      },
      initialValue: 'general',
    }),
    defineField({
      name: 'text',
      title: 'Tekst',
      type: 'text',
      rows: 6,
      validation: (r) => r.required().min(20),
    }),
    defineField({
      name: 'role',
      title: 'Rol/titel (optioneel)',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'firstName', subtitle: 'category'},
    prepare({title, subtitle}) {
      return {title, subtitle}
    },
  },
})
