import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'

preloadFurnitureModel(MODEL_PATHS.wardrobe)

export const Wardrobe = forwardRef<InteractiveObjectHandle>(
  function Wardrobe(_, ref) {
    return (
      <InteractiveObject
        ref={ref}
        id="wardrobe-main"
        category="wardrobe"
        label="کمد لباس"
        position={[4.5, 0, 3.3]}
        rotation={[0, -Math.PI, 0]}
      >
        <GLTFFurniture
          src={MODEL_PATHS.wardrobe}
          autoFit={[0.5, 1.8, 1.2]}
          fallback={<PlaceholderBox size={[0.6, 2.1, 1.4]} position={[0, 1.05, 0]} />}
        />
      </InteractiveObject>
    )
  },
)
