import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { sanityClient, urlFor } from "../lib/sanityClient"
import { SITE_SETTINGS } from "../lib/queries"
import { SiteSettings } from "../types"
import { useFeaturedItems } from "../features/menu/useMenuItems"
import { MenuGrid } from "../components/menu/MenuGrid"
import { Button } from "../components/ui/Button"
import { Spinner } from "../components/ui/Spinner"
import { DEMO_SETTINGS, isSanityConfigured } from "../lib/demoData"
import { Leaf, Clock, Star, MessageCircle, Quote, ChefHat } from "lucide-react"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { LocationsSection } from "../components/locations/LocationsSection"

const HERO_IMAGE  = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop&auto=format"
const ABOUT_IMAGE = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&h=700&fit=crop&auto=format"
const CTA_IMAGE   = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=800&fit=crop&auto=format"

const PERKS = [
  { icon: Leaf,     label: "Farm Fresh",       desc: "Locally sourced ingredients, prepared every single morning" },
  { icon: ChefHat,  label: "Master Chefs",     desc: "Decades of experience in authentic Nigerian cooking" },
  { icon: Clock,    label: "Ready Fast",        desc: "Hot, freshly made meals delivered or ready for dine-in" },
  { icon: Star,     label: "Top Rated",         desc: "4.9★ rated by over 5,000 satisfied customers" },
]

const STATS = [
  { value: "8",   suffix: "+", label: "Years Serving" },
  { value: "50",  suffix: "+", label: "Signature Dishes" },
  { value: "5K",  suffix: "+", label: "Happy Customers" },
  { value: "4.9", suffix: "★", label: "Average Rating" },
]

