import { floorMaterial, wallMaterial } from './materials'

const ROOM_WIDTH = 14
const ROOM_DEPTH = 12
const WALL_HEIGHT = 3.2
const WALL_THICKNESS = 0.2

function Wall({
  position,
  size,
}: {
  position: [number, number, number]
  size: [number, number, number]
}) {
  return (
    <mesh position={position} material={wallMaterial} castShadow receiveShadow>
      <boxGeometry args={size} />
    </mesh>
  )
}

/**
 * Apartment shell: living (left) | kitchen+bed wing (right).
 * Bedroom separated from kitchen by a wall at z ≈ 2.75.
 */
export function Apartment() {
  const hw = ROOM_WIDTH / 2
  const hd = ROOM_DEPTH / 2
  const hh = WALL_HEIGHT / 2

  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        material={floorMaterial}
        receiveShadow
      >
        <planeGeometry args={[ROOM_WIDTH, ROOM_DEPTH]} />
      </mesh>

      {/* Back wall — TV */}
      <Wall position={[0, hh, -hd]} size={[ROOM_WIDTH, WALL_HEIGHT, WALL_THICKNESS]} />

      {/* Front wall — doorway to entrance */}
      <Wall
        position={[-hw / 2 - 1.5, hh, hd]}
        size={[ROOM_WIDTH / 2 - 1.5, WALL_HEIGHT, WALL_THICKNESS]}
      />
      <Wall
        position={[hw / 2 + 1.5, hh, hd]}
        size={[ROOM_WIDTH / 2 - 1.5, WALL_HEIGHT, WALL_THICKNESS]}
      />

      {/* Left exterior wall */}
      <Wall position={[-hw, hh, 0]} size={[WALL_THICKNESS, WALL_HEIGHT, ROOM_DEPTH]} />

      {/* Right exterior wall */}
      <Wall position={[hw, hh, 0]} size={[WALL_THICKNESS, WALL_HEIGHT, ROOM_DEPTH]} />

      {/* Living | right-wing divider (kitchen side only, z < 2.5) */}
      <Wall position={[4.2, hh, -1.2]} size={[WALL_THICKNESS, WALL_HEIGHT, 4]} />

      {/* Kitchen | bedroom divider with doorway gap at center */}
      <Wall position={[4.8, hh, 2.75]} size={[1.8, WALL_HEIGHT, WALL_THICKNESS]} />
      <Wall position={[6.4, hh, 2.75]} size={[1.8, WALL_HEIGHT, WALL_THICKNESS]} />

      {/* Bedroom back wall */}
      <Wall position={[3, hh, hd]} size={[11, WALL_HEIGHT, WALL_THICKNESS]} />

      <mesh position={[0, WALL_HEIGHT, 0]} material={wallMaterial} receiveShadow>
        <boxGeometry args={[ROOM_WIDTH, 0.1, ROOM_DEPTH]} />
      </mesh>
    </group>
  )
}

export { ROOM_WIDTH, ROOM_DEPTH, WALL_HEIGHT }
