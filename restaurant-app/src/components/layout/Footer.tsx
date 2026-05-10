import { SITE_NAME } from "../../constants"
import { SiteSettings } from "../../types"
import { Instagram, Facebook, Twitter, MapPin, Clock, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  if (!settings) return null
  return (
    <footer className="bg-[#0f2318] text-white">
      <div className="container mx-auto px-5 pt-16 pb-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/8">

          {/* Brand */}
          <div>
            <h3 className="font-serif text-3xl font-bold text-white mb-3">
              {settings.restaurantName || SITE_NAME}
            </h3>
            <p className="text-white/35 text-sm leading-relaxed mb-7 font-light max-w-xs">
              Authentic Nigerian cuisine, made fresh daily with traditional recipes passed down through generations.
            </p>
            <div className="flex gap-2">
              {settings.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors">
                  <Instagram className="w-4 h-4 text-white/50" />
                </a>
              )}
              {settings.socialLinks?.facebook && (
                <a href={settings.socialLinks.facebook} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors">
                  <Facebook className="w-4 h-4 text-white/50" />
                </a>
              )}
              {settings.socialLinks?.twitter && (
                <a href={settings.socialLinks.twitter} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors">
                  <Twitter className="w-4 h-4 text-white/50" />
                </a>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs text-white/30 uppercase tracking-[0.18em] font-semibold mb-6">Visit Us</p>
            <div className="space-y-4 text-sm text-white/45 font-light">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent/60" />
                <span className="leading-relaxed">{settings.address || "Victoria Island, Lagos"}</span>
              </div>
              <div className="flex gap-3">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent/60" />
                <span className="whitespace-pre-wrap leading-relaxed">
                  {settings.openingHours || "Mon – Fri: 11AM – 10PM\nSat – Sun: 10AM – 11PM"}
                </span>
              </div>
              {settings.whatsappNumber && (
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 text-accent/70 hover:text-accent transition-colors mt-1"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order on WhatsApp
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs text-white/30 uppercase tracking-[0.18em] font-semibold mb-6">Quick Links</p>
            <nav className="space-y-3">
              {[
                { to: "/",        label: "Home" },
                { to: "/menu",    label: "Menu" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="block text-sm text-white/40 hover:text-white/80 font-light transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/20 font-light">
          <span>&copy; {new Date().getFullYear()} {settings.restaurantName || SITE_NAME}. All rights reserved.</span>
          <span>Made with care in Nigeria 🇳🇬</span>
        </div>
      </div>
    </footer>
  )
}
