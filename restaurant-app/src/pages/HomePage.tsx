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
import { Leaf, Clock, Star, MessageCircle, Quote } from "lucide-react"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { LocationsSection } from "../components/locations/LocationsSection"

const HERO_IMAGE  = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop&auto=format"
const ABOUT_IMAGE = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&h=700&fit=crop&auto=format"

const PERKS = [
  { icon: Leaf,  label: "Fresh Daily",     desc: "Prepared each morning with locally sourced ingredients" },
  { icon: Star,  label: "Authentic Taste", desc: "Traditional recipes passed down through generations" },
  { icon: Clock, label: "Fast Service",    desc: "Hot food ready quickly, dine in or order online" },
]

const STATS = [
  { value: "8+",   label: "Years of Experience" },
  { value: "50+",  label: "Dishes on the Menu" },
  { value: "5K+",  label: "Happy Customers" },
  { value: "4.9",  label: "Average Rating" },
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
    text: "We order every Friday as a family. The suya platter never disappoints and the WhatsApp ordering is so convenient. Highly recommend to everyone!",
    rating: 5,
  },
]

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

  const perksRef      = useScrollReveal()
  const statsRef      = useScrollReveal()
  const featHeadRef   = useScrollReveal()
  const featGridRef   = useScrollReveal()
  const featBtnRef    = useScrollReveal()
  const aboutImgRef   = useScrollReveal()
  const aboutTextRef  = useScrollReveal()
  const testimHeadRef = useScrollReveal()
  const testimGridRef = useScrollReveal()
  const ctaRef        = useScrollReveal()

  return (
    <div className="w-full bg-white">

      {/* ── Hero ── */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroImageSrc} alt="Nigerian cuisine" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto space-y-6 animate-fade-in">
          <p className="text-accent/90 text-sm font-semibold uppercase tracking-[0.2em]">
            Authentic Nigerian Cuisine
          </p>
          {isSettingsLoading ? <Spinner /> : (
            <>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">
                {settings?.heroHeadline || "Authentic Nigerian Cuisine"}
              </h1>
              <p className="text-lg text-white/75 max-w-lg mx-auto leading-relaxed font-light">
                {settings?.heroSubtext || "Experience the rich and vibrant flavors of Nigeria, delivered straight to your door."}
              </p>
            </>
          )}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/menu">
              <Button size="lg" className="font-semibold px-10 shadow-lg">
                Order Now
              </Button>
            </Link>
            {settings?.whatsappNumber && (
              <a href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:border-white/70 px-8 font-light">
                  WhatsApp Order
                </Button>
              </a>
            )}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs z-10 animate-bounce">
          <span className="tracking-widest uppercase text-[10px]">scroll</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* ── Perks ── */}
      <section className="border-b border-gray-100">
        <div
          ref={perksRef}
          className="reveal-stagger container mx-auto max-w-4xl px-4 py-12 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100"
        >
          {PERKS.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-4 py-6 sm:py-0 sm:px-8 first:pl-0 last:pr-0">
              <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-gray-900">{label}</p>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 border-b border-gray-100">
        <div
          ref={statsRef}
          className="reveal-stagger container mx-auto max-w-3xl px-4 grid grid-cols-2 md:grid-cols-4 gap-0 text-center divide-x divide-gray-100"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="px-6 py-4">
              <p className="text-4xl md:text-5xl font-serif font-bold text-gray-900">{value}<span className="text-primary text-2xl">+</span></p>
              <p className="text-xs text-gray-400 mt-2 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Menu ── */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div ref={featHeadRef} className="reveal text-center mb-14">
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Our Specialties</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Chef's Recommendations</h2>
            <div className="w-12 h-0.5 bg-primary mx-auto mt-5" />
          </div>
          <div ref={featGridRef} className="reveal">
            <MenuGrid items={featuredItems || []} isLoading={isFeaturedLoading} />
          </div>
          <div ref={featBtnRef} className="reveal text-center mt-14">
            <Link to="/menu">
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:border-primary hover:text-primary px-10">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── About / Story ── */}
      <section className="py-24 px-4 border-t border-gray-100">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div ref={aboutImgRef} className="reveal-left rounded-2xl overflow-hidden aspect-[4/3] shadow-sm">
            <img src={ABOUT_IMAGE} alt="Our kitchen" className="w-full h-full object-cover" />
          </div>
          <div ref={aboutTextRef} className="reveal-right space-y-6">
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-snug">
              Bringing the Heart of Nigeria to Your Table
            </h2>
            <div className="w-10 h-0.5 bg-primary" />
            <p className="text-gray-500 leading-relaxed">
              Founded over eight years ago, our restaurant was born from a simple passion — to share the bold, comforting flavours of authentic Nigerian cooking with the world. Every recipe is rooted in tradition, prepared with the freshest locally sourced ingredients.
            </p>
            <p className="text-gray-500 leading-relaxed">
              From our slow-cooked Egusi soup to our smoky suya skewers, every dish is crafted with love and care. We believe food is more than sustenance — it's culture, community, and connection.
            </p>
            <Link to="/contact">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:border-primary hover:text-primary mt-2">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-4 border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div ref={testimHeadRef} className="reveal text-center mb-14">
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">What People Say</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Customer Reviews</h2>
            <div className="w-12 h-0.5 bg-primary mx-auto mt-5" />
          </div>
          <div ref={testimGridRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="flex flex-col gap-5 border-l-2 border-primary pl-6 py-1">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-gray-200 -mb-2" />
                <p className="text-gray-600 leading-relaxed text-sm flex-1 italic">{t.text}</p>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Locations ── */}
      <div className="border-t border-gray-100">
        <LocationsSection />
      </div>

      {/* ── CTA ── */}
      <section
        ref={ctaRef}
        className="reveal relative overflow-hidden bg-secondary py-24 px-4 text-center text-white"
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: "32px 32px" }}
        />
        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em]">Ready to Order?</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight">Hungry? Let's Fix That.</h2>
          <p className="text-white/60 leading-relaxed font-light">
            Browse our full menu and place your order in minutes — or reach us directly on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link to="/menu">
              <Button size="lg" className="bg-white text-secondary hover:bg-gray-100 font-semibold px-10 border-0 shadow-none">
                View Full Menu
              </Button>
            </Link>
            {settings?.whatsappNumber && (
              <a href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/60 px-8 font-light">
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
