import type { FurnitureCategory } from '../../types'

/**
 * Drop the matching .glb into /public/models/ for each entry — the
 * filename doesn't need to change, just replace the file. Missing files
 * fall back to a placeholder box instead of crashing the scene (see
 * GLTFFurniture), so you can migrate item by item.
 */
export const MODEL_PATHS: Record<FurnitureCategory, string> = {
  sofa: '/models/sofa.glb',
  lamp: '/models/lamp.glb',
  tv: '/models/tv.glb',
  tvStand: '/models/tv-stand.glb',
  diningTable: '/models/dining-table.glb',
  chair: '/models/chair.glb',
  fridge: '/models/fridge.glb',
  kitchenCabinets: '/models/kitchen-cabinets.glb',
  coffeeTable: '/models/coffee-table.glb',
  bookshelf: '/models/bookshelf.glb',
  plant: '/models/plant.glb',
  microwave: '/models/microwave.glb',
  bed: '/models/bed.glb',
  sideTable: '/models/side-table.glb',
  carpet: '/models/carpet.glb',
  stove: '/models/stove.glb',
  washingMachine: '/models/washing-machine.glb',
  sink: '/models/sink.glb',
  dishwasher: '/models/dishwasher.glb',
}
