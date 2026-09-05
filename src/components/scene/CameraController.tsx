import { useFrame, useThree } from '@react-three/fiber'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  type Ref,
} from 'react'
import * as THREE from 'three'

import { useInteractionStore } from '../../store/interactionStore'

interface CameraControllerProps {
  enabled: boolean
}

export interface CameraControllerHandle {
  lock: () => void
  unlock: () => void
}

const PITCH_LIMIT = Math.PI / 2 - 0.05

// Mouse sensitivity.
// Lower = slower rotation.
// Higher = faster rotation.
const SENSITIVITY = 0.0022

// Prevents a single extremely large mouse event from
// causing the camera to jump.
const MAX_MOUSE_DELTA = 250

function CameraControllerImpl(
  { enabled }: CameraControllerProps,
  ref: Ref<CameraControllerHandle>,
) {
  const { camera, gl } = useThree()

  const setPointerLocked = useInteractionStore(
    (state) => state.setPointerLocked,
  )

  /*
   * --------------------------------------------------------------------------
   * Camera rotation
   * --------------------------------------------------------------------------
   */

  const yaw = useRef(0)
  const pitch = useRef(0)

  /*
   * --------------------------------------------------------------------------
   * Mouse input
   * --------------------------------------------------------------------------
   *
   * IMPORTANT:
   *
   * We do NOT update the camera inside mousemove.
   *
   * mousemove only writes raw movement into these refs.
   *
   * The camera is updated once per render frame inside useFrame().
   *
   * This keeps React completely out of the input path.
   */

  const mouseX = useRef(0)
  const mouseY = useRef(0)

  /*
   * Prevents the initial camera rotation from being overwritten.
   */
  const initialized = useRef(false)

  /*
   * Keep enabled in a ref so the event handlers don't need
   * to be recreated whenever enabled changes.
   */
  const enabledRef = useRef(enabled)

  useEffect(() => {
    enabledRef.current = enabled
  }, [enabled])

  /*
   * --------------------------------------------------------------------------
   * Initialize yaw / pitch from the current camera
   * --------------------------------------------------------------------------
   */

  if (!initialized.current) {
    const euler = new THREE.Euler(0, 0, 0, 'YXZ')

    euler.setFromQuaternion(camera.quaternion)

    yaw.current = euler.y
    pitch.current = THREE.MathUtils.clamp(
      euler.x,
      -PITCH_LIMIT,
      PITCH_LIMIT,
    )

    initialized.current = true
  }

  /*
   * --------------------------------------------------------------------------
   * Pointer Lock
   * --------------------------------------------------------------------------
   */

  const requestLock = useCallback(() => {
    if (!enabledRef.current) return

    const canvas = gl.domElement

    /*
     * Modern browsers support:
     *
     * requestPointerLock({ unadjustedMovement: true })
     *
     * This requests raw mouse movement and avoids browser/OS
     * mouse acceleration where supported.
     */

    try {
      const requestPointerLock = canvas.requestPointerLock as (
        options?: {
          unadjustedMovement?: boolean
        },
      ) => Promise<void> | void

      const result = requestPointerLock.call(canvas, {
        unadjustedMovement: true,
      })

      /*
       * Firefox / older browser fallback.
       *
       * If Chrome rejects unadjustedMovement, request normal
       * pointer lock instead.
       */
      if (
        result &&
        typeof (result as Promise<void>).catch === 'function'
      ) {
        ;(result as Promise<void>).catch(() => {
          try {
            canvas.requestPointerLock()
          } catch {
            // Ignore pointer-lock failure.
          }
        })
      }
    } catch {
      /*
       * Browser doesn't support the options object.
       */
      try {
        canvas.requestPointerLock()
      } catch {
        // Ignore pointer-lock failure.
      }
    }
  }, [gl])

  const unlock = useCallback(() => {
    if (document.pointerLockElement === gl.domElement) {
      document.exitPointerLock()
    }
  }, [gl])

  useImperativeHandle(
    ref,
    () => ({
      lock: requestLock,
      unlock,
    }),
    [requestLock, unlock],
  )

  /*
   * --------------------------------------------------------------------------
   * Mouse movement
   * --------------------------------------------------------------------------
   */

  useEffect(() => {
    const canvas = gl.domElement

    const handleMouseMove = (event: MouseEvent) => {
      /*
       * Ignore mouse movement when:
       * - controller is disabled
       * - canvas isn't pointer locked
       */
      if (!enabledRef.current) return
      if (document.pointerLockElement !== canvas) return

      /*
       * movementX / movementY are already relative movement values
       * while Pointer Lock is active.
       *
       * Clamp abnormal browser/device spikes.
       */
      const x = THREE.MathUtils.clamp(
        event.movementX,
        -MAX_MOUSE_DELTA,
        MAX_MOUSE_DELTA,
      )

      const y = THREE.MathUtils.clamp(
        event.movementY,
        -MAX_MOUSE_DELTA,
        MAX_MOUSE_DELTA,
      )

      /*
       * Accumulate raw movement.
       *
       * No React state.
       * No camera mutation.
       * No allocation.
       */
      mouseX.current += x
      mouseY.current += y
    }

    const handleClick = () => {
      if (!enabledRef.current) return

      /*
       * Don't repeatedly request pointer lock if we're
       * already locked.
       */
      if (document.pointerLockElement === canvas) return

      requestLock()
    }

    const handlePointerLockChange = () => {
      const locked = document.pointerLockElement === canvas

      /*
       * Clear any stale mouse input when entering/leaving
       * pointer lock.
       */
      if (!locked) {
        mouseX.current = 0
        mouseY.current = 0
      }

      setPointerLocked(locked)
    }

    const handlePointerLockError = () => {
      /*
       * Browser rejected pointer lock.
       *
       * Keep the state consistent.
       */
      mouseX.current = 0
      mouseY.current = 0

      setPointerLocked(false)
    }

    canvas.addEventListener('click', handleClick)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener(
      'pointerlockchange',
      handlePointerLockChange,
    )
    document.addEventListener(
      'pointerlockerror',
      handlePointerLockError,
    )

    return () => {
      canvas.removeEventListener('click', handleClick)

      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener(
        'pointerlockchange',
        handlePointerLockChange,
      )
      document.removeEventListener(
        'pointerlockerror',
        handlePointerLockError,
      )
    }
  }, [gl, requestLock, setPointerLocked])

  /*
   * --------------------------------------------------------------------------
   * Camera update
   * --------------------------------------------------------------------------
   */

  useFrame(() => {
    /*
     * Nothing to process.
     */
    if (mouseX.current === 0 && mouseY.current === 0) {
      return
    }

    /*
     * Read and immediately clear the input buffer.
     *
     * This is important because the next mouse events can start
     * accumulating while we're updating the camera.
     */
    const dx = mouseX.current
    const dy = mouseY.current

    mouseX.current = 0
    mouseY.current = 0

    /*
     * Apply rotation.
     *
     * movementX is already a physical mouse delta, so DO NOT
     * multiply this by delta time.
     *
     * Multiplying by delta time would make mouse sensitivity
     * depend on FPS.
     */
    yaw.current -= dx * SENSITIVITY
    pitch.current -= dy * SENSITIVITY

    /*
     * Vertical camera limit.
     */
    pitch.current = THREE.MathUtils.clamp(
      pitch.current,
      -PITCH_LIMIT,
      PITCH_LIMIT,
    )

    /*
     * Build the camera rotation.
     *
     * YXZ prevents unwanted roll while allowing:
     *
     * yaw   -> left / right
     * pitch -> up / down
     */
    camera.rotation.order = 'YXZ'

    camera.rotation.set(
      pitch.current,
      yaw.current,
      0,
      'YXZ',
    )
  })

  /*
   * --------------------------------------------------------------------------
   * Component
   * --------------------------------------------------------------------------
   */

  return null
}

export const CameraController = forwardRef(CameraControllerImpl)
