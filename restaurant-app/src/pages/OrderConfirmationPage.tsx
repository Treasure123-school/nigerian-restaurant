import { useLocation, useNavigate, Navigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { sanityClient } from "../../lib/sanityClient"
import { SITE_SETTINGS } from "../../lib/queries"
import { SiteSettings } from "../../types"
import { Button } from "../components/ui/Button"
import { CheckCircle2 } from "lucide-react"

export function OrderConfirmationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as { 
    reference: string, 
    phoneNumber: string, 
    fullName: string 
  } | null

  const { data: settings } = useQuery<SiteSettings>({
    queryKey: ['siteSettings'],
    queryFn: () => sanityClient.fetch(SITE_SETTINGS)
  })

  // Protect route if no order state
  if (!state || !state.reference) {
    return <Navigate to="/menu" replace />
  }

  const whatsappMessage = `Hello ${settings?.restaurantName || 'Restaurant'}, I just placed an order!%0A%0A*Name:* ${state.fullName}%0A*Phone:* ${state.phoneNumber}%0A*Order Ref:* ${state.reference}%0A%0APlease confirm my order.`

  return (
    <div className="container mx-auto px-4 max-w-3xl py-20 text-center min-h-[70vh] flex flex-col justify-center items-center">
      <div className="w-24 h-24 bg-green-50 rounded-full flex flex-col items-center justify-center mb-6 text-green-500">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      
      <h1 className="text-3xl font-serif font-bold text-text mb-4">Payment Successful!</h1>
      <p className="text-gray-500 mb-2">Thank you for your order, <span className="font-semibold text-text">{state.fullName}</span>.</p>
      <p className="text-gray-500 mb-8 max-w-md">Your payment has been processed successfully. Your order reference is: <strong className="text-primary">{state.reference}</strong></p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md">
        {settings?.whatsappNumber && (
          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`} 
            target="_blank" 
            rel="noreferrer"
            className="w-full"
          >
            <Button variant="primary" className="w-full">Track via WhatsApp</Button>
          </a>
        )}
        <Button variant="outline" className="w-full" onClick={() => navigate("/menu")}>
          Back to Menu
        </Button>
      </div>
    </div>
  )
}
