import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'
import { useInteractionStore } from '../../store/interactionStore'
import { playFootstep } from '../../services/soundManager'

const _dir = new THREE.Vector3()
const TRANSFORM_UPDATE_INTERVAL = 0.1 // seconds — minimap doesn't need 60fps
const STEP_INTERVAL = 0.32 // seconds between footstep taps while walking

interface PlayerTrackerProps {
  active: boolean
}

/**
 * Headless helper mounted once inside <Canvas>. Reads the camera each frame
 * for two side effects that live outside the 3D scene: the minimap (via the
 * store, throttled) and footstep audio (via direct calls, also throttled).
 */
export function PlayerTracker({ active }: PlayerTrackerProps) {
  const { camera } = useThree()
  const setPlayerTransform = useInteractionStore((s) => s.setPlayerTransform)
  const [, getKeys] = useKeyboardControls()

  const transformTimer = useRef(0)
  const stepTimer = useRef(0)
  const lastYaw = useRef(0)

  useFrame((_, delta) => {
    if (!active) return

    transformTimer.current += delta
    if (transformTimer.current >= TRANSFORM_UPDATE_INTERVAL) {
      transformTimer.current = 0
      camera.getWorldDirection(_dir)

      // Only trust the horizontal heading when it's actually significant.
      // Looking near-straight up/down collapses x/z toward zero, and at
      // that point tiny floating-point noise can swing atan2() wildly —
      // so we simply keep the last good yaw instead of chasing the noise.
      const horizontalMagSq = _dir.x * _dir.x + _dir.z * _dir.z
      if (horizontalMagSq > 0.0025) {
        // Sign flip vs. the naive atan2(x, z): yaw=0 must face -Z (the TV
        // wall, "up" on the minimap), and the minimap's canvas rotation
        // convention needs atan2(x, -z) to line up an arrow pointing there.
        const yaw = Math.atan2(_dir.x, -_dir.z)
        lastYaw.current = yaw
        setPlayerTransform(camera.position.x, camera.position.z, yaw)
      } else {
        setPlayerTransform(camera.position.x, camera.position.z, lastYaw.current)
      }
    }

    const { forward, backward, leftward, rightward } = getKeys()
    const isMoving = forward || backward || leftward || rightward

    if (isMoving) {
      stepTimer.current += delta
      if (stepTimer.current >= STEP_INTERVAL) {
        stepTimer.current = 0
        playFootstep()
      }
    } else {
      stepTimer.current = STEP_INTERVAL // next step plays right away when moving resumes
    }
  })

  return null
}
