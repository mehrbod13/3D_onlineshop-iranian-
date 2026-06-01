/**
 * Fully local lighting — no HDR / CDN assets (avoids CORS and network failures).
 */
export function SceneLighting() {
  return (
    <>
      <hemisphereLight args={['#fffaf5', '#c5d4e8', 0.55]} />
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[5, 8, 3]}
        intensity={1.15}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={25}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <directionalLight position={[-3, 4, -2]} intensity={0.35} color="#fff5e6" />
      <pointLight position={[-4, 2.5, -1]} intensity={0.3} color="#fff5e6" />
      <pointLight position={[5, 2.5, -3]} intensity={0.22} color="#ffffff" />
      <pointLight position={[0, 2.8, -4]} intensity={0.25} color="#e8f4ff" />
    </>
  )
}
