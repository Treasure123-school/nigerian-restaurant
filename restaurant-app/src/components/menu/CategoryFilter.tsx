import { Category } from "../../types"
import { cn } from "../../lib/utils"

export function CategoryFilter({
  categories,
  activeCategory,
  onSelect
}: {
  categories: Category[]
  activeCategory: string | null
  onSelect: (slug: string | null) => void
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border",
          activeCategory === null
            ? "bg-secondary text-white border-secondary"
            : "bg-white border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700"
        )}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onSelect(cat.slug.current)}
          className={cn(
            "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border",
            activeCategory === cat.slug.current
              ? "bg-secondary text-white border-secondary"
              : "bg-white border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
