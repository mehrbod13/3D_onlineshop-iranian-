import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'

preloadFurnitureModel(MODEL_PATHS.tv)

export const TV = forwardRef<InteractiveObjectHandle>(function TV(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="tv-main"
      category="tv"
      label="تلویزیون"
      position={[0, 1.35, -4.2]}
    >
      <GLTFFurniture
        src={MODEL_PATHS.tv}
        scale={1}
        offset={[0, 0, 0]}
        fallback={<PlaceholderBox size={[2.2, 1.25, 0.07]} position={[0, 0, 0]} />}
      />
    </InteractiveObject>
  )
})
