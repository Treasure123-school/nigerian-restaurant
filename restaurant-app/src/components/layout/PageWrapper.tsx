import * as React from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { useQuery } from "@tanstack/react-query"
import { sanityClient } from "../../lib/sanityClient"
import { SITE_SETTINGS } from "../../lib/queries"
import { SiteSettings } from "../../types"
import { DEMO_SETTINGS, isSanityConfigured } from "../../lib/demoData"

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const { data: settings } = useQuery<SiteSettings>({
    queryKey: ['siteSettings'],
    queryFn: () => {
      if (!isSanityConfigured()) return Promise.resolve(DEMO_SETTINGS)
      return sanityClient.fetch(SITE_SETTINGS)
    },
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col w-full">{children}</main>
      <Footer settings={settings ?? DEMO_SETTINGS} />
    </div>
  )
}
