import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '../../lib/sanityClient'
import { ALL_CATEGORIES } from '../../lib/queries'
import { Category } from '../../types'
import { DEMO_CATEGORIES, isSanityConfigured } from '../../lib/demoData'

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => {
      if (!isSanityConfigured()) {
        return Promise.resolve(DEMO_CATEGORIES)
      }
      return sanityClient.fetch(ALL_CATEGORIES)
    },
  })
}
