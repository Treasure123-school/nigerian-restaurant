import { useState } from "react"
import { useCartStore } from "../cart/cartStore"
import { useNavigate } from "react-router-dom"

const generateRef = () => Math.floor(Math.random() * 1000000000).toString(16)

export function useCheckout() {
  const { getTotalPrice, clearCart } = useCartStore()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const processPayment = (
    fullName: string, 
    email: string, 
    phoneNumber: string, 
    address: string,
    notes: string
  ) => {
    setIsProcessing(true)
    setError(null)
    
    try {
      const handler = (window as any).PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: email || "customer@example.com",
        amount: getTotalPrice() * 100, // Paystack expects amount in Kobo
        currency: "NGN",
        ref: generateRef(),
        callback: function (response: any) {
          setIsProcessing(false)
          if (response.status === "success" || response.message === "Approved") {
            clearCart()
            navigate("/order-confirmation", { 
              state: { 
                reference: response.reference,
                address,
                notes,
                phoneNumber,
                fullName
              } 
            })
          } else {
            setError("Payment was not successful. Please try again.")
          }
        },
        onClose: function () {
          setIsProcessing(false)
          setError("Payment window was closed.")
        },
      })
      handler.openIframe()
    } catch (err: any) {
      setIsProcessing(false)
      setError("Payment gateway could not be loaded. Please check your internet connection and API keys.")
    }
  }

  return {
    processPayment,
    isProcessing,
    error
  }
}
