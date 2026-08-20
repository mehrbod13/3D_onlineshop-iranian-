import { Component, Suspense, useMemo, type ReactNode } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  src: string;
  scale: number;
  offset: [number, number, number];
  autoFit?: [number, number, number];
  verticalAnchor: "floor" | "center";
}

function Model({ src, scale, offset, autoFit, verticalAnchor }: ModelProps) {
  const { scene } = useGLTF(src);

  const prepared = useMemo(() => {
    /*
     * IMPORTANT:
     *
     * The GLB may have its geometry far away from its origin.
     *
     * Example from your model:
     *
     * origin = (0, 0, 0)
     * geometry center ≈ (340, 16.8, -232)
     *
     * Therefore we put the GLB inside a wrapper and normalize
     * the model inside that wrapper.
     */

    const root = new THREE.Group();

    const model = scene.clone(true);

    let meshCount = 0;

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }

      meshCount++;

      child.visible = true;
      child.castShadow = true;
      child.receiveShadow = true;

      if (child.geometry) {
        child.geometry.computeBoundingBox();
        child.geometry.computeBoundingSphere();
      }
    });

    /*
     * ---------------------------------------------------------
     * STEP 1: Measure the original model.
     * ---------------------------------------------------------
     */

    const rawBox = new THREE.Box3().setFromObject(model);

    const rawSize = new THREE.Vector3();
    const rawCenter = new THREE.Vector3();

    rawBox.getSize(rawSize);
    rawBox.getCenter(rawCenter);

    /*
     * ---------------------------------------------------------
     * STEP 2: Scale the model.
     * ---------------------------------------------------------
     */

    if (autoFit) {
      const targetWidth = autoFit[0];
      const targetDepth = autoFit[2];

      const targetHorizontal = Math.max(targetWidth, targetDepth);

      const currentHorizontal = Math.max(rawSize.x, rawSize.z);

      const fitScale =
        currentHorizontal > 0 ? targetHorizontal / currentHorizontal : 1;

      model.scale.setScalar(fitScale);
    } else {
      model.scale.setScalar(scale);
    }

    /*
     * ---------------------------------------------------------
     * STEP 3: Recalculate bounding box after scaling.
     * ---------------------------------------------------------
     */

    const scaledBox = new THREE.Box3().setFromObject(model);

    const scaledCenter = new THREE.Vector3();

    scaledBox.getCenter(scaledCenter);

    /*
     * ---------------------------------------------------------
     * STEP 4: Remove the GLB's weird internal offset.
     *
     * Your model currently lives around:
     *
     * X ≈ 340
     * Z ≈ -232
     *
     * This moves the actual geometry to the origin.
     * ---------------------------------------------------------
     */

    model.position.x -= scaledCenter.x;
    model.position.z -= scaledCenter.z;

    /*
     * ---------------------------------------------------------
     * STEP 5: Anchor the model vertically.
     *
     * "floor" (default) — sit the model's bottom on y = 0, for
     * anything standing on the ground.
     * "center" — center the model on y = 0 instead, for wall-mounted
     * items (mirror, wall art, a hanging light) whose InteractiveObject
     * position is already the intended on-wall height.
     * ---------------------------------------------------------
     */

    const centeredBox = new THREE.Box3().setFromObject(model);

    if (verticalAnchor === "center") {
      const midY = (centeredBox.min.y + centeredBox.max.y) / 2;
      model.position.y -= midY;
    } else {
      model.position.y -= centeredBox.min.y;
    }

    /*
     * ---------------------------------------------------------
     * STEP 6: Put the normalized model inside the wrapper.
     *
     * The wrapper is now what gets inserted into R3F.
     * ---------------------------------------------------------
     */

    root.add(model);

    if (import.meta.env.DEV) {
      const finalBox = new THREE.Box3().setFromObject(root);
      const finalSize = new THREE.Vector3();

      finalBox.getSize(finalSize);
    }

    return root;
  }, [scene, src, scale, autoFit, verticalAnchor]);

  return <primitive object={prepared} position={offset} />;
}

interface BoundaryState {
  hasError: boolean;
}

class ModelErrorBoundary extends Component<
  {
    children: ReactNode;
    fallback: ReactNode;
    src: string;
  },
  BoundaryState
> {
  state: BoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): BoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: unknown) {
    console.error(
      `[GLTFFurniture] Failed to render "${this.props.src}"`,
      error,
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

interface GLTFFurnitureProps {
  src: string;

  scale?: number;

  offset?: [number, number, number];

  autoFit?: [number, number, number];

  /** "floor" (default) rests the model's base at y=0; "center" centers
   *  it on y=0 instead — use this for wall-mounted items. */
  verticalAnchor?: "floor" | "center";

  fallback?: ReactNode;
}

export function GLTFFurniture({
  src,
  scale = 1,
  offset = [0, 0, 0],
  autoFit,
  verticalAnchor = "floor",
  fallback = null,
}: GLTFFurnitureProps) {
  return (
    <ModelErrorBoundary src={src} fallback={fallback}>
      <Suspense fallback={fallback}>
        <Model
          src={src}
          scale={scale}
          offset={offset}
          autoFit={autoFit}
          verticalAnchor={verticalAnchor}
        />
      </Suspense>
    </ModelErrorBoundary>
  );
}

export function preloadFurnitureModel(src: string) {
  useGLTF.preload(src);
}

export function PlaceholderBox({
  size = [0.6, 0.6, 0.6],
  position = [0, 0.3, 0],
}: {
  size?: [number, number, number];
  position?: [number, number, number];
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />

      <meshStandardMaterial color="#cfc7ba" roughness={0.9} metalness={0.02} />
    </mesh>
  );
}
