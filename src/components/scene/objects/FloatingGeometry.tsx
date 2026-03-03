import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const isMobile = window.matchMedia('(max-width: 768px)').matches

interface PieceConfig {
  position: [number, number, number]
  scale: number
  speed: number
  color: string
  type: 'octahedron' | 'icosahedron' | 'tetrahedron' | 'torus'
  wireframe?: boolean
  phase: number
}

const ALL_PIECES: PieceConfig[] = [
  { position: [3.5, 1.5, -2],  scale: 0.6, speed: 0.5, color: '#00ffff', type: 'octahedron',  phase: 0 },
  { position: [-3, 2, -1.5],   scale: 0.4, speed: 0.8, color: '#ff00ff', type: 'icosahedron', phase: 1.2 },
  { position: [2, -1, -3],     scale: 0.5, speed: 0.6, color: '#00ff41', type: 'tetrahedron', phase: 2.4 },
  { position: [-2.5, -0.5, -2],scale: 0.7, speed: 0.4, color: '#00ffff', type: 'torus',       phase: 0.7, wireframe: true },
  { position: [0, 3, -4],      scale: 0.35,speed: 1.0, color: '#ffff00', type: 'octahedron',  phase: 3.1 },
  { position: [4, -2, -1],     scale: 0.45,speed: 0.7, color: '#ff00ff', type: 'icosahedron', phase: 1.8, wireframe: true },
  { position: [-4, 1, -3],     scale: 0.55,speed: 0.3, color: '#00ffff', type: 'tetrahedron', phase: 4.2 },
]

const getGeometry = (type: PieceConfig['type']) => {
  switch (type) {
    case 'octahedron':  return new THREE.OctahedronGeometry(1, 0)
    case 'icosahedron': return new THREE.IcosahedronGeometry(1, 0)
    case 'tetrahedron': return new THREE.TetrahedronGeometry(1, 0)
    case 'torus':       return new THREE.TorusGeometry(0.7, 0.3, 8, 16)
  }
}

export const FloatingGeometry = () => {
  const pieces = isMobile ? ALL_PIECES.slice(0, 3) : ALL_PIECES
  const groupRef = useRef<THREE.Group>(null)
  const meshRefs = useRef<(THREE.Mesh | null)[]>([])

  // Geometries and materials created once
  const objects = useMemo(() => pieces.map((p) => ({
    ...p,
    geometry: getGeometry(p.type),
    material: p.wireframe
      ? new THREE.MeshBasicMaterial({ color: p.color, wireframe: true, transparent: true, opacity: 0.3 })
      : new THREE.MeshStandardMaterial({ color: p.color, emissive: p.color, emissiveIntensity: 0.4, metalness: 0.9, roughness: 0.1, transparent: true, opacity: 0.75 }),
  })), [])

  // ONE useFrame for ALL objects — massive performance win
  useFrame((state) => {
    const t = state.clock.elapsedTime
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const { speed, position, phase } = objects[i]
      mesh.rotation.x += speed * 0.01
      mesh.rotation.y += speed * 0.015
      mesh.rotation.z += speed * 0.008
      mesh.position.y = position[1] + Math.sin(t * 0.5 + phase) * 0.3
    })
  })

  return (
    <group ref={groupRef}>
      {objects.map((obj, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el }}
          position={obj.position}
          scale={obj.scale}
          geometry={obj.geometry}
          material={obj.material}
        />
      ))}
    </group>
  )
}
