import { forwardRef } from "react";
import {
  InteractiveObject,
  type InteractiveObjectHandle,
} from "../InteractiveObject";
import {
  GLTFFurniture,
  PlaceholderBox,
  preloadFurnitureModel,
} from "../GLTFFurniture";
import { MODEL_PATHS } from "../modelPaths";
import { BEDROOM } from "../layout";

preloadFurnitureModel(MODEL_PATHS.bed);

export const Bed = forwardRef<InteractiveObjectHandle>(function Bed(_, ref) {
  return (
    <InteractiveObject
      ref={ref}
      id="bed-main"
      category="bed"
      label="تخت خواب"
      position={BEDROOM.bed}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <GLTFFurniture
        src={MODEL_PATHS.bed}
        autoFit={[2.0, 0.7, 1.5]}
        offset={[0, 0, 0]}
        fallback={
          <PlaceholderBox size={[2.0, 0.7, 1.5]} position={[0, 0.35, 0]} />
        }
      />
    </InteractiveObject>
  );
});
