import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial, screenMaterial } from '../materials'

const frameMat = createClayMaterial('#2a2a2a')

export const TV = forwardRef<InteractiveObjectHandle>(function TV(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="tv-main"
      category="tv"
      label="تلویزیون"
      position={[0, 1.35, -4.2]}
    >
      {/* Screen */}
      <mesh material={screenMaterial} castShadow>
        <boxGeometry args={[2.2, 1.25, 0.07]} />
      </mesh>
      {/* Frame bezel */}
      <mesh material={frameMat} position={[0, 0, -0.05]} castShadow>
        <boxGeometry args={[2.32, 1.35, 0.05]} />
      </mesh>
      {/* Stand neck on unit */}
      <mesh material={frameMat} position={[0, -0.72, 0.06]} castShadow>
        <boxGeometry args={[0.35, 0.08, 0.2]} />
      </mesh>
    </InteractiveObject>
  )
})
