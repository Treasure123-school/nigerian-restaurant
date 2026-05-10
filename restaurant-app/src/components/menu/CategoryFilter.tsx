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
    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200",
          activeCategory === null
            ? "bg-secondary text-white shadow-md shadow-secondary/25 scale-[1.02]"
            : "bg-white border border-gray-200 text-gray-600 hover:border-secondary hover:text-secondary"
        )}
      >
        All Menu
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onSelect(cat.slug.current)}
          className={cn(
            "px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200",
            activeCategory === cat.slug.current
              ? "bg-secondary text-white shadow-md shadow-secondary/25 scale-[1.02]"
              : "bg-white border border-gray-200 text-gray-600 hover:border-secondary hover:text-secondary"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
