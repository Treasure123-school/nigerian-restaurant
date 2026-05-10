import { useQuery } from "@tanstack/react-query"
import { sanityClient } from "../lib/sanityClient"
import { SITE_SETTINGS } from "../lib/queries"
import { SiteSettings } from "../types"
import { DEMO_SETTINGS, isSanityConfigured } from "../lib/demoData"
import { MapPin, Clock, MessageCircle, Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "../components/ui/Button"
import { useScrollReveal } from "../hooks/useScrollReveal"

const CONTACT_HEADER_IMAGE = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=600&fit=crop&auto=format"

export function ContactPage() {
  const { data: settings } = useQuery<SiteSettings>({
    queryKey: ["siteSettings"],
    queryFn: async () => {
      if (!isSanityConfigured()) return DEMO_SETTINGS
      try {
        const r = await sanityClient.fetch(SITE_SETTINGS)
        return r ?? DEMO_SETTINGS
      } catch { return DEMO_SETTINGS }
    },
  })

  const s = settings ?? DEMO_SETTINGS
  const headRef   = useScrollReveal()
  const cardsRef  = useScrollReveal()
  const ctaRef    = useScrollReveal()
  const socialRef = useScrollReveal()

  return (
    <div className="w-full bg-white flex flex-col" style={{ minHeight: "calc(100vh - 64px)" }}>

      {/* Header */}
      <div className="relative text-white overflow-hidden" style={{ minHeight: 320 }}>
        <img src={CONTACT_HEADER_IMAGE} alt="Contact us" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3828]/85 via-black/60 to-black/50" />
        <div ref={headRef} className="reveal relative z-10 container mx-auto max-w-4xl px-4 py-24 text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-8 bg-accent/50" />
            <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Get in Touch</span>
            <span className="h-px w-8 bg-accent/50" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-xl">Contact Us</h1>
          <p className="text-white/60 max-w-md mx-auto font-light leading-relaxed">
            Reach out for reservations, orders, or any questions — we respond quickly.
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 py-20 px-4">
        <div className="container mx-auto max-w-3xl space-y-12">

          <div ref={cardsRef} className="reveal grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
            {/* Location */}
            <div className="bg-white p-10">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-4 h-4 text-primary" />
                <h2 className="font-semibold text-gray-900 tracking-wide text-sm uppercase">Location</h2>
              </div>
              <p className="text-gray-500 leading-relaxed mb-8">{s?.address}</p>
              {s?.whatsappNumber && (
                <a href={`https://wa.me/${s.whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
                  <Button className="gap-2 w-full sm:w-auto">
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </Button>
                </a>
              )}
            </div>

            {/* Hours */}
            <div className="bg-white p-10">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-4 h-4 text-primary" />
                <h2 className="font-semibold text-gray-900 tracking-wide text-sm uppercase">Opening Hours</h2>
              </div>
              <p className="text-gray-500 whitespace-pre-wrap leading-relaxed">{s?.openingHours}</p>
            </div>
          </div>

          {/* WhatsApp CTA */}
          {s?.whatsappNumber && (
            <div ref={ctaRef} className="reveal border border-gray-100 rounded-2xl p-10 text-center">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Ready to order?</h2>
              <p className="text-gray-400 mb-8 font-light">The fastest way to reach us is via WhatsApp.</p>
              <a href={`https://wa.me/${s.whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
                <Button size="lg" className="gap-2 px-10">
                  <MessageCircle className="w-4 h-4" />
                  Message Us on WhatsApp
                </Button>
              </a>
            </div>
          )}

          {/* Social */}
          {(s?.socialLinks?.instagram || s?.socialLinks?.facebook || s?.socialLinks?.twitter) && (
            <div ref={socialRef} className="reveal text-center space-y-5">
              <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-semibold">Follow Us</p>
              <div className="flex justify-center gap-3">
                {s.socialLinks?.instagram && (
                  <a href={s.socialLinks.instagram} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors">
                    <Instagram className="w-4 h-4" /> Instagram
                  </a>
                )}
                {s.socialLinks?.facebook && (
                  <a href={s.socialLinks.facebook} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors">
                    <Facebook className="w-4 h-4" /> Facebook
                  </a>
                )}
                {s.socialLinks?.twitter && (
                  <a href={s.socialLinks.twitter} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors">
                    <Twitter className="w-4 h-4" /> Twitter
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
