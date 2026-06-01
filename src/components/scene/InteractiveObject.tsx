import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { FurnitureCategory } from '../../types'
import { highlightEmissive } from './materials'
import { useInteractionStore } from '../../store/interactionStore'

export interface InteractiveObjectHandle {
  getMeshes: () => THREE.Object3D[]
}

interface InteractiveObjectProps {
  id: string
  category: FurnitureCategory
  label: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  children: ReactNode
}

/**
 * Wraps furniture geometry with interaction metadata.
 * Meshes inside inherit hover emissive feedback via the store.
 */
export const InteractiveObject = forwardRef<
  InteractiveObjectHandle,
  InteractiveObjectProps
>(function InteractiveObject(
  { id, category, label, position = [0, 0, 0], rotation = [0, 0, 0], children },
  ref,
) {
  const groupRef = useRef<THREE.Group>(null)
  const hoveredObjectId = useInteractionStore((s) => s.hoveredObjectId)

  useImperativeHandle(ref, () => ({
    getMeshes: () => {
      if (!groupRef.current) return []
      const meshes: THREE.Object3D[] = []
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) meshes.push(child)
      })
      return meshes
    },
  }))

  // Tag every mesh so raycasts hit leaf nodes reliably
  useLayoutEffect(() => {
    if (!groupRef.current) return
    const meta = { id, category, label }
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.userData = meta
      }
    })
  }, [id, category, label])

  useFrame(() => {
    if (!groupRef.current) return
    const isHovered = hoveredObjectId === id

    groupRef.current.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      const mat = child.material as THREE.MeshStandardMaterial
      if (!mat.emissive) return

      mat.emissive.copy(isHovered ? highlightEmissive : new THREE.Color('#000000'))
      mat.emissiveIntensity = isHovered ? 0.35 : 0
    })
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      userData={{ id, category, label }}
    >
      {children}
    </group>
  )
})

