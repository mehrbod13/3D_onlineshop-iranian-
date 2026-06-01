import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial, clayDarkMaterial } from '../materials'

const seatMat = createClayMaterial('#f0ebe4')
const cushionMat = createClayMaterial('#e5ddd3')

export const Sofa = forwardRef<InteractiveObjectHandle>(function Sofa(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="sofa-main"
      category="sofa"
      label="مبل"
      position={[-3.5, 0, -2]}
      rotation={[0, Math.PI / 6, 0]}
    >
      {/* Base / frame */}
      <mesh material={seatMat} position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.35, 0.9]} />
      </mesh>
      {/* Backrest */}
      <mesh material={cushionMat} position={[0, 0.75, -0.35]} castShadow>
        <boxGeometry args={[2.2, 0.55, 0.2]} />
      </mesh>
      {/* Left arm */}
      <mesh material={clayDarkMaterial} position={[-1.05, 0.55, 0]} castShadow>
        <boxGeometry args={[0.15, 0.45, 0.9]} />
      </mesh>
      {/* Right arm */}
      <mesh material={clayDarkMaterial} position={[1.05, 0.55, 0]} castShadow>
        <boxGeometry args={[0.15, 0.45, 0.9]} />
      </mesh>
      {/* Cushions */}
      <mesh material={cushionMat} position={[-0.55, 0.55, 0.05]} castShadow>
        <boxGeometry args={[0.85, 0.15, 0.7]} />
      </mesh>
      <mesh material={cushionMat} position={[0.55, 0.55, 0.05]} castShadow>
        <boxGeometry args={[0.85, 0.15, 0.7]} />
      </mesh>
    </InteractiveObject>
  )
})
