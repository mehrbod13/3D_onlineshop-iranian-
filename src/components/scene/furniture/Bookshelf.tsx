import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'

preloadFurnitureModel(MODEL_PATHS.bookshelf)

export const Bookshelf = forwardRef<InteractiveObjectHandle>(
  function Bookshelf(_, ref) {
    return (
      <InteractiveObject
        ref={ref}
        id="bookshelf-main"
        category="bookshelf"
        label="قفسه کتاب"
        position={[-6.6, 0, 2]}
        rotation={[0, 0, 0]}
      >
        <GLTFFurniture
          src={MODEL_PATHS.bookshelf}
          scale={1}
          offset={[0, 0, 0]}
          fallback={<PlaceholderBox size={[0.35, 2.0, 1.2]} position={[0, 1.0, 0]} />}
        />
      </InteractiveObject>
    )
  },
)
