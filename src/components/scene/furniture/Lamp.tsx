import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'

preloadFurnitureModel(MODEL_PATHS.lamp)

export const Lamp = forwardRef<InteractiveObjectHandle>(function Lamp(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="lamp-main"
      category="lamp"
      label="آباژور"
      position={[-5.2, 0, -1.5]}
    >
      <GLTFFurniture
        src={MODEL_PATHS.lamp}
        scale={0.4}
        offset={[0, 0, 0]}
        fallback={<PlaceholderBox size={[0.4, 1.6, 0.4]} position={[0, 0.8, 0]} />}
      />
    </InteractiveObject>
  )
})
