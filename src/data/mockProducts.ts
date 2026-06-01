import type { FurnitureCategory, Product } from '../types'

const MOCK_DELAY_MS = 400

type ProductDraft = Omit<Product, 'source'>

const withMock = (items: ProductDraft[]): Product[] =>
  items.map((p) => ({ ...p, source: 'mock' as const }))

const PRODUCT_CATALOG: Record<FurnitureCategory, ProductDraft[]> = {
  sofa: [
    {
      id: 'sofa-1',
      title: 'مبل راحتی سه نفره مدل لینا',
      price: 18_900_000,
      image_url: 'https://picsum.photos/seed/sofa1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=مبل+راحتی',
    },
  ],
  lamp: [
    {
      id: 'lamp-1',
      title: 'آباژور ایستاده مدل نوردیک',
      price: 2_450_000,
      image_url: 'https://picsum.photos/seed/lamp1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=آباژور',
    },
  ],
  tv: [
    {
      id: 'tv-1',
      title: 'تلویزیون ۵۵ اینچ QLED',
      price: 42_800_000,
      image_url: 'https://picsum.photos/seed/tv1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=تلویزیون',
    },
  ],
  tvStand: [
    {
      id: 'tvstand-1',
      title: 'میز تلویزیون MDF ۱۶۰ سانتی',
      price: 4_200_000,
      image_url: 'https://picsum.photos/seed/tvstand1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=میز+تلویزیون',
    },
  ],
  diningTable: [
    {
      id: 'table-1',
      title: 'میز ناهارخوری ۶ نفره چوب راش',
      price: 12_600_000,
      image_url: 'https://picsum.photos/seed/table1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=میز+ناهارخوری',
    },
  ],
  chair: [
    {
      id: 'chair-1',
      title: 'صندلی ناهارخوری ۴ پایه',
      price: 2_100_000,
      image_url: 'https://picsum.photos/seed/chair1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=صندلی',
    },
  ],
  fridge: [
    {
      id: 'fridge-1',
      title: 'یخچال فریزر دوقلو ۳۲ فوت',
      price: 58_000_000,
      image_url: 'https://picsum.photos/seed/fridge1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=یخچال',
    },
  ],
  kitchenCabinets: [
    {
      id: 'cabinet-1',
      title: 'کابینت آشپزخانه MDF',
      price: 28_000_000,
      image_url: 'https://picsum.photos/seed/cabinet1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=کابینت',
    },
  ],
  coffeeTable: [
    {
      id: 'coffee-1',
      title: 'میز جلو مبلی شیشه‌ای',
      price: 3_200_000,
      image_url: 'https://picsum.photos/seed/coffee1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=میز+جلو+مبلی',
    },
  ],
  bookshelf: [
    {
      id: 'shelf-1',
      title: 'قفسه کتاب ۵ طبقه',
      price: 4_500_000,
      image_url: 'https://picsum.photos/seed/shelf1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=قفسه+کتاب',
    },
  ],
  plant: [
    {
      id: 'plant-1',
      title: 'گلدان تزئینی سرامیکی',
      price: 890_000,
      image_url: 'https://picsum.photos/seed/plant1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=گلدان',
    },
  ],
  microwave: [
    {
      id: 'micro-1',
      title: 'مایکروویو ۲۵ لیتری',
      price: 6_400_000,
      image_url: 'https://picsum.photos/seed/micro1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=مایکروویو',
    },
  ],
  bed: [
    {
      id: 'bed-1',
      title: 'تخت خواب دو نفره',
      price: 22_000_000,
      image_url: 'https://picsum.photos/seed/bed1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=تخت+خواب',
    },
  ],
  sideTable: [
    {
      id: 'side-1',
      title: 'میز پاتختی چوبی',
      price: 1_800_000,
      image_url: 'https://picsum.photos/seed/side1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=میز+پاتختی',
    },
  ],
  carpet: [
    {
      id: 'carpet-1',
      title: 'فرش ماشینی ۶ متری',
      price: 8_500_000,
      image_url: 'https://picsum.photos/seed/carpet1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=فرش',
    },
  ],
  stove: [
    {
      id: 'stove-1',
      title: 'اجاق گاز چهار شعله استیل',
      price: 12_500_000,
      image_url: 'https://picsum.photos/seed/stove1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=اجاق+گاز',
    },
    {
      id: 'stove-2',
      title: 'اجاق گاز صفحه‌ای شیشه‌ای',
      price: 18_900_000,
      image_url: 'https://picsum.photos/seed/stove2/400/400',
      shop_link: 'https://www.digikala.com/search/?q=اجاق+گاز+صفحه+ای',
    },
  ],
  washingMachine: [
    {
      id: 'wash-1',
      title: 'ماشین لباسشویی ۸ کیلو سامسونگ',
      price: 28_400_000,
      image_url: 'https://picsum.photos/seed/wash1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=ماشین+لباسشویی',
    },
    {
      id: 'wash-2',
      title: 'ماشین لباسشویی ۹ کیلو ال‌جی',
      price: 32_000_000,
      image_url: 'https://picsum.photos/seed/wash2/400/400',
      shop_link: 'https://www.digikala.com/search/?q=لباسشویی+9+کیلو',
    },
  ],
  sink: [
    {
      id: 'sink-1',
      title: 'سینک ظرفشویی دوگانه استیل',
      price: 5_600_000,
      image_url: 'https://picsum.photos/seed/sink1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=سینک+ظرفشویی',
    },
  ],
  dishwasher: [
    {
      id: 'dish-1',
      title: 'ماشین ظرفشویی ۱۴ نفره بوش',
      price: 42_000_000,
      image_url: 'https://picsum.photos/seed/dish1/400/400',
      shop_link: 'https://www.digikala.com/search/?q=ماشین+ظرفشویی',
    },
    {
      id: 'dish-2',
      title: 'ماشین ظرفشویی رومیزی',
      price: 9_800_000,
      image_url: 'https://picsum.photos/seed/dish2/400/400',
      shop_link: 'https://www.digikala.com/search/?q=ظرفشویی',
    },
  ],
}

/** Offline fallback when Digikala API is unreachable. */
export async function fetchFallbackProducts(
  category: FurnitureCategory,
): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
  return withMock(PRODUCT_CATALOG[category] ?? [])
}
