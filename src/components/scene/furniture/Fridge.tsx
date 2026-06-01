import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial } from '../materials'
import { KITCHEN_X, KITCHEN_Z } from '../layout'

const bodyMat = createClayMaterial('#f2f2f2')
const handleMat = createClayMaterial('#c8c8c8')

export const Fridge = forwardRef<InteractiveObjectHandle>(function Fridge(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="fridge-main"
      category="fridge"
      label="یخچال"
      position={[KITCHEN_X, 0, KITCHEN_Z.fridge]}
      rotation={[0, -Math.PI, 0]}
    >
      <mesh material={bodyMat} position={[0, 1.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 2.0, 0.68]} />
      </mesh>
      <mesh material={handleMat} position={[0.36, 1.45, 0]} castShadow>
        <boxGeometry args={[0.02, 0.45, 0.02]} />
      </mesh>
      <mesh material={handleMat} position={[0.36, 0.65, 0]} castShadow>
        <boxGeometry args={[0.02, 0.6, 0.02]} />
      </mesh>
    </InteractiveObject>
  )
})
