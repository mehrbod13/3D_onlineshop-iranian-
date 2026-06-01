import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial } from '../materials'
import { COUNTER_Y, KITCHEN_X, KITCHEN_Z } from '../layout'

const cabinetMat = createClayMaterial('#f0ebe4')
const counterMat = createClayMaterial('#d5cdc2')

export const KitchenCabinets = forwardRef<InteractiveObjectHandle>(
  function KitchenCabinets(_, ref) {
    return (
      <InteractiveObject
        ref={ref}
        id="cabinets-main"
        category="kitchenCabinets"
        label="کابینت آشپزخانه"
        position={[KITCHEN_X, 0, KITCHEN_Z.cabinets]}
        rotation={[0, 0, 0]}
      >
        {/* Base cabinets along wall */}
        <mesh material={cabinetMat} position={[0, 0.45, -1.3]} castShadow receiveShadow>
          <boxGeometry args={[0.58, 0.9, 1.1]} />
        </mesh>
        <mesh material={cabinetMat} position={[0, 0.45, 0.35]} castShadow receiveShadow>
          <boxGeometry args={[0.58, 0.9, 1.0]} />
        </mesh>
        <mesh material={cabinetMat} position={[0, 0.45, 1.55]} castShadow receiveShadow>
          <boxGeometry args={[0.58, 0.9, 0.7]} />
        </mesh>

        {/* Countertop run */}
        <mesh material={counterMat} position={[0, COUNTER_Y, 0.2]} castShadow>
          <boxGeometry args={[0.62, 0.06, 3.5]} />
        </mesh>

        {/* Wall cabinets */}
        <mesh material={cabinetMat} position={[0, 1.85, -1.0]} castShadow>
          <boxGeometry args={[0.52, 0.7, 1.0]} />
        </mesh>
        <mesh material={cabinetMat} position={[0, 1.85, 0.55]} castShadow>
          <boxGeometry args={[0.52, 0.7, 1.2]} />
        </mesh>
      </InteractiveObject>
    )
  },
)
