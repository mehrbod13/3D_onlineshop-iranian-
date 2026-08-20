import { useMemo } from 'react'
import * as THREE from 'three'
import { getGardenTexture, getSkylineTexture, getMountainTexture } from './gardenTexture'

const frameMaterial = new THREE.MeshStandardMaterial({
  color: '#f7f1e6',
  roughness: 0.55,
  metalness: 0.05,
})

const mullionMaterial = new THREE.MeshStandardMaterial({
  color: '#ece2cf',
  roughness: 0.6,
})

const rodMaterial = new THREE.MeshStandardMaterial({
  color: '#6b4a35',
  roughness: 0.4,
  metalness: 0.3,
})

const curtainMaterial = new THREE.MeshStandardMaterial({
  color: '#c97b5f',
  roughness: 0.9,
  side: THREE.DoubleSide,
})

const VIEW_TEXTURES = {
  garden: getGardenTexture,
  skyline: getSkylineTexture,
  mountain: getMountainTexture,
} as const

interface WindowProps {
  /** Center of the window, flush against the wall's inner face. */
  position: [number, number, number]
  /** Rotate so the pane faces into the room — same rotation you'd give a
   *  furniture piece against that wall. */
  rotationY?: number
  width?: number
  height?: number
  /** Which procedural view shows through the glass — keeps windows from
   *  all looking identical. */
  view?: keyof typeof VIEW_TEXTURES
  /** Sheer curtains drawn open to the sides — decorative, doesn't block
   *  the glass, so daylight still comes through unobstructed. */
  curtains?: boolean
}

/**
 * The walls are solid boxes (no actual hole cut through them), so this
 * doesn't punch through anything — it mounts a bright view pane flush on
 * the wall face, framed in trim, with a couple of warm point lights placed
 * just inside it so daylight visibly spills onto the floor and nearby
 * furniture instead of the window just looking like a flat picture.
 */
export function Window({
  position,
  rotationY = 0,
  width = 1.8,
  height = 1.4,
  view = 'garden',
  curtains = false,
}: WindowProps) {
  const texture = useMemo(() => VIEW_TEXTURES[view](), [view])
  const ft = 0.09 // frame bar thickness

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Frame */}
      <mesh position={[0, height / 2 + ft / 2, 0]} material={frameMaterial} castShadow>
        <boxGeometry args={[width + ft * 2, ft, 0.12]} />
      </mesh>
      <mesh position={[0, -height / 2 - ft / 2, 0]} material={frameMaterial} castShadow>
        <boxGeometry args={[width + ft * 2, ft, 0.12]} />
      </mesh>
      <mesh position={[-width / 2 - ft / 2, 0, 0]} material={frameMaterial} castShadow>
        <boxGeometry args={[ft, height, 0.12]} />
      </mesh>
      <mesh position={[width / 2 + ft / 2, 0, 0]} material={frameMaterial} castShadow>
        <boxGeometry args={[ft, height, 0.12]} />
      </mesh>

      {/* Cross mullion splitting the pane into four lights (panes) */}
      <mesh material={mullionMaterial}>
        <boxGeometry args={[0.035, height, 0.05]} />
      </mesh>
      <mesh material={mullionMaterial}>
        <boxGeometry args={[width, 0.035, 0.05]} />
      </mesh>

      {/* The view — emissive + toneMapped=false keeps it bright/vivid
          regardless of the room's own (warm, fairly dim) lighting, the
          way a sunlit window looks brighter than the room around it. */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={0.55}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Daylight spilling into the room — offsets are along local +Z,
          the pane's own facing direction, so they land "in front of"
          the glass no matter which wall/rotation this instance uses. */}
      <pointLight position={[0, 0, 0.4]} intensity={0.55} color="#ffe1a8" distance={7} decay={2} />
      <pointLight position={[0, -0.3, 1.6]} intensity={0.22} color="#fff2d2" distance={5} decay={2} />

      {curtains && (
        <>
          {/* Rod above the frame */}
          <mesh
            position={[0, height / 2 + ft + 0.14, 0.06]}
            rotation={[0, 0, Math.PI / 2]}
            material={rodMaterial}
          >
            <cylinderGeometry args={[0.018, 0.018, width + 0.7, 10]} />
          </mesh>

          {/* Panels drawn open to each side — framing, not blocking, the glass */}
          {[-1, 1].map((side) => (
            <group key={side} position={[side * (width / 2 + 0.22), -0.08, 0.07]}>
              <mesh
                rotation={[0, side * 0.22, 0]}
                material={curtainMaterial}
              >
                <planeGeometry args={[0.34, height + 0.32]} />
              </mesh>
              <mesh
                position={[side * 0.08, 0, -0.02]}
                rotation={[0, side * 0.42, 0]}
                material={curtainMaterial}
              >
                <planeGeometry args={[0.24, height + 0.28]} />
              </mesh>
            </group>
          ))}
        </>
      )}
    </group>
  )
}
