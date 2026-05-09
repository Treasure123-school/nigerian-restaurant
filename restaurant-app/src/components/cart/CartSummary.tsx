import { useCartStore } from "../../features/cart/cartStore"
import { formatPrice } from "../../lib/utils"

export function CartSummary() {
  const { items, getTotalPrice } = useCartStore()

  return (
    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 sticky top-24">
      <h3 className="font-bold text-lg mb-4 border-b pb-4">Order Summary</h3>
      <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto hide-scrollbar">
        {items.map((item) => {
          const price = item.isExtraPortion && item.menuItem.extraPortionPrice ? item.menuItem.extraPortionPrice : item.menuItem.price
          
          return (
            <div key={`${item.menuItem._id}-${item.isExtraPortion}`} className="flex justify-between items-start gap-4">
              <div>
                <p className="font-medium text-sm">
                  {item.quantity}x {item.menuItem.name}
                </p>
                {item.isExtraPortion && <p className="text-xs text-accent mt-0.5">Extra Portion</p>}
              </div>
              <p className="font-semibold text-sm whitespace-nowrap">{formatPrice(price * item.quantity)}</p>
            </div>
          )
        })}
      </div>
      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span>{formatPrice(getTotalPrice())}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Delivery</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
          <span>Total</span>
          <span className="text-primary">{formatPrice(getTotalPrice())}</span>
        </div>
      </div>
    </div>
  )
}
