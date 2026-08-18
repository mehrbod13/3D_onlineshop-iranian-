import { useEffect, useRef } from 'react'
import { useInteractionStore } from '../../store/interactionStore'
import { MINIMAP_POINTS, ROOM_WIDTH, ROOM_DEPTH } from '../scene/minimapData'

const SIZE = 160 // px — square canvas
const PADDING = 10

interface MiniMapProps {
  visible: boolean
}

/** Fixed-position top-down radar in the corner: room outline, furniture dots, player arrow. */
export function MiniMap({ visible }: MiniMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const playerX = useInteractionStore((s) => s.playerX)
  const playerZ = useInteractionStore((s) => s.playerZ)
  const playerYaw = useInteractionStore((s) => s.playerYaw)
  const wishlist = useInteractionStore((s) => s.wishlist)
  const hoveredCategory = useInteractionStore((s) => s.hoveredCategory)

  useEffect(() => {
    if (!visible) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const scaleX = (SIZE - PADDING * 2) / ROOM_WIDTH
    const scaleZ = (SIZE - PADDING * 2) / ROOM_DEPTH

    // World X/Z → canvas space (canvas Y grows downward, so flip Z).
    const toCanvas = (x: number, z: number) => ({
      cx: SIZE / 2 + x * scaleX,
      cy: SIZE / 2 + z * scaleZ,
    })

    ctx.clearRect(0, 0, SIZE, SIZE)

    // Room floor
    ctx.fillStyle = 'rgba(15, 23, 42, 0.55)'
    ctx.beginPath()
    ctx.roundRect(PADDING, PADDING, SIZE - PADDING * 2, SIZE - PADDING * 2, 8)
    ctx.fill()
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.6)'
    ctx.lineWidth = 1
    ctx.stroke()

    // Zone divider hints (kitchen/bedroom wall at x≈4.5, z≈2.75)
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)'
    ctx.setLineDash([2, 3])
    const wallA = toCanvas(4.5, -6)
    const wallB = toCanvas(4.5, 6)
    ctx.beginPath()
    ctx.moveTo(wallA.cx, PADDING)
    ctx.lineTo(wallB.cx, SIZE - PADDING)
    ctx.stroke()
    ctx.setLineDash([])

    // Furniture dots
    for (const point of MINIMAP_POINTS) {
      const { cx, cy } = toCanvas(point.x, point.z)
      const inWishlist = wishlist.some((item) => item.category === point.category)
      const isHovered = hoveredCategory === point.category

      ctx.beginPath()
      ctx.arc(cx, cy, isHovered ? 3.5 : 2.5, 0, Math.PI * 2)
      ctx.fillStyle = inWishlist
        ? '#fb923c' // orange — already saved to the wishlist
        : isHovered
          ? '#ffffff'
          : 'rgba(226, 232, 240, 0.65)'
      ctx.fill()
    }

    // Player arrow
    const player = toCanvas(playerX, playerZ)
    ctx.save()
    ctx.translate(player.cx, player.cy)
    ctx.rotate(playerYaw)
    ctx.beginPath()
    ctx.moveTo(0, -6)
    ctx.lineTo(4, 5)
    ctx.lineTo(-4, 5)
    ctx.closePath()
    ctx.fillStyle = '#fb923c'
    ctx.shadowColor = 'rgba(251, 146, 60, 0.9)'
    ctx.shadowBlur = 6
    ctx.fill()
    ctx.restore()
  }, [visible, playerX, playerZ, playerYaw, wishlist, hoveredCategory])

  if (!visible) return null

  return (
    <div className="pointer-events-none fixed right-6 top-6 z-30 rounded-xl border border-white/10 bg-black/30 p-1.5 shadow-lg backdrop-blur">
      <canvas ref={canvasRef} width={SIZE} height={SIZE} />
    </div>
  )
}
