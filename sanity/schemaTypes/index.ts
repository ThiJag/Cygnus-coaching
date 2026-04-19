import {type SchemaTypeDefinition} from 'sanity'

import {page} from '../schemas/page'
import {service} from '../schemas/service'
import {settings} from '../schemas/settings'
import {testimonial} from '../schemas/testimonial'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [page, service, testimonial, settings],
}
