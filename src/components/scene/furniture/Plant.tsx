import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial } from '../materials'

const potMat = createClayMaterial('#d9d0c4')
const leafMat = createClayMaterial('#8fbc8f')

export const Plant = forwardRef<InteractiveObjectHandle>(function Plant(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="plant-main"
      category="plant"
      label="گلدان"
      position={[-5.5, 0, 0.5]}
    >
      <mesh material={potMat} position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.18, 0.4, 12]} />
      </mesh>
      <mesh material={leafMat} position={[0, 0.65, 0]} castShadow>
        <sphereGeometry args={[0.35, 8, 8]} />
      </mesh>
      <mesh material={leafMat} position={[0.15, 0.85, 0.1]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
      </mesh>
      <mesh material={leafMat} position={[-0.12, 0.8, -0.08]} castShadow>
        <sphereGeometry args={[0.18, 8, 8]} />
      </mesh>
    </InteractiveObject>
  )
})
