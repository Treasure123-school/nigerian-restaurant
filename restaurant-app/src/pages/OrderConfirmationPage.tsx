import { useEffect, useState } from "react"
import { useLocation, useNavigate, Navigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { sanityClient } from "../lib/sanityClient"
import { SITE_SETTINGS } from "../lib/queries"
import { SiteSettings } from "../types"
import { DEMO_SETTINGS, isSanityConfigured } from "../lib/demoData"
import { Button } from "../components/ui/Button"
import { SavedOrder } from "../features/checkout/useCheckout"
import { CheckCircle2, MessageCircle, Copy, Check, ShieldCheck, Clock } from "lucide-react"
import { formatPrice } from "../lib/utils"

function formatOrderDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    })
  } catch {
    return iso
  }
}

function buildAdminWhatsAppMessage(order: SavedOrder, restaurantName: string): string {
  const itemLines = order.items
    .map(i => {
      const price = i.isExtraPortion && i.menuItem.extraPortionPrice
        ? i.menuItem.extraPortionPrice
        : i.menuItem.price
      const label = i.isExtraPortion ? `${i.menuItem.name} (Extra)` : i.menuItem.name
      return `  • ${i.quantity}x ${label} — ₦${(price * i.quantity).toLocaleString()}`
    })
    .join("\n")

  return encodeURIComponent(
    `🍽️ *NEW ORDER — ${order.reference}*\n\n` +
    `*Customer:* ${order.fullName}\n` +
    `*Phone:* ${order.phoneNumber}\n` +
    `*Email:* ${order.email}\n\n` +
    `*Items Ordered:*\n${itemLines}\n\n` +
    `*Order Total:* ₦${order.total.toLocaleString()}\n\n` +
    `*Delivery Address:*\n${order.address}\n\n` +
    `*Notes:* ${order.notes || "None"}\n\n` +
    `*Paystack Ref:* ${order.reference}\n` +
    `*Paid at:* ${formatOrderDate(order.paidAt)}\n\n` +
    `Please confirm and process this order.`
  )
}

function buildCustomerWhatsAppMessage(order: SavedOrder, restaurantName: string): string {
  return encodeURIComponent(
    `Hello ${restaurantName}! I just paid for my order.\n\n` +
    `*Order Ref:* ${order.reference}\n` +
    `*Name:* ${order.fullName}\n` +
    `*Total:* ₦${order.total.toLocaleString()}\n\n` +
    `Please confirm my order. Thank you!`
  )
}

export function OrderConfirmationPage() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const order     = location.state as SavedOrder | null
  const [copied, setCopied]           = useState(false)
  const [notified, setNotified]       = useState(false)

  const { data: settings } = useQuery<SiteSettings>({
    queryKey: ["siteSettings"],
    queryFn: async () => {
      if (!isSanityConfigured()) return DEMO_SETTINGS
      try {
        const r = await sanityClient.fetch(SITE_SETTINGS)
        return r ?? DEMO_SETTINGS
      } catch { return DEMO_SETTINGS }
    },
  })

  const raw = settings ?? DEMO_SETTINGS
  const waNumber       = (raw?.whatsappNumber || DEMO_SETTINGS.whatsappNumber).replace(/[^0-9]/g, "")
  const restaurantName = raw?.restaurantName  || DEMO_SETTINGS.restaurantName

  useEffect(() => {
    if (order) {
      document.title = `Order ${order.reference} — ${restaurantName}`
    }
  }, [order, restaurantName])

  if (!order || !order.reference) {
    return <Navigate to="/menu" replace />
  }

  const adminWaLink    = `https://wa.me/${waNumber}?text=${buildAdminWhatsAppMessage(order, restaurantName)}`
  const customerWaLink = `https://wa.me/${waNumber}?text=${buildCustomerWhatsAppMessage(order, restaurantName)}`

  const copyRef = () => {
    navigator.clipboard.writeText(order.reference).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="min-h-[80vh] bg-[#FEFDF9] py-16 px-4">
      <div className="container mx-auto max-w-2xl space-y-6">

        {/* ── Success header ── */}
        <div className="text-center space-y-3">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Payment Confirmed!</h1>
          <p className="text-gray-500">
            Thank you, <span className="font-semibold text-gray-800">{order.fullName}</span>. Your payment was received successfully.
          </p>
        </div>

        {/* ── Notify admin banner ── */}
        <div className="bg-[#1a3828] text-white rounded-2xl p-6 space-y-3">
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-sm">One last step — notify the restaurant</p>
              <p className="text-white/60 text-xs mt-0.5 leading-relaxed">
                Tap the button below to send your full order details to {restaurantName} on WhatsApp so they can prepare and deliver your order.
              </p>
            </div>
          </div>
          <a
            href={adminWaLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => setNotified(true)}
          >
            <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 border-0 text-white mt-1">
              <MessageCircle className="w-4 h-4" />
              {notified ? "Resend Order to Restaurant" : "Send My Order to Restaurant via WhatsApp"}
            </Button>
          </a>
          {notified && (
            <p className="text-green-400 text-xs text-center flex items-center justify-center gap-1">
              <Check className="w-3.5 h-3.5" /> WhatsApp opened — your order details have been sent
            </p>
          )}
        </div>

        {/* ── Order receipt ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Order Receipt</p>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-gray-800">{order.reference}</span>
                <button
                  onClick={copyRef}
                  className="text-gray-400 hover:text-primary transition-colors"
                  title="Copy reference"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                {formatOrderDate(order.paidAt)}
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="px-6 py-4 space-y-3 border-b border-gray-100">
            {order.items.map((item, idx) => {
              const price = item.isExtraPortion && item.menuItem.extraPortionPrice
                ? item.menuItem.extraPortionPrice
                : item.menuItem.price
              return (
                <div key={idx} className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {item.quantity}x {item.menuItem.name}
                    </p>
                    {item.isExtraPortion && (
                      <p className="text-xs text-accent mt-0.5">Extra Portion</p>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                    {formatPrice(price * item.quantity)}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Total */}
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <span className="font-bold text-gray-900">Total Paid</span>
            <span className="font-bold text-xl text-primary">{formatPrice(order.total)}</span>
          </div>

          {/* Delivery info */}
          <div className="px-6 py-5 space-y-3 bg-gray-50/50">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Delivery Address</p>
              <p className="text-sm text-gray-700">{order.address}</p>
            </div>
            {order.notes && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Order Notes</p>
                <p className="text-sm text-gray-700">{order.notes}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Contact</p>
              <p className="text-sm text-gray-700">{order.phoneNumber} · {order.email}</p>
            </div>
          </div>
        </div>

        {/* ── Evidence note ── */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700">
          <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
          <span>
            <strong>Keep this as your proof of payment.</strong> Screenshot this page or note your order reference <strong>{order.reference}</strong>. This order is also saved in your browser.
          </span>
        </div>

        {/* ── Secondary actions ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={customerWaLink} target="_blank" rel="noreferrer" className="flex-1">
            <Button variant="outline" className="w-full gap-2">
              <MessageCircle className="w-4 h-4" />
              Track My Order on WhatsApp
            </Button>
          </a>
          <Button variant="outline" className="flex-1" onClick={() => navigate("/menu")}>
            Back to Menu
          </Button>
        </div>

      </div>
    </div>
  )
}
