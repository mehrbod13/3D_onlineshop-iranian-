import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'
import { KITCHEN_X, KITCHEN_Z } from '../layout'

preloadFurnitureModel(MODEL_PATHS.dishwasher)

export const Dishwasher = forwardRef<InteractiveObjectHandle>(
  function Dishwasher(_, ref) {
    return (
      <InteractiveObject
        ref={ref}
        id="dishwasher-main"
        category="dishwasher"
        label="ماشین ظرفشویی"
        position={[KITCHEN_X + 0.25, 0, KITCHEN_Z.dishwasher - 0.02]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <GLTFFurniture
          src={MODEL_PATHS.dishwasher}
          autoFit={[0.7, 0.5, 0.94]}
          offset={[0, 0, 0]}
          fallback={<PlaceholderBox size={[0.58, 0.84, 0.58]} position={[0, 0.42, 0]} />}
        />
      </InteractiveObject>
    )
  },
)
