import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'

preloadFurnitureModel(MODEL_PATHS.armchair)

export const Armchair = forwardRef<InteractiveObjectHandle>(
  function Armchair(_, ref) {
    return (
      <InteractiveObject
        ref={ref}
        id="armchair-main"
        category="armchair"
        label="مبل تک‌نفره"
        position={[-1.5, 0, -2.2]}
        rotation={[0, -0.3, 0]}
      >
        <GLTFFurniture
          src={MODEL_PATHS.armchair}
          autoFit={[1.3, 0.85, 0.9]}
          fallback={<PlaceholderBox size={[0.9, 0.85, 0.9]} position={[0, 0.42, 0]} />}
        />
      </InteractiveObject>
    )
  },
)
