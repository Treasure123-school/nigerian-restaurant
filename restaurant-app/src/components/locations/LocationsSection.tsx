import { useState, useEffect } from "react"
import { MapPin, Clock, Navigation, Phone, CheckCircle } from "lucide-react"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import { cn } from "../../lib/utils"

interface Branch {
  id: string
  name: string
  area: string
  address: string
  phone: string
  hours: string
  lat: number
  lng: number
  mapUrl: string
}

const BRANCHES: Branch[] = [
  {
    id: "vi",
    name: "Victoria Island",
    area: "Lagos",
    address: "12 Adeola Odeku Street, Victoria Island, Lagos",
    phone: "+234 801 234 5678",
    hours: "Mon – Fri: 11AM – 10PM\nSat – Sun: 10AM – 11PM",
    lat: 6.4281,
    lng: 3.4219,
    mapUrl: "https://maps.google.com/?q=Victoria+Island+Lagos",
  },
  {
    id: "lekki",
    name: "Lekki Phase 1",
    area: "Lagos",
    address: "45 Admiralty Way, Lekki Phase 1, Lagos",
    phone: "+234 802 345 6789",
    hours: "Mon – Fri: 12PM – 10PM\nSat – Sun: 10AM – 11PM",
    lat: 6.4499,
    lng: 3.4765,
    mapUrl: "https://maps.google.com/?q=Lekki+Phase+1+Lagos",
  },
  {
    id: "abuja",
    name: "Wuse 2",
    area: "Abuja",
    address: "Plot 18 Aminu Kano Crescent, Wuse 2, Abuja",
    phone: "+234 803 456 7890",
    hours: "Mon – Sat: 11AM – 10PM\nSunday: 12PM – 9PM",
    lat: 9.0765,
    lng: 7.4983,
    mapUrl: "https://maps.google.com/?q=Wuse+2+Abuja",
  },
  {
    id: "ph",
    name: "GRA Phase 2",
    area: "Port Harcourt",
    address: "22 Peter Odili Road, GRA Phase 2, Port Harcourt",
    phone: "+234 804 567 8901",
    hours: "Mon – Sat: 11AM – 10PM\nSunday: 12PM – 9PM",
    lat: 4.8396,
    lng: 7.0135,
    mapUrl: "https://maps.google.com/?q=GRA+Port+Harcourt",
  },
]

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function formatDistance(km: number) {
  if (km < 1) return `${Math.round(km * 1000)} m away`
  return `${km.toFixed(1)} km away`
}

export function LocationsSection() {
  const [userPos, setUserPos]       = useState<{ lat: number; lng: number } | null>(null)
  const [locError, setLocError]     = useState(false)
  const [locating, setLocating]     = useState(false)
  const [nearestId, setNearestId]   = useState<string | null>(null)

  const headRef  = useScrollReveal()
  const cardsRef = useScrollReveal()

  function detectLocation() {
    if (!navigator.geolocation) { setLocError(true); return }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords
        setUserPos({ lat, lng })
        setLocating(false)

        let minDist = Infinity
        let closest = BRANCHES[0].id
        for (const b of BRANCHES) {
          const d = haversineKm(lat, lng, b.lat, b.lng)
          if (d < minDist) { minDist = d; closest = b.id }
        }
        setNearestId(closest)
      },
      () => { setLocError(true); setLocating(false) }
    )
  }

  // Try silently on mount (no prompt yet — only on button click)
  useEffect(() => {}, [])

  const branchesWithDist = BRANCHES.map((b) => ({
    ...b,
    distance: userPos ? haversineKm(userPos.lat, userPos.lng, b.lat, b.lng) : null,
  })).sort((a, b) =>
    a.distance !== null && b.distance !== null ? a.distance - b.distance : 0
  )

  return (
    <section className="py-20 bg-white px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Heading */}
        <div ref={headRef} className="reveal text-center mb-6">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Where to Find Us</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text mt-2 mb-3">Our Locations</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We have multiple branches across Nigeria. Find the one closest to you.
          </p>
        </div>

        {/* Locate me button */}
        <div className="text-center mb-10">
          {!userPos && !locError && (
            <button
              onClick={detectLocation}
              disabled={locating}
              className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-60"
            >
              <Navigation className={cn("w-4 h-4", locating && "animate-spin")} />
              {locating ? "Detecting your location…" : "Find Nearest Branch"}
            </button>
          )}
          {userPos && nearestId && (
            <p className="inline-flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 px-5 py-2.5 rounded-full font-medium">
              <CheckCircle className="w-4 h-4" />
              Nearest branch highlighted — sorted by distance from you
            </p>
          )}
          {locError && (
            <p className="text-sm text-gray-500">
              Location access denied. Browse all branches below.
            </p>
          )}
        </div>

        {/* Branch cards */}
        <div ref={cardsRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {branchesWithDist.map((branch) => {
            const isNearest = branch.id === nearestId
            return (
              <div
                key={branch.id}
                className={cn(
                  "relative rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-300",
                  isNearest
                    ? "border-primary bg-orange-50 shadow-lg shadow-primary/10 ring-1 ring-primary/20"
                    : "border-gray-100 bg-gray-50 hover:shadow-md"
                )}
              >
                {isNearest && (
                  <span className="absolute -top-3 left-4 bg-primary text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                    📍 Nearest to you
                  </span>
                )}

                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">{branch.area}</p>
                  <h3 className="font-bold text-lg text-secondary leading-tight">{branch.name}</h3>
                </div>

                {branch.distance !== null && (
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full w-fit">
                    <Navigation className="w-3.5 h-3.5" />
                    {formatDistance(branch.distance)}
                  </div>
                )}

                <div className="space-y-2.5 text-sm text-gray-600 flex-1">
                  <div className="flex gap-2">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{branch.address}</span>
                  </div>
                  <div className="flex gap-2">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <a href={`tel:${branch.phone}`} className="hover:text-primary transition-colors">{branch.phone}</a>
                  </div>
                  <div className="flex gap-2">
                    <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="whitespace-pre-wrap leading-relaxed">{branch.hours}</span>
                  </div>
                </div>

                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-colors border",
                    isNearest
                      ? "bg-primary text-white border-primary hover:bg-primary/90"
                      : "bg-white text-secondary border-gray-200 hover:border-secondary hover:text-primary"
                  )}
                >
                  Get Directions
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
