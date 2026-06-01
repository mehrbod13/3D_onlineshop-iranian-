interface PointerLockBannerProps {
  visible: boolean
  onReLock: () => void
}

/** Shown when mouse-look was lost but the user is still exploring. */
export function PointerLockBanner({ visible, onReLock }: PointerLockBannerProps) {
  if (!visible) return null

  return (
    <button
      type="button"
      onClick={onReLock}
      className="fixed top-6 left-1/2 z-30 -translate-x-1/2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-400"
    >
      کلیک کنید — فعال‌سازی دوباره نگاه با موس
    </button>
  )
}
