import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCartStore } from "../features/cart/cartStore"
import { useCheckout } from "../features/checkout/useCheckout"
import { CartSummary } from "../components/cart/CartSummary"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"
import { PhoneInput } from "../components/ui/PhoneInput"
import { ArrowLeft, X, ShieldCheck } from "lucide-react"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getDigitsOnly(value: string) {
  return value.replace(/\D/g, "")
}

export function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore()
  const navigate = useNavigate()
  const { processPayment, isProcessing, error, clearError } = useCheckout()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dialCode: "+234",
    phoneNumber: "",
    address: "",
    notes: "",
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
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }))
    }
    if (error) clearError()
  }

  const handleDialCodeChange = (dialCode: string) => {
    setFormData((prev) => ({ ...prev, dialCode }))
    if (validationErrors.phoneNumber) {
      setValidationErrors((prev) => ({ ...prev, phoneNumber: "" }))
    }
  }

  const handlePhoneNumberChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }))
    if (validationErrors.phoneNumber) {
      setValidationErrors((prev) => ({ ...prev, phoneNumber: "" }))
    }
    if (error) clearError()
  }

  const validate = () => {
    const errors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required"
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name"
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required"
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address"
    }

    const digits = getDigitsOnly(formData.phoneNumber)
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required"
    } else if (digits.length < 6) {
      errors.phoneNumber = "Phone number is too short"
    } else if (digits.length > 15) {
      errors.phoneNumber = "Phone number is too long"
    }

    if (!formData.address.trim()) {
      errors.address = "Delivery address is required"
    } else if (formData.address.trim().length < 10) {
      errors.address = "Please enter your full delivery address"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      const fullPhone = `${formData.dialCode}${formData.phoneNumber.trim()}`
      processPayment(
        formData.fullName.trim(),
        formData.email.trim(),
        fullPhone,
        formData.address.trim(),
        formData.notes.trim()
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
              autoComplete="name"
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={validationErrors.email}
              placeholder="john@example.com"
              autoComplete="email"
            />
          </div>

          <PhoneInput
            dialCode={formData.dialCode}
            phoneNumber={formData.phoneNumber}
            onDialCodeChange={handleDialCodeChange}
            onPhoneNumberChange={handlePhoneNumberChange}
            error={validationErrors.phoneNumber}
          />

          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-text">
              Delivery Address
            </label>
            <textarea
              name="address"
              rows={3}
              className={`flex w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                validationErrors.address
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="House number, street, area, city..."
              value={formData.address}
              onChange={handleInputChange}
            />
            {validationErrors.address && (
              <span className="text-xs text-red-500 mt-1">{validationErrors.address}</span>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-text">
              Order Notes <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              name="notes"
              rows={2}
              className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              placeholder="E.g. Extra spicy, no onions, call upon arrival..."
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <CartSummary />

          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
              <span className="flex-1">{error}</span>
              <button
                type="button"
                onClick={clearError}
                className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
                aria-label="Dismiss error"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <Button
            type="submit"
            className="w-full py-6 text-lg"
            isLoading={isProcessing}
            disabled={getTotalPrice() === 0 || isProcessing}
          >
            {isProcessing ? "Opening payment..." : `Pay ₦${getTotalPrice().toLocaleString()} with Paystack`}
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Payments are secured and encrypted by Paystack</span>
          </div>
        </div>
      </form>
    </div>
  )
}
