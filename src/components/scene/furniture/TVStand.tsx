import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'

preloadFurnitureModel(MODEL_PATHS.tvStand)

export const TVStand = forwardRef<InteractiveObjectHandle>(function TVStand(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="tvstand-main"
      category="tvStand"
      label="میز تلویزیون"
      position={[0, 0, -4.2]}
    >
      <GLTFFurniture
        src={MODEL_PATHS.tvStand}
        scale={1}
        offset={[0, 0, 0]}
        fallback={<PlaceholderBox size={[2.6, 0.55, 0.55]} position={[0, 0.28, 0]} />}
      />
    </InteractiveObject>
  )
})
