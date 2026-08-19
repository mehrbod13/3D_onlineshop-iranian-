import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'

preloadFurnitureModel(MODEL_PATHS.coffeeTable)

export const CoffeeTable = forwardRef<InteractiveObjectHandle>(
  function CoffeeTable(_, ref) {
    return (
      <InteractiveObject
        ref={ref}
        id="coffee-table"
        category="coffeeTable"
        label="میز جلو مبلی"
        position={[-2.5, 0, -0.8]}
        rotation={[0, Math.PI / 5, 0]}
      >
        <GLTFFurniture
          src={MODEL_PATHS.coffeeTable}
          autoFit={[1.5, 0.5, 1.0]}
          offset={[0, 0, 0]}
          fallback={<PlaceholderBox size={[1.2, 0.4, 0.7]} position={[0, 0.2, 0]} />}
        />
      </InteractiveObject>
    )
  },
)
