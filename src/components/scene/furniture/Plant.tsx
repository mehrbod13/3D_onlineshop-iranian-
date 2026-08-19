import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'

preloadFurnitureModel(MODEL_PATHS.plant)

export const Plant = forwardRef<InteractiveObjectHandle>(function Plant(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="plant-main"
      category="plant"
      label="گلدان"
      position={[-5.5, 0, 0.5]}
    >
      <GLTFFurniture
        src={MODEL_PATHS.plant}
        scale={1}
        offset={[0, 0, 0]}
        fallback={<PlaceholderBox size={[0.5, 1.0, 0.5]} position={[0, 0.5, 0]} />}
      />
    </InteractiveObject>
  )
})
