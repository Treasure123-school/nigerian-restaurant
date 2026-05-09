import { MenuItem } from "../../types"
import { formatPrice } from "../../lib/utils"
import { urlFor } from "../../lib/sanityClient"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { useCartStore } from "../../features/cart/cartStore"

export function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCartStore()

  return (
    <div className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        {item.image && (
          <img 
            src={urlFor(item.image).width(600).height(450).url()} 
            alt={item.image.alt || item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.isFeatured && <Badge className="bg-accent text-white shadow-sm">Featured</Badge>}
          {item.tags?.map((tag) => <Badge key={tag} className="bg-white/90 text-text shadow-sm">{tag}</Badge>)}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-1">{item.name}</h3>
          <span className="font-bold text-primary">{formatPrice(item.price)}</span>
        </div>
        {item.description && (
          <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">{item.description}</p>
        )}
        <div className="flex flex-col gap-2 mt-auto pt-4">
          <Button onClick={() => addItem(item, false)} className="w-full shadow-sm hover:shadow-md" variant="primary">
            Add to Cart
          </Button>
          {item.extraPortionPrice && (
            <Button onClick={() => addItem(item, true)} className="w-full" variant="outline">
              Extra Portion ({formatPrice(item.extraPortionPrice)})
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
