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
import { Leaf, Clock, Star, MapPin, MessageCircle, Quote } from "lucide-react"
import { useScrollReveal } from "../hooks/useScrollReveal"

const HERO_IMAGE   = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop&auto=format"
const ABOUT_IMAGE  = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&h=700&fit=crop&auto=format"

const PERKS = [
  { icon: Leaf,  label: "Fresh Daily",     desc: "Every dish prepared fresh with quality ingredients" },
  { icon: Star,  label: "Authentic Taste", desc: "Traditional Nigerian recipes passed down for generations" },
  { icon: Clock, label: "Fast Service",    desc: "Hot meals ready quickly — dine in or order online" },
]

const STATS = [
  { value: "8+",   label: "Years of Experience" },
  { value: "50+",  label: "Dishes on the Menu" },
  { value: "5K+",  label: "Happy Customers" },
  { value: "4.9★", label: "Average Rating" },
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

  // Scroll reveal refs
  const perksRef       = useScrollReveal()
  const statsRef       = useScrollReveal()
  const featHeadRef    = useScrollReveal()
  const featGridRef    = useScrollReveal()
  const featBtnRef     = useScrollReveal()
  const aboutImgRef    = useScrollReveal()
  const aboutTextRef   = useScrollReveal()
  const testimHeadRef  = useScrollReveal()
  const testimGridRef  = useScrollReveal()
  const visitHeadRef   = useScrollReveal()
  const locationRef    = useScrollReveal()
  const hoursRef       = useScrollReveal()
  const ctaRef         = useScrollReveal()

  return (
    <div className="w-full">

      {/* ── Hero ── */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src={heroImageSrc} alt="Nigerian cuisine" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/75" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto space-y-6 animate-fade-in">
          <span className="inline-block bg-accent/25 border border-accent/50 text-accent text-sm font-semibold px-5 py-1.5 rounded-full tracking-wide">
            🍛 Authentic Nigerian Cuisine
          </span>
          {isSettingsLoading ? <Spinner /> : (
            <>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight drop-shadow-lg">
                {settings?.heroHeadline || "Authentic Nigerian Cuisine"}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto leading-relaxed drop-shadow">
                {settings?.heroSubtext || "Experience the rich and vibrant flavors of Nigeria, delivered straight to your door."}
              </p>
            </>
          )}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link to="/menu">
              <Button size="lg" className="font-bold px-10 shadow-xl shadow-primary/40 hover:scale-105 transition-transform">
                Order Now
              </Button>
            </Link>
            {settings?.whatsappNumber && (
              <a href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/15 hover:border-white backdrop-blur-sm px-8">
                  WhatsApp Order
                </Button>
              </a>
            )}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 text-xs z-10 animate-bounce">
          <span>scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* ── Perks bar ── */}
      <section className="bg-white border-b border-gray-100">
        <div ref={perksRef} className="reveal-stagger container mx-auto max-w-5xl px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {PERKS.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-text">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-secondary py-14 px-4">
        <div ref={statsRef} className="reveal-stagger container mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="text-4xl md:text-5xl font-serif font-bold text-accent">{value}</p>
              <p className="text-gray-300 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Items ── */}
      <section className="py-20 px-4 container mx-auto max-w-7xl">
        <div ref={featHeadRef} className="reveal text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Specialties</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text mt-2 mb-3">Chef's Recommendations</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Our most popular and highly-rated dishes, carefully prepared to give you a taste of home.
          </p>
        </div>
        <div ref={featGridRef} className="reveal">
          <MenuGrid items={featuredItems || []} isLoading={isFeaturedLoading} />
        </div>
        <div ref={featBtnRef} className="reveal text-center mt-12">
          <Link to="/menu">
            <Button variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-white">
              View Full Menu
            </Button>
          </Link>
        </div>
      </section>

      {/* ── About / Story ── */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div ref={aboutImgRef} className="reveal-left rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
            <img src={ABOUT_IMAGE} alt="Our kitchen" className="w-full h-full object-cover" />
          </div>
          <div ref={aboutTextRef} className="reveal-right space-y-5">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary leading-snug">
              Bringing the Heart of Nigeria to Your Table
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Founded over eight years ago, our restaurant was born from a simple passion — to share the bold, comforting flavours of authentic Nigerian cooking with the world. Every recipe is rooted in tradition, passed down through generations and prepared with the freshest, locally sourced ingredients.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From our slow-cooked Egusi soup to our smoky suya skewers, every dish is crafted with love and care. We believe food is more than sustenance — it's culture, community, and connection.
            </p>
            <Link to="/contact">
              <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white mt-2">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div ref={testimHeadRef} className="reveal text-center mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">What People Say</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text mt-2 mb-3">Customer Reviews</h2>
            <p className="text-gray-500 max-w-md mx-auto">Real words from our happy customers who keep coming back for more.</p>
          </div>

          <div ref={testimGridRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-gray-50 border border-gray-100 rounded-2xl p-7 flex flex-col gap-4 hover:shadow-md transition-shadow">
                <Quote className="w-8 h-8 text-primary/25 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed text-sm flex-1">"{t.text}"</p>
                <div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="font-bold text-sm text-secondary">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visit Us ── */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto max-w-5xl">
          <div ref={visitHeadRef} className="reveal text-center mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Find Us</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text mt-2">Visit Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div ref={locationRef} className="reveal-left bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-secondary">Our Location</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">{settings?.address}</p>
              {settings?.whatsappNumber && (
                <a href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
                  <Button variant="primary" className="w-full gap-2">
                    <MessageCircle className="w-4 h-4" /> Order via WhatsApp
                  </Button>
                </a>
              )}
            </div>
            <div ref={hoursRef} className="reveal-right bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-secondary">Opening Hours</h3>
              </div>
              <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{settings?.openingHours}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section ref={ctaRef} className="reveal relative overflow-hidden bg-primary py-20 px-4 text-center text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: "28px 28px" }}
        />
        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Hungry? Let's Fix That.</h2>
          <p className="text-orange-100 text-lg">
            Browse our full menu and place your order in minutes — or message us directly on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link to="/menu">
              <Button size="lg" className="bg-white text-primary hover:bg-orange-50 font-bold px-10 shadow-lg">
                View Full Menu
              </Button>
            </Link>
            {settings?.whatsappNumber && (
              <a href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 hover:border-white px-8">
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
