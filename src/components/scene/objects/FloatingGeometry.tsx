import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

const PIECES = [
  { pos: [ 3.5,  1.5, -2  ] as [number,number,number], scale: 0.6,  speed: 0.5, color: '#00ffff', type: 'oct', wire: false, phase: 0   },
  { pos: [-3,    2,   -1.5] as [number,number,number], scale: 0.4,  speed: 0.8, color: '#ff00ff', type: 'ico', wire: false, phase: 1.2 },
  { pos: [ 2,   -1,   -3  ] as [number,number,number], scale: 0.5,  speed: 0.6, color: '#00ff41', type: 'tet', wire: false, phase: 2.4 },
  { pos: [-2.5, -0.5, -2  ] as [number,number,number], scale: 0.7,  speed: 0.4, color: '#00ffff', type: 'tor', wire: true,  phase: 0.7 },
  { pos: [ 0,    3,   -4  ] as [number,number,number], scale: 0.35, speed: 1.0, color: '#ffff00', type: 'oct', wire: false, phase: 3.1 },
  { pos: [ 4,   -2,   -1  ] as [number,number,number], scale: 0.45, speed: 0.7, color: '#ff00ff', type: 'ico', wire: true,  phase: 1.8 },
  { pos: [-4,    1,   -3  ] as [number,number,number], scale: 0.55, speed: 0.3, color: '#00ffff', type: 'tet', wire: false, phase: 4.2 },
]

const ACTIVE = isMobile ? PIECES.slice(0, 3) : PIECES

export const FloatingGeometry = () => {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([])

  const objects = useMemo(() => ACTIVE.map((p) => {
    const geo = p.type === 'oct' ? new THREE.OctahedronGeometry(1, 0)
              : p.type === 'ico' ? new THREE.IcosahedronGeometry(1, 1)
              : p.type === 'tet' ? new THREE.TetrahedronGeometry(1, 0)
              :                    new THREE.TorusGeometry(0.7, 0.3, 12, 24)

    // emissiveIntensity lebih tinggi supaya terlihat terang sendiri
    const mat = p.wire
      ? new THREE.MeshBasicMaterial({ color: p.color, wireframe: true, transparent: true, opacity: 0.5 })
      : new THREE.MeshStandardMaterial({
          color: p.color,
          emissive: p.color,
          emissiveIntensity: 0.8,  // naik dari 0.3
          metalness: 0.7,
          roughness: 0.2,
          transparent: true,
          opacity: 0.9,
        })
    return { ...p, geo, mat }
  }), [])

  useEffect(() => () => objects.forEach(o => { o.geo.dispose(); o.mat.dispose() }), [objects])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const { speed, pos, phase } = objects[i]
      mesh.rotation.x += speed * 0.01
      mesh.rotation.y += speed * 0.015
      mesh.position.y = pos[1] + Math.sin(t * 0.5 + phase) * 0.3
    })
  })

  return (
    <group>
      {objects.map((o, i) => (
        <mesh key={i}
          ref={el => { meshRefs.current[i] = el }}
          position={o.pos}
          scale={o.scale}
          geometry={o.geo}
          material={o.mat}
        />
      ))}
    </group>
  )
}
