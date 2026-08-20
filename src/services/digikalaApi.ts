import type { FurnitureCategory, Product } from '../types'

const PROXY_BASE = import.meta.env.VITE_DIGIKALA_PROXY ?? '/api/digikala'
const DIRECT_BASE = 'https://api.digikala.com'
const FETCH_TIMEOUT_MS = 10_000

/** Persian search terms mapped to each showroom object category. */
export const DIGIKALA_SEARCH_QUERIES: Record<FurnitureCategory, string> = {
  sofa: 'مبل راحتی',
  lamp: 'آباژور ایستاده',
  tv: 'تلویزیون',
  tvStand: 'میز تلویزیون',
  diningTable: 'میز ناهارخوری',
  chair: 'صندلی ناهارخوری',
  fridge: 'یخچال فریزر',
  kitchenCabinets: 'کابینت آشپزخانه',
  coffeeTable: 'میز جلو مبلی',
  bookshelf: 'قفسه کتاب',
  plant: 'گلدان تزئینی',
  microwave: 'مایکروویو',
  bed: 'تخت خواب دو نفره',
  sideTable: 'میز پاتختی',
  carpet: 'فرش ماشینی',
  stove: 'اجاق گاز',
  washingMachine: 'ماشین لباسشویی',
  sink: 'سینک ظرفشویی',
  dishwasher: 'ماشین ظرفشویی',
  armchair: 'مبل تک نفره',
  wardrobe: 'کمد لباس',
  mirror: 'آینه دیواری',
  wallArt: 'تابلو دیواری',
  chandelier: 'لوستر',
  desk: 'میز تحریر',
}

interface DigikalaPrice {
  selling_price: number
  rrp_price: number
  discount_percent?: number
}

interface DigikalaSearchProduct {
  id: number
  title_fa: string
  url: { uri: string }
  images?: { main?: { url?: string[] } }
  default_variant?: { price?: DigikalaPrice }
  rating?: { rate: number; count: number }
}

interface DigikalaSearchResponse {
  status: number
  data?: { products?: DigikalaSearchProduct[] }
}

function rialsToTomans(rials: number): number {
  return Math.round(rials / 10)
}

function mapDigikalaProduct(item: DigikalaSearchProduct): Product | null {
  const sellingRial = item.default_variant?.price?.selling_price
  if (!sellingRial || !item.title_fa) return null

  const rrpRial = item.default_variant?.price?.rrp_price ?? sellingRial
  const uri = item.url?.uri ?? `/product/dkp-${item.id}/`

  return {
    id: String(item.id),
    title: item.title_fa,
    price: rialsToTomans(sellingRial),
    original_price:
      rrpRial > sellingRial ? rialsToTomans(rrpRial) : undefined,
    discount_percent: item.default_variant?.price?.discount_percent,
    image_url: item.images?.main?.url?.[0] ?? '',
    shop_link: `https://www.digikala.com${uri}`,
    rating: item.rating?.rate,
    rating_count: item.rating?.count,
    source: 'digikala',
  }
}

async function fetchSearchUrl(url: string): Promise<Product[]> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`Digikala HTTP ${response.status}`)
    }

    const json = (await response.json()) as DigikalaSearchResponse

    if (json.status !== 200 || !json.data?.products?.length) {
      return []
    }

    return json.data.products
      .map(mapDigikalaProduct)
      .filter((p): p is Product => p !== null)
      .slice(0, 12)
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Tries Vite proxy first, then direct API (some networks resolve in browser only).
 */
export async function fetchDigikalaProducts(
  category: FurnitureCategory,
  page = 1,
): Promise<Product[]> {
  const query = encodeURIComponent(DIGIKALA_SEARCH_QUERIES[category])
  const path = `/v1/search/?q=${query}&page=${page}`

  const endpoints = [`${PROXY_BASE}${path}`, `${DIRECT_BASE}${path}`]
  let lastError: Error | null = null

  for (const url of endpoints) {
    try {
      const products = await fetchSearchUrl(url)
      if (products.length > 0) return products
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
    }
  }

  throw lastError ?? new Error('Digikala unreachable')
}
