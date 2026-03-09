import { useRef, useMemo, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const M_WHITE  = new THREE.MeshStandardMaterial({ color: '#cdd8dc', roughness: 0.5, metalness: 0.1 })
const M_DARK   = new THREE.MeshStandardMaterial({ color: '#1a2535', roughness: 0.6, metalness: 0.3 })
const M_VISOR  = new THREE.MeshStandardMaterial({ color: '#ffcc44', roughness: 0.05, metalness: 0.95 })
const M_ACCENT = new THREE.MeshStandardMaterial({ color: '#00ffff', emissive: '#00ffff', emissiveIntensity: 0.6, roughness: 0.3 })

const Body = () => (
  <group>
    <mesh material={M_WHITE}><boxGeometry args={[0.5,0.55,0.35]} /></mesh>
    <mesh material={M_DARK}  position={[0,0,-0.24]}><boxGeometry args={[0.34,0.4,0.09]} /></mesh>
    <mesh material={M_ACCENT} position={[0,0.05,0.18]}><boxGeometry args={[0.14,0.06,0.01]} /></mesh>
    {/* Helmet */}
    <mesh material={M_WHITE} position={[0,0.49,0]}><sphereGeometry args={[0.25,18,18]} /></mesh>
    <mesh material={M_VISOR} position={[0,0.49,0.16]}><sphereGeometry args={[0.17,14,14,0,Math.PI*2,0,Math.PI*0.5]} /></mesh>
    <mesh material={M_DARK}  position={[0,0.27,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[0.17,0.03,8,20]} /></mesh>
    {/* Arms */}
    <group position={[-0.3,0.05,0]} rotation={[0,0,0.45]}>
      <mesh material={M_WHITE}><capsuleGeometry args={[0.085,0.28,6,10]} /></mesh>
      <mesh material={M_DARK} position={[0,-0.22,0]}><sphereGeometry args={[0.085,8,8]} /></mesh>
    </group>
    <group position={[0.3,0.05,0]} rotation={[0,0,-0.38]}>
      <mesh material={M_WHITE}><capsuleGeometry args={[0.085,0.28,6,10]} /></mesh>
      <mesh material={M_DARK} position={[0,-0.22,0]}><sphereGeometry args={[0.085,8,8]} /></mesh>
    </group>
    {/* Legs */}
    <group position={[-0.12,-0.48,0]}>
      <mesh material={M_WHITE}><capsuleGeometry args={[0.095,0.26,6,10]} /></mesh>
      <mesh material={M_DARK} position={[0,-0.24,0.03]}><boxGeometry args={[0.15,0.1,0.22]} /></mesh>
    </group>
    <group position={[0.12,-0.48,0]}>
      <mesh material={M_WHITE}><capsuleGeometry args={[0.095,0.26,6,10]} /></mesh>
      <mesh material={M_DARK} position={[0,-0.24,0.03]}><boxGeometry args={[0.15,0.1,0.22]} /></mesh>
    </group>
  </group>
)

// Stasiun kecil di kejauhan
const Station = () => {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.elapsedTime * 0.06
      ref.current.rotation.y = clock.elapsedTime * 0.025
    }
  })
  return (
    <group ref={ref} scale={0.5}>
      <mesh><boxGeometry args={[0.14,0.14,0.7]} /><meshStandardMaterial color="#8a9ab0" roughness={0.5} metalness={0.6} /></mesh>
      {[-0.55,0.55].map(x => (
        <group key={x} position={[x,0,0]}>
          <mesh><boxGeometry args={[0.9,0.03,0.3]} /><meshStandardMaterial color="#1255a0" emissive="#0a3070" emissiveIntensity={0.3} roughness={0.3} metalness={0.8} /></mesh>
          <mesh><boxGeometry args={[0.92,0.006,0.015]} /><meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.8} /></mesh>
        </group>
      ))}
      <mesh position={[0,0.11,-0.22]} ><cylinderGeometry args={[0.006,0.006,0.28,5]} /><meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.6} /></mesh>
      <mesh position={[0,0.26,-0.22]}><sphereGeometry args={[0.018,8,8]} /><meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.2} /></mesh>
    </group>
  )
}

