import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

// Tech stack yang mau ditampilin — edit sesuai keahlian lo
const TECHS = [
  { label: 'React',      color: '#61dafb', orbit: 4.5, speed: 0.25, tilt: 0.3,  phase: 0    },
  { label: 'TypeScript', color: '#3178c6', orbit: 3.8, speed: 0.35, tilt: -0.4, phase: 1.05 },
  { label: 'Three.js',   color: '#00ffff', orbit: 5.2, speed: 0.18, tilt: 0.5,  phase: 2.1  },
  { label: 'Node.js',    color: '#8cc84b', orbit: 4.1, speed: 0.28, tilt: -0.2, phase: 3.14 },
  { label: 'Python',     color: '#ffd43b', orbit: 4.8, speed: 0.22, tilt: 0.6,  phase: 4.2  },
  { label: 'GSAP',       color: '#88ce02', orbit: 3.5, speed: 0.40, tilt: -0.5, phase: 5.24 },
  { label: 'Vite',       color: '#bd34fe', orbit: 5.5, speed: 0.15, tilt: 0.2,  phase: 0.52 },
  { label: 'Docker',     color: '#2496ed', orbit: 4.3, speed: 0.32, tilt: -0.35,phase: 1.57 },
]

type TechItem = typeof TECHS[number]

// Single orbiting label — rendered as 3D Text
const TechOrbit = ({ tech, index }: { tech: TechItem; index: number }) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t     = clock.elapsedTime * tech.speed + tech.phase
    const x     = Math.cos(t) * tech.orbit
    const z     = Math.sin(t) * tech.orbit
    const y     = Math.sin(t * 0.7 + index) * 0.8 + tech.tilt
    groupRef.current.position.set(x, y, z)
    // Billboard — always face camera handled by Text component
  })

  return (
    <group ref={groupRef}>
      {/* Glow dot */}
      <mesh>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={tech.color} />
      </mesh>
      {/* Label */}
      <Text
        position={[0, 0.18, 0]}
        fontSize={0.18}
        color={tech.color}
        font="https://fonts.gstatic.com/s/sharetechmono/v15/J7aHnp1uDWRBEqV98dVQztYldFc7pAsEIc3Xew.woff2"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.004}
        outlineColor="#000"
        fillOpacity={0.85}
      >
        {tech.label}
      </Text>
    </group>
  )
}

// Orbit ring — visual guide per tech
const OrbitRing = ({ radius, tilt, color }: { radius: number; tilt: number; color: string }) => {
  const geo = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0)
    const pts   = curve.getPoints(80)
    const g     = new THREE.BufferGeometry().setFromPoints(pts)
    return g
  }, [radius])

  return (
    <lineLoop geometry={geo} rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <lineBasicMaterial color={color} transparent opacity={0.08} />
    </lineLoop>
  )
}

export const TechIcons = () => {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  if (isMobile) return null

  return (
    <group position={[0, 0, -2]}>
      {TECHS.map((tech, i) => (
        <TechOrbit key={tech.label} tech={tech} index={i} />
      ))}
      {/* Subtle orbit rings */}
      {TECHS.map((tech) => (
        <OrbitRing key={`ring-${tech.label}`} radius={tech.orbit} tilt={tech.tilt} color={tech.color} />
      ))}
    </group>
  )
}
