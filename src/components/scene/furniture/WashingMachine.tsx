import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'
import { BEDROOM } from '../layout'

preloadFurnitureModel(MODEL_PATHS.washingMachine)

/** Laundry — bedroom corner, against right wall. */
export const WashingMachine = forwardRef<InteractiveObjectHandle>(
  function WashingMachine(_, ref) {
    return (
      <InteractiveObject
        ref={ref}
        id="washer-main"
        category="washingMachine"
        label="ماشین لباسشویی"
        position={BEDROOM.washer}
        rotation={[0, -Math.PI, 0]}
      >
        <GLTFFurniture
          src={MODEL_PATHS.washingMachine}
          autoFit={[0.9, 0.5, 0.9]}
          offset={[0, 0, 0]}
          fallback={<PlaceholderBox size={[0.6, 0.9, 0.6]} position={[0, 0.45, 0]} />}
        />
      </InteractiveObject>
    )
  },
)
