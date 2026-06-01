import { useEffect, type MouseEvent } from 'react'
import { CATEGORY_LABELS, formatTomans } from '../../types'
import { useInteractionStore } from '../../store/interactionStore'

export function ProductModal() {
  const isModalOpen = useInteractionStore((s) => s.isModalOpen)
  const selectedCategory = useInteractionStore((s) => s.selectedCategory)
  const products = useInteractionStore((s) => s.products)
  const isLoadingProducts = useInteractionStore((s) => s.isLoadingProducts)
  const productSource = useInteractionStore((s) => s.productSource)
  const fetchNotice = useInteractionStore((s) => s.fetchNotice)
  const closeProductModal = useInteractionStore((s) => s.closeProductModal)

  useEffect(() => {
    if (!isModalOpen) return
    window.getSelection()?.removeAllRanges()
  }, [isModalOpen, products])

  if (!isModalOpen || !selectedCategory) return null

  const categoryLabel = CATEGORY_LABELS[selectedCategory]
  const isLive = productSource === 'digikala'

  const stopSelect = (e: MouseEvent) => {
    e.preventDefault()
    window.getSelection()?.removeAllRanges()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-4 backdrop-blur-sm sm:items-center select-none"
      onMouseDown={stopSelect}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-l from-red-50 to-white px-6 py-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-md bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                دیجی‌کالا
              </span>
              {isLive && (
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  قیمت زنده
                </span>
              )}
            </div>
            <h2
              id="product-modal-title"
              className="select-none text-xl font-bold text-slate-800"
            >
              {categoryLabel} — محصولات
            </h2>
          </div>
          <button
            type="button"
            onClick={closeProductModal}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
          >
            بستن
          </button>
        </div>

        {fetchNotice && (
          <div className="border-b border-amber-100 bg-amber-50 px-6 py-2 text-center text-xs text-amber-800 select-none">
            {fetchNotice}
          </div>
        )}

        <div className="overflow-y-auto p-6 select-text">
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="mb-4 aspect-square rounded-lg bg-slate-200" />
                  <div className="mb-2 h-4 rounded bg-slate-200" />
                  <div className="h-4 w-2/3 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="py-12 text-center text-slate-500">محصولی یافت نشد.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-50">
                    {product.discount_percent ? (
                      <span className="absolute left-2 top-2 z-10 rounded-md bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                        {product.discount_percent}٪
                      </span>
                    ) : null}
                    <img
                      src={product.image_url}
                      alt={product.title}
                      draggable={false}
                      className="pointer-events-none h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://www.digikala.com/statics/img/svg/logo.svg'
                      }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="mb-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-800">
                      {product.title}
                    </h3>
                    {product.rating != null && (
                      <p className="mb-2 text-xs text-slate-500">
                        امتیاز: {product.rating.toLocaleString('fa-IR')}
                        {product.rating_count
                          ? ` (${product.rating_count.toLocaleString('fa-IR')} نظر)`
                          : ''}
                      </p>
                    )}
                    <div className="mb-4">
                      <p className="text-lg font-bold text-red-600">
                        {formatTomans(product.price)}
                      </p>
                      {product.original_price &&
                        product.original_price > product.price && (
                          <p className="text-sm text-slate-400 line-through">
                            {formatTomans(product.original_price)}
                          </p>
                        )}
                    </div>
                    <a
                      href={product.shop_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      خرید از دیجی‌کالا
                      <span aria-hidden>↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 bg-slate-50 px-6 py-3 text-center text-xs text-slate-500 select-none">
          {isLive
            ? 'قیمت‌ها از API دیجی‌کالا — دکمه خرید به صفحه محصول می‌رود.'
            : 'دیجی‌کالا از شبکه در دسترس نیست — کاتالوگ آفلاین نمایش داده شد.'}
        </div>
      </div>
    </div>
  )
}
