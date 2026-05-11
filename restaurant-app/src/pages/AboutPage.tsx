import { Link } from "react-router-dom"
import { Leaf, ChefHat, Heart, Users, Star, Award, Clock, MapPin } from "lucide-react"
import { Button } from "../components/ui/Button"
import { useScrollReveal } from "../hooks/useScrollReveal"

const ABOUT_HERO   = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=700&fit=crop&auto=format"
const KITCHEN_IMG  = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&h=700&fit=crop&auto=format"
const TEAM_IMG     = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&h=700&fit=crop&auto=format"
const MARKET_IMG   = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&h=700&fit=crop&auto=format"

const VALUES = [
  {
    icon: Leaf,
    title: "Farm-to-Table Freshness",
    desc: "Every ingredient is sourced fresh each morning from trusted local farmers and markets. We never compromise on quality.",
  },
  {
    icon: ChefHat,
    title: "Authentic Recipes",
    desc: "Our recipes are rooted in tradition — passed down through generations, cooked exactly as they were meant to be.",
  },
  {
    icon: Heart,
    title: "Cooked with Love",
    desc: "Every dish carries the warmth of a home kitchen. We take pride in making every meal feel personal and special.",
  },
  {
    icon: Users,
    title: "Community First",
    desc: "We are more than a restaurant — we are a gathering place. A space where culture, food, and community come together.",
  },
]

const MILESTONES = [
  {
    year: "2016",
    title: "Humble Beginnings",
    desc: "Started as a small family kitchen in Victoria Island, serving home-cooked meals to neighbours and friends.",
  },
  {
    year: "2018",
    title: "Our First Restaurant",
    desc: "Opened our first full-service restaurant space, bringing authentic Nigerian cuisine to a wider audience.",
  },
  {
    year: "2021",
    title: "Online Ordering Launched",
    desc: "Expanded to online and WhatsApp ordering, making our food accessible to customers across Lagos.",
  },
  {
    year: "2024",
    title: "5,000+ Happy Customers",
    desc: "Reached a milestone of over 5,000 loyal customers and a consistent 4.9-star rating across all platforms.",
  },
]

