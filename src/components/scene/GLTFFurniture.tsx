import { Component, Suspense, useMemo, type ReactNode } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface ModelProps {
  src: string
  scale: number
  offset: [number, number, number]
  autoFit?: [number, number, number]
}

function Model({ src, scale, offset, autoFit }: ModelProps) {
  const { scene } = useGLTF(src)

  // Clone so the same cached asset can be reused by several furniture
  // instances (e.g. 4 dining chairs) without them fighting over one
  // shared Object3D, and tag every mesh for shadows — glTF imports
  // don't cast/receive by default.
  const prepared = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    if (autoFit) {
      // Downloaded models rarely agree on units (cm vs m is the classic
      // one — scale=1 then makes them either 100x too big, so the camera
      // starts out clipped inside a wall of geometry, or 100x too small,
      // a speck you'll never spot). Measure the model's actual bounding
      // box and scale it to match the footprint the old hand-built
      // geometry used, then re-center it and drop it onto the floor —
      // no more guessing a `scale` number by trial and error.
      const rawBox = new THREE.Box3().setFromObject(clone)
      const rawSize = new THREE.Vector3()
      rawBox.getSize(rawSize)

      const targetHorizontal = Math.max(autoFit[0], autoFit[2])
      const currentHorizontal = Math.max(rawSize.x, rawSize.z) || 1
      const fitScale = targetHorizontal / currentHorizontal
      clone.scale.setScalar(fitScale)

      const fittedBox = new THREE.Box3().setFromObject(clone)
      const center = new THREE.Vector3()
      fittedBox.getCenter(center)
      clone.position.x -= center.x
      clone.position.z -= center.z
      clone.position.y -= fittedBox.min.y // sit the base on the floor

      if (import.meta.env.DEV) {
        console.info(
          `[GLTFFurniture] "${src}" raw size ${rawSize.x.toFixed(2)}×${rawSize.y.toFixed(2)}×${rawSize.z.toFixed(2)} → scaled ×${fitScale.toFixed(4)}`,
        )
      }
    } else {
      clone.scale.setScalar(scale)
    }

    return clone
  }, [scene, scale, autoFit, src])

  return <primitive object={prepared} position={offset} />
}

interface BoundaryState {
  hasError: boolean
}

/**
 * If a .glb 404s or fails to parse, fall back instead of taking the whole
 * Canvas down with it — useGLTF throws, and R3F has no built-in recovery
 * for that inside a single Suspense boundary.
 */
class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; src: string },
  BoundaryState
> {
  state: BoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.warn(`[GLTFFurniture] "${this.props.src}" failed to load, showing fallback:`, error)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

interface GLTFFurnitureProps {
  /** Path under /public, e.g. '/models/sofa.glb' */
  src: string
  /** Uniform scale — only used when `autoFit` isn't set. Model exporters
   *  rarely agree on units, so prefer `autoFit` unless you specifically
   *  want manual control. */
  scale?: number
  /** Extra offset applied after fitting/scaling, e.g. to nudge a model
   *  that's still slightly off after auto-fit. */
  offset?: [number, number, number]
  /** [width, height, depth] the model should be scaled to fit (its
   *  largest horizontal dimension is matched — height doesn't affect the
   *  scale, so a tall lamp isn't squashed to match a short target width).
   *  Pass the same size you used for `fallback`'s PlaceholderBox and this
   *  handles unit mismatches and off-floor pivots automatically. */
  autoFit?: [number, number, number]
  /** Shown while the model streams in, and permanently if it fails to
   *  load — keeps the room from having a hole in it mid-migration. */
  fallback?: ReactNode
}

export function GLTFFurniture({
  src,
  scale = 1,
  offset = [0, 0, 0],
  autoFit,
  fallback = null,
}: GLTFFurnitureProps) {
  return (
    <ModelErrorBoundary src={src} fallback={fallback}>
      <Suspense fallback={fallback}>
        <Model src={src} scale={scale} offset={offset} autoFit={autoFit} />
      </Suspense>
    </ModelErrorBoundary>
  )
}

/** Call once per model path (module scope) so it's fetched/cached early. */
export function preloadFurnitureModel(src: string) {
  useGLTF.preload(src)
}

/** Simple neutral box shown until (or unless) the real model is in place. */
export function PlaceholderBox({
  size = [0.6, 0.6, 0.6],
  position = [0, 0.3, 0],
}: {
  size?: [number, number, number]
  position?: [number, number, number]
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#cfc7ba" roughness={0.9} metalness={0.02} />
    </mesh>
  )
}
