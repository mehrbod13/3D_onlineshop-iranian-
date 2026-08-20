import { floorMaterial, wallMaterial, baseboardMaterial, ceilingMaterial } from './materials'

const ROOM_WIDTH = 14
const ROOM_DEPTH = 12
const WALL_HEIGHT = 3.2
const WALL_THICKNESS = 0.2
const TRIM_HEIGHT = 0.14

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

/** A dark wood strip along a wall's base — the single detail that reads
 *  as "a finished room" instead of "four flat planes". */
function Baseboard({
  position,
  size,
}: {
  position: [number, number, number]
  size: [number, number, number]
}) {
  return (
    <mesh position={position} material={baseboardMaterial} castShadow receiveShadow>
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
  const th = TRIM_HEIGHT / 2
  // Baseboards poke out very slightly past the wall face so they actually
  // read as trim instead of z-fighting with it.
  const trimPad = 0.03

  /** [x, z, width, depth] footprint for every wall run — shared by the
   *  full-height wall mesh and its floor-level baseboard trim so the two
   *  never drift out of sync. */
  const wallRuns: { pos: [number, number]; size: [number, number] }[] = [
    { pos: [0, -hd], size: [ROOM_WIDTH, WALL_THICKNESS] }, // back wall — TV
    { pos: [-hw / 2 - 1.5, hd], size: [ROOM_WIDTH / 2 - 1.5, WALL_THICKNESS] }, // front-left
    { pos: [hw / 2 + 1.5, hd], size: [ROOM_WIDTH / 2 - 1.5, WALL_THICKNESS] }, // front-right
    { pos: [-hw, 0], size: [WALL_THICKNESS, ROOM_DEPTH] }, // left exterior
    { pos: [hw, 0], size: [WALL_THICKNESS, ROOM_DEPTH] }, // right exterior
    { pos: [4.2, -1.2], size: [WALL_THICKNESS, 4] }, // living | kitchen divider
    { pos: [4.8, 2.75], size: [1.8, WALL_THICKNESS] }, // kitchen | bedroom divider (left half)
    { pos: [6.4, 2.75], size: [1.8, WALL_THICKNESS] }, // kitchen | bedroom divider (right half)
    { pos: [3, hd], size: [11, WALL_THICKNESS] }, // bedroom back wall
  ]

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

      {wallRuns.map(({ pos, size }, i) => (
        <group key={i}>
          <Wall position={[pos[0], hh, pos[1]]} size={[size[0], WALL_HEIGHT, size[1]]} />
          <Baseboard
            position={[pos[0], th, pos[1]]}
            size={[size[0] + trimPad, TRIM_HEIGHT, size[1] + trimPad]}
          />
        </group>
      ))}

      <mesh position={[0, WALL_HEIGHT, 0]} material={ceilingMaterial} receiveShadow>
        <boxGeometry args={[ROOM_WIDTH, 0.1, ROOM_DEPTH]} />
      </mesh>
    </group>
  )
}

export { ROOM_WIDTH, ROOM_DEPTH, WALL_HEIGHT }
