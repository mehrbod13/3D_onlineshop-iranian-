import { floorMaterial, wallMaterial, baseboardMaterial, ceilingMaterial } from './materials'
import { Window } from './Window'
import { Door } from './Door'

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

      {/* Living-room window — left exterior wall, flush against the inner
          face. rotationY=Math.PI/2 turns the pane's default +Z-facing
          normal to face world +X, i.e. into the room from this wall. */}
      <Window
        position={[-hw + WALL_THICKNESS / 2 + 0.01, 1.6, -1]}
        rotationY={Math.PI / 2}
        width={1.9}
        height={1.5}
        view="garden"
      />

      {/* Front (entrance) wall — the player spawns facing it. A decorative
          door fills the doorway gap, with a window right next to it.
          rotationY=Math.PI faces both into the room (-Z) from this wall. */}
      <Door
        position={[0, 0, hd - WALL_THICKNESS / 2 - 0.01]}
        rotationY={Math.PI}
        width={1.7}
        height={2.15}
      />
      <Window
        position={[-3.6, 1.6, hd - WALL_THICKNESS / 2 - 0.01]}
        rotationY={Math.PI}
        width={1.4}
        height={1.7}
        view="skyline"
      />

      {/* Bedroom window — back wall, curtains drawn open to the sides so
          they frame it without cutting the light. */}
      <Window
        position={[hw - WALL_THICKNESS / 2 - 0.01, 1.8, 4.3]}
        rotationY={-Math.PI / 2}
        width={1.1}
        height={1.5}
        view="mountain"
        curtains
      />
    </group>
  )
}

export { ROOM_WIDTH, ROOM_DEPTH, WALL_HEIGHT }
