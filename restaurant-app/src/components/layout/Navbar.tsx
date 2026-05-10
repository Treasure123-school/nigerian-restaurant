import { useState, useEffect } from "react"
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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  // Close on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const links = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <Link to="/" className="flex items-center gap-2">
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
      </header>

      {/* Full-screen mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel — slides in from the top */}
          <div className="relative z-10 flex flex-col h-full bg-white">
            {/* Header row */}
            <div className="flex items-center justify-between px-5 h-16 border-b flex-shrink-0">
              <span className="font-serif text-2xl font-bold text-primary">{SITE_NAME}</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Nav links — start from the top */}
            <div className="flex-1 flex flex-col justify-start px-6 pt-8 gap-3">
              {links.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center px-6 py-5 rounded-2xl text-2xl font-serif font-bold transition-colors",
                    location.pathname === to
                      ? "bg-primary text-white"
                      : "bg-gray-50 text-secondary hover:bg-orange-50 hover:text-primary"
                  )}
                >
                  {label}
                </Link>
              ))}

              <button
                onClick={() => { setMobileOpen(false); openDrawer() }}
                className="flex items-center gap-3 px-6 py-5 rounded-2xl text-2xl font-serif font-bold bg-gray-50 text-secondary hover:bg-orange-50 hover:text-primary transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                Cart
                {totalItems > 0 && (
                  <span className="ml-auto bg-primary text-white text-sm font-bold px-2.5 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Footer branding */}
            <div className="px-6 pb-10 text-center text-xs text-gray-400 flex-shrink-0">
              Authentic Nigerian Cuisine
            </div>
          </div>
        </div>
      )}
    </>
  )
}
