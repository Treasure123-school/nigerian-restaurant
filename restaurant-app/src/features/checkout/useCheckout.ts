import { useState } from "react"
import { useCartStore } from "../cart/cartStore"
import { useNavigate } from "react-router-dom"
import { CartItem } from "../../types"

const generateRef = () => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `IYB-${timestamp}-${random}`
}

const isPaystackLoaded = (): boolean => {
  return typeof (window as any).PaystackPop !== "undefined"
}

export interface SavedOrder {
  reference: string
  fullName: string
  email: string
  phoneNumber: string
  address: string
  notes: string
  items: CartItem[]
  total: number
  paidAt: string
}

function saveOrderToStorage(order: SavedOrder) {
  try {
    const existing = JSON.parse(localStorage.getItem("iyb_orders") || "[]")
    existing.unshift(order)
    localStorage.setItem("iyb_orders", JSON.stringify(existing.slice(0, 20)))
  } catch {}
}

export function useCheckout() {
  const { getTotalPrice, clearCart, items } = useCartStore()
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

    const cartSnapshot: CartItem[] = items.map(i => ({ ...i }))
    const totalAtCheckout = getTotalPrice()

    try {
      const amountInKobo = Math.round(totalAtCheckout * 100)

      const handler = (window as any).PaystackPop.setup({
        key,
        email,
        amount: amountInKobo,
        currency: "NGN",
        ref: generateRef(),
        metadata: {
          custom_fields: [
            { display_name: "Customer Name",    variable_name: "full_name",        value: fullName },
            { display_name: "Phone Number",     variable_name: "phone_number",     value: phoneNumber },
            { display_name: "Delivery Address", variable_name: "delivery_address", value: address },
            {
              display_name: "Items Ordered",
              variable_name: "items_ordered",
              value: cartSnapshot
                .map(i => {
                  const price = i.isExtraPortion && i.menuItem.extraPortionPrice
                    ? i.menuItem.extraPortionPrice
                    : i.menuItem.price
                  const label = i.isExtraPortion ? `${i.menuItem.name} (Extra)` : i.menuItem.name
                  return `${i.quantity}x ${label} = ₦${(price * i.quantity).toLocaleString()}`
                })
                .join(" | "),
            },
            { display_name: "Order Total",      variable_name: "order_total",      value: `₦${totalAtCheckout.toLocaleString()}` },
            { display_name: "Order Notes",      variable_name: "order_notes",      value: notes || "None" },
          ],
        },
        callback: function (response: any) {
          setIsProcessing(false)
          if (response.status === "success") {
            const order: SavedOrder = {
              reference: response.reference,
              fullName,
              email,
              phoneNumber,
              address,
              notes,
              items: cartSnapshot,
              total: totalAtCheckout,
              paidAt: new Date().toISOString(),
            }
            saveOrderToStorage(order)
            clearCart()
            navigate("/order-confirmation", { state: order })
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
