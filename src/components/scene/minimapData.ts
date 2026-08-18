import type { FurnitureCategory } from '../../types'
import { KITCHEN_X, KITCHEN_Z, BEDROOM } from './layout'

export interface MinimapPoint {
  category: FurnitureCategory
  x: number
  z: number
}

/**
 * Room shell, mirrored from Apartment.tsx — kept here instead of importing
 * the 3D component so the minimap has no dependency on react-three-fiber.
 */
export const ROOM_WIDTH = 14
export const ROOM_DEPTH = 12

/** One dot per interactive item, in the same X/Z space as the 3D scene. */
export const MINIMAP_POINTS: MinimapPoint[] = [
  { category: 'sofa', x: -3.5, z: -2 },
  { category: 'lamp', x: -5.2, z: -1.5 },
  { category: 'tv', x: 0, z: -4.2 },
  { category: 'tvStand', x: 0, z: -4.2 },
  { category: 'diningTable', x: 1.2, z: 2.2 },
  { category: 'chair', x: 1.2, z: 2.2 },
  { category: 'fridge', x: KITCHEN_X, z: KITCHEN_Z.fridge },
  { category: 'kitchenCabinets', x: KITCHEN_X, z: KITCHEN_Z.cabinets },
  { category: 'coffeeTable', x: -2, z: -0.5 },
  { category: 'bookshelf', x: -6.6, z: 2 },
  { category: 'plant', x: -5.5, z: 0.5 },
  { category: 'microwave', x: KITCHEN_X, z: KITCHEN_Z.microwave },
  { category: 'bed', x: BEDROOM.bed[0], z: BEDROOM.bed[2] },
  { category: 'sideTable', x: BEDROOM.sideTable[0], z: BEDROOM.sideTable[2] },
  { category: 'carpet', x: -2, z: -0.8 },
  { category: 'stove', x: KITCHEN_X, z: KITCHEN_Z.stove },
  { category: 'washingMachine', x: BEDROOM.washer[0], z: BEDROOM.washer[2] },
  { category: 'sink', x: KITCHEN_X, z: KITCHEN_Z.sink },
  { category: 'dishwasher', x: KITCHEN_X, z: KITCHEN_Z.dishwasher },
]
