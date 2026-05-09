import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PageWrapper } from "./components/layout/PageWrapper"
import { CartDrawer } from "./components/cart/CartDrawer"
import { AppRoutes } from "./routes/AppRoutes"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PageWrapper>
          <AppRoutes />
          <CartDrawer />
        </PageWrapper>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
