import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
const isLowEnd = typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4
const COUNT    = isMobile ? 150 : isLowEnd ? 300 : 600

// Shaders sebagai konstanta modul
const VERT = `
  attribute float aRandom;
  uniform float uTime;
  uniform float uSize;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    float drift = fract(aRandom + uTime * 0.02);
    pos.y = mod(pos.y + drift * 20.0 + 10.0, 20.0) - 10.0;
    pos.x += sin(uTime * 0.1 + aRandom * 6.28) * 0.3;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * (280.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
    vAlpha = aRandom;
  }
`

const FRAG = `
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d) * vAlpha * 0.75;
    vec3  color = mix(vec3(0.0, 1.0, 1.0), vec3(0.8, 1.0, 1.0), d * 2.0);
    gl_FragColor = vec4(color, alpha);
  }
`

export const Particles = () => {
  const meshRef = useRef<THREE.Points>(null)
  const matRef  = useRef<THREE.ShaderMaterial>(null)

  const geometry = useMemo(() => {
    const pos     = new Float32Array(COUNT * 3)
    const randoms = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
      randoms[i]     = Math.random()
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('aRandom',  new THREE.BufferAttribute(randoms, 1))
    return geo
  }, [])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSize: { value: 2.2 },
  }), [])

  useFrame(({ clock }) => {
    if (matRef.current)  matRef.current.uniforms.uTime.value = clock.elapsedTime
    if (meshRef.current) meshRef.current.rotation.y = clock.elapsedTime * 0.008
  })

  return (
    <points ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
