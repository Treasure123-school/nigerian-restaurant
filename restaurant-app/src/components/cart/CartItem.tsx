import { CartItem as CartItemType } from "../../types"
import { useCartStore } from "../../features/cart/cartStore"
import { formatPrice } from "../../lib/utils"
import { urlFor } from "../../lib/sanityClient"
import { Minus, Plus, Trash2 } from "lucide-react"

const FOOD_PLACEHOLDER = "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=160&h=160&fit=crop&auto=format"

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCartStore()
  const price = item.menuItem.price

  const hasRealImage = item.menuItem.image?.asset?._ref && item.menuItem.image.asset._ref !== ''
  const imageSrc = hasRealImage
    ? urlFor(item.menuItem.image).width(160).height(160).url()
    : FOOD_PLACEHOLDER

  return (
    <div className="flex gap-4 py-4 border-b">
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img src={imageSrc} alt={item.menuItem.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div className="flex justify-between gap-2">
          <div>
            <h4 className="font-semibold text-sm line-clamp-2">{item.menuItem.name}</h4>
          </div>
          <button 
            onClick={() => removeItem(item.menuItem._id, item.isExtraPortion)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-3 border rounded-md px-2 py-1 bg-white">
            <button 
              onClick={() => updateQuantity(item.menuItem._id, item.isExtraPortion, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="text-gray-500 hover:text-primary disabled:opacity-50"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.menuItem._id, item.isExtraPortion, item.quantity + 1)}
              className="text-gray-500 hover:text-primary"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="font-bold text-primary">{formatPrice(price * item.quantity)}</span>
        </div>
      </div>
    </div>
  )
}
