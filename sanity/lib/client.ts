import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

export function fetchSanity<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return client.fetch<T>(query, params ?? {}, { cache: 'no-store' })
}
