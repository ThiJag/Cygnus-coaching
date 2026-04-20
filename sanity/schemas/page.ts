import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Pagina',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'content',
      title: 'Inhoud',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'introText',
      title: 'Intro-tekst',
      type: 'text',
      rows: 3,
      description: 'Korte inleiding onder de paginatitel',
    }),
    defineField({
      name: 'processSteps',
      title: 'Processtappen (Aanpak-pagina)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', title: 'Staptitel', type: 'string'},
          {name: 'text', title: 'Beschrijving', type: 'text', rows: 3},
        ],
        preview: {select: {title: 'title'}},
      }],
    }),
    defineField({
      name: 'trajectInfo',
      title: 'Trajectinfo (Aanpak-pagina)',
      type: 'text',
      rows: 2,
      description: 'Bv. "Typisch traject: 6 sessies..."',
    }),
    defineField({
      name: 'icebergText',
      title: 'IJsbergmodel-tekst (Aanpak-pagina)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'credentials',
      title: 'Certificaten & opleidingen (Over mij-pagina)',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'inspirationQuote',
      title: 'Inspiratiecitaat (Over mij-pagina)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'quoteAuthor',
      title: 'Auteur citaat (Over mij-pagina)',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Foto (Over mij-pagina)',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current'},
    prepare({title, slug}) {
      return {title, subtitle: slug ? `/${slug}` : ''}
    },
  },
})
