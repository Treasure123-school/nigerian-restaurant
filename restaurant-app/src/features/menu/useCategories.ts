import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '../../lib/sanityClient'
import { ALL_CATEGORIES } from '../../lib/queries'
import { Category } from '../../types'

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => sanityClient.fetch(ALL_CATEGORIES),
  })
}
