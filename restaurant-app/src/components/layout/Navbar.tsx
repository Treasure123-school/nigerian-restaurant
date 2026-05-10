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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const links = [
    { to: "/",          label: "Home" },
    { to: "/menu",      label: "Menu" },
    { to: "/about",     label: "About" },
    { to: "/services",  label: "Services" },
    { to: "/contact",   label: "Contact" },
  ]

  return (
    <>
      <header className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100"
          : "bg-white/80 backdrop-blur-sm border-b border-gray-100"
      )}>
        <div className="container mx-auto px-5 h-16 flex items-center justify-between max-w-7xl">
          <Link to="/" className="font-serif text-2xl font-bold text-primary tracking-tight">
            {SITE_NAME}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "text-sm font-medium transition-colors relative pb-0.5 group",
                  location.pathname === to
                    ? "text-primary"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                {label}
                <span className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-primary rounded-full transition-all duration-300",
                  location.pathname === to ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={openDrawer}
              className="relative flex items-center gap-2 pl-3 pr-4 py-2 bg-primary hover:bg-primary/90 active:scale-95 rounded-full transition-all duration-200 shadow-sm hover:shadow-md group"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-semibold hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="flex items-center justify-center bg-white text-primary text-[10px] font-bold w-4 h-4 rounded-full ring-1 ring-primary/20">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(o => !o)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay — always mounted for exit animation */}
      <div
        className={cn("fixed inset-0 z-50 md:hidden flex flex-col mobile-backdrop", mobileOpen && "open")}
        style={{ pointerEvents: mobileOpen ? "auto" : "none" }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className={cn("relative z-10 flex flex-col h-full bg-[#FEFDF9] mobile-panel w-full shadow-2xl", mobileOpen && "open")}>
          <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
            <span className="font-serif text-2xl font-bold text-primary">{SITE_NAME}</span>
            <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col justify-start px-5 pt-8 gap-2 flex-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "nav-link-animate flex items-center px-5 py-5 rounded-2xl text-2xl font-serif font-bold transition-all duration-200",
                  location.pathname === to
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "text-gray-800 hover:bg-primary/5 hover:text-primary"
                )}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={() => { setMobileOpen(false); openDrawer() }}
              className="nav-link-animate flex items-center gap-3 px-5 py-5 rounded-2xl text-2xl font-serif font-bold text-gray-800 hover:bg-primary/5 hover:text-primary transition-all duration-200"
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
          <p className="text-center text-xs text-gray-300 pb-10 font-light">Authentic Nigerian Cuisine</p>
        </div>
      </div>
    </>
  )
}
