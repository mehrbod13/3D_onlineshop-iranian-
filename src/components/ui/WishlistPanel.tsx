import { useState, type MouseEvent } from 'react'
import { CATEGORY_LABELS, formatTomans } from '../../types'
import { useInteractionStore } from '../../store/interactionStore'

/**
 * Corner badge + Tab-toggled panel for items saved with "E" while exploring.
 * Unlike ProductModal (click → buy now), this list is for "decide later":
 * items pile up quietly, then get reviewed and purchased all at once.
 */
export function WishlistPanel() {
  const wishlist = useInteractionStore((s) => s.wishlist)
  const isWishlistOpen = useInteractionStore((s) => s.isWishlistOpen)
  const pendingCategory = useInteractionStore((s) => s.pendingWishlistCategory)
  const toggleWishlist = useInteractionStore((s) => s.toggleWishlist)
  const closeWishlist = useInteractionStore((s) => s.closeWishlist)
  const removeFromWishlist = useInteractionStore((s) => s.removeFromWishlist)

  const [isOpeningAll, setIsOpeningAll] = useState(false)

  const total = wishlist.reduce((sum, item) => sum + item.product.price, 0)

  const stopSelect = (e: MouseEvent) => {
    e.preventDefault()
    window.getSelection()?.removeAllRanges()
  }

  const openAll = () => {
    if (wishlist.length === 0 || isOpeningAll) return
    setIsOpeningAll(true)
    // Stagger the tab opens — browsers block a burst of window.open() calls
    // fired back-to-back as a popup flood, even from a genuine click.
    wishlist.forEach((item, i) => {
      window.setTimeout(() => {
        window.open(item.product.shop_link, '_blank', 'noopener,noreferrer')
        if (i === wishlist.length - 1) setIsOpeningAll(false)
      }, i * 350)
    })
  }

  return (
    <>
      {/* Corner badge — always visible once something is saved, click or Tab to expand */}
      {!isWishlistOpen && wishlist.length > 0 && (
        <button
          type="button"
          onClick={toggleWishlist}
          className="fixed left-6 top-6 z-40 flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:bg-slate-800"
        >
          <span aria-hidden>🛒</span>
          لیست من ({wishlist.length.toLocaleString('fa-IR')})
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-normal text-white/70">
            Tab
          </span>
        </button>
      )}

      {isWishlistOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-4 backdrop-blur-sm sm:items-center select-none"
          onMouseDown={stopSelect}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wishlist-title"
            className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-l from-orange-50 to-white px-6 py-4">
              <h2 id="wishlist-title" className="text-xl font-bold text-slate-800">
                لیست خرید من
              </h2>
              <button
                type="button"
                onClick={closeWishlist}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
              >
                بستن
              </button>
            </div>

            <div className="overflow-y-auto p-6 select-text">
              {wishlist.length === 0 ? (
                <p className="py-12 text-center text-slate-500">
                  هنوز چیزی اضافه نکردی — روی هر وسیله نگاه کن و E رو بزن.
                </p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {wishlist.map((item) => (
                    <li
                      key={item.category}
                      className="flex items-center gap-4 rounded-xl border border-slate-100 p-3"
                    >
                      <img
                        src={item.product.image_url}
                        alt={item.product.title}
                        draggable={false}
                        className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://www.digikala.com/statics/img/svg/logo.svg'
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="mb-1 text-xs font-medium text-orange-600">
                          {CATEGORY_LABELS[item.category]}
                        </p>
                        <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-slate-800">
                          {item.product.title}
                        </h3>
                        <p className="text-sm font-bold text-red-600">
                          {formatTomans(item.product.price)}
                        </p>
                      </div>
                      <a
                        href={item.product.shop_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
                      >
                        خرید
                      </a>
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(item.category)}
                        className="flex-shrink-0 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-200"
                      >
                        حذف
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {pendingCategory && (
                <p className="mt-3 text-center text-xs text-slate-400">
                  در حال افزودن {CATEGORY_LABELS[pendingCategory]}…
                </p>
              )}
            </div>

            {wishlist.length > 0 && (
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4">
                <div>
                  <p className="text-xs text-slate-500">جمع کل</p>
                  <p className="text-lg font-bold text-slate-800">
                    {formatTomans(total)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openAll}
                  disabled={isOpeningAll}
                  className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
                >
                  {isOpeningAll
                    ? 'در حال باز کردن...'
                    : `مشاهده و خرید همه (${wishlist.length.toLocaleString('fa-IR')})`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
