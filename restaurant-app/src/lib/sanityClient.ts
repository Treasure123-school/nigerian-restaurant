import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'placeholder'

export const sanityClient = createClient({
  projectId,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source: SanityImageSource) => builder.image(source)
