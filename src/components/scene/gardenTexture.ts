import * as THREE from 'three'

let cached: THREE.CanvasTexture | null = null

/**
 * Draws a stylized "view through the window" onto a canvas — sky, sun
 * glow, a distant hill, a few clay-style trees, scattered flowers — and
 * returns it as a texture. No network fetch, no CORS, matches the room's
 * warm clay-style palette. Cached so every <Window> instance shares one
 * texture instead of repainting a canvas per instance.
 */
export function getGardenTexture(): THREE.CanvasTexture {
  if (cached) return cached

  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  // Sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, size * 0.65)
  sky.addColorStop(0, '#7fbdec')
  sky.addColorStop(1, '#dcedf8')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, size, size * 0.65)

  // Soft sun glow
  const sun = ctx.createRadialGradient(
    size * 0.78, size * 0.2, 4,
    size * 0.78, size * 0.2, size * 0.26,
  )
  sun.addColorStop(0, 'rgba(255,248,214,0.95)')
  sun.addColorStop(1, 'rgba(255,248,214,0)')
  ctx.fillStyle = sun
  ctx.fillRect(0, 0, size, size * 0.65)

  // Distant rolling hill
  ctx.fillStyle = '#a9cf8c'
  ctx.beginPath()
  ctx.moveTo(0, size * 0.62)
  ctx.quadraticCurveTo(size * 0.25, size * 0.5, size * 0.5, size * 0.58)
  ctx.quadraticCurveTo(size * 0.75, size * 0.66, size, size * 0.56)
  ctx.lineTo(size, size * 0.7)
  ctx.lineTo(0, size * 0.7)
  ctx.closePath()
  ctx.fill()

  // Grass foreground
  const grass = ctx.createLinearGradient(0, size * 0.64, 0, size)
  grass.addColorStop(0, '#7fb562')
  grass.addColorStop(1, '#5c9a49')
  ctx.fillStyle = grass
  ctx.fillRect(0, size * 0.64, size, size * 0.36)

  function tree(x: number, y: number, r: number, trunkH: number) {
    ctx.fillStyle = '#8a5a3b'
    ctx.fillRect(x - r * 0.12, y, r * 0.22, trunkH)
    ctx.fillStyle = '#4c8a4a'
    ctx.beginPath()
    ctx.arc(x, y - r * 0.25, r, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#5fa25a'
    ctx.beginPath()
    ctx.arc(x - r * 0.4, y - r * 0.5, r * 0.62, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#6bb063'
    ctx.beginPath()
    ctx.arc(x + r * 0.35, y - r * 0.55, r * 0.5, 0, Math.PI * 2)
    ctx.fill()
  }

  tree(size * 0.16, size * 0.68, 46, 34)
  tree(size * 0.44, size * 0.73, 32, 24)
  tree(size * 0.88, size * 0.65, 40, 30)

  // Scattered flowers in the grass
  const flowerColors = ['#ffd166', '#ef8fae', '#ffffff', '#ffb4c6']
  for (let i = 0; i < 46; i++) {
    ctx.fillStyle = flowerColors[i % flowerColors.length]
    const fx = Math.random() * size
    const fy = size * 0.68 + Math.random() * (size * 0.3)
    ctx.beginPath()
    ctx.arc(fx, fy, 2.4, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  cached = texture
  return texture
}

let cachedSkyline: THREE.CanvasTexture | null = null

/** Dusk city skyline — warm sunset sky, silhouetted buildings with lit
 *  windows. Used for the entrance window, for a "welcoming" feel. */
export function getSkylineTexture(): THREE.CanvasTexture {
  if (cachedSkyline) return cachedSkyline

  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  const sky = ctx.createLinearGradient(0, 0, 0, size)
  sky.addColorStop(0, '#5b6fa8')
  sky.addColorStop(0.45, '#e08a5c')
  sky.addColorStop(0.75, '#f6c98a')
  sky.addColorStop(1, '#f6c98a')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, size, size)

  // Sun low on the horizon
  const sun = ctx.createRadialGradient(
    size * 0.72, size * 0.55, 4,
    size * 0.72, size * 0.55, size * 0.16,
  )
  sun.addColorStop(0, 'rgba(255,235,190,0.9)')
  sun.addColorStop(1, 'rgba(255,235,190,0)')
  ctx.fillStyle = sun
  ctx.fillRect(0, 0, size, size)

  // Two rows of building silhouettes at different depths
  function buildingRow(baseY: number, color: string, minH: number, maxH: number, count: number) {
    ctx.fillStyle = color
    let x = -20
    while (x < size + 20) {
      const w = 34 + Math.random() * 40
      const h = minH + Math.random() * (maxH - minH)
      ctx.fillRect(x, baseY - h, w, h + (size - baseY))
      x += w + 6 + Math.random() * 10
    }
  }

  buildingRow(size * 0.72, '#3c3452', size * 0.16, size * 0.3, 10)
  buildingRow(size * 0.78, '#241f38', size * 0.22, size * 0.4, 8)

  // Lit windows scattered across the near buildings
  ctx.fillStyle = 'rgba(255,222,150,0.85)'
  for (let i = 0; i < 90; i++) {
    const wx = Math.random() * size
    const wy = size * 0.6 + Math.random() * size * 0.32
    if (Math.random() > 0.55) ctx.fillRect(wx, wy, 3, 4)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  cachedSkyline = texture
  return texture
}

let cachedMountain: THREE.CanvasTexture | null = null

/** Calm layered mountains under a soft pastel sky — quieter palette for
 *  the bedroom window. */
export function getMountainTexture(): THREE.CanvasTexture {
  if (cachedMountain) return cachedMountain

  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  const sky = ctx.createLinearGradient(0, 0, 0, size * 0.7)
  sky.addColorStop(0, '#b9d3e8')
  sky.addColorStop(1, '#eef2e4')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, size, size * 0.7)

  // Soft sun/moon glow, high and gentle
  const glow = ctx.createRadialGradient(
    size * 0.3, size * 0.22, 4,
    size * 0.3, size * 0.22, size * 0.2,
  )
  glow.addColorStop(0, 'rgba(255,250,235,0.9)')
  glow.addColorStop(1, 'rgba(255,250,235,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, size, size * 0.7)

  function ridge(baseY: number, amp: number, color: string) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(0, baseY)
    for (let x = 0; x <= size; x += 32) {
      const y = baseY - Math.sin(x * 0.012 + amp) * (28 + amp * 6) - amp * 4
      ctx.lineTo(x, y)
    }
    ctx.lineTo(size, size)
    ctx.lineTo(0, size)
    ctx.closePath()
    ctx.fill()
  }

  ridge(size * 0.62, 1, '#a7b8c9')
  ridge(size * 0.7, 2.4, '#8a9fb0')
  ridge(size * 0.8, 4, '#6d8496')

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  cachedMountain = texture
  return texture
}
