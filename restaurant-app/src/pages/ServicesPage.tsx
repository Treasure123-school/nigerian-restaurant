import { Link } from "react-router-dom"
import { UtensilsCrossed, ShoppingBag, Truck, Users, Cake, MessageCircle } from "lucide-react"
import { Button } from "../components/ui/Button"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { useQuery } from "@tanstack/react-query"
import { sanityClient } from "../lib/sanityClient"
import { SITE_SETTINGS } from "../lib/queries"
import { SiteSettings } from "../types"
import { DEMO_SETTINGS, isSanityConfigured } from "../lib/demoData"

const SERVICES_HEADER_IMAGE = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=600&fit=crop&auto=format"

const SERVICES = [
  {
    icon: UtensilsCrossed,
    title: "Dine-In",
    desc: "Enjoy a warm, welcoming atmosphere right here at our restaurant. Our team is ready to serve you an unforgettable Nigerian dining experience.",
    cta: "Find Us",
    href: "/contact",
  },
  {
    icon: ShoppingBag,
    title: "Takeaway",
    desc: "Order online or via WhatsApp and pick up your freshly prepared meal at your convenience — hot and ready when you arrive.",
    cta: "Order Now",
    href: "/menu",
  },
  {
    icon: Truck,
    title: "Delivery",
    desc: "We bring the flavours of Nigeria straight to your door. Fast, reliable delivery across Victoria Island and surrounding areas.",
    cta: "Order Now",
    href: "/menu",
  },
  {
    icon: Users,
    title: "Group Orders",
    desc: "Feeding a team or a crowd? We handle large orders with ease — perfect for office lunches, family gatherings, and community events.",
    cta: "Contact Us",
    href: "/contact",
  },
  {
    icon: Cake,
    title: "Catering",
    desc: "Let us handle the food at your next event. From intimate celebrations to large corporate functions, our catering service brings authentic Nigerian cuisine to any occasion.",
    cta: "Get a Quote",
    href: "/contact",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Orders",
    desc: "The quickest way to reach us. Chat directly with our team, ask questions, and place your order — all in one simple message.",
    cta: "Chat Now",
    href: "#whatsapp",
    isWhatsApp: true,
  },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <span className="h-px w-8 bg-primary/40 rounded-full" />
      <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">{children}</span>
      <span className="h-px w-8 bg-primary/40 rounded-full" />
    </div>
  )
}

export function ServicesPage() {
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
  const ctaRef     = useScrollReveal()

  return (
    <div className="w-full bg-white flex flex-col" style={{ minHeight: "calc(100vh - 64px)" }}>

      {/* Header */}
      <div className="relative text-white overflow-hidden" style={{ minHeight: 320 }}>
        <img src={SERVICES_HEADER_IMAGE} alt="Our services" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3828]/85 via-black/60 to-black/50" />
        <div ref={headRef} className="reveal relative z-10 container mx-auto max-w-4xl px-4 py-24 text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-8 bg-accent/50" />
            <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">What We Offer</span>
            <span className="h-px w-8 bg-accent/50" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-xl">Our Services</h1>
          <p className="text-white/60 max-w-md mx-auto font-light leading-relaxed">
            From dine-in to doorstep delivery and full event catering — we make authentic Nigerian cuisine accessible your way.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="flex-1 py-20 px-4 bg-[#FEFDF9]">
        <div className="container mx-auto max-w-6xl">
          <div ref={cardsRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ icon: Icon, title, desc, cta, href, isWhatsApp }) => {
              const whatsappHref = s?.whatsappNumber
                ? `https://wa.me/${s.whatsappNumber.replace(/[^0-9]/g, "")}`
                : "#"

              return (
                <div
                  key={title}
                  className="bg-white rounded-3xl p-8 shadow-[0_4px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_48px_rgba(0,0,0,0.11)] transition-all duration-300 border border-gray-50 flex flex-col gap-5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-bold text-gray-900 font-serif">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                  {isWhatsApp ? (
                    <a href={whatsappHref} target="_blank" rel="noreferrer">
                      <Button className="w-full rounded-full gap-2 font-semibold">
                        <MessageCircle className="w-4 h-4" /> {cta}
                      </Button>
                    </a>
                  ) : (
                    <Link to={href}>
                      <Button variant="outline" className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold">
                        {cta}
                      </Button>
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <section ref={ctaRef} className="reveal py-20 px-4 bg-[#FFF8EE] border-t border-orange-100 text-center">
        <div className="container mx-auto max-w-xl space-y-5">
          <SectionLabel>Let's Talk</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Not Sure Which Service Fits?</h2>
          <p className="text-gray-500 leading-relaxed">
            Reach out to us and we'll help you find the best option for your needs — whether it's a quick lunch or a full catering package.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link to="/contact">
              <Button size="lg" className="rounded-full px-10 font-semibold">
                Contact Us
              </Button>
            </Link>
            {s?.whatsappNumber && (
              <a href={`https://wa.me/${s.whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="rounded-full px-10 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold transition-all duration-300 gap-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}
