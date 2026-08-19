import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'
import { KITCHEN_X, KITCHEN_Z } from '../layout'

preloadFurnitureModel(MODEL_PATHS.kitchenCabinets)

export const KitchenCabinets = forwardRef<InteractiveObjectHandle>(
  function KitchenCabinets(_, ref) {
    return (
      <InteractiveObject
        ref={ref}
        id="cabinets-main"
        category="kitchenCabinets"
        label="کابینت آشپزخانه"
        position={[KITCHEN_X + 0.3, 0, KITCHEN_Z.cabinets]}
        rotation={[0, Math.PI / 1.5, 0]}
      >
        <GLTFFurniture
          src={MODEL_PATHS.kitchenCabinets}
          autoFit={[5.0, 1, 1.0]}
          offset={[0, 0, 0]}
          fallback={<PlaceholderBox size={[0.6, 2.6, 3.5]} position={[0, 1.0, 0]} />}
        />
      </InteractiveObject>
    )
  },
)
