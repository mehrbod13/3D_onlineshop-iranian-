import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial, screenMaterial } from '../materials'
import { COUNTER_Y, KITCHEN_X, KITCHEN_Z } from '../layout'

const bodyMat = createClayMaterial('#3a3a3a')
const burnerMat = createClayMaterial('#1a1a1a')

export const Stove = forwardRef<InteractiveObjectHandle>(function Stove(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="stove-main"
      category="stove"
      label="اجاق گاز"
      position={[KITCHEN_X, 0, KITCHEN_Z.stove]}
      rotation={[0, 0, 0]}
    >
      {/* Cooktop on counter */}
      <mesh material={bodyMat} position={[0, COUNTER_Y + 0.01, 0]} castShadow>
        <boxGeometry args={[0.6, 0.06, 0.55]} />
      </mesh>
      {(
        [
          [-0.15, COUNTER_Y + 0.04, -0.12],
          [0.15, COUNTER_Y + 0.04, -0.12],
          [-0.15, COUNTER_Y + 0.04, 0.12],
          [0.15, COUNTER_Y + 0.04, 0.12],
        ] as [number, number, number][]
      ).map((pos, i) => (
        <mesh key={i} material={burnerMat} position={pos} castShadow>
          <cylinderGeometry args={[0.08, 0.09, 0.02, 16]} />
        </mesh>
      ))}
      <mesh material={screenMaterial} position={[0.3, COUNTER_Y + 0.2, 0]} castShadow>
        <boxGeometry args={[0.04, 0.35, 0.55]} />
      </mesh>
    </InteractiveObject>
  )
})
