import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'
import { KITCHEN_X, KITCHEN_Z } from '../layout'

preloadFurnitureModel(MODEL_PATHS.fridge)

export const Fridge = forwardRef<InteractiveObjectHandle>(function Fridge(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="fridge-main"
      category="fridge"
      label="یخچال"
      position={[KITCHEN_X, 0, KITCHEN_Z.fridge]}
      rotation={[0, -Math.PI, 0]}
    >
      <GLTFFurniture
        src={MODEL_PATHS.fridge}
        scale={1}
        offset={[0, 0, 0]}
        fallback={<PlaceholderBox size={[0.7, 2.0, 0.68]} position={[0, 1.0, 0]} />}
      />
    </InteractiveObject>
  )
})
