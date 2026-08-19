import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'
import { COUNTER_Y, KITCHEN_X, KITCHEN_Z } from '../layout'

preloadFurnitureModel(MODEL_PATHS.sink)

export const Sink = forwardRef<InteractiveObjectHandle>(function Sink(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="sink-main"
      category="sink"
      label="سینک"
      position={[KITCHEN_X + 0.3, -0.01, KITCHEN_Z.sink + 2]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <GLTFFurniture
        src={MODEL_PATHS.sink}
        scale={1.2}
        offset={[0, 0, 0]}
        fallback={<PlaceholderBox size={[0.7, 0.15, 0.45]} position={[0, COUNTER_Y, 0]} />}
      />
    </InteractiveObject>
  )
})
