import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'

preloadFurnitureModel(MODEL_PATHS.sofa)

export const Sofa = forwardRef<InteractiveObjectHandle>(function Sofa(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="sofa-main"
      category="sofa"
      label="مبل"
      position={[-3.5, 0, -2]}
      rotation={[0, Math.PI / 6, 0]}
    >
      <GLTFFurniture
        src={MODEL_PATHS.sofa}
        autoFit={[2.2, 0.75, 0.9]}
        fallback={<PlaceholderBox size={[2.2, 0.75, 0.9]} position={[0, 0.4, 0]} />}
      />
    </InteractiveObject>
  )
})
