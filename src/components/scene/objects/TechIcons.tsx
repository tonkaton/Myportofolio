import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

// Orbit diperbesar — a=semi-major, b=semi-minor
const TECHS = [
  { label: 'React',      color: '#61dafb', a: 2.2, b: 0.7,  speed: 0.45, phase: 0.0  },
  { label: 'TypeScript', color: '#3178c6', a: 3.0, b: 1.0,  speed: 0.34, phase: 2.09 },
  { label: 'Node.js',    color: '#8cc84b', a: 3.9, b: 1.3,  speed: 0.26, phase: 1.05 },
  { label: 'GSAP',       color: '#88ce02', a: 3.9, b: 1.3,  speed: 0.26, phase: 3.14 },
  { label: 'Three.js',   color: '#00ffff', a: 4.8, b: 1.65, speed: 0.19, phase: 0.52 },
  { label: 'Python',     color: '#ffd43b', a: 4.8, b: 1.65, speed: 0.19, phase: 3.67 },
  { label: 'Docker',     color: '#2496ed', a: 5.8, b: 2.0,  speed: 0.13, phase: 1.57 },
  { label: 'Figma',      color: '#f24e1e', a: 5.8, b: 2.0,  speed: 0.13, phase: 4.71 },
]

type Tech = typeof TECHS[number]

const makeLabel = (text: string, color: string): THREE.Texture => {
  const W = 200, H = 54
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
  ctx.font = 'bold 20px monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.shadowColor = color
  ctx.shadowBlur = 12
  ctx.fillText(text, W / 2, H / 2)
  return new THREE.CanvasTexture(cv)
}

// "Matahari" — core glowing di pusat orbit
const Sun = () => {
  const glowRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (glowRef.current) glowRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.8) * 0.07)
  })
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.4} roughness={0.1} metalness={0.6} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.07} side={THREE.BackSide} />
      </mesh>
      <pointLight color="#00ffff" intensity={4} distance={15} decay={2} />
    </group>
  )
}

const OrbitRing = ({ a, b, color }: { a: number; b: number; color: string }) => {
  const geo = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(angle) * a, 0, Math.sin(angle) * b))
    }
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [a, b])
  const mat = useMemo(() => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 }), [color])
  return (
    <lineLoop>
      <primitive object={geo} attach="geometry" />
      <primitive object={mat} attach="material" />
    </lineLoop>
  )
}

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
      <sprite ref={spriteRef} scale={[1.3, 0.33, 1]}>
        <primitive object={spriteMat} attach="material" />
      </sprite>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.08, 10, 10]} />
        <primitive object={dotMat} attach="material" />
      </mesh>
    </>
  )
}

export const TechIcons = () => {
  if (isMobile) return null
  return (
    // Di kanan layar, miring seperti tata surya, diperbesar
    <group position={[4.5, 0.2, -6]} rotation={[Math.PI * 0.26, 0, -Math.PI * 0.07]}>
      <Sun />
      {TECHS.map((t) => <OrbitRing key={`r-${t.label}`} a={t.a} b={t.b} color={t.color} />)}
      {TECHS.map((t, i) => <Planet key={t.label} tech={t} index={i} />)}
    </group>
  )
}
