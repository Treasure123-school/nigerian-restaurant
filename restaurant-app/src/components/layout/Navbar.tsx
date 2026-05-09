import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import { SITE_NAME } from "../../constants"
import { useCartStore } from "../../features/cart/cartStore"

export function Navbar() {
  const { getTotalItems, openDrawer } = useCartStore()
  const totalItems = getTotalItems()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold text-primary">{SITE_NAME}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/menu" className="text-sm font-medium hover:text-primary transition-colors">Menu</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button 
            onClick={openDrawer}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-text" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center bg-primary text-white text-[10px] w-4 h-4 rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