const STATS = [
  { icon: Clock,   value: "8+",   label: "Years of Service" },
  { icon: Star,    value: "4.9★", label: "Average Rating" },
  { icon: Users,   value: "5K+",  label: "Happy Customers" },
  { icon: Award,   value: "50+",  label: "Signature Dishes" },
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

export function AboutPage() {
  const missionRef     = useScrollReveal()
  const statsRef       = useScrollReveal()
  const valuesRef      = useScrollReveal()
  const storyImgRef    = useScrollReveal()
  const storyTxtRef    = useScrollReveal()
  const teamTxtRef     = useScrollReveal()
  const teamImgRef     = useScrollReveal()
  const sourcingImgRef = useScrollReveal()
  const sourcingTxtRef = useScrollReveal()
  const timelineRef    = useScrollReveal()
  const ctaRef         = useScrollReveal()

  return (
    <div className="w-full bg-white">

      {/* ── Hero ── */}
      <div className="relative text-white overflow-hidden" style={{ minHeight: 380 }}>
        <img src={ABOUT_HERO} alt="Our kitchen" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3828]/85 via-black/65 to-black/50" />
        <div className="relative z-10 container mx-auto max-w-4xl px-4 py-28 text-center space-y-5">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-8 bg-accent/50" />
            <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Who We Are</span>
            <span className="h-px w-8 bg-accent/50" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-xl leading-tight">
            Our Story
          </h1>
          <p className="text-white/60 max-w-lg mx-auto font-light leading-relaxed text-lg">
            Eight years of passion, tradition, and authentic Nigerian flavours — all served with love.
          </p>
        </div>
      </div>

      {/* ── Mission ── */}
      <section className="py-16 px-4 bg-[#FEFDF9]">
        <div ref={missionRef} className="reveal container mx-auto max-w-3xl text-center space-y-6">
          <SectionLabel>Our Mission</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-snug">
            Bringing the Heart of Nigeria to Every Table
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            We believe Nigerian cuisine is one of the world's greatest culinary traditions — bold, layered, and deeply rooted in culture. Our mission is simple: to share that tradition with every person who walks through our doors or places an order online.
          </p>
          <p className="text-gray-500 leading-relaxed">
            From slow-cooked Egusi soup to smoky suya skewers and rich Jollof rice, every dish we serve tells a story of generations, community, and pride. We don't just cook food — we preserve a heritage.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-[#1a3828] py-16 px-4">
        <div ref={statsRef} className="reveal-stagger container mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-0 text-center">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="px-6 py-6 flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <p className="font-serif text-4xl md:text-5xl font-bold text-accent leading-none">{value}</p>
              <p className="text-white/50 text-xs uppercase tracking-widest font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Beginning ── */}
      <section className="overflow-hidden">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 items-stretch">
          <div ref={storyImgRef} className="reveal-left relative min-h-[420px] md:min-h-[560px]">
            <img src={KITCHEN_IMG} alt="Our kitchen" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FEFDF9]/10" />
          </div>
          <div ref={storyTxtRef} className="reveal-right bg-[#FFF8EE] flex flex-col justify-center px-10 md:px-16 py-16 space-y-6">
            <SectionLabel>Where It Started</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-snug">
              A Family Kitchen That Grew into Something More
            </h2>
            <p className="text-gray-600 leading-relaxed">
              It started in 2016 with a simple idea: cook the food we grew up eating and share it with the community around us. Our founder, raised in a household where the kitchen was always the heart of the home, wanted to recreate that warmth for strangers.
            </p>
            <p className="text-gray-600 leading-relaxed">
              What began as small pots of Jollof rice and Egusi soup sold to neighbours quickly grew into a full restaurant, driven by word of mouth and the unmistakable aroma that drew people in from the street.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <div className="w-12 h-px bg-primary/30" />
              <p className="text-sm text-primary font-semibold italic">Victoria Island, Lagos · Since 2016</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="py-20 px-4 bg-[#FEFDF9]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <SectionLabel>What We Stand For</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Our Core Values</h2>
          </div>
          <div ref={valuesRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-3xl p-8 shadow-[0_4px_32px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col gap-4 hover:shadow-[0_8px_48px_rgba(0,0,0,0.10)] transition-shadow duration-300">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif font-bold text-gray-900 text-lg">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The People ── */}
      <section className="overflow-hidden">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 items-stretch">
          <div ref={teamTxtRef} className="reveal-left bg-[#1a3828] flex flex-col justify-center px-10 md:px-16 py-16 space-y-6 order-2 md:order-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="h-px w-8 bg-accent/50" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Our Team</span>
              <span className="h-px w-8 bg-accent/50" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-snug">
              The People Behind Every Dish
            </h2>
            <p className="text-white/70 leading-relaxed">
              Our kitchen is run by a passionate team of chefs who have spent years perfecting Nigerian culinary traditions. Many of them grew up cooking alongside their mothers and grandmothers — and that influence is felt in every bite.
            </p>
            <p className="text-white/60 leading-relaxed">
              From front-of-house to the back kitchen, every member of our team shares a genuine love for the food we serve and the people we serve it to.
            </p>
            <div className="pt-2">
              <Link to="/contact">
                <Button className="rounded-full px-8 font-semibold bg-accent text-white hover:bg-accent/90 border-0">
                  Meet Us in Person
                </Button>
              </Link>
            </div>
          </div>
          <div ref={teamImgRef} className="reveal-right relative min-h-[420px] md:min-h-[560px] order-1 md:order-2">
            <img src={TEAM_IMG} alt="Our team" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* ── Sourcing ── */}
      <section className="overflow-hidden">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 items-stretch">
          <div ref={sourcingImgRef} className="reveal-left relative min-h-[380px]">
            <img src={MARKET_IMG} alt="Fresh market ingredients" className="w-full h-full object-cover" />
          </div>
          <div ref={sourcingTxtRef} className="reveal-right bg-[#FFF8EE] flex flex-col justify-center px-10 md:px-16 py-16 space-y-5">
            <SectionLabel>Our Ingredients</SectionLabel>
            <h2 className="text-3xl font-serif font-bold text-gray-900 leading-snug">
              Freshness is Non-Negotiable
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Every morning before service, our team visits trusted suppliers and local markets to hand-pick the freshest produce, meats, and spices. We believe great food starts long before it reaches the pot.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm">
              No freezing. No shortcuts. Just honest, quality ingredients that honour the recipes we've built our reputation on.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {["Palm Oil", "Iru (Locust Beans)", "Uziza Leaves", "Fresh Tomatoes", "Crayfish", "Stockfish"].map(item => (
                <span key={item} className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/15">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 px-4 bg-[#FEFDF9]">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <SectionLabel>Our Journey</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">How We Got Here</h2>
          </div>
          <div ref={timelineRef} className="reveal-stagger relative space-y-0">
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-primary/15 -translate-x-1/2 hidden sm:block" />
            {MILESTONES.map((m, i) => (
              <div key={m.year} className={`relative flex gap-6 md:gap-0 pb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`hidden md:flex md:w-1/2 ${i % 2 === 0 ? "pr-12 justify-end" : "pl-12 justify-start"}`}>
                  <div className={`max-w-xs bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.07)] border border-gray-50 space-y-2 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <span className="text-primary font-bold text-sm">{m.year}</span>
                    <h3 className="font-serif font-bold text-gray-900">{m.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary items-center justify-center shadow-lg shadow-primary/30 z-10">
                  <span className="text-white text-xs font-bold">{m.year.slice(2)}</span>
                </div>
                <div className="md:w-1/2" />
                {/* Mobile layout */}
                <div className="md:hidden flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 flex-shrink-0">
                      <span className="text-white text-xs font-bold">{m.year.slice(2)}</span>
                    </div>
                    <div className="w-px flex-1 bg-primary/15 mt-2" />
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)] border border-gray-50 space-y-1 flex-1 mb-4">
                    <span className="text-primary font-bold text-xs">{m.year}</span>
                    <h3 className="font-serif font-bold text-gray-900 text-sm">{m.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="reveal py-24 px-4 bg-[#1a3828] text-center">
        <div className="container mx-auto max-w-xl space-y-6">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-accent/50" />
            <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Come Visit Us</span>
            <span className="h-px w-8 bg-accent/50" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
            Experience It for Yourself
          </h2>
          <p className="text-white/60 leading-relaxed">
            Words can only say so much. Come taste the tradition, meet our team, and let the food tell the rest of the story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link to="/menu">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white border-0 rounded-full px-10 font-semibold shadow-xl">
                View Our Menu
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-10 border-white/30 text-white hover:bg-white/10 font-light">
                <MapPin className="w-4 h-4 mr-2" /> Find Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
