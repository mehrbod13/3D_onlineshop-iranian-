import { useFrame, useThree } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'
import { useInteractionStore } from '../../store/interactionStore'

const MOVE_SPEED = 2.2
const _forward = new THREE.Vector3()
const _right = new THREE.Vector3()
const _move = new THREE.Vector3()
const _up = new THREE.Vector3(0, 1, 0)

interface PlayerMovementProps {
  active: boolean
}

/**
 * WASD movement aligned to camera look direction (world-space yaw).
 * Works whenever exploring — not only while pointer is locked.
 */
export function PlayerMovement({ active }: PlayerMovementProps) {
  const { camera } = useThree()
  const isModalOpen = useInteractionStore((s) => s.isModalOpen)
  const [, getKeys] = useKeyboardControls()

  useFrame((_, delta) => {
    if (!active || isModalOpen) return

    const { forward, backward, leftward, rightward } = getKeys()
    if (!forward && !backward && !leftward && !rightward) return

    camera.getWorldDirection(_forward)
    _forward.y = 0
    if (_forward.lengthSq() < 0.0001) {
      _forward.set(0, 0, -1)
    } else {
      _forward.normalize()
    }

    _right.crossVectors(_forward, _up).normalize()

    _move.set(0, 0, 0)
    if (forward) _move.add(_forward)
    if (backward) _move.sub(_forward)
    if (rightward) _move.add(_right)
    if (leftward) _move.sub(_right)

    if (_move.lengthSq() === 0) return

    _move.normalize().multiplyScalar(MOVE_SPEED * delta)
    camera.position.add(_move)

    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -6.5, 5.8)
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -5.2, 5.2)
    camera.position.y = 1.65
  })

  return null
}
