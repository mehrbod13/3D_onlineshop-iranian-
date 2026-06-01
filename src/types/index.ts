/** Supported furniture categories — each maps to a Digikala search query. */
export type FurnitureCategory =
  | 'sofa'
  | 'lamp'
  | 'tv'
  | 'tvStand'
  | 'diningTable'
  | 'chair'
  | 'fridge'
  | 'kitchenCabinets'
  | 'coffeeTable'
  | 'bookshelf'
  | 'plant'
  | 'microwave'
  | 'bed'
  | 'sideTable'
  | 'carpet'
  | 'stove'
  | 'washingMachine'
  | 'sink'
  | 'dishwasher'

export type ProductSource = 'digikala' | 'mock'

/** Product card — live from Digikala or local fallback. */
export interface Product {
  id: string
  title: string
  /** Price in Tomans */
  price: number
  original_price?: number
  discount_percent?: number
  image_url: string
  shop_link: string
  rating?: number
  rating_count?: number
  source: ProductSource
}

/** Metadata attached to each interactive mesh in the scene. */
export interface InteractiveObjectMeta {
  id: string
  category: FurnitureCategory
  label: string
}

/** Persian labels for each furniture category. */
export const CATEGORY_LABELS: Record<FurnitureCategory, string> = {
  sofa: 'مبل',
  lamp: 'آباژور',
  tv: 'تلویزیون',
  tvStand: 'میز تلویزیون',
  diningTable: 'میز ناهارخوری',
  chair: 'صندلی',
  fridge: 'یخچال',
  kitchenCabinets: 'کابینت آشپزخانه',
  coffeeTable: 'میز جلو مبلی',
  bookshelf: 'قفسه کتاب',
  plant: 'گلدان',
  microwave: 'مایکروویو',
  bed: 'تخت خواب',
  sideTable: 'میز کناری',
  carpet: 'فرش',
  stove: 'اجاق گاز',
  washingMachine: 'ماشین لباسشویی',
  sink: 'سینک',
  dishwasher: 'ماشین ظرفشویی',
}

/** Format price in Tomans with Persian locale separators. */
export function formatTomans(price: number): string {
  return `${price.toLocaleString('fa-IR')} تومان`
}
