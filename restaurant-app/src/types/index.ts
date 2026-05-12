export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface Category {
  _id: string
  name: string
  slug: { current: string }
  sortOrder: number
}

export interface MenuItem {
  _id: string
  name: string
  slug: { current: string }
  category: Category
  description?: string
  price: number
  extraPortionPrice?: number
  image: SanityImage
  isAvailable: boolean
  isFeatured: boolean
  tags?: string[]
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
  isExtraPortion: boolean
}

export interface CartState {
  items: CartItem[]
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  addItem: (item: MenuItem, isExtra?: boolean) => void
  removeItem: (id: string, isExtra: boolean) => void
  updateQuantity: (id: string, isExtra: boolean, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export interface SiteSettings {
  restaurantName: string
  tagline?: string
  heroHeadline: string
  heroSubtext: string
  heroImage: SanityImage
  phoneNumber?: string
  email?: string
  whatsappNumber: string
  address: string
  openingHours: string
  socialLinks?: {
    instagram?: string
    facebook?: string
    twitter?: string
    tiktok?: string
    youtube?: string
  }
}
