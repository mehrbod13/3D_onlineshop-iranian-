import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial } from '../materials'

const woodMat = createClayMaterial('#d9d0c6')

export const TVStand = forwardRef<InteractiveObjectHandle>(function TVStand(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="tvstand-main"
      category="tvStand"
      label="میز تلویزیون"
      position={[0, 0, -4.2]}
    >
      {/* Top surface */}
      <mesh material={woodMat} position={[0, 0.52, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.1, 0.55]} />
      </mesh>
      {/* Left leg */}
      <mesh material={woodMat} position={[-1.15, 0.26, 0]} castShadow>
        <boxGeometry args={[0.1, 0.52, 0.45]} />
      </mesh>
      {/* Right leg */}
      <mesh material={woodMat} position={[1.15, 0.26, 0]} castShadow>
        <boxGeometry args={[0.1, 0.52, 0.45]} />
      </mesh>
      {/* Shelf */}
      <mesh material={woodMat} position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[2.4, 0.06, 0.48]} />
      </mesh>
      {/* Decor box */}
      <mesh material={woodMat} position={[-0.7, 0.62, 0.05]} castShadow>
        <boxGeometry args={[0.25, 0.15, 0.2]} />
      </mesh>
    </InteractiveObject>
  )
})
