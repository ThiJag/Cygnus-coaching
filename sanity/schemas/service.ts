import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Dienst',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naam',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL: /coaching/[slug])',
      type: 'slug',
      options: {
        source: 'name',
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[&]/g, 'en')
            .replace(/[^a-z0-9-]/g, '')
            .slice(0, 96),
      },
      validation: (r) => r.required(),
      description:
        'Voorbeelden: stress-en-burn-out, loopbaanbegeleiding, leiderschapscoaching, life-coaching',
    }),
    defineField({
      name: 'description',
      title: 'Korte beschrijving',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'themes',
      title: "Thema's",
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'result',
      title: 'Inhoud / resultaat',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {title: 'name', slug: 'slug.current'},
    prepare({title, slug}) {
      return {title, subtitle: slug ? `/coaching/${slug}` : ''}
    },
  },
})
