interface StartOverlayProps {
  onStart: () => void
}

/** Initial screen before pointer lock is requested. */
export function StartOverlay({ onStart }: StartOverlayProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 backdrop-blur-md">
      <div className="mx-4 max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-8 text-center shadow-2xl">
        <div className="mb-2 text-sm font-medium text-orange-400">Virtual Showroom</div>
        <h1 className="mb-4 text-3xl font-bold text-white">فروشگاه مجازی ۳D</h1>
        <p className="mb-8 leading-7 text-slate-300">
          با حرکت ماوس به اطراف نگاه کنید. نشانه‌گیر وسط صفحه را روی وسایل بگذارید
          و برای مشاهده محصولات کلیک کنید.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="w-full rounded-xl bg-orange-500 px-6 py-3.5 text-lg font-bold text-white transition hover:bg-orange-400"
        >
          ورود به نمایشگاه
        </button>
        <p className="mt-4 text-xs text-slate-500">
          WASD حرکت · کلیک یا E انتخاب · ESC آزاد کردن موس
        </p>
      </div>
    </div>
  )
}
