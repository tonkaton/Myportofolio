import * as THREE from 'three'

// Static lights — no animation needed, no floating geometry to light
export const Lights = () => (
  <>
    <ambientLight intensity={0.3} color="#0a1a2e" />
    <pointLight color="#00ffff" intensity={2.5} distance={30} decay={1.5} position={[5, 3, 3]} />
    <pointLight color="#ff00ff" intensity={1.5} distance={20} decay={1.5} position={[-3, -2, 2]} />
    <directionalLight color="#001a3a" intensity={0.6} position={[0, 10, 5]} />
  </>
)
