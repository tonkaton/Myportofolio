import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Shaders sebagai konstanta modul — tidak pernah dibuat ulang
const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAG = `
  uniform float uTime;
  uniform vec3  uColor;
  uniform float uOpacity;
  varying vec2  vUv;

  float grid(vec2 uv, float d) {
    vec2 g = fract(uv * d);
    return 1.0 - smoothstep(0.01, 0.02, min(abs(g.x - 0.5), abs(g.y - 0.5)));
  }

  void main() {
    float g = max(grid(vUv, 20.0) * 0.6, grid(vUv, 4.0));
    float scan = smoothstep(0.99, 1.0, fract(vUv.y - uTime * 0.1)) * 0.4;
    float fade = (1.0 - pow(abs(vUv.y - 0.5) * 2.0, 2.0))
               * (1.0 - pow(abs(vUv.x - 0.5) * 2.0, 3.0));
    float alpha = g * uOpacity * fade + scan * 0.25;
    gl_FragColor = vec4(uColor, alpha);
  }
`

export const CyberpunkGrid = () => {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({
    uTime:    { value: 0 },
    uColor:   { value: new THREE.Color('#00ffff') },
    uOpacity: { value: 0.5 },
  }), [])

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[60, 60, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
