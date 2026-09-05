import type { FurnitureCategory } from '../../types'

// import.meta.env.BASE_URL خودش برابر '/' توی dev، و
// '/3D_onlineshop-iranian-/' توی build نهایی می‌شه — پس دیگه
// لازم نیست دستی جابه‌جاش کنیم.
const base = import.meta.env.BASE_URL

export const MODEL_PATHS: Record<FurnitureCategory, string> = {
  sofa: `${base}models/sofa.glb`,
  lamp: `${base}models/lamp.glb`,
  tv: `${base}models/tv.glb`,
  tvStand: `${base}models/tv-stand.glb`,
  diningTable: `${base}models/dining-table.glb`,
  chair: `${base}models/chair.glb`,
  fridge: `${base}models/fridge.glb`,
  kitchenCabinets: `${base}models/kitchen-cabinets.glb`,
  coffeeTable: `${base}models/coffee-table.glb`,
  bookshelf: `${base}models/bookshelf.glb`,
  plant: `${base}models/plant.glb`,
  microwave: `${base}models/microwave.glb`,
  bed: `${base}models/bed.glb`,
  sideTable: `${base}models/side-table.glb`,
  carpet: `${base}models/carpet.glb`,
  stove: `${base}models/stove.glb`,
  washingMachine: `${base}models/washing-machine.glb`,
  sink: `${base}models/sink.glb`,
  dishwasher: `${base}models/dishwasher.glb`,
  armchair: `${base}models/armchair.glb`,
  wardrobe: `${base}models/wardrobe.glb`,
  mirror: `${base}models/mirror.glb`,
  wallArt: `${base}models/wall-art.glb`,
  chandelier: `${base}models/chandelier.glb`,
  desk: `${base}models/desk.glb`,
}
