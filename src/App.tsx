import { useCallback, useEffect, useState } from 'react'
import { ShowroomScene } from './components/scene/ShowroomScene'
import { Crosshair } from './components/ui/Crosshair'
import { ProductModal } from './components/ui/ProductModal'
import { WishlistPanel } from './components/ui/WishlistPanel'
import { MiniMap } from './components/ui/MiniMap'
import { StartOverlay } from './components/ui/StartOverlay'
import { PointerLockBanner } from './components/ui/PointerLockBanner'
import { useInteractionStore } from './store/interactionStore'
import { CATEGORY_LABELS } from './types'
import { resumeAudio } from './services/soundManager'

export default function App() {
  const [started, setStarted] = useState(false)
  const isPointerLocked = useInteractionStore((s) => s.isPointerLocked)
  const isModalOpen = useInteractionStore((s) => s.isModalOpen)
  const isWishlistOpen = useInteractionStore((s) => s.isWishlistOpen)
  const hoveredCategory = useInteractionStore((s) => s.hoveredCategory)
  const closeProductModal = useInteractionStore((s) => s.closeProductModal)
  const closeWishlist = useInteractionStore((s) => s.closeWishlist)

  const requestCanvasLock = useCallback(() => {
    document.querySelector('canvas')?.requestPointerLock()
  }, [])

  const handleStart = useCallback(() => {
    setStarted(true)
    resumeAudio()
    requestAnimationFrame(requestCanvasLock)
  }, [requestCanvasLock])

  const handleResume = useCallback(() => {
    closeProductModal()
    requestAnimationFrame(requestCanvasLock)
  }, [closeProductModal, requestCanvasLock])

  const handleResumeFromWishlist = useCallback(() => {
    closeWishlist()
    requestAnimationFrame(requestCanvasLock)
  }, [closeWishlist, requestCanvasLock])

  const anyOverlayOpen = isModalOpen || isWishlistOpen

  useEffect(() => {
    document.body.classList.toggle('showroom-modal-open', anyOverlayOpen)
    if (anyOverlayOpen) {
      window.getSelection()?.removeAllRanges()
    }
    return () => document.body.classList.remove('showroom-modal-open')
  }, [anyOverlayOpen])

  const showLockBanner =
    started && !anyOverlayOpen && !isPointerLocked

  return (
    <div className="relative h-full w-full">
      <ShowroomScene controlsEnabled={started} />

      {!started && <StartOverlay onStart={handleStart} />}

      {showLockBanner && (
        <PointerLockBanner visible onReLock={requestCanvasLock} />
      )}

      {started && !anyOverlayOpen && isPointerLocked && (
        <Crosshair active={!!hoveredCategory} />
      )}

      <MiniMap visible={started && !anyOverlayOpen} />

      {started && isPointerLocked && !anyOverlayOpen && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white/90 backdrop-blur">
          {hoveredCategory
            ? `کلیک — خرید · E — افزودن به لیست (${CATEGORY_LABELS[hoveredCategory]})`
            : 'روی وسایل نگاه کنید · کلیک برای خرید · E برای افزودن به لیست · Tab برای لیست خرید'}
        </div>
      )}

      <ProductModal />
      <WishlistPanel />

      {isModalOpen && (
        <button
          type="button"
          onClick={handleResume}
          className="fixed bottom-6 left-6 z-[60] rounded-xl bg-slate-800/90 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-slate-700"
        >
          ادامه گشت‌وگذار
        </button>
      )}

      {isWishlistOpen && (
        <button
          type="button"
          onClick={handleResumeFromWishlist}
          className="fixed bottom-6 left-6 z-[60] rounded-xl bg-slate-800/90 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-slate-700"
        >
          ادامه گشت‌وگذار
        </button>
      )}
    </div>
  )
}