// Tether
const Tether = ({ posRef }: { posRef: MutableRefObject<THREE.Vector3> }) => {
  const lineRef = useRef<any>(null)
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(25 * 3), 3))
    return g
  }, [])
  const mat = useMemo(() => new THREE.LineBasicMaterial({ color: '#aaccff', transparent: true, opacity: 0.28 }), [])
  useFrame(() => {
    if (!lineRef.current) return
    const a = posRef.current
    const mid = new THREE.Vector3(a.x * 0.5 + Math.sin(Date.now()*0.0007)*0.08, a.y*0.5-0.1, a.z*0.5)
    const pts = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0,0,0), mid, a).getPoints(24)
    const pa  = lineRef.current.geometry.attributes.position as THREE.BufferAttribute
    pts.forEach((p,i) => pa.setXYZ(i, p.x, p.y, p.z))
    pa.needsUpdate = true
  })
  return <line ref={lineRef}><primitive object={geo} attach="geometry" /><primitive object={mat} attach="material" /></line>
}

// Astronot mengapung
const Astronaut = ({ posRef }: { posRef: MutableRefObject<THREE.Vector3> }) => {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const x = Math.sin(t*0.24)*1.2 + Math.sin(t*0.09)*0.3
    const y = Math.cos(t*0.19)*0.7 + Math.sin(t*0.14)*0.2
    const z = Math.sin(t*0.16)*0.35
    if (ref.current) {
      ref.current.position.set(x, y, z)
      ref.current.rotation.x = Math.sin(t*0.12)*0.2
      ref.current.rotation.z = Math.cos(t*0.15)*0.16
      ref.current.rotation.y = t * 0.05
    }
    posRef.current.set(x, y, z)
  })
  return <group ref={ref} scale={0.16}><Body /></group>
}

// Meteorit dengan trail
const Meteors = () => {
  const DATA = useMemo(() => Array.from({length: 6}, (_, i) => ({
    speed:  1.2 + i * 0.5,
    y:      -2.5 + i * 1.1,
    z:      -1 - i * 0.5,
    offset: i * 4.1,
    size:   0.035 + (i%3)*0.02,
    dir:    i%2 === 0 ? 1 : -1, // kiri ke kanan atau kanan ke kiri
    color:  ['#ffffff','#aaddff','#ffeeaa','#ffccaa','#ccddff','#aaffcc'][i],
  })), [])
  const refs = useRef<(THREE.Group|null)[]>([])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    DATA.forEach((m, i) => {
      const g = refs.current[i]
      if (!g) return
      const raw = ((t * m.speed + m.offset) % 24) - 6
      g.position.set(m.dir > 0 ? raw - 6 : 6 - raw, m.y, m.z)
    })
  })
  return (
    <group>
      {DATA.map((m, i) => (
        <group key={i} ref={el => { refs.current[i] = el }}>
          <mesh>
            <sphereGeometry args={[m.size, 6, 6]} />
            <meshBasicMaterial color={m.color} />
          </mesh>
          {[1,2,3,5].map(j => (
            <mesh key={j} position={[m.dir * j * m.size * 3.5, 0, 0]}>
              <sphereGeometry args={[m.size*(1-j*0.18), 4, 4]} />
              <meshBasicMaterial color={m.color} transparent opacity={Math.max(0, 0.55 - j*0.12)} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

// Bintang
const Stars = () => {
  const {geo, mat} = useMemo(() => {
    const N = 160, pos = new Float32Array(N*3)
    for (let i = 0; i < N; i++) {
      pos[i*3]   = (Math.random()-0.5)*28
      pos[i*3+1] = (Math.random()-0.5)*16
      pos[i*3+2] = (Math.random()-0.5)*10 - 4
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const m = new THREE.PointsMaterial({ color:'#ffffff', size:0.03, transparent:true, opacity:0.6, sizeAttenuation:true })
    return { geo: g, mat: m }
  }, [])
  return <points><primitive object={geo} attach="geometry" /><primitive object={mat} attach="material" /></points>
}

export const AstronautScene = () => {
  const posRef = useRef(new THREE.Vector3(1, 0.5, 0))
  return (
    <>
      {/* Bintang + meteor di seluruh scene */}
      <Stars />
      <group position={[0, 0.5, -2]}><Meteors /></group>

      {/* Astronot + stasiun kecil — JAUH di kanan atas belakang */}
      <group position={[5.5, 2.5, -8]} scale={1.4}>
        <Station />
        <Tether posRef={posRef} />
        <Astronaut posRef={posRef} />
        <pointLight color="#c0e0ff" intensity={0.8} distance={5} decay={2} position={[0,1,2]} />
      </group>
    </>
  )
}
