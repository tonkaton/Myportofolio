import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Edges } from '@react-three/drei'
import * as THREE from 'three'

interface GeometryPieceProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  speed: number
  color: string
  type: 'octahedron' | 'icosahedron' | 'tetrahedron' | 'torus'
  wireframe?: boolean
}

const GeometryPiece = ({
  position,
  rotation,
  scale,
  speed,
  color,
  type,
  wireframe = false,
}: GeometryPieceProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialPos = useRef(position)
  const phaseOffset = useRef(Math.random() * Math.PI * 2)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    meshRef.current.rotation.x += speed * 0.01
    meshRef.current.rotation.y += speed * 0.015
    meshRef.current.rotation.z += speed * 0.008

    // Float
    meshRef.current.position.y =
      initialPos.current[1] + Math.sin(t * 0.5 + phaseOffset.current) * 0.3
  })

  const geometry = useMemo(() => {
    switch (type) {
      case 'octahedron': return <octahedronGeometry args={[1, 0]} />
      case 'icosahedron': return <icosahedronGeometry args={[1, 0]} />
      case 'tetrahedron': return <tetrahedronGeometry args={[1, 0]} />
      case 'torus': return <torusGeometry args={[0.7, 0.3, 8, 16]} />
      default: return <octahedronGeometry args={[1, 0]} />
    }
  }, [type])

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {geometry}
      {wireframe ? (
        <>
          <meshBasicMaterial color={color} wireframe opacity={0.3} transparent />
          <Edges color={color} />
        </>
      ) : (
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
          distort={0.2}
          speed={2}
          transparent
          opacity={0.7}
        />
      )}
    </mesh>
  )
}

export const FloatingGeometry = () => {
  const pieces: GeometryPieceProps[] = [
    { position: [3.5, 1.5, -2], rotation: [0, 0, 0], scale: 0.6, speed: 0.5, color: '#00ffff', type: 'octahedron' },
    { position: [-3, 2, -1.5], rotation: [1, 0, 0.5], scale: 0.4, speed: 0.8, color: '#ff00ff', type: 'icosahedron' },
    { position: [2, -1, -3], rotation: [0, 1, 0], scale: 0.5, speed: 0.6, color: '#00ff41', type: 'tetrahedron' },
    { position: [-2.5, -0.5, -2], rotation: [0.5, 0, 1], scale: 0.7, speed: 0.4, color: '#00ffff', type: 'torus', wireframe: true },
    { position: [0, 3, -4], rotation: [0, 0, 0], scale: 0.35, speed: 1, color: '#ffff00', type: 'octahedron' },
    { position: [4, -2, -1], rotation: [1, 1, 0], scale: 0.45, speed: 0.7, color: '#ff00ff', type: 'icosahedron', wireframe: true },
    { position: [-4, 1, -3], rotation: [0, 0.5, 1], scale: 0.55, speed: 0.3, color: '#00ffff', type: 'tetrahedron' },
  ]

  return (
    <group>
      {pieces.map((props, i) => (
        <GeometryPiece key={i} {...props} />
      ))}
    </group>
  )
}
