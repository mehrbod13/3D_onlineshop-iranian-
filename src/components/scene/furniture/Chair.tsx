import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'

preloadFurnitureModel(MODEL_PATHS.chair)

interface ChairSlotProps {
  position: [number, number, number]
  rotation?: [number, number, number]
}

function ChairSlot({ position, rotation = [0, 0, 0] }: ChairSlotProps) {
  return (
    <group position={position} rotation={rotation}>
      <GLTFFurniture
        src={MODEL_PATHS.chair}
        autoFit={[0.9, 0.4, 0.6]}
        offset={[0, 0, 0]}
        fallback={<PlaceholderBox size={[0.42, 0.9, 0.42]} position={[0, 0.45, 0]} />}
        
      />
    </group>
  )
}

// One model instance is reused for all four seats — GLTFFurniture clones
// the cached scene per-instance, so this doesn't refetch anything.
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
        <ChairSlot position={[-0.85, 0, 1]} rotation={[0, Math.PI / 1.3, 0]} />
        <ChairSlot position={[0.85, 0, 1]} rotation={[0, -Math.PI / 1.3, 0]} />
        <ChairSlot position={[-0.85, 0, -1]} rotation={[0, Math.PI / 3.5, 0]}/>
        <ChairSlot position={[0.85, 0, -1]} rotation={[0, -Math.PI / 4, 0]}/>
      </InteractiveObject>
    )
  },
)
