import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '../../lib/sanityClient'
import { ALL_MENU_ITEMS, MENU_ITEMS_BY_CATEGORY, FEATURED_ITEMS } from '../../lib/queries'
import { MenuItem } from '../../types'
import { DEMO_MENU_ITEMS, isSanityConfigured } from '../../lib/demoData'

export function useMenuItems(categorySlug?: string | null) {
  return useQuery<MenuItem[]>({
    queryKey: ['menuItems', categorySlug],
    queryFn: async () => {
      if (!isSanityConfigured()) {
        if (categorySlug) {
          return DEMO_MENU_ITEMS.filter(i => i.category.slug.current === categorySlug)
        }
        return DEMO_MENU_ITEMS
      }
      try {
        let results: MenuItem[]
        if (categorySlug) {
          results = await sanityClient.fetch(MENU_ITEMS_BY_CATEGORY, { categorySlug })
        } else {
          results = await sanityClient.fetch(ALL_MENU_ITEMS)
        }
        // Fallback to demo data if CMS has no content yet
        if (!results || results.length === 0) {
          if (categorySlug) {
            return DEMO_MENU_ITEMS.filter(i => i.category.slug.current === categorySlug)
          }
          return DEMO_MENU_ITEMS
        }
        return results
      } catch {
        // CORS, network or auth error — use demo data
        if (categorySlug) {
          return DEMO_MENU_ITEMS.filter(i => i.category.slug.current === categorySlug)
        }
        return DEMO_MENU_ITEMS
      }
    },
  })
}

export function useFeaturedItems() {
  return useQuery<MenuItem[]>({
    queryKey: ['featuredItems'],
    queryFn: async () => {
      if (!isSanityConfigured()) {
        return DEMO_MENU_ITEMS.filter(i => i.isFeatured)
      }
      try {
        const results: MenuItem[] = await sanityClient.fetch(FEATURED_ITEMS)
        // Fallback to demo featured items if CMS has no content yet
        if (!results || results.length === 0) {
          return DEMO_MENU_ITEMS.filter(i => i.isFeatured)
        }
        return results
      } catch {
        // CORS, network or auth error — use demo data
        return DEMO_MENU_ITEMS.filter(i => i.isFeatured)
      }
    },
  })
}
