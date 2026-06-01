import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial, screenMaterial } from '../materials'
import { COUNTER_Y, KITCHEN_X, KITCHEN_Z } from '../layout'

const bodyMat = createClayMaterial('#ececec')

export const Microwave = forwardRef<InteractiveObjectHandle>(
  function Microwave(_, ref) {
    return (
      <InteractiveObject
        ref={ref}
        id="microwave-main"
        category="microwave"
        label="مایکروویو"
        position={[KITCHEN_X, 0, KITCHEN_Z.microwave]}
        rotation={[0, -Math.PI, 0]}
      >
        <mesh material={bodyMat} position={[0, COUNTER_Y + 0.16, 0]} castShadow>
          <boxGeometry args={[0.48, 0.32, 0.55]} />
        </mesh>
        <mesh material={screenMaterial} position={[0.26, COUNTER_Y + 0.18, 0.03]} castShadow>
          <boxGeometry args={[0.02, 0.2, 0.4]} />
        </mesh>
      </InteractiveObject>
    )
  },
)
