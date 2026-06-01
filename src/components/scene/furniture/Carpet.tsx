import { forwardRef } from 'react'
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from '../InteractiveObject'
import * as THREE from 'three'

const carpetMat = new THREE.MeshStandardMaterial({
  color: '#c4a882',
  roughness: 0.95,
  emissive: new THREE.Color('#000000'),
})

export const Carpet = forwardRef<InteractiveObjectHandle>(function Carpet(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="carpet-main"
      category="carpet"
      label="فرش"
      position={[-2, 0.02, -0.8]}
    >
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={carpetMat} receiveShadow>
        <planeGeometry args={[3.5, 2.5]} />
      </mesh>
    </InteractiveObject>
  )
})
