import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ShoppingCart, Menu, X } from "lucide-react"
import { SITE_NAME } from "../../constants"
import { useCartStore } from "../../features/cart/cartStore"
import { cn } from "../../lib/utils"

export function Navbar() {
  const { getTotalItems, openDrawer } = useCartStore()
  const totalItems = getTotalItems()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <span className="font-serif text-2xl font-bold text-primary tracking-tight">{SITE_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "text-sm font-medium transition-colors relative pb-0.5",
                location.pathname === to
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
                  : "text-gray-600 hover:text-primary"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openDrawer}
            className="relative p-2.5 hover:bg-orange-50 rounded-full transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5 text-text" />
            {totalItems > 0 && (
              <span className="absolute top-0.5 right-0.5 flex items-center justify-center bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>

          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 flex flex-col gap-1 animate-fade-in">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                location.pathname === to
                  ? "bg-orange-50 text-primary"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
