import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Stars = () => {
  const { geo, mat } = useMemo(() => {
    const N = 180, pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 32
      pos[i*3+1] = (Math.random() - 0.5) * 18
      pos[i*3+2] = (Math.random() - 0.5) * 12 - 4
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const m = new THREE.PointsMaterial({ color: '#ffffff', size: 0.028, transparent: true, opacity: 0.55, sizeAttenuation: true })
    return { geo: g, mat: m }
  }, [])
  return <points><primitive object={geo} attach="geometry" /><primitive object={mat} attach="material" /></points>
}

const Meteors = () => {
  const DATA = useMemo(() => Array.from({ length: 7 }, (_, i) => ({
    speed:  1.0 + i * 0.45,
    y:      -2.8 + i * 1.0,
    z:      -0.8 - i * 0.4,
    offset: i * 3.8,
    size:   0.03 + (i % 3) * 0.018,
    dir:    i % 2 === 0 ? 1 : -1,
    color:  ['#ffffff','#aaddff','#ffeeaa','#ffccaa','#ccddff','#aaffcc','#ffddee'][i],
  })), [])
  const refs = useRef<(THREE.Group | null)[]>([])
  useFrame(({ clock }) => {
    DATA.forEach((m, i) => {
      const g = refs.current[i]
      if (!g) return
      const raw = ((clock.elapsedTime * m.speed + m.offset) % 26) - 6
      g.position.set(m.dir > 0 ? raw - 7 : 7 - raw, m.y, m.z)
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
          {[1, 2, 3, 4, 5].map(j => (
            <mesh key={j} position={[m.dir * j * m.size * 3.2, 0, 0]}>
              <sphereGeometry args={[Math.max(0.002, m.size * (1 - j * 0.17)), 4, 4]} />
              <meshBasicMaterial color={m.color} transparent opacity={Math.max(0, 0.5 - j * 0.1)} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

export const SpaceBackground = () => (
  <>
    <Stars />
    <group position={[0, 0.5, -1.5]}>
      <Meteors />
    </group>
  </>
)
