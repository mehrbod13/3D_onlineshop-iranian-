import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial } from '../materials'
import { COUNTER_Y, KITCHEN_X, KITCHEN_Z } from '../layout'

const metalMat = createClayMaterial('#c8ccd0')
const basinMat = createClayMaterial('#a8b0b8')

export const Sink = forwardRef<InteractiveObjectHandle>(function Sink(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="sink-main"
      category="sink"
      label="سینک"
      position={[KITCHEN_X, 0, KITCHEN_Z.sink]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <mesh material={metalMat} position={[0, COUNTER_Y + 0.01, 0]} castShadow>
        <boxGeometry args={[0.7, 0.06, 0.45]} />
      </mesh>
      <mesh material={basinMat} position={[0, COUNTER_Y - 0.04, 0]} castShadow>
        <boxGeometry args={[0.55, 0.08, 0.35]} />
      </mesh>
      <mesh material={metalMat} position={[0.25, COUNTER_Y + 0.15, -0.1]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.22, 8]} />
      </mesh>
    </InteractiveObject>
  )
})
