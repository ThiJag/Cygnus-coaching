import type {StructureResolver} from 'sanity/structure'

const singletonTypes = new Set(['settings'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Instellingen')
        .id('settings')
        .child(S.document().schemaType('settings').documentId('settings')),
      S.divider(),
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId()
        return id ? !singletonTypes.has(id) : true
      }),
    ])
