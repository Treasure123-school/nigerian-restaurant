import { useState } from "react"
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
  image: string
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
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=320&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=320&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=320&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=320&fit=crop&auto=format",
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
  const [userPos, setUserPos]     = useState<{ lat: number; lng: number } | null>(null)
  const [locError, setLocError]   = useState(false)
  const [locating, setLocating]   = useState(false)
  const [nearestId, setNearestId] = useState<string | null>(null)

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

  const branchesWithDist = BRANCHES.map((b) => ({
    ...b,
    distance: userPos ? haversineKm(userPos.lat, userPos.lng, b.lat, b.lng) : null,
  })).sort((a, b) =>
    a.distance !== null && b.distance !== null ? a.distance - b.distance : 0
  )

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">

        {/* Heading */}
        <div ref={headRef} className="reveal text-center mb-12">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Where to Find Us</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Our Locations</h2>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-5 mb-8" />

          {/* Locate me */}
          {!userPos && !locError && (
            <button
              onClick={detectLocation}
              disabled={locating}
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 px-6 py-2.5 rounded-full text-sm hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
            >
              <Navigation className={cn("w-3.5 h-3.5", locating && "animate-spin")} />
              {locating ? "Detecting location…" : "Find Nearest Branch"}
            </button>
          )}
          {userPos && nearestId && (
            <p className="inline-flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-100 px-5 py-2 rounded-full font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              Nearest branch highlighted · sorted by distance
            </p>
          )}
          {locError && (
            <p className="text-sm text-gray-400">Location access denied. All branches shown below.</p>
          )}
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {branchesWithDist.map((branch) => {
            const isNearest = branch.id === nearestId
            return (
              <div
                key={branch.id}
                className={cn(
                  "rounded-2xl overflow-hidden flex flex-col border transition-all duration-300 bg-white cursor-pointer",
                  isNearest
                    ? "border-primary ring-1 ring-primary/20 shadow-md hover:-translate-y-1 hover:shadow-lg"
                    : "border-gray-100 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]"
                )}
              >
                {/* Photo */}
                <div className="relative aspect-[16/9] overflow-hidden flex-shrink-0">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      {branch.area}
                    </span>
                  </div>
                  {isNearest && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        📍 Nearest
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h3 className="font-semibold text-gray-900">{branch.name}</h3>

                  {branch.distance !== null && (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full w-fit">
                      <Navigation className="w-3 h-3" />
                      {formatDistance(branch.distance)}
                    </div>
                  )}

                  <div className="space-y-2 text-xs text-gray-400 flex-1">
                    <div className="flex gap-2">
                      <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{branch.address}</span>
                    </div>
                    <div className="flex gap-2">
                      <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <a href={`tel:${branch.phone}`} className="hover:text-primary transition-colors">{branch.phone}</a>
                    </div>
                    <div className="flex gap-2">
                      <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="whitespace-pre-wrap leading-relaxed">{branch.hours}</span>
                    </div>
                  </div>

                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "w-full text-center py-2 rounded-xl text-xs font-semibold transition-colors border mt-1",
                      isNearest
                        ? "bg-primary text-white border-primary hover:bg-primary/90"
                        : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                    )}
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
