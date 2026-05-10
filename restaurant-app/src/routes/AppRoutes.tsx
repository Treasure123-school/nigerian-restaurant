import { Routes, Route } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { MenuPage } from "../pages/MenuPage"
import { CartPage } from "../pages/CartPage"
import { CheckoutPage } from "../pages/CheckoutPage"
import { OrderConfirmationPage } from "../pages/OrderConfirmationPage"
import { ContactPage } from "../pages/ContactPage"
import { ServicesPage } from "../pages/ServicesPage"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/"                    element={<HomePage />} />
      <Route path="/menu"                element={<MenuPage />} />
      <Route path="/services"            element={<ServicesPage />} />
      <Route path="/cart"                element={<CartPage />} />
      <Route path="/checkout"            element={<CheckoutPage />} />
      <Route path="/order-confirmation"  element={<OrderConfirmationPage />} />
      <Route path="/contact"             element={<ContactPage />} />
    </Routes>
  )
}
