import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'

preloadFurnitureModel(MODEL_PATHS.mirror)

// Wall-mounted — position/rotation sit it flat against the bedroom's right
// wall (x≈7), near head-height rather than on the floor.
export const Mirror = forwardRef<InteractiveObjectHandle>(function Mirror(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="mirror-main"
      category="mirror"
      label="آینه"
      position={[3.7, 0.8, 5.45]}
      rotation={[0, 2.7, 0]}
    >
      <GLTFFurniture
        src={MODEL_PATHS.mirror}
        autoFit={[0.05, 1.1, 0.6]}
        verticalAnchor="center"
        fallback={<PlaceholderBox size={[0.05, 1.1, 0.6]} position={[0, 0, 0]} />}
      />
    </InteractiveObject>
  )
})
