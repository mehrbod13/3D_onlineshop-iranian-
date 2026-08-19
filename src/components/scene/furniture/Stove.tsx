import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'
import { COUNTER_Y, KITCHEN_X, KITCHEN_Z } from '../layout'

preloadFurnitureModel(MODEL_PATHS.stove)

export const Stove = forwardRef<InteractiveObjectHandle>(function Stove(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="stove-main"
      category="stove"
      label="اجاق گاز"
      position={[KITCHEN_X, 0, KITCHEN_Z.stove]}
      rotation={[0, 0, 0]}
    >
      <GLTFFurniture
        src={MODEL_PATHS.stove}
        scale={1}
        offset={[0, 0, 0]}
        fallback={<PlaceholderBox size={[0.6, 0.06, 0.55]} position={[0, COUNTER_Y + 0.03, 0]} />}
      />
    </InteractiveObject>
  )
})
