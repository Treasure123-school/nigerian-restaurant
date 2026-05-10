import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'zrej33jn'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01'

const isDev = import.meta.env.DEV

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !isDev,
  ...(isDev && {
    apiHost: `${window.location.origin}/sanity-api`,
  }),
})

const builder = createImageUrlBuilder({ projectId, dataset })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => builder.image(source)
