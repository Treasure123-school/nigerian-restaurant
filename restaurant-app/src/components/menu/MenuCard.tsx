import { MenuItem } from "../../types"
import { formatPrice } from "../../lib/utils"
import { urlFor } from "../../lib/sanityClient"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { useCartStore } from "../../features/cart/cartStore"
import { ShoppingCart } from "lucide-react"

const FOOD_PLACEHOLDER = "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=450&fit=crop&auto=format"

export function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCartStore()

  const hasRealImage = item.image?.asset?._ref && item.image.asset._ref !== ''
  const imageSrc = hasRealImage
    ? urlFor(item.image).width(600).height(450).url()
    : FOOD_PLACEHOLDER

  return (
    <div className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={imageSrc}
          alt={item.image?.alt || item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {item.isFeatured && (
            <Badge className="bg-primary text-white shadow-sm text-[11px]">⭐ Featured</Badge>
          )}
          {item.tags?.map((tag) => (
            <Badge key={tag} className="bg-white/90 text-text shadow-sm text-[11px]">{tag}</Badge>
          ))}
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="bg-white/95 backdrop-blur-sm text-primary font-bold text-sm px-3 py-1 rounded-full shadow-md">
            {formatPrice(item.price)}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg leading-tight mb-1 line-clamp-1">{item.name}</h3>
        {item.description && (
          <p className="text-gray-500 text-sm line-clamp-2 flex-grow leading-relaxed">{item.description}</p>
        )}
        <Button
          onClick={() => addItem(item, false)}
          className="w-full mt-4 shadow-sm hover:shadow-md gap-2"
          variant="primary"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
