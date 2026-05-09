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

export function HomePage() {
  const { data: fetchedSettings, isLoading: isSettingsLoading } = useQuery<SiteSettings>({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      if (!isSanityConfigured()) return DEMO_SETTINGS
      try {
        const result = await sanityClient.fetch(SITE_SETTINGS)
        return result ?? DEMO_SETTINGS
      } catch {
        // CORS, network or auth error — use demo settings
        return DEMO_SETTINGS
      }
    },
  })

  const settings = fetchedSettings ?? DEMO_SETTINGS
  const { data: featuredItems, isLoading: isFeaturedLoading } = useFeaturedItems()

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center pt-16">
        {settings?.heroImage?.asset?._ref ? (
          <div className="absolute inset-0 z-0">
            <img
              src={urlFor(settings.heroImage).width(1920).height(1080).url()}
              alt={settings.heroHeadline}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-secondary/90" />
        )}

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          {isSettingsLoading ? (
            <Spinner />
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                {settings?.heroHeadline || "Authentic Nigerian Cuisine"}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                {settings?.heroSubtext || "Experience the rich and vibrant flavors of Nigeria, delivered straight to your door."}
              </p>
            </>
          )}
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/menu">
              <Button size="lg" className="w-full sm:w-auto font-bold px-10">Order Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 px-4 container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-text mb-4">Chef's Recommendations</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Our most popular and highly-rated dishes, carefully prepared to give you a taste of home.</p>
        </div>
        <MenuGrid items={featuredItems || []} isLoading={isFeaturedLoading} />
        <div className="text-center mt-12">
          <Link to="/menu">
            <Button variant="outline" size="lg">View Full Menu</Button>
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl font-serif font-bold text-text">Visit Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-xl mb-4 text-secondary">Location</h3>
              <p className="text-gray-600 mb-6">{settings?.address}</p>
              {settings?.whatsappNumber && (
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank" rel="noreferrer"
                >
                  <Button variant="primary" className="w-full">Order via WhatsApp</Button>
                </a>
              )}
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-xl mb-4 text-secondary">Opening Hours</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{settings?.openingHours}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
