import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const Lights = () => {
  const cyanLightRef = useRef<THREE.PointLight>(null)
  const magentaLightRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (cyanLightRef.current) {
      cyanLightRef.current.position.x = Math.sin(t * 0.5) * 5
      cyanLightRef.current.position.y = Math.cos(t * 0.3) * 3 + 2
      cyanLightRef.current.intensity = 1.5 + Math.sin(t * 2) * 0.3
    }

    if (magentaLightRef.current) {
      magentaLightRef.current.position.x = Math.cos(t * 0.4) * 5
      magentaLightRef.current.position.y = Math.sin(t * 0.6) * 3 - 1
      magentaLightRef.current.intensity = 1.2 + Math.cos(t * 1.5) * 0.3
    }
  })

  return (
    <>
      <ambientLight intensity={0.1} color="#020408" />
      
      {/* Main cyan light */}
      <pointLight
        ref={cyanLightRef}
        color="#00ffff"
        intensity={2}
        distance={20}
        decay={2}
        position={[4, 2, 3]}
      />

      {/* Accent magenta light */}
      <pointLight
        ref={magentaLightRef}
        color="#ff00ff"
        intensity={1.5}
        distance={15}
        decay={2}
        position={[-4, -1, 2]}
      />

      {/* Subtle fill light */}
      <pointLight
        color="#001a2e"
        intensity={0.8}
        distance={30}
        position={[0, 10, -5]}
      />

      {/* Bottom rim */}
      <pointLight
        color="#00ff41"
        intensity={0.4}
        distance={10}
        position={[0, -5, 0]}
      />
    </>
  )
}
