import { useNavigate } from "react-router-dom"
import { useCartStore } from "../features/cart/cartStore"
import { CartItem } from "../components/cart/CartItem"
import { CartSummary } from "../components/cart/CartSummary"
import { Button } from "../components/ui/Button"
import { ShoppingBag, ArrowLeft } from "lucide-react"

export function CartPage() {
  const { items } = useCartStore()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 max-w-7xl py-20 min-h-[60vh] flex flex-col justify-center items-center text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold font-serif mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added any items to your cart yet.</p>
        <Button onClick={() => navigate("/menu")} size="lg">Browse Menu</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      <button 
        onClick={() => navigate("/menu")} 
        className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Continue Shopping
      </button>

      <h1 className="text-3xl font-serif font-bold text-text mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative items-start">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="hidden sm:grid grid-cols-12 text-sm text-gray-500 font-medium pb-4 border-b">
              <div className="col-span-8">Product</div>
              <div className="col-span-4 text-right">Total</div>
            </div>
            <div>
              {items.map((item) => (
                <CartItem key={`${item.menuItem._id}-${item.isExtraPortion}`} item={item} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1 border-gray-50 rounded-lg">
          <CartSummary />
          <Button 
            className="w-full mt-6 py-6 text-lg" 
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}
