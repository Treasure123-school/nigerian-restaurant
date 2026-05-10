import { useState } from "react"
import { useCategories } from "../features/menu/useCategories"
import { useMenuItems } from "../features/menu/useMenuItems"
import { MenuGrid } from "../components/menu/MenuGrid"
import { CategoryFilter } from "../components/menu/CategoryFilter"
import { useScrollReveal } from "../hooks/useScrollReveal"

const MENU_HEADER_IMAGE = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=600&fit=crop&auto=format"

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { data: categories, isLoading: isCategoriesLoading } = useCategories()
  const { data: menuItems, isLoading: isMenuLoading } = useMenuItems(activeCategory)
  const headRef = useScrollReveal()
  const gridRef = useScrollReveal()

  return (
    <div className="w-full flex flex-col bg-white" style={{ minHeight: "calc(100vh - 64px)" }}>

      {/* Header — image with overlay */}
      <div className="relative text-white py-24 px-4 overflow-hidden">
        <img
          src={MENU_HEADER_IMAGE}
          alt="Our menu"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div ref={headRef} className="reveal relative z-10 container mx-auto max-w-4xl text-center space-y-3">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em]">What We Serve</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">Our Menu</h1>
          <p className="text-white/60 max-w-md mx-auto font-light leading-relaxed">
            Authentic Nigerian dishes, made fresh daily with traditional recipes.
          </p>
        </div>
      </div>

      {/* Sticky category filter */}
      {!isCategoriesLoading && categories && categories.length > 0 && (
        <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
          <div className="container mx-auto max-w-7xl px-4 py-3">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="flex-1">
        <div ref={gridRef} className="reveal container mx-auto px-4 max-w-7xl py-12">
          <MenuGrid items={menuItems || []} isLoading={isMenuLoading} />
        </div>
      </div>
    </div>
  )
}
