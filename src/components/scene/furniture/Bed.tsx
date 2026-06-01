import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial } from '../materials'
import { BEDROOM } from '../layout'

const frameMat = createClayMaterial('#e0d8ce')
const mattressMat = createClayMaterial('#f5f8fa')
const pillowMat = createClayMaterial('#ffffff')

export const Bed = forwardRef<InteractiveObjectHandle>(function Bed(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="bed-main"
      category="bed"
      label="تخت خواب"
      position={BEDROOM.bed}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <mesh material={frameMat} position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.5, 1.5]} />
      </mesh>
      <mesh material={mattressMat} position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[1.9, 0.2, 1.4]} />
      </mesh>
      <mesh material={pillowMat} position={[0.75, 0.72, 0]} castShadow>
        <boxGeometry args={[0.45, 0.12, 0.65]} />
      </mesh>
      <mesh material={frameMat} position={[0, 0.65, -0.68]} castShadow>
        <boxGeometry args={[2.0, 0.6, 0.12]} />
      </mesh>
    </InteractiveObject>
  )
})
