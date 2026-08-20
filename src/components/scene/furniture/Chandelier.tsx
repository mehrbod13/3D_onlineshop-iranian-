import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'

preloadFurnitureModel(MODEL_PATHS.chandelier)

// Hangs from the ceiling (WALL_HEIGHT=3.2) above the dining table.
export const Chandelier = forwardRef<InteractiveObjectHandle>(
  function Chandelier(_, ref) {
    return (
      <InteractiveObject
        ref={ref}
        id="chandelier-main"
        category="chandelier"
        label="لوستر"
        position={[1.2, 2.47, 2.2]}
      >
        <GLTFFurniture
          src={MODEL_PATHS.chandelier}
          autoFit={[0.8, 0.6, 0.8]}
          verticalAnchor="center"
          fallback={<PlaceholderBox size={[0.5, 0.5, 0.5]} position={[0, 0, 0]} />}
        />
      </InteractiveObject>
    )
  },
)
