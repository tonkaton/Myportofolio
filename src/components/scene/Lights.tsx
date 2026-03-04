import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const Lights = () => {
  const cyanRef    = useRef<THREE.PointLight>(null)
  const magentaRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (cyanRef.current) {
      cyanRef.current.position.x = Math.sin(t * 0.5) * 5
      cyanRef.current.position.y = Math.cos(t * 0.3) * 3 + 2
    }
    if (magentaRef.current) {
      magentaRef.current.position.x = Math.cos(t * 0.4) * 5
      magentaRef.current.position.y = Math.sin(t * 0.6) * 3 - 1
    }
  })

  return (
    <>
      {/* Ambient — lebih terang supaya scene tidak hitam */}
      <ambientLight intensity={0.4} color="#0a1a2e" />

      {/* Cyan key light */}
      <pointLight ref={cyanRef}    color="#00ffff" intensity={3}   distance={25} decay={1.5} position={[4,  2,  3]} />

      {/* Magenta fill */}
      <pointLight ref={magentaRef} color="#ff00ff" intensity={2}   distance={20} decay={1.5} position={[-4,-1,  2]} />

      {/* Top fill — supaya geometry tidak gelap total */}
      <directionalLight color="#003366" intensity={0.8} position={[0, 10, 5]} />

      {/* Bottom rim green */}
      <pointLight color="#00ff41" intensity={0.6} distance={12} position={[0, -5, 0]} />
    </>
  )
}
