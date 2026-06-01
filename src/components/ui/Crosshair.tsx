interface CrosshairProps {
  active: boolean
}

/** Fixed center-screen crosshair for FPS targeting. */
export function Crosshair({ active }: CrosshairProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center"
      aria-hidden
    >
      <div
        className={`relative h-6 w-6 transition-all duration-200 ${
          active ? 'scale-110 opacity-100' : 'scale-100 opacity-70'
        }`}
      >
        <span
          className={`absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rounded-full transition-colors ${
            active ? 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]' : 'bg-white/80'
          }`}
        />
        <span
          className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full transition-colors ${
            active ? 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]' : 'bg-white/80'
          }`}
        />
      </div>
    </div>
  )
}
