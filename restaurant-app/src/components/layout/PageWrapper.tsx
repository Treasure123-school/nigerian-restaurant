import * as React from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { useQuery } from "@tanstack/react-query"
import { sanityClient } from "../../lib/sanityClient"
import { SITE_SETTINGS } from "../../lib/queries"
import { SiteSettings } from "../../types"

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const { data: settings } = useQuery<SiteSettings>({
    queryKey: ['siteSettings'],
    queryFn: () => sanityClient.fetch(SITE_SETTINGS)
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col w-full">{children}</main>
      <Footer settings={settings} />
    </div>
  )
}
