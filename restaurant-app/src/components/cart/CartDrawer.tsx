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
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeDrawer}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2 text-lg font-bold text-text">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Your Cart
          </div>
          <button 
            onClick={closeDrawer}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col">
          {items.length === 0 ? (
            <div className="m-auto flex flex-col items-center justify-center text-center opacity-70">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <p className="font-medium text-gray-500 mb-6">Your cart is empty</p>
              <Button onClick={() => {
                closeDrawer()
                navigate("/menu")
              }} variant="outline">
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex-1">
                {items.map((item) => (
                  <CartItem key={`${item.menuItem._id}-${item.isExtraPortion}`} item={item} />
                ))}
              </div>
              <div className="mt-6 border-t pt-4 bg-white sticky bottom-0 border-t-gray-100 pb-safe">
                <div className="flex justify-between items-center mb-4 text-lg">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-primary text-xl max-w-[200px] text-right break-words">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Button 
                    className="w-full text-base font-medium py-6"
                    onClick={() => {
                      closeDrawer()
                      navigate("/checkout")
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-sm"
                    onClick={() => {
                      closeDrawer()
                      navigate("/menu")
                    }}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}
