import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial } from '../materials'

const tableMat = createClayMaterial('#e0d8ce')

export const DiningTable = forwardRef<InteractiveObjectHandle>(
  function DiningTable(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="diningtable-main"
      category="diningTable"
      label="میز ناهارخوری"
      position={[1.2, 0, 2.2]}
    >
      <mesh material={tableMat} position={[0, 0.78, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.08, 0.9]} />
      </mesh>
      {(
        [
          [-0.65, 0.39, -0.35],
          [0.65, 0.39, -0.35],
          [-0.65, 0.39, 0.35],
          [0.65, 0.39, 0.35],
        ] as [number, number, number][]
      ).map((pos, i) => (
        <mesh key={i} material={tableMat} position={pos} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.78, 8]} />
        </mesh>
      ))}
    </InteractiveObject>
  )
},
)
