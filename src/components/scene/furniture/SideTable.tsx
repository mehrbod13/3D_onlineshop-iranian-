import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial } from '../materials'
import { BEDROOM } from '../layout'

const woodMat = createClayMaterial('#ddd5cb')

export const SideTable = forwardRef<InteractiveObjectHandle>(
  function SideTable(_, ref) {
    return (
      <InteractiveObject
        ref={ref}
        id="sidetable-main"
        category="sideTable"
        label="میز کناری"
        position={BEDROOM.sideTable}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <mesh material={woodMat} position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.45, 0.06, 0.45]} />
        </mesh>
        <mesh material={woodMat} position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.08, 0.5, 0.08]} />
        </mesh>
      </InteractiveObject>
    )
  },
)
