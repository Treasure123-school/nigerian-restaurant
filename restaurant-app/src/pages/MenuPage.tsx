import { useState } from "react"
import { useCategories } from "../features/menu/useCategories"
import { useMenuItems } from "../features/menu/useMenuItems"
import { MenuGrid } from "../components/menu/MenuGrid"
import { CategoryFilter } from "../components/menu/CategoryFilter"

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const { data: categories, isLoading: isCategoriesLoading } = useCategories()
  const { data: menuItems, isLoading: isMenuLoading } = useMenuItems(activeCategory)

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-20">
      <div className="bg-gradient-to-br from-secondary to-green-900 text-white py-14 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <span className="inline-block text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            What We Serve
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 text-white">Our Menu</h1>
          <p className="text-gray-300 max-w-xl mx-auto text-base">
            Discover our selection of authentic Nigerian dishes, made fresh daily with traditional recipes.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {!isCategoriesLoading && categories && categories.length > 0 && (
          <div className="bg-white border-b border-gray-100 py-4 -mx-4 px-4 sticky top-16 z-30 shadow-sm">
            <div className="container mx-auto max-w-7xl">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onSelect={setActiveCategory}
              />
            </div>
          </div>
        )}

        <div className="pt-8">
          <MenuGrid items={menuItems || []} isLoading={isMenuLoading} />
        </div>
      </div>
    </div>
  )
}
