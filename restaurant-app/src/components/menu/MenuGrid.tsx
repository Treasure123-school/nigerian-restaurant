import { MenuItem } from "../../types"
import { MenuCard } from "./MenuCard"
import { Spinner } from "../ui/Spinner"

export function MenuGrid({ items, isLoading }: { items: MenuItem[], isLoading: boolean }) {
  if (isLoading) {
    return <Spinner />
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h3 className="text-xl font-bold text-gray-700 mb-2">No Items Found</h3>
        <p className="text-gray-500 max-w-md">We couldn't found any menu items in this category. Please try a different category or check back later.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <MenuCard key={item._id} item={item} />
      ))}
    </div>
  )
}
