import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '../../lib/sanityClient'
import { ALL_MENU_ITEMS, MENU_ITEMS_BY_CATEGORY, FEATURED_ITEMS } from '../../lib/queries'
import { MenuItem } from '../../types'

export function useMenuItems(categorySlug?: string | null) {
  return useQuery<MenuItem[]>({
    queryKey: ['menuItems', categorySlug],
    queryFn: () => {
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
    queryFn: () => sanityClient.fetch(FEATURED_ITEMS),
  })
}