const TESTIMONIALS = [
  {
    name: "Adaeze O.",
    role: "Regular Customer",
    text: "The Jollof rice here is absolutely unmatched — it takes me straight back to my grandmother's kitchen. The portions are generous and the service is always warm.",
    rating: 5,
  },
  {
    name: "Emeka T.",
    role: "Food Blogger",
    text: "I've tried Nigerian restaurants across Lagos, London, and Houston. This one stands out for its consistency and depth of flavour. The Egusi soup is a must-try.",
    rating: 5,
  },
  {
    name: "Fatima B.",
    role: "Local Resident",
    text: "We order every Friday as a family. The suya platter never disappoints and the WhatsApp ordering is so convenient. Highly recommend!",
    rating: 5,
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

export function HomePage() {
  const { data: fetchedSettings, isLoading: isSettingsLoading } = useQuery<SiteSettings>({
    queryKey: ["siteSettings"],
    queryFn: async () => {
      if (!isSanityConfigured()) return DEMO_SETTINGS
      try {
        const result = await sanityClient.fetch(SITE_SETTINGS)
        return result ?? DEMO_SETTINGS
      } catch { return DEMO_SETTINGS }
    },
  })

  const settings = fetchedSettings ?? DEMO_SETTINGS
  const { data: featuredItems, isLoading: isFeaturedLoading } = useFeaturedItems()

  const heroImageSrc = settings?.heroImage?.asset?._ref
    ? urlFor(settings.heroImage).width(1920).height(1080).url()
    : HERO_IMAGE

  const perksRef     = useScrollReveal()
  const statsRef     = useScrollReveal()
  const featHeadRef  = useScrollReveal()
  const featGridRef  = useScrollReveal()
  const featBtnRef   = useScrollReveal()
  const aboutImgRef  = useScrollReveal()
  const aboutTextRef = useScrollReveal()
  const testHeadRef  = useScrollReveal()
  const testGridRef  = useScrollReveal()
  const ctaRef       = useScrollReveal()

  return (
    <div className="w-full">

      {/* ── Hero ── */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImageSrc} alt="Nigerian cuisine" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-black/40" />
          {/* Warm vignette at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1f13]/80 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in pb-28">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Now Open · Victoria Island, Lagos
          </div>

          {isSettingsLoading ? <Spinner /> : (
            <>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold text-white leading-[1.05] mb-6 drop-shadow-2xl">
                {settings?.heroHeadline || "Authentic Nigerian Cuisine"}
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-xl mx-auto leading-relaxed mb-10 font-light">
                {settings?.heroSubtext || "Experience the rich and vibrant flavors of Nigeria, made fresh daily with love."}
              </p>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/menu">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-10 py-4 rounded-full shadow-2xl shadow-primary/40 text-base">
                Order Now
              </Button>
            </Link>
            {settings?.whatsappNumber && (
              <a href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-4 text-base font-light">
                  WhatsApp Order
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce flex flex-col items-center gap-1">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Perks ── */}
      <section className="bg-[#FFF8EE] border-y border-orange-100">
        <div className="text-center pt-12 px-4">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">Our Promise to You</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">Everything we do is rooted in quality, tradition, and a deep love for Nigerian food culture.</p>
        </div>
        <div
          ref={perksRef}
          className="reveal-stagger container mx-auto max-w-5xl px-4 pb-12 grid grid-cols-2 md:grid-cols-4 gap-0"
        >
          {PERKS.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex flex-col items-center text-center px-6 py-6 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <p className="font-bold text-sm text-gray-800">{label}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-[#1a3828] py-20 px-4">
        <div ref={statsRef} className="reveal-stagger container mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-0 text-center">
          {STATS.map(({ value, suffix, label }) => (
            <div key={label} className="px-8 py-6">
              <p className="font-serif text-5xl md:text-6xl font-bold text-accent leading-none">
                {value}<span className="text-3xl">{suffix}</span>
              </p>
              <p className="text-white/50 text-xs uppercase tracking-widest mt-3 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Menu ── */}
      <section className="py-24 px-4 bg-[#FEFDF9]">
        <div className="container mx-auto max-w-7xl">
          <div ref={featHeadRef} className="reveal text-center mb-16">
            <SectionLabel>Chef's Picks</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-2">
              Signature Dishes
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto mt-4 leading-relaxed">
              Our most-loved dishes, prepared fresh daily with authentic recipes and the finest ingredients.
            </p>
          </div>
          <div ref={featGridRef} className="reveal">
            <MenuGrid items={featuredItems || []} isLoading={isFeaturedLoading} />
          </div>
          <div ref={featBtnRef} className="reveal text-center mt-14">
            <Link to="/menu">
              <Button variant="outline" size="lg" className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white px-12 font-semibold transition-all duration-300">
                Explore Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── About / Story ── */}
      <section className="py-0 overflow-hidden">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 items-stretch">
          <div ref={aboutImgRef} className="reveal-left relative min-h-[480px] md:min-h-[600px]">
            <img src={ABOUT_IMAGE} alt="Our kitchen" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FEFDF9]/20" />
          </div>
          <div ref={aboutTextRef} className="reveal-right bg-[#FFF8EE] flex flex-col justify-center px-10 md:px-16 py-16 space-y-6">
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-snug">
              Bringing the Heart of Nigeria to Your Table
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Founded over eight years ago with a deep love for Nigerian culture and cuisine. Every recipe is rooted in tradition — the kind passed down through generations, from grandmother to mother to chef.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From slow-cooked Egusi soup to smoky suya skewers, each dish tells a story. We believe food is more than nourishment — it is culture, community, and connection.
            </p>
            <div className="pt-2">
              <Link to="/contact">
                <Button className="rounded-full px-8 font-semibold">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-4 bg-[#FEFDF9]">
        <div className="container mx-auto max-w-6xl">
          <div ref={testHeadRef} className="reveal text-center mb-16">
            <SectionLabel>Reviews</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-2">
              What Our Guests Say
            </h2>
          </div>
          <div ref={testGridRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-3xl p-8 shadow-[0_4px_32px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_48px_rgba(0,0,0,0.12)] transition-shadow duration-300 flex flex-col gap-5 border border-gray-50"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <Quote className="w-7 h-7 text-primary/15" />
                <p className="text-gray-600 leading-relaxed text-sm flex-1 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Locations ── */}
      <LocationsSection />

      {/* ── CTA — food photo backdrop ── */}
      <section ref={ctaRef} className="reveal relative overflow-hidden py-32 px-4 text-center text-white">
        <img src={CTA_IMAGE} alt="Order now" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3828]/90 via-[#1a3828]/80 to-black/70" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-7">
          <SectionLabel>
            <span className="text-accent/80">Ready to Order?</span>
          </SectionLabel>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
            Hungry? <span className="text-accent">Let's Fix That.</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed font-light">
            Browse our full menu and place your order in minutes — or reach us directly on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link to="/menu">
              <Button size="lg" className="bg-white text-secondary hover:bg-white/90 font-bold px-12 rounded-full border-0 shadow-xl">
                View Full Menu
              </Button>
            </Link>
            {settings?.whatsappNumber && (
              <a href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-10 font-light">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}
