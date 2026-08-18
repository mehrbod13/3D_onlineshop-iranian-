import { useEffect, useRef, type RefObject } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { FurnitureCategory } from '../../types'
import { useInteractionStore } from '../../store/interactionStore'
import { playBuyClick, playAddToList, playPanelToggle } from '../../services/soundManager'

interface InteractionManagerProps {
  enabled: boolean
  interactiveRefs: RefObject<{ getMeshes: () => THREE.Object3D[] } | null>[]
}

const raycaster = new THREE.Raycaster()
const center = new THREE.Vector2(0, 0)

function findInteractiveMeta(
  object: THREE.Object3D,
): { id: string; category: FurnitureCategory } | null {
  let obj: THREE.Object3D | null = object
  while (obj) {
    if (obj.userData?.id && obj.userData?.category) {
      return {
        id: obj.userData.id as string,
        category: obj.userData.category as FurnitureCategory,
      }
    }
    obj = obj.parent
  }
  return null
}

export function InteractionManager({
  enabled,
  interactiveRefs,
}: InteractionManagerProps) {
  const { camera } = useThree()
  const hoveredObjectId = useInteractionStore((s) => s.hoveredObjectId)
  const setHovered = useInteractionStore((s) => s.setHovered)
  const openProductModal = useInteractionStore((s) => s.openProductModal)
  const isModalOpen = useInteractionStore((s) => s.isModalOpen)
  const isPointerLocked = useInteractionStore((s) => s.isPointerLocked)
  const addToWishlist = useInteractionStore((s) => s.addToWishlist)
  const toggleWishlist = useInteractionStore((s) => s.toggleWishlist)
  const isWishlistOpen = useInteractionStore((s) => s.isWishlistOpen)

  const hoveredRef = useRef<{ id: string; category: FurnitureCategory } | null>(
    null,
  )
  const enabledRef = useRef(enabled)
  const modalOpenRef = useRef(isModalOpen)
  const pointerLockedRef = useRef(isPointerLocked)
  const wishlistOpenRef = useRef(isWishlistOpen)
  const selectingRef = useRef(false)

  enabledRef.current = enabled
  modalOpenRef.current = isModalOpen
  pointerLockedRef.current = isPointerLocked
  wishlistOpenRef.current = isWishlistOpen

  // Click — go straight to the buy flow for the item under the crosshair.
  const selectHovered = () => {
    const target = hoveredRef.current
    if (!target || !enabledRef.current || modalOpenRef.current || selectingRef.current) {
      return false
    }

    selectingRef.current = true
    window.getSelection()?.removeAllRanges()
    playBuyClick()

    if (document.pointerLockElement) {
      document.exitPointerLock()
    }

    requestAnimationFrame(() => {
      void openProductModal(target.category).finally(() => {
        selectingRef.current = false
      })
    })

    return true
  }

  // E — quietly add the item to the corner wishlist without leaving the walkthrough.
  const addHoveredToWishlist = () => {
    const target = hoveredRef.current
    if (!target || !enabledRef.current || modalOpenRef.current) return false
    playAddToList()
    void addToWishlist(target.category)
    return true
  }

  // Tab — open/close the wishlist panel to review and buy the saved items.
  const toggleWishlistPanel = () => {
    if (!enabledRef.current || modalOpenRef.current) return
    playPanelToggle()
    if (!wishlistOpenRef.current && document.pointerLockElement) {
      document.exitPointerLock()
    }
    toggleWishlist()
  }

  useFrame(() => {
    if (!enabled || isModalOpen || isWishlistOpen) {
      if (hoveredObjectId) setHovered(null, null)
      hoveredRef.current = null
      return
    }

    const meshes = interactiveRefs
      .flatMap((ref) => ref.current?.getMeshes() ?? [])
      .filter(Boolean)

    if (meshes.length === 0) return

    raycaster.setFromCamera(center, camera)
    const hits = raycaster.intersectObjects(meshes, true)

    if (hits.length > 0) {
      const meta = findInteractiveMeta(hits[0].object)
      if (meta) {
        if (hoveredRef.current?.id !== meta.id) {
          hoveredRef.current = meta
          setHovered(meta.id, meta.category)
        }
        return
      }
    }

    if (hoveredRef.current) {
      hoveredRef.current = null
      setHovered(null, null)
    }
  })

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (event.button !== 0 || !pointerLockedRef.current) return
      if (!hoveredRef.current) return
      event.preventDefault()
      event.stopPropagation()
    }

    const onMouseUp = (event: MouseEvent) => {
      if (event.button !== 0 || !pointerLockedRef.current) return
      if (!hoveredRef.current) return
      event.preventDefault()
      event.stopPropagation()
      selectHovered()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'KeyE') {
        if (!pointerLockedRef.current || !hoveredRef.current) return
        event.preventDefault()
        addHoveredToWishlist()
        return
      }

      if (event.code === 'Tab') {
        // Prevent the browser from shifting focus out of the canvas.
        event.preventDefault()
        toggleWishlistPanel()
      }
    }

    window.addEventListener('mousedown', onMouseDown, true)
    window.addEventListener('mouseup', onMouseUp, true)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('mousedown', onMouseDown, true)
      window.removeEventListener('mouseup', onMouseUp, true)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [openProductModal, addToWishlist, toggleWishlist])

  return null
}
