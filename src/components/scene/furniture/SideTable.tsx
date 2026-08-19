import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, PlaceholderBox, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'
import { BEDROOM } from '../layout'

preloadFurnitureModel(MODEL_PATHS.sideTable)

export const SideTable = forwardRef<InteractiveObjectHandle>(
  function SideTable(_, ref) {
    return (
      <InteractiveObject
        ref={ref}
        id="sidetable-main"
        category="sideTable"
        label="میز کناری"
        position={BEDROOM.sideTable}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <GLTFFurniture
          src={MODEL_PATHS.sideTable}
          scale={1}
          offset={[0, 0, 0]}
          fallback={<PlaceholderBox size={[0.45, 0.5, 0.45]} position={[0, 0.25, 0]} />}
        />
      </InteractiveObject>
    )
  },
)
