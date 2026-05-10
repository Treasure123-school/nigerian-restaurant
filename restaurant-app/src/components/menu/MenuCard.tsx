import { MenuItem } from "../../types"
import { formatPrice } from "../../lib/utils"
import { urlFor } from "../../lib/sanityClient"
import { Button } from "../ui/Button"
import { useCartStore } from "../../features/cart/cartStore"
import { ShoppingCart, Star } from "lucide-react"

const FOOD_PLACEHOLDER = "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=450&fit=crop&auto=format"

export function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCartStore()

  const hasRealImage = item.image?.asset?._ref && item.image.asset._ref !== ''
  const imageSrc = hasRealImage
    ? urlFor(item.image).width(600).height(450).url()
    : FOOD_PLACEHOLDER

  return (
    <div className="group rounded-3xl overflow-hidden bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.14)] hover:-translate-y-1.5 transition-all duration-400 flex flex-col h-full border border-gray-50">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={imageSrc}
          alt={item.image?.alt || item.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
          style={{ transition: "transform 0.7s cubic-bezier(.16,1,.3,1)" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

        {/* Featured badge */}
        {item.isFeatured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 bg-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
              <Star className="w-3 h-3 fill-white" /> Featured
            </span>
          </div>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white text-primary font-bold text-sm px-3 py-1.5 rounded-full shadow-lg">
            {formatPrice(item.price)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow gap-2">
        <h3 className="font-bold text-base text-gray-900 leading-snug line-clamp-1">{item.name}</h3>
        {item.description && (
          <p className="text-gray-400 text-sm line-clamp-2 flex-grow leading-relaxed">{item.description}</p>
        )}
        <button
          onClick={() => addItem(item, false)}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold text-sm py-3 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md group/btn"
        >
          <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
