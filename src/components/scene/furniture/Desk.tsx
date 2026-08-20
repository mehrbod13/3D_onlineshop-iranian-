import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'

preloadFurnitureModel(MODEL_PATHS.desk)

export const Desk = forwardRef<InteractiveObjectHandle>(function Desk(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="desk-main"
      category="desk"
      label="میز تحریر"
      position={[-6.3, 0, -4.8]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <GLTFFurniture
        src={MODEL_PATHS.desk}
        autoFit={[2.2, 0.75, 0.6]}
        fallback={<PlaceholderBox size={[1.2, 0.75, 0.6]} position={[0, 0.37, 0]} />}
      />
    </InteractiveObject>
  )
})
