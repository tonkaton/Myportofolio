import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

interface HologramTextProps {
  text: string
  position?: [number, number, number]
  size?: number
  color?: string
}

export const HologramText = ({
  text,
  position = [0, 0, 0],
  size = 0.5,
  color = '#00ffff',
}: HologramTextProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return
    const t = state.clock.elapsedTime

    // Hologram flicker
    materialRef.current.opacity = 0.7 + Math.sin(t * 8) * 0.05
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.05
  })

  return (
    <group position={position}>
      <Center>
        <Text3D
          ref={meshRef}
          font="/fonts/orbitron.json"
          size={size}
          height={0.05}
          curveSegments={4}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.01}
          bevelSegments={2}
        >
          {text}
          <meshStandardMaterial
            ref={materialRef}
            color={color}
            emissive={color}
            emissiveIntensity={1.5}
            transparent
            opacity={0.85}
            wireframe={false}
          />
        </Text3D>
      </Center>
    </group>
  )
}
