import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartState, MenuItem } from '../../types'

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      addItem: (item: MenuItem, isExtra = false) => {
        const currentItems = get().items
        const existingItem = currentItems.find(
          (i) => i.menuItem._id === item._id && i.isExtraPortion === isExtra
        )

        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.menuItem._id === item._id && i.isExtraPortion === isExtra
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            isDrawerOpen: true
          })
        } else {
          set({ items: [...currentItems, { menuItem: item, quantity: 1, isExtraPortion: isExtra }], isDrawerOpen: true })
        }
      },
      removeItem: (id: string, isExtra: boolean) => {
        set({
          items: get().items.filter(
            (i) => !(i.menuItem._id === id && i.isExtraPortion === isExtra)
          ),
        })
      },
      updateQuantity: (id: string, isExtra: boolean, quantity: number) => {
        if (quantity < 1) return
        set({
          items: get().items.map((i) =>
            i.menuItem._id === id && i.isExtraPortion === isExtra
              ? { ...i, quantity }
              : i
          ),
        })
      },
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const itemPrice = item.isExtraPortion && item.menuItem.extraPortionPrice 
            ? item.menuItem.extraPortionPrice 
            : item.menuItem.price
          return total + itemPrice * item.quantity
        }, 0)
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'restaurant-cart',
    }
  )
)
