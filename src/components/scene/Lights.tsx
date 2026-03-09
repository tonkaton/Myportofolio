import * as THREE from 'three'

export const Lights = () => (
  <>
    <ambientLight intensity={0.55} color="#0d1f30" />
    {/* Key light dari kanan atas — untuk orbit + astronaut */}
    <pointLight color="#00ffff" intensity={2.5} distance={35} decay={1.5} position={[6, 4, 3]} />
    {/* Fill dari kiri */}
    <pointLight color="#ff00ff" intensity={1.0} distance={20} decay={1.5} position={[-4, -1, 2]} />
    {/* Rim bawah */}
    <directionalLight color="#001a3a" intensity={0.5} position={[0, -8, 5]} />
  </>
)
