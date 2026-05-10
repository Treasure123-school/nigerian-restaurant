import { SITE_NAME } from "../../constants"
import { SiteSettings } from "../../types"
import { Instagram, Facebook, Twitter, MapPin, Clock, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  if (!settings) return null
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 pt-16 pb-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">

          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-3">
              {settings.restaurantName || SITE_NAME}
            </h3>
            <p className="text-white/40 text-sm leading-relaxed mb-6 font-light max-w-xs">
              Authentic Nigerian cuisine, made fresh daily with traditional recipes passed down through generations.
            </p>
            <div className="flex gap-3">
              {settings.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center hover:border-white/40 transition-colors">
                  <Instagram className="w-3.5 h-3.5 text-white/60" />
                </a>
              )}
              {settings.socialLinks?.facebook && (
                <a href={settings.socialLinks.facebook} target="_blank" rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center hover:border-white/40 transition-colors">
                  <Facebook className="w-3.5 h-3.5 text-white/60" />
                </a>
              )}
              {settings.socialLinks?.twitter && (
                <a href={settings.socialLinks.twitter} target="_blank" rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center hover:border-white/40 transition-colors">
                  <Twitter className="w-3.5 h-3.5 text-white/60" />
                </a>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs text-white/40 uppercase tracking-[0.15em] font-semibold mb-5">Info</p>
            <div className="space-y-3.5 text-sm text-white/55">
              <div className="flex gap-3">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
                <span className="font-light leading-relaxed">{settings.address || "Victoria Island, Lagos"}</span>
              </div>
              <div className="flex gap-3">
                <Clock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
                <span className="font-light whitespace-pre-wrap leading-relaxed">
                  {settings.openingHours || "Mon – Fri: 11AM – 10PM\nSat – Sun: 10AM – 11PM"}
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs text-white/40 uppercase tracking-[0.15em] font-semibold mb-5">Quick Links</p>
            <nav className="space-y-2.5">
              {[
                { to: "/", label: "Home" },
                { to: "/menu", label: "Menu" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="block text-sm text-white/55 hover:text-white/90 font-light transition-colors">
                  {label}
                </Link>
              ))}
              {settings.whatsappNumber && (
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white/90 font-light transition-colors mt-3"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-primary" />
                  WhatsApp Order
                </a>
              )}
            </nav>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/25 font-light">
          <span>&copy; {new Date().getFullYear()} {settings.restaurantName || SITE_NAME}. All rights reserved.</span>
          <span>Made with care in Nigeria</span>
        </div>
      </div>
    </footer>
  )
}
