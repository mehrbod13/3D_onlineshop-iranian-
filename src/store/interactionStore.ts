import { create } from 'zustand'
import type { FurnitureCategory, Product, ProductSource } from '../types'
import { fetchProductsByCategory } from '../services/productService'

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
}

export const useInteractionStore = create<InteractionState>((set) => ({
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
}))
