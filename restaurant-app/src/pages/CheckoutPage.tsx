import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCartStore } from "../features/cart/cartStore"
import { useCheckout } from "../features/checkout/useCheckout"
import { CartSummary } from "../components/cart/CartSummary"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"
import { ArrowLeft } from "lucide-react"

export function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore()
  const navigate = useNavigate()
  const { processPayment, isProcessing, error } = useCheckout()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    notes: ""
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 max-w-7xl py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate("/menu")}>Back to Menu</Button>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: "" })
    }
  }

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!formData.fullName.trim()) errors.fullName = "Full name is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    if (!formData.phoneNumber.trim()) errors.phoneNumber = "Phone number is required"
    if (!formData.address.trim()) errors.address = "Delivery address is required"
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      processPayment(
        formData.fullName,
        formData.email,
        formData.phoneNumber,
        formData.address,
        formData.notes
      )
    }
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      <button 
        onClick={() => navigate("/cart")} 
        className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </button>

      <h1 className="text-3xl font-serif font-bold text-text mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative items-start">
        <div className="space-y-6 bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Full Name" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleInputChange} 
              error={validationErrors.fullName}
              placeholder="John Doe"
            />
            <Input 
              label="Email Address" 
              name="email" 
              type="email"
              value={formData.email} 
              onChange={handleInputChange} 
              error={validationErrors.email}
              placeholder="john@example.com"
            />
          </div>

          <Input 
            label="Phone Number" 
            name="phoneNumber" 
            type="tel"
            value={formData.phoneNumber} 
            onChange={handleInputChange} 
            error={validationErrors.phoneNumber}
            placeholder="+234 800 000 0000"
          />

          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-text">Delivery Address</label>
            <textarea
              name="address"
              rows={3}
              className={`flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary ${validationErrors.address ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="123 Main Street..."
              value={formData.address}
              onChange={handleInputChange}
            />
            {validationErrors.address && <span className="text-xs text-red-500 mt-1">{validationErrors.address}</span>}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-text">Order Notes (Optional)</label>
            <textarea
              name="notes"
              rows={2}
              className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="E.g. Extra spicy, call upon arrival..."
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="lg:col-span-1 border-gray-50 rounded-lg">
          <CartSummary />
          
          {error && (
            <div className="p-4 mt-6 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}

          <Button 
            type="submit"
            className="w-full mt-6 py-6 text-lg" 
            isLoading={isProcessing}
            disabled={getTotalPrice() === 0}
          >
            Pay ₦{(getTotalPrice()).toLocaleString()} with Paystack
          </Button>
        </div>
      </form>
    </div>
  )
}
