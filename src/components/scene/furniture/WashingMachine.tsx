import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial, screenMaterial } from '../materials'
import { BEDROOM } from '../layout'

const bodyMat = createClayMaterial('#f0f0f0')

/** Laundry — bedroom corner, against right wall. */
export const WashingMachine = forwardRef<InteractiveObjectHandle>(
  function WashingMachine(_, ref) {
    return (
      <InteractiveObject
        ref={ref}
        id="washer-main"
        category="washingMachine"
        label="ماشین لباسشویی"
        position={BEDROOM.washer}
        rotation={[0, -Math.PI, 0]}
      >
        <mesh material={bodyMat} position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.9, 0.6]} />
        </mesh>
        <mesh material={screenMaterial} position={[0.31, 0.52, 0]} castShadow>
          <boxGeometry args={[0.03, 0.32, 0.32]} />
        </mesh>
      </InteractiveObject>
    )
  },
)
