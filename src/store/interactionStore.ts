import { create } from 'zustand'
import type { FurnitureCategory, Product, ProductSource } from '../types'
import { fetchProductsByCategory } from '../services/productService'

export interface WishlistItem {
  product: Product
  category: FurnitureCategory
}

interface InteractionState {
  hoveredObjectId: string | null
  hoveredCategory: FurnitureCategory | null
  selectedCategory: FurnitureCategory | null
  isModalOpen: boolean
  isPointerLocked: boolean
  products: Product[]
  isLoadingProducts: boolean
  productSource: ProductSource | null
  fetchNotice: string | null
  setHovered: (id: string | null, category: FurnitureCategory | null) => void
  setPointerLocked: (locked: boolean) => void
  openProductModal: (category: FurnitureCategory) => Promise<void>
  closeProductModal: () => void

  // Player transform for the minimap — updated ~10x/sec from PlayerTracker, not every frame.
  playerX: number
  playerZ: number
  playerYaw: number
  setPlayerTransform: (x: number, z: number, yaw: number) => void

  // Wishlist — quiet "add for later" flow triggered by the E key
  wishlist: WishlistItem[]
  pendingWishlistCategory: FurnitureCategory | null
  isWishlistOpen: boolean
  addToWishlist: (category: FurnitureCategory) => Promise<void>
  removeFromWishlist: (category: FurnitureCategory) => void
  toggleWishlist: () => void
  closeWishlist: () => void
}

export const useInteractionStore = create<InteractionState>((set, get) => ({
  hoveredObjectId: null,
  hoveredCategory: null,
  selectedCategory: null,
  isModalOpen: false,
  isPointerLocked: false,
  products: [],
  isLoadingProducts: false,
  productSource: null,
  fetchNotice: null,

  setHovered: (id, category) =>
    set({ hoveredObjectId: id, hoveredCategory: category }),

  setPointerLocked: (locked) => set({ isPointerLocked: locked }),

  playerX: 0,
  playerZ: 3,
  playerYaw: 0,
  setPlayerTransform: (x, z, yaw) => set({ playerX: x, playerZ: z, playerYaw: yaw }),

  openProductModal: async (category) => {
    set({
      isModalOpen: true,
      selectedCategory: category,
      isLoadingProducts: true,
      products: [],
      productSource: null,
      fetchNotice: null,
    })

    const { products, source, error } = await fetchProductsByCategory(category)

    set({
      products,
      isLoadingProducts: false,
      productSource: source,
      fetchNotice: error ?? null,
    })
  },

  closeProductModal: () =>
    set({
      isModalOpen: false,
      selectedCategory: null,
      products: [],
      isLoadingProducts: false,
      productSource: null,
      fetchNotice: null,
    }),

  wishlist: [],
  pendingWishlistCategory: null,
  isWishlistOpen: false,

  addToWishlist: async (category) => {
    const already = get().wishlist.some((item) => item.category === category)
    if (already || get().pendingWishlistCategory === category) return

    set({ pendingWishlistCategory: category })

    try {
      const { products } = await fetchProductsByCategory(category)
      const top = products[0]
      if (!top) return

      set((state) =>
        state.wishlist.some((item) => item.category === category)
          ? state
          : { wishlist: [...state.wishlist, { product: top, category }] },
      )
    } finally {
      set({ pendingWishlistCategory: null })
    }
  },

  removeFromWishlist: (category) =>
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.category !== category),
    })),

  toggleWishlist: () => set((state) => ({ isWishlistOpen: !state.isWishlistOpen })),

  closeWishlist: () => set({ isWishlistOpen: false }),
}))
