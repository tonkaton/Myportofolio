import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

// Skill stack — tiap orbit punya radius & kecepatan berbeda seperti planet
const TECHS = [
  // Orbit dalam — cepat
  { label: 'React',      color: '#61dafb', a: 1.4, b: 0.5, speed: 0.55, phase: 0.0  },
  { label: 'TypeScript', color: '#3178c6', a: 2.0, b: 0.7, speed: 0.42, phase: 2.09 },
  // Orbit tengah
  { label: 'Node.js',    color: '#8cc84b', a: 2.7, b: 0.9, speed: 0.32, phase: 1.05 },
  { label: 'GSAP',       color: '#88ce02', a: 2.7, b: 0.9, speed: 0.32, phase: 3.14 },
  { label: 'Three.js',   color: '#00ffff', a: 3.4, b: 1.1, speed: 0.24, phase: 0.52 },
  { label: 'Python',     color: '#ffd43b', a: 3.4, b: 1.1, speed: 0.24, phase: 3.67 },
  // Orbit luar — lambat
  { label: 'Docker',     color: '#2496ed', a: 4.2, b: 1.4, speed: 0.17, phase: 1.57 },
  { label: 'Figma',      color: '#f24e1e', a: 4.2, b: 1.4, speed: 0.17, phase: 4.71 },
]

type Tech = typeof TECHS[number]

// Canvas label texture
const makeLabel = (text: string, color: string): THREE.Texture => {
  const W = 192, H = 52
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const ctx = cv.getContext('2d')!
  ctx.fillStyle = `${color}22`
  ctx.strokeStyle = `${color}cc`
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.roundRect(1, 1, W - 2, H - 2, 8)
  ctx.fill(); ctx.stroke()
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 19px monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.shadowColor = color
  ctx.shadowBlur = 12
  ctx.fillText(text, W / 2, H / 2)
  return new THREE.CanvasTexture(cv)
}

// "Matahari" di tengah orbit
const Sun = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (meshRef.current) meshRef.current.rotation.y = t * 0.2
    if (glowRef.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.05
      glowRef.current.scale.setScalar(s)
    }
  })

  return (
    <group>
      {/* Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
      {/* Point light from sun */}
      <pointLight color="#00ffff" intensity={3} distance={12} decay={2} />
    </group>
  )
}

// Ring elips miring — persis seperti gambar tata surya
const OrbitRing = ({ a, b, color }: { a: number; b: number; color: string }) => {
  const geo = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(angle) * a, 0, Math.sin(angle) * b))
    }
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [a, b])

  const mat = useMemo(() => new THREE.LineBasicMaterial({
    color, transparent: true, opacity: 0.18,
  }), [color])

  return (
    <lineLoop>
      <primitive object={geo} attach="geometry" />
      <primitive object={mat} attach="material" />
    </lineLoop>
  )
}

// Planet yang mengorbit
const Planet = ({ tech, index }: { tech: Tech; index: number }) => {
  const spriteRef = useRef<THREE.Sprite>(null)
  const dotRef    = useRef<THREE.Mesh>(null)

  const spriteMat = useMemo(() => new THREE.SpriteMaterial({
    map: makeLabel(tech.label, tech.color),
    transparent: true, opacity: 0.95, depthWrite: false, sizeAttenuation: true,
  }), [tech.label, tech.color])

  const dotMat = useMemo(() => new THREE.MeshBasicMaterial({ color: tech.color }), [tech.color])

  useFrame(({ clock }) => {
    const angle = clock.elapsedTime * tech.speed + tech.phase
    const x = Math.cos(angle) * tech.a
    const z = Math.sin(angle) * tech.b
    spriteRef.current?.position.set(x, 0, z)
    dotRef.current?.position.set(x, 0, z)
  })

  return (
    <>
      <sprite ref={spriteRef} scale={[1.1, 0.28, 1]}>
        <primitive object={spriteMat} attach="material" />
      </sprite>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <primitive object={dotMat} attach="material" />
      </mesh>
    </>
  )
}

export const TechIcons = () => {
  if (isMobile) return null

  return (
    // Geser ke kanan layar + miring seperti tata surya
    // rotateX miring 50° supaya orbit tampak elips perspektif
    // rotateZ sedikit supaya sumbu miring seperti gambar
    <group
      position={[3.5, 0.5, -4]}
      rotation={[Math.PI * 0.28, 0, -Math.PI * 0.08]}
    >
      <Sun />
      {TECHS.map((t) => (
        <OrbitRing key={`ring-${t.label}`} a={t.a} b={t.b} color={t.color} />
      ))}
      {TECHS.map((t, i) => (
        <Planet key={t.label} tech={t} index={i} />
      ))}
    </group>
  )
}
