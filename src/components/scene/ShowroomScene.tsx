import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, KeyboardControls } from '@react-three/drei'
import * as THREE from 'three'
import { Apartment } from './Apartment'
import { CameraController } from './CameraController'
import { InteractionManager } from './InteractionManager'
import { SceneLighting } from './SceneLighting'
import { Sofa } from './furniture/Sofa'
import { Lamp } from './furniture/Lamp'
import { TV } from './furniture/TV'
import { TVStand } from './furniture/TVStand'
import { DiningTable } from './furniture/DiningTable'
import { DiningChairs } from './furniture/Chair'
import { Fridge } from './furniture/Fridge'
import { KitchenCabinets } from './furniture/KitchenCabinets'
import { CoffeeTable } from './furniture/CoffeeTable'
import { Bookshelf } from './furniture/Bookshelf'
import { Plant } from './furniture/Plant'
import { Microwave } from './furniture/Microwave'
import { Bed } from './furniture/Bed'
import { SideTable } from './furniture/SideTable'
import { Carpet } from './furniture/Carpet'
import { Stove } from './furniture/Stove'
import { WashingMachine } from './furniture/WashingMachine'
import { Sink } from './furniture/Sink'
import { Dishwasher } from './furniture/Dishwasher'
import type { InteractiveObjectHandle } from './InteractiveObject'
import { useInteractionStore } from '../../store/interactionStore'
import { PlayerMovement } from './PlayerMovement'
import { PlayerTracker } from './PlayerTracker'

const keyboardMap = [
  { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
  { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
  { name: 'leftward', keys: ['KeyA', 'ArrowLeft'] },
  { name: 'rightward', keys: ['KeyD', 'ArrowRight'] },
]

interface ShowroomSceneProps {
  controlsEnabled: boolean
}

export function ShowroomScene({ controlsEnabled }: ShowroomSceneProps) {
  const isModalOpen = useInteractionStore((s) => s.isModalOpen)

  const sofaRef = useRef<InteractiveObjectHandle>(null)
  const lampRef = useRef<InteractiveObjectHandle>(null)
  const tvRef = useRef<InteractiveObjectHandle>(null)
  const tvStandRef = useRef<InteractiveObjectHandle>(null)
  const tableRef = useRef<InteractiveObjectHandle>(null)
  const chairsRef = useRef<InteractiveObjectHandle>(null)
  const fridgeRef = useRef<InteractiveObjectHandle>(null)
  const cabinetsRef = useRef<InteractiveObjectHandle>(null)
  const coffeeTableRef = useRef<InteractiveObjectHandle>(null)
  const bookshelfRef = useRef<InteractiveObjectHandle>(null)
  const plantRef = useRef<InteractiveObjectHandle>(null)
  const microwaveRef = useRef<InteractiveObjectHandle>(null)
  const bedRef = useRef<InteractiveObjectHandle>(null)
  const sideTableRef = useRef<InteractiveObjectHandle>(null)
  const carpetRef = useRef<InteractiveObjectHandle>(null)
  const stoveRef = useRef<InteractiveObjectHandle>(null)
  const washerRef = useRef<InteractiveObjectHandle>(null)
  const sinkRef = useRef<InteractiveObjectHandle>(null)
  const dishwasherRef = useRef<InteractiveObjectHandle>(null)

  const exploring = controlsEnabled && !isModalOpen

  const interactiveRefs = [
    sofaRef,
    lampRef,
    tvRef,
    tvStandRef,
    tableRef,
    chairsRef,
    fridgeRef,
    cabinetsRef,
    coffeeTableRef,
    bookshelfRef,
    plantRef,
    microwaveRef,
    bedRef,
    sideTableRef,
    carpetRef,
    stoveRef,
    washerRef,
    sinkRef,
    dishwasherRef,
  ]

  return (
    <KeyboardControls map={keyboardMap}>
    <Canvas
      shadows
      camera={{
        position: [0, 1.65, 3],
        fov: 70,
        near: 0.1,
        far: 50,
      }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true
        gl.shadowMap.type = THREE.PCFSoftShadowMap
      }}
    >
      <color attach="background" args={['#e8eef5']} />
      <fog attach="fog" args={['#e8eef5', 14, 32]} />

      <SceneLighting />

      <Apartment />

      <Sofa ref={sofaRef} />
      <Lamp ref={lampRef} />
      <TVStand ref={tvStandRef} />
      <TV ref={tvRef} />
      <DiningTable ref={tableRef} />
      <DiningChairs ref={chairsRef} />
      <Fridge ref={fridgeRef} />
      <KitchenCabinets ref={cabinetsRef} />
      <CoffeeTable ref={coffeeTableRef} />
      <Bookshelf ref={bookshelfRef} />
      <Plant ref={plantRef} />
      <Microwave ref={microwaveRef} />
      <Bed ref={bedRef} />
      <SideTable ref={sideTableRef} />
      <Carpet ref={carpetRef} />
      <Stove ref={stoveRef} />
      <WashingMachine ref={washerRef} />
      <Sink ref={sinkRef} />
      <Dishwasher ref={dishwasherRef} />

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.35}
        scale={16}
        blur={2.5}
        far={6}
      />

      <CameraController enabled={exploring} />
      <PlayerMovement active={exploring} />
      <PlayerTracker active={exploring} />
      <InteractionManager
        enabled={exploring}
        interactiveRefs={interactiveRefs}
      />
    </Canvas>
    </KeyboardControls>
  )
}
