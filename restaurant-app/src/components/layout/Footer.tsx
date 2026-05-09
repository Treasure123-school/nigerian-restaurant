import { SITE_NAME } from "../../constants"
import { SiteSettings } from "../../types"
import { Instagram, Facebook, Twitter } from "lucide-react"

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  if (!settings) return null
  return (
    <footer className="bg-secondary text-white py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl">
        <div>
          <h3 className="font-serif text-2xl font-bold text-accent mb-4">{settings.restaurantName || SITE_NAME}</h3>
          <p className="text-gray-300 text-sm max-w-sm">{settings.address}</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Opening Hours</h4>
          <p className="text-gray-300 text-sm whitespace-pre-wrap">{settings.openingHours || "Mon - Sun: 9AM - 10PM"}</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Connect With Us</h4>
          <div className="flex gap-4 mb-4">
            {settings.socialLinks?.instagram && (
              <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {settings.socialLinks?.facebook && (
              <a href={settings.socialLinks.facebook} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            )}
            {settings.socialLinks?.twitter && (
              <a href={settings.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            )}
          </div>
          {settings.whatsappNumber && (
            <a 
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`} 
              target="_blank" 
              rel="noreferrer"
              className="inline-block border border-accent text-accent hover:bg-accent hover:text-white transition-colors px-4 py-2 rounded-full text-sm font-medium"
            >
              Order via WhatsApp
            </a>
          )}
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400 max-w-7xl">
        &copy; {new Date().getFullYear()} {settings.restaurantName || SITE_NAME}. All rights reserved.
      </div>
    </footer>
  )
}
