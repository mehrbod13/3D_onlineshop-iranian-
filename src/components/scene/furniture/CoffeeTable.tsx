import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial } from '../materials'

const topMat = createClayMaterial('#e8e0d6')
const legMat = createClayMaterial('#d0c8be')

export const CoffeeTable = forwardRef<InteractiveObjectHandle>(
  function CoffeeTable(_, ref) {
    return (
      <InteractiveObject
        ref={ref}
        id="coffee-table"
        category="coffeeTable"
        label="میز جلو مبلی"
        position={[-2, 0, -0.5]}
      >
        <mesh material={topMat} position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.06, 0.7]} />
        </mesh>
        {(
          [
            [-0.5, 0.19, -0.25],
            [0.5, 0.19, -0.25],
            [-0.5, 0.19, 0.25],
            [0.5, 0.19, 0.25],
          ] as [number, number, number][]
        ).map((pos, i) => (
          <mesh key={i} material={legMat} position={pos} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.38, 8]} />
          </mesh>
        ))}
      </InteractiveObject>
    )
  },
)
