import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '../../lib/sanityClient'
import { ALL_CATEGORIES } from '../../lib/queries'
import { Category } from '../../types'
import { DEMO_CATEGORIES, isSanityConfigured } from '../../lib/demoData'

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      if (!isSanityConfigured()) {
        return DEMO_CATEGORIES
      }
      try {
        const results: Category[] = await sanityClient.fetch(ALL_CATEGORIES)
        // Fallback to demo categories if CMS has no content yet
        if (!results || results.length === 0) {
          return DEMO_CATEGORIES
        }
        return results
      } catch {
        // CORS, network or auth error — use demo data
        return DEMO_CATEGORIES
      }
    },
  })
}
