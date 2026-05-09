import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '../../lib/sanityClient'
import { ALL_MENU_ITEMS, MENU_ITEMS_BY_CATEGORY, FEATURED_ITEMS } from '../../lib/queries'
import { MenuItem } from '../../types'
import { DEMO_MENU_ITEMS, isSanityConfigured } from '../../lib/demoData'

export function useMenuItems(categorySlug?: string | null) {
  return useQuery<MenuItem[]>({
    queryKey: ['menuItems', categorySlug],
    queryFn: () => {
      if (!isSanityConfigured()) {
        if (categorySlug) {
          return Promise.resolve(DEMO_MENU_ITEMS.filter(i => i.category.slug.current === categorySlug))
        }
        return Promise.resolve(DEMO_MENU_ITEMS)
      }
      if (categorySlug) {
        return sanityClient.fetch(MENU_ITEMS_BY_CATEGORY, { categorySlug })
      }
      return sanityClient.fetch(ALL_MENU_ITEMS)
    },
  })
}

export function useFeaturedItems() {
  return useQuery<MenuItem[]>({
    queryKey: ['featuredItems'],
    queryFn: () => {
      if (!isSanityConfigured()) {
        return Promise.resolve(DEMO_MENU_ITEMS.filter(i => i.isFeatured))
      }
      return sanityClient.fetch(FEATURED_ITEMS)
    },
  })
}
