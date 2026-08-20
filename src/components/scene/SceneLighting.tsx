/**
 * Fully local lighting — no HDR / CDN assets (avoids CORS and network failures).
 */
/**
 * Fully local lighting — no HDR / CDN assets (avoids CORS and network failures).
 * Tuned warm: low color temperature throughout, no cool/blue fills, so the
 * room reads like early-evening lamp light rather than an office ceiling.
 */
export function SceneLighting() {
  return (
    <>
      <hemisphereLight args={['#fff2df', '#d8b98c', 0.55]} />
      <ambientLight intensity={0.42} color="#fff1e0" />
      <directionalLight
        castShadow
        position={[5, 8, 3]}
        intensity={1.1}
        color="#fff3e0"
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={25}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <directionalLight position={[-3, 4, -2]} intensity={0.35} color="#ffe4b8" />
      {/* Warm lamp-glow pools instead of the old cool-white/blue fills */}
      <pointLight position={[-4, 2.5, -1]} intensity={0.35} color="#ffcf94" />
      <pointLight position={[5, 2.5, -3]} intensity={0.25} color="#ffdca8" />
      <pointLight position={[0, 2.8, -4]} intensity={0.28} color="#ffe8c2" />
    </>
  )
}
