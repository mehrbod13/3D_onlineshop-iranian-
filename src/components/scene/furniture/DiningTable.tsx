import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'

preloadFurnitureModel(MODEL_PATHS.diningTable)

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
        <GLTFFurniture
          src={MODEL_PATHS.diningTable}
          scale={1}
          offset={[0, 0, 0]}
          fallback={<PlaceholderBox size={[1.6, 0.78, 0.9]} position={[0, 0.39, 0]} />}
        />
      </InteractiveObject>
    )
  },
)
