import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'
import { COUNTER_Y, KITCHEN_X, KITCHEN_Z } from '../layout'

preloadFurnitureModel(MODEL_PATHS.microwave)

export const Microwave = forwardRef<InteractiveObjectHandle>(
  function Microwave(_, ref) {
    return (
      <InteractiveObject
        ref={ref}
        id="microwave-main"
        category="microwave"
        label="مایکروویو"
        position={[KITCHEN_X + 0.2, 1, KITCHEN_Z.microwave - 1.3]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <GLTFFurniture
          src={MODEL_PATHS.microwave}
          autoFit={[1.0, 0.5, 1.0]}
          offset={[0, 0, 0]}
          fallback={
            <PlaceholderBox size={[0.48, 0.32, 0.55]} position={[0, COUNTER_Y + 0.16, 0]} />
          }
        />
      </InteractiveObject>
    )
  },
)
