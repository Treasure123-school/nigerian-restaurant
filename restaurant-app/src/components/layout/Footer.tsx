import { SITE_NAME } from "../../constants"
import { SiteSettings } from "../../types"
import { Instagram, Facebook, Twitter, MapPin, Clock, MessageCircle } from "lucide-react"

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  if (!settings) return null
  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="container mx-auto px-4 pt-14 pb-8 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl">
        <div>
          <h3 className="font-serif text-2xl font-bold text-accent mb-3">
            {settings.restaurantName || SITE_NAME}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
            Authentic Nigerian cuisine, made fresh daily with traditional recipes passed down through generations.
          </p>
          <div className="flex gap-3 mt-5">
            {settings.socialLinks?.instagram && (
              <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {settings.socialLinks?.facebook && (
              <a href={settings.socialLinks.facebook} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {settings.socialLinks?.twitter && (
              <a href={settings.socialLinks.twitter} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-base mb-4 text-white/90">Our Location</h4>
          <div className="flex gap-3 text-gray-300 text-sm leading-relaxed">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
            <span>{settings.address || "12 Adeola Odeku Street, Victoria Island, Lagos"}</span>
          </div>
          {settings.whatsappNumber && (
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 mt-5 bg-accent/20 hover:bg-accent text-white border border-accent/40 hover:border-accent transition-colors px-4 py-2 rounded-full text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              Order via WhatsApp
            </a>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-base mb-4 text-white/90">Opening Hours</h4>
          <div className="flex gap-3 text-gray-300 text-sm leading-relaxed">
            <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
            <span className="whitespace-pre-wrap">
              {settings.openingHours || "Monday – Friday: 11AM – 10PM\nSaturday – Sunday: 10AM – 11PM"}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-gray-400 px-4">
        &copy; {new Date().getFullYear()} {settings.restaurantName || SITE_NAME}. All rights reserved.
        <span className="mx-2">·</span>
        Made with ❤️ in Nigeria
      </div>
    </footer>
  )
}
