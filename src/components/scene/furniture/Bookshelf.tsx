import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { createClayMaterial, accentMaterial } from '../materials'

const shelfMat = createClayMaterial('#e5ddd3')

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
        <mesh material={shelfMat} position={[0, 1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.35, 2.0, 1.2]} />
        </mesh>
        {[0.35, 0.75, 1.15, 1.55].map((y) => (
          <mesh key={y} material={accentMaterial} position={[0.2, y, 0]} castShadow>
            <boxGeometry args={[0.05, 0.02, 1.1]} />
          </mesh>
        ))}
        {/* Books */}
        <mesh material={accentMaterial} position={[0.22, 0.55, -0.2]} castShadow>
          <boxGeometry args={[0.08, 0.25, 0.15]} />
        </mesh>
        <mesh material={createClayMaterial('#c9bfb5')} position={[0.22, 0.95, 0.15]} castShadow>
          <boxGeometry args={[0.08, 0.3, 0.12]} />
        </mesh>
      </InteractiveObject>
    )
  },
)
