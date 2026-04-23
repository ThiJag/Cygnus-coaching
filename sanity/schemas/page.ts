import {defineField, defineType} from 'sanity'

const isSlug = (slug: string) => ({document}: any) => document?.slug?.current !== slug

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
      name: 'introText',
      title: 'Intro-tekst',
      type: 'text',
      rows: 3,
      description: 'Korte inleiding onder de paginatitel',
    }),
    defineField({
      name: 'content',
      title: 'Inhoud',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Rijke tekst — verschijnt in het hoofdgedeelte van de pagina',
    }),
    defineField({
      name: 'processSteps',
      title: 'Processtappen',
      type: 'array',
      hidden: isSlug('aanpak'),
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
      title: 'Trajectinfo',
      type: 'text',
      rows: 2,
      hidden: isSlug('aanpak'),
      description: 'Bv. "Typisch traject: 6 sessies. Voor een passend voorstel: neem contact op."',
    }),
    defineField({
      name: 'icebergText',
      title: 'IJsbergmodel-tekst',
      type: 'text',
      rows: 3,
      hidden: isSlug('aanpak'),
    }),
    defineField({
      name: 'credentials',
      title: 'Certificaten & opleidingen',
      type: 'array',
      hidden: isSlug('over-mij'),
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'inspirationQuote',
      title: 'Inspiratiecitaat',
      type: 'text',
      rows: 3,
      hidden: isSlug('over-mij'),
    }),
    defineField({
      name: 'quoteAuthor',
      title: 'Auteur citaat',
      type: 'string',
      hidden: isSlug('over-mij'),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      hidden: ({document}: any) =>
        !['over-mij', 'aanpak', 'getuigenissen'].includes(document?.slug?.current),
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
