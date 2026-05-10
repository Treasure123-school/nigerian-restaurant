import { useState } from "react"
import { useCartStore } from "../cart/cartStore"
import { useNavigate } from "react-router-dom"

const generateRef = () => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `IYB-${timestamp}-${random}`
}

const isPaystackLoaded = (): boolean => {
  return typeof (window as any).PaystackPop !== "undefined"
}

export function useCheckout() {
  const { getTotalPrice, clearCart } = useCartStore()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = () => setError(null)

  const processPayment = (
    fullName: string,
    email: string,
    phoneNumber: string,
    address: string,
    notes: string
  ) => {
    clearError()

    const key = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY
    if (!key || key === "your_paystack_public_key") {
      setError("Payment is not configured. Please contact the restaurant directly.")
      return
    }

    if (!isPaystackLoaded()) {
      setError("Payment gateway is still loading. Please wait a moment and try again.")
      return
    }

    setIsProcessing(true)

    try {
      const amountInKobo = Math.round(getTotalPrice() * 100)

      const handler = (window as any).PaystackPop.setup({
        key,
        email,
        amount: amountInKobo,
        currency: "NGN",
        ref: generateRef(),
        metadata: {
          custom_fields: [
            { display_name: "Full Name", variable_name: "full_name", value: fullName },
            { display_name: "Phone Number", variable_name: "phone_number", value: phoneNumber },
            { display_name: "Delivery Address", variable_name: "delivery_address", value: address },
            { display_name: "Order Notes", variable_name: "order_notes", value: notes || "None" },
          ],
        },
        callback: function (response: any) {
          setIsProcessing(false)
          if (response.status === "success") {
            clearCart()
            navigate("/order-confirmation", {
              state: {
                reference: response.reference,
                address,
                notes,
                phoneNumber,
                fullName,
              },
            })
          } else {
            setError("Payment was not completed. Please try again.")
          }
        },
        onClose: function () {
          setIsProcessing(false)
        },
      })

      handler.openIframe()
    } catch (err: any) {
      setIsProcessing(false)
      setError("Could not open payment window. Please refresh the page and try again.")
    }
  }

  return {
    processPayment,
    isProcessing,
    error,
    clearError,
  }
}
