import { PointerLockControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import type { PointerLockControls as PointerLockControlsImpl } from 'three-stdlib'
import { useInteractionStore } from '../../store/interactionStore'

interface CameraControllerProps {
  enabled: boolean
}

/** FPS mouse-look; syncs lock state and re-enables after unlock. */
export function CameraController({ enabled }: CameraControllerProps) {
  const controlsRef = useRef<PointerLockControlsImpl>(null)
  const setPointerLocked = useInteractionStore((s) => s.setPointerLocked)

  useEffect(() => {
    const syncLock = () => {
      setPointerLocked(document.pointerLockElement !== null)
    }
    document.addEventListener('pointerlockchange', syncLock)
    return () => document.removeEventListener('pointerlockchange', syncLock)
  }, [setPointerLocked])

  return (
    <PointerLockControls
      ref={controlsRef}
      enabled={enabled}
      selector="canvas"
      onLock={() => setPointerLocked(true)}
      onUnlock={() => setPointerLocked(false)}
    />
  )
}
