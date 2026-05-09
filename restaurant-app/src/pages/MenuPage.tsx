import { useState } from "react"
import { useCategories } from "../../features/menu/useCategories"
import { useMenuItems } from "../../features/menu/useMenuItems"
import { MenuGrid } from "../../components/menu/MenuGrid"
import { CategoryFilter } from "../../components/menu/CategoryFilter"

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  
  const { data: categories, isLoading: isCategoriesLoading } = useCategories()
  const { data: menuItems, isLoading: isMenuLoading } = useMenuItems(activeCategory)

  return (
    <div className="w-full bg-gray-50 min-h-screen pt-8 pb-20">
      {/* Menu Header */}
      <div className="bg-secondary text-white py-12 px-4 mb-8">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-serif font-bold mb-4 text-accent">Our Menu</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Discover our selection of authentic Nigerian dishes, made fresh daily with traditional recipes.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl space-y-8">
        {!isCategoriesLoading && categories && (
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            onSelect={setActiveCategory} 
          />
        )}

        <MenuGrid items={menuItems || []} isLoading={isMenuLoading} />
      </div>
    </div>
  )
}
