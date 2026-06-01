import type { FurnitureCategory, Product, ProductSource } from '../types'
import { fetchDigikalaProducts } from './digikalaApi'
import { fetchFallbackProducts } from '../data/mockProducts'

export interface ProductFetchResult {
  products: Product[]
  source: ProductSource
  error?: string
}

function formatFetchError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err)
  if (
    raw.includes('ENOTFOUND') ||
    raw.includes('getaddrinfo') ||
    raw.includes('Failed to fetch') ||
    raw.includes('NetworkError') ||
    raw.includes('aborted')
  ) {
    return 'دیجی‌کالا از شبکه شما در دسترس نیست (DNS، فیلترینگ یا VPN) — کاتالوگ آفلاین نمایش داده شد'
  }
  return `خطا در اتصال به دیجی‌کالا: ${raw} — کاتالوگ آفلاین`
}

export async function fetchProductsByCategory(
  category: FurnitureCategory,
): Promise<ProductFetchResult> {
  try {
    const products = await fetchDigikalaProducts(category)

    if (products.length > 0) {
      return { products, source: 'digikala' }
    }

    const fallback = await fetchFallbackProducts(category)
    return {
      products: fallback,
      source: 'mock',
      error: 'دیجی‌کالا محصولی برنگرداند — کاتالوگ آفلاین',
    }
  } catch (err) {
    const fallback = await fetchFallbackProducts(category)
    return {
      products: fallback,
      source: 'mock',
      error: formatFetchError(err),
    }
  }
}
