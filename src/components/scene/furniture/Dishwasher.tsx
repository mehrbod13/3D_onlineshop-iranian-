import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial, screenMaterial } from '../materials'
import { KITCHEN_X, KITCHEN_Z } from '../layout'

const bodyMat = createClayMaterial('#e8e8e8')

export const Dishwasher = forwardRef<InteractiveObjectHandle>(
  function Dishwasher(_, ref) {
    return (
      <InteractiveObject
        ref={ref}
        id="dishwasher-main"
        category="dishwasher"
        label="ماشین ظرفشویی"
        position={[KITCHEN_X, 0, KITCHEN_Z.dishwasher]}
        rotation={[0, -Math.PI, 0]}
      >
        <mesh material={bodyMat} position={[0, 0.42, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.58, 0.84, 0.58]} />
        </mesh>
        <mesh material={screenMaterial} position={[0.3, 0.48, 0]} castShadow>
          <boxGeometry args={[0.03, 0.12, 0.38]} />
        </mesh>
      </InteractiveObject>
    )
  },
)
