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
import { Leaf, Clock, Star, MapPin, MessageCircle } from "lucide-react"

const PERKS = [
  { icon: Leaf, label: "Fresh Daily", desc: "Every dish is prepared fresh with quality ingredients" },
  { icon: Star, label: "Authentic Taste", desc: "Traditional Nigerian recipes passed down for generations" },
  { icon: Clock, label: "Fast Service", desc: "Hot meals ready quickly — dine in or order online" },
]

export function HomePage() {
  const { data: fetchedSettings, isLoading: isSettingsLoading } = useQuery<SiteSettings>({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      if (!isSanityConfigured()) return DEMO_SETTINGS
      try {
        const result = await sanityClient.fetch(SITE_SETTINGS)
        return result ?? DEMO_SETTINGS
      } catch {
        return DEMO_SETTINGS
      }
    },
  })

  const settings = fetchedSettings ?? DEMO_SETTINGS
  const { data: featuredItems, isLoading: isFeaturedLoading } = useFeaturedItems()

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center pt-16">
        {settings?.heroImage?.asset?._ref ? (
          <div className="absolute inset-0 z-0">
            <img
              src={urlFor(settings.heroImage).width(1920).height(1080).url()}
              alt={settings.heroHeadline}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-secondary via-secondary/95 to-green-900">
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>
        )}

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto space-y-6 animate-fade-in">
          <span className="inline-block bg-accent/20 border border-accent/40 text-accent text-sm font-medium px-4 py-1.5 rounded-full">
            🍛 Authentic Nigerian Cuisine
          </span>
          {isSettingsLoading ? (
            <Spinner />
          ) : (
            <>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">
                {settings?.heroHeadline || "Authentic Nigerian Cuisine"}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto leading-relaxed">
                {settings?.heroSubtext || "Experience the rich and vibrant flavors of Nigeria, delivered straight to your door."}
              </p>
            </>
          )}
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link to="/menu">
              <Button size="lg" className="font-bold px-10 shadow-lg shadow-primary/30">
                Order Now
              </Button>
            </Link>
            {settings?.whatsappNumber && (
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank" rel="noreferrer"
              >
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:border-white px-8">
                  WhatsApp Order
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Perks bar */}
      <section className="bg-white border-b">
        <div className="container mx-auto max-w-5xl px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
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

      {/* Featured Items */}
      <section className="py-20 px-4 container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Specialties</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text mt-2 mb-3">
            Chef's Recommendations
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Our most popular and highly-rated dishes, carefully prepared to give you a taste of home.
          </p>
        </div>
        <MenuGrid items={featuredItems || []} isLoading={isFeaturedLoading} />
        <div className="text-center mt-12">
          <Link to="/menu">
            <Button variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-white">
              View Full Menu
            </Button>
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Find Us</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text mt-2">Visit Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-secondary">Our Location</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">{settings?.address}</p>
              {settings?.whatsappNumber && (
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank" rel="noreferrer"
                >
                  <Button variant="primary" className="w-full gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Order via WhatsApp
                  </Button>
                </a>
              )}
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
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
    </div>
  )
}
