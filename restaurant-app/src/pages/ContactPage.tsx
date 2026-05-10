import { useQuery } from "@tanstack/react-query"
import { sanityClient } from "../lib/sanityClient"
import { SITE_SETTINGS } from "../lib/queries"
import { SiteSettings } from "../types"
import { DEMO_SETTINGS, isSanityConfigured } from "../lib/demoData"
import { MapPin, Clock, MessageCircle, Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "../components/ui/Button"
import { useScrollReveal } from "../hooks/useScrollReveal"

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

  const headRef    = useScrollReveal()
  const cardsRef   = useScrollReveal()
  const socialRef  = useScrollReveal()

  return (
    <div className="w-full flex flex-col" style={{ minHeight: "calc(100vh - 64px)" }}>
      {/* Header */}
      <div className="relative text-white py-20 px-4 overflow-hidden bg-secondary">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: "28px 28px" }}
        />
        <div ref={headRef} className="reveal relative z-10 container mx-auto max-w-4xl text-center">
          <span className="inline-block text-accent text-sm font-semibold uppercase tracking-widest mb-3">Get in Touch</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-white">Contact Us</h1>
          <p className="text-gray-300 max-w-xl mx-auto text-base leading-relaxed">
            We'd love to hear from you. Reach out for reservations, orders, or any questions.
          </p>
        </div>
      </div>

      {/* Info cards */}
      <div className="flex-1 bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-10">
          <div ref={cardsRef} className="reveal grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-bold text-lg text-secondary">Our Location</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">{s?.address}</p>
              {s?.whatsappNumber && (
                <a
                  href={`https://wa.me/${s.whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank" rel="noreferrer"
                >
                  <Button className="w-full gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </Button>
                </a>
              )}
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-bold text-lg text-secondary">Opening Hours</h2>
              </div>
              <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{s?.openingHours}</p>
            </div>
          </div>

          {/* WhatsApp CTA banner */}
          {s?.whatsappNumber && (
            <div className="reveal bg-secondary rounded-2xl px-8 py-10 text-center text-white">
              <p className="text-2xl font-serif font-bold mb-2">Ready to order?</p>
              <p className="text-gray-300 mb-6">The fastest way to reach us is via WhatsApp. We respond quickly!</p>
              <a
                href={`https://wa.me/${s.whatsappNumber.replace(/[^0-9]/g, "")}`}
                target="_blank" rel="noreferrer"
              >
                <Button size="lg" className="gap-2 bg-accent hover:bg-accent/90 text-white border-0">
                  <MessageCircle className="w-5 h-5" />
                  Message Us on WhatsApp
                </Button>
              </a>
            </div>
          )}

          {/* Social links */}
          {(s?.socialLinks?.instagram || s?.socialLinks?.facebook || s?.socialLinks?.twitter) && (
            <div ref={socialRef} className="reveal bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <h2 className="font-bold text-lg text-secondary mb-2">Follow Us</h2>
              <p className="text-gray-500 text-sm mb-6">Stay updated with our latest dishes and offers</p>
              <div className="flex justify-center gap-4">
                {s.socialLinks?.instagram && (
                  <a href={s.socialLinks.instagram} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:border-primary hover:text-primary transition-colors">
                    <Instagram className="w-4 h-4" /> Instagram
                  </a>
                )}
                {s.socialLinks?.facebook && (
                  <a href={s.socialLinks.facebook} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:border-primary hover:text-primary transition-colors">
                    <Facebook className="w-4 h-4" /> Facebook
                  </a>
                )}
                {s.socialLinks?.twitter && (
                  <a href={s.socialLinks.twitter} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:border-primary hover:text-primary transition-colors">
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
