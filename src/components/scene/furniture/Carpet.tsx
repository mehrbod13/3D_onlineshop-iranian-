import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import { GLTFFurniture, preloadFurnitureModel } from '../GLTFFurniture'
import { MODEL_PATHS } from '../modelPaths'
import * as THREE from 'three'

preloadFurnitureModel(MODEL_PATHS.carpet)

const carpetMat = new THREE.MeshStandardMaterial({
  color: '#c4a882',
  roughness: 0.95,
  emissive: new THREE.Color('#000000'),
})

// Flat plane fallback — a placeholder box would look wrong for a rug lying
// on the floor, so this keeps a thin ground-plane instead.
function CarpetFallback() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} material={carpetMat} receiveShadow>
      <planeGeometry args={[3.5, 2.5]} />
    </mesh>
  )
}

export const Carpet = forwardRef<InteractiveObjectHandle>(function Carpet(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="carpet-main"
      category="carpet"
      label="فرش"
      position={[-2, 0.02, -0.8]}
    >
      <GLTFFurniture
        src={MODEL_PATHS.carpet}
        autoFit={[1.0, 0.5, 5.0]}
        offset={[0, 0, 0]}
        fallback={<CarpetFallback />}
      />
    </InteractiveObject>
  )
})
