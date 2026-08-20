import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'

preloadFurnitureModel(MODEL_PATHS.wallArt)

// Wall-mounted on the living room's back wall (z≈-6), at eye height.
export const WallArt = forwardRef<InteractiveObjectHandle>(function WallArt(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="wallart-main"
      category="wallArt"
      label="تابلو دیواری"
      position={[-3, 1.6, -5.85]}
      rotation={[0, 3.12, 0]}
    >
      <GLTFFurniture
        src={MODEL_PATHS.wallArt}
        autoFit={[1.0, 0.7, 0.05]}
        verticalAnchor="center"
        fallback={<PlaceholderBox size={[1.0, 0.7, 0.05]} position={[0, 0, 0]} />}
      />
    </InteractiveObject>
  )
})
