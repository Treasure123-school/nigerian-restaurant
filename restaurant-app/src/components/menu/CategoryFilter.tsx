import { Category } from "../../types"
import { cn } from "../../lib/utils"

export function CategoryFilter({ 
  categories, 
  activeCategory, 
  onSelect 
}: { 
  categories: Category[], 
  activeCategory: string | null, 
  onSelect: (slug: string | null) => void 
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
          activeCategory === null 
            ? "bg-secondary text-white shadow-md shadow-secondary/20" 
            : "bg-white border text-gray-600 hover:bg-gray-50 hover:text-secondary"
        )}
      >
        All Menu
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onSelect(cat.slug.current)}
          className={cn(
            "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            activeCategory === cat.slug.current
              ? "bg-secondary text-white shadow-md shadow-secondary/20"
              : "bg-white border text-gray-600 hover:bg-gray-50 hover:text-secondary"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
