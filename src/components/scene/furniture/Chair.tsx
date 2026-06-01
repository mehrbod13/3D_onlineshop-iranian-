import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial } from '../materials'

const chairMat = createClayMaterial('#ebe4db')

interface ChairProps {
  position: [number, number, number]
  rotation?: [number, number, number]
}

function ChairMesh({ position, rotation = [0, 0, 0] }: ChairProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh material={chairMat} position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.42, 0.06, 0.42]} />
      </mesh>
      <mesh material={chairMat} position={[0, 0.72, -0.17]} castShadow>
        <boxGeometry args={[0.4, 0.45, 0.05]} />
      </mesh>
      {(
        [
          [-0.15, 0.22, -0.15],
          [0.15, 0.22, -0.15],
          [-0.15, 0.22, 0.15],
          [0.15, 0.22, 0.15],
        ] as [number, number, number][]
      ).map((pos, i) => (
        <mesh key={i} material={chairMat} position={pos} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.44, 6]} />
        </mesh>
      ))}
    </group>
  )
}

export const DiningChairs = forwardRef<InteractiveObjectHandle>(
  function DiningChairs(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="chairs-group"
      category="chair"
      label="صندلی"
      position={[1.2, 0, 2.2]}
    >
      <ChairMesh position={[-0.85, 0, 0.55]} rotation={[0, Math.PI, 0]} />
      <ChairMesh position={[0.85, 0, 0.55]} rotation={[0, Math.PI, 0]} />
      <ChairMesh position={[-0.85, 0, -0.55]} />
      <ChairMesh position={[0.85, 0, -0.55]} />
    </InteractiveObject>
  )
},
)
