import * as THREE from 'three'

/** Shared clay / white stylized material palette. */
export const clayMaterial = new THREE.MeshStandardMaterial({
  color: '#f5f0eb',
  roughness: 0.85,
  metalness: 0.02,
})

export const clayDarkMaterial = new THREE.MeshStandardMaterial({
  color: '#e8e2db',
  roughness: 0.9,
  metalness: 0.02,
})

export const accentMaterial = new THREE.MeshStandardMaterial({
  color: '#d4c8bc',
  roughness: 0.75,
  metalness: 0.05,
})

export const screenMaterial = new THREE.MeshStandardMaterial({
  color: '#1a1a2e',
  roughness: 0.2,
  metalness: 0.4,
  emissive: '#0f3460',
  emissiveIntensity: 0.15,
})

export const floorMaterial = new THREE.MeshStandardMaterial({
  color: '#ebe6df',
  roughness: 0.95,
  metalness: 0,
})

export const wallMaterial = new THREE.MeshStandardMaterial({
  color: '#faf8f5',
  roughness: 0.92,
  metalness: 0,
})

export const highlightEmissive = new THREE.Color('#ff9f43')

/** Clay material with emissive channel for hover feedback. */
export function createClayMaterial(color = '#f5f0eb') {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.85,
    metalness: 0.02,
    emissive: new THREE.Color('#000000'),
  })
}
