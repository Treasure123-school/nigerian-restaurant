import { SITE_NAME } from "../../constants"
import { SiteSettings } from "../../types"
import { Instagram, Facebook, Twitter, Youtube, MapPin, Clock } from "lucide-react"
import { Link } from "react-router-dom"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  )
}

const SOCIAL_LINKS = [
  { key: "instagram", label: "Instagram", Icon: Instagram,   href: "#" },
  { key: "facebook",  label: "Facebook",  Icon: Facebook,    href: "#" },
  { key: "tiktok",    label: "TikTok",    Icon: TikTokIcon,  href: "#" },
  { key: "youtube",   label: "YouTube",   Icon: Youtube,     href: "#" },
  { key: "twitter",   label: "Twitter",   Icon: Twitter,     href: "#" },
]

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  if (!settings) return null

  const socialHrefs: Record<string, string> = {
    instagram: settings.socialLinks?.instagram || "#",
    facebook:  settings.socialLinks?.facebook  || "#",
    twitter:   settings.socialLinks?.twitter   || "#",
    tiktok:    "#",
    youtube:   "#",
  }

  return (
    <footer className="bg-[#0f2318] text-white">
      <div className="container mx-auto px-6 pt-16 pb-8 max-w-6xl">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-10 border-b border-white/[0.07]">

          {/* ── Brand ── */}
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="font-serif text-3xl font-bold text-white leading-tight">
                {settings.restaurantName || SITE_NAME}
              </h3>
              <p className="text-white/35 text-sm leading-relaxed mt-3 font-light max-w-[260px]">
                Authentic Nigerian cuisine, made fresh daily with traditional recipes passed down through generations.
              </p>
            </div>

            {/* Social icons */}
            <div>
              <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-semibold mb-3">Follow Us</p>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map(({ key, label, Icon, href }) => (
                  <a
                    key={key}
                    href={socialHrefs[key] || href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-xl bg-white/[0.07] flex items-center justify-center hover:bg-white/[0.14] hover:text-white text-white/45 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Visit Us ── */}
          <div>
            <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-semibold mb-6">Visit Us</p>
            <div className="space-y-5 text-sm text-white/45 font-light">
              <div className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent/50" />
                <span className="leading-relaxed">{settings.address || "Victoria Island, Lagos"}</span>
              </div>
              <div className="flex gap-3 items-start">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent/50" />
                <span className="whitespace-pre-wrap leading-relaxed">
                  {settings.openingHours || "Mon – Fri: 11AM – 10PM\nSat – Sun: 10AM – 11PM"}
                </span>
              </div>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-semibold mb-6">Quick Links</p>
            <nav className="flex flex-col gap-3">
              {[
                { to: "/",        label: "Home" },
                { to: "/menu",    label: "Menu" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm text-white/40 hover:text-white/80 font-light transition-colors w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/20 font-light">
          <span>&copy; {new Date().getFullYear()} {settings.restaurantName || SITE_NAME}. All rights reserved.</span>
          <span>Made with care in Nigeria 🇳🇬</span>
        </div>

      </div>
    </footer>
  )
}
