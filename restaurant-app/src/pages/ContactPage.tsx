import { useQuery } from "@tanstack/react-query"
import { sanityClient } from "../lib/sanityClient"
import { SITE_SETTINGS } from "../lib/queries"
import { SiteSettings } from "../types"
import { DEMO_SETTINGS, isSanityConfigured } from "../lib/demoData"
import {
  MapPin, Clock, MessageCircle, Instagram, Facebook, Twitter,
  Phone, Mail, Navigation, ChevronRight,
} from "lucide-react"
import { Button } from "../components/ui/Button"
import { useScrollReveal } from "../hooks/useScrollReveal"

const CONTACT_HEADER_IMAGE =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=600&fit=crop&auto=format"

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

  const raw = settings ?? DEMO_SETTINGS

  const s = {
    restaurantName: raw?.restaurantName || DEMO_SETTINGS.restaurantName,
    address:        raw?.address        || DEMO_SETTINGS.address,
    openingHours:   raw?.openingHours   || DEMO_SETTINGS.openingHours,
    whatsappNumber: raw?.whatsappNumber || DEMO_SETTINGS.whatsappNumber,
    phoneNumber:    raw?.phoneNumber    || DEMO_SETTINGS.phoneNumber || raw?.whatsappNumber || DEMO_SETTINGS.whatsappNumber,
    email:          raw?.email          || DEMO_SETTINGS.email,
    socialLinks:    raw?.socialLinks    || {},
  }

  const headRef    = useScrollReveal()
  const infoRef    = useScrollReveal()
  const ctaRef     = useScrollReveal()
  const moreRef    = useScrollReveal()
  const socialRef  = useScrollReveal()

  const waLink = `https://wa.me/${s.whatsappNumber.replace(/[^0-9]/g, "")}`

  return (
    <div className="w-full bg-[#FEFDF9]">

      {/* ── Hero ── */}
      <div className="relative text-white overflow-hidden" style={{ minHeight: 340 }}>
        <img
          src={CONTACT_HEADER_IMAGE}
          alt="Contact us"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3828]/90 via-black/65 to-black/55" />
        <div ref={headRef} className="reveal relative z-10 container mx-auto max-w-4xl px-4 py-28 text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-8 bg-accent/50" />
            <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Get in Touch</span>
            <span className="h-px w-8 bg-accent/50" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-xl">Contact Us</h1>
          <p className="text-white/65 max-w-md mx-auto font-light leading-relaxed">
            Reach out for reservations, orders, or any questions — we respond quickly.
          </p>
        </div>
      </div>

      {/* ── Info cards ── */}
      <div className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">

          <div ref={infoRef} className="reveal grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

            {/* Location */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 mb-1">Our Location</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{s.address}</p>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(s.address)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline"
              >
                <Navigation className="w-3.5 h-3.5" />
                Get directions
              </a>
            </div>

            {/* Opening hours */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 mb-1">Opening Hours</h2>
                <p className="text-gray-500 text-sm whitespace-pre-wrap leading-relaxed">{s.openingHours}</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 mb-1">WhatsApp</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  The fastest way to place an order or ask a question — we're available during opening hours.
                </p>
              </div>
              <a href={waLink} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-green-600 text-sm font-medium hover:underline">
                <ChevronRight className="w-3.5 h-3.5" />
                Open WhatsApp chat
              </a>
            </div>

            {/* Phone / Email */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="font-bold text-gray-900 mb-1">Phone</h2>
                  <a
                    href={`tel:${s.phoneNumber}`}
                    className="text-gray-500 text-sm hover:text-primary transition-colors"
                  >
                    {s.phoneNumber}
                  </a>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    <h2 className="font-bold text-gray-900">Email</h2>
                  </div>
                  <a
                    href={`mailto:${s.email}`}
                    className="text-gray-500 text-sm hover:text-primary transition-colors"
                  >
                    {s.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── WhatsApp CTA banner ── */}
          <div ref={ctaRef} className="reveal bg-[#1a3828] rounded-2xl p-10 text-center text-white space-y-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold">Ready to order?</h2>
            <p className="text-white/60 font-light max-w-sm mx-auto">
              Skip the wait — place your order directly on WhatsApp and we'll confirm it in minutes.
            </p>
            <a href={waLink} target="_blank" rel="noreferrer">
              <Button
                size="lg"
                className="gap-2 px-10 mt-2 bg-accent hover:bg-accent/90 text-white border-0"
              >
                <MessageCircle className="w-4 h-4" />
                Message Us on WhatsApp
              </Button>
            </a>
          </div>

          {/* ── More ways to reach us ── */}
          <div ref={moreRef} className="reveal grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center space-y-2">
              <div className="text-2xl">🍽️</div>
              <h3 className="font-bold text-gray-900 text-sm">Dine In</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Walk in or call ahead to reserve your table. No booking fee.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center space-y-2">
              <div className="text-2xl">🛵</div>
              <h3 className="font-bold text-gray-900 text-sm">Delivery</h3>
              <p className="text-gray-400 text-xs leading-relaxed">We deliver within our area. Order online or via WhatsApp.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center space-y-2">
              <div className="text-2xl">📦</div>
              <h3 className="font-bold text-gray-900 text-sm">Takeaway</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Call or WhatsApp ahead and pick up your order when it's ready.</p>
            </div>
          </div>

          {/* ── Social ── */}
          {Object.values(s.socialLinks || {}).some(Boolean) && (
            <div ref={socialRef} className="reveal text-center space-y-5">
              <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-semibold">Follow Us</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { key: "instagram", label: "Instagram", icon: <Instagram className="w-4 h-4" /> },
                  { key: "facebook",  label: "Facebook",  icon: <Facebook  className="w-4 h-4" /> },
                  { key: "twitter",   label: "Twitter",   icon: <Twitter   className="w-4 h-4" /> },
                ].map(({ key, label, icon }) => {
                  const href = s.socialLinks?.[key as keyof typeof s.socialLinks]
                  if (!href) return null
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors"
                    >
                      {icon} {label}
                    </a>
                  )
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
