import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial } from '../materials'

const poleMat = createClayMaterial('#ddd6cc')
const shadeMat = createClayMaterial('#f8f4ef')

export const Lamp = forwardRef<InteractiveObjectHandle>(function Lamp(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="lamp-main"
      category="lamp"
      label="آباژور"
      position={[-5.2, 0, -1.5]}
    >
      {/* Base */}
      <mesh material={poleMat} position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.1, 12]} />
      </mesh>
      {/* Pole */}
      <mesh material={poleMat} position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1.3, 8]} />
      </mesh>
      {/* Shade */}
      <mesh material={shadeMat} position={[0, 1.45, 0]} castShadow>
        <coneGeometry args={[0.35, 0.45, 16, 1, true]} />
      </mesh>
    </InteractiveObject>
  )
})
