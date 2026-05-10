import { Fragment } from "react"
import { useCartStore } from "../../features/cart/cartStore"
import { CartItem } from "./CartItem"
import { formatPrice } from "../../lib/utils"
import { X, ShoppingBag } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/Button"

export function CartDrawer() {
  const { isDrawerOpen, closeDrawer, items, getTotalPrice } = useCartStore()
  const navigate = useNavigate()

  if (!isDrawerOpen) return null

  return (
    <Fragment>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span className="text-lg font-bold text-text">Your Cart</span>
            {items.length > 0 && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((t, i) => t + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6 py-12 opacity-80">
              <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                <ShoppingBag className="w-9 h-9 text-primary/40" />
              </div>
              <p className="font-semibold text-gray-600 mb-1">Your cart is empty</p>
              <p className="text-sm text-gray-400 mb-6">Add some delicious dishes to get started</p>
              <Button
                onClick={() => { closeDrawer(); navigate("/menu") }}
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="px-5 divide-y">
              {items.map((item) => (
                <CartItem key={`${item.menuItem._id}-${item.isExtraPortion}`} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-5 py-5 bg-white space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Subtotal</span>
              <span className="font-bold text-xl text-primary">{formatPrice(getTotalPrice())}</span>
            </div>
            <Button
              className="w-full py-6 text-base font-semibold shadow-lg shadow-primary/20"
              onClick={() => { closeDrawer(); navigate("/checkout") }}
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="ghost"
              className="w-full text-sm text-gray-500"
              onClick={() => { closeDrawer(); navigate("/menu") }}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </Fragment>
  )
}
