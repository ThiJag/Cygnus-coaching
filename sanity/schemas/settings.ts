import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Instellingen',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Bedrijfsnaam',
      type: 'string',
      initialValue: 'Cygnus Coaching BV',
    }),
    defineField({
      name: 'contactName',
      title: 'Contactpersoon',
      type: 'string',
      initialValue: 'Rike Weltjens',
    }),
    defineField({
      name: 'postalCode',
      title: 'Postcode',
      type: 'string',
      initialValue: '3600',
    }),
    defineField({
      name: 'city',
      title: 'Gemeente',
      type: 'string',
      initialValue: 'Genk',
    }),
    defineField({
      name: 'country',
      title: 'Land',
      type: 'string',
      initialValue: 'België',
    }),
    defineField({
      name: 'phone',
      title: 'Telefoon',
      type: 'string',
      initialValue: '+32 496 10 55 73',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
    }),
  ],
})
