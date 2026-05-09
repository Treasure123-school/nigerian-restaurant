import { CartItem as CartItemType } from "../../types"
import { useCartStore } from "../../features/cart/cartStore"
import { formatPrice } from "../../lib/utils"
import { urlFor as sanityUrlFor } from "../../lib/sanityClient"
import { Minus, Plus, Trash2 } from "lucide-react"

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCartStore()
  const price = item.isExtraPortion && item.menuItem.extraPortionPrice ? item.menuItem.extraPortionPrice : item.menuItem.price

  return (
    <div className="flex gap-4 py-4 border-b">
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        {item.menuItem.image && (
          <img src={sanityUrlFor(item.menuItem.image).width(160).height(160).url()} alt={item.menuItem.name} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div className="flex justify-between gap-2">
          <div>
            <h4 className="font-semibold text-sm line-clamp-2">{item.menuItem.name}</h4>
            {item.isExtraPortion && <span className="text-xs text-accent bg-orange-50 px-1.5 py-0.5 rounded mt-1 inline-block">Extra Portion</span>}
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
