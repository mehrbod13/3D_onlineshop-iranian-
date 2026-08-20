import * as THREE from 'three'

const doorFrameMaterial = new THREE.MeshStandardMaterial({
  color: '#5c3c28',
  roughness: 0.5,
  metalness: 0.05,
})

const doorPanelMaterial = new THREE.MeshStandardMaterial({
  color: '#8a5a3b',
  roughness: 0.55,
  metalness: 0.05,
})

const doorGlassMaterial = new THREE.MeshStandardMaterial({
  color: '#dce8ef',
  roughness: 0.2,
  metalness: 0.1,
  transparent: true,
  opacity: 0.5,
})

const knobMaterial = new THREE.MeshStandardMaterial({
  color: '#d8b45a',
  roughness: 0.3,
  metalness: 0.8,
})

interface DoorProps {
  /** Floor-level position — same convention as furniture, not window
   *  (which positions from its own center). */
  position: [number, number, number]
  rotationY?: number
  width?: number
  height?: number
}

/**
 * Purely decorative double entrance door, mounted flush on the wall the
 * same way <Window> is. Not openable — it exists so the wall behind the
 * player's spawn point has a real focal point instead of being an empty
 * doorway gap.
 */
export function Door({
  position,
  rotationY = 0,
  width = 1.9,
  height = 2.25,
}: DoorProps) {
  const ft = 0.1
  const panelW = width / 2 - 0.03

  function Panel({ side }: { side: 1 | -1 }) {
    return (
      <group position={[side * (panelW / 2 + 0.015), 0, 0]}>
        <mesh position={[0, height / 2, 0]} material={doorPanelMaterial} castShadow>
          <boxGeometry args={[panelW, height, 0.06]} />
        </mesh>
        {/* Small glazed pane near the top, like a real entry door */}
        <mesh position={[0, height * 0.74, 0.035]} material={doorGlassMaterial}>
          <boxGeometry args={[panelW * 0.55, height * 0.22, 0.01]} />
        </mesh>
        {/* Knob */}
        <mesh position={[-side * panelW * 0.32, height * 0.46, 0.05]} material={knobMaterial}>
          <sphereGeometry args={[0.035, 12, 12]} />
        </mesh>
      </group>
    )
  }

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Frame */}
      <mesh position={[0, height + ft / 2, 0]} material={doorFrameMaterial} castShadow>
        <boxGeometry args={[width + ft * 2, ft, 0.14]} />
      </mesh>
      <mesh position={[-width / 2 - ft / 2, height / 2, 0]} material={doorFrameMaterial} castShadow>
        <boxGeometry args={[ft, height + ft, 0.14]} />
      </mesh>
      <mesh position={[width / 2 + ft / 2, height / 2, 0]} material={doorFrameMaterial} castShadow>
        <boxGeometry args={[ft, height + ft, 0.14]} />
      </mesh>

      <Panel side={-1} />
      <Panel side={1} />
    </group>
  )
}
