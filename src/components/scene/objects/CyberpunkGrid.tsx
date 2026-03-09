import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

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

  float grid(vec2 uv, float divisions) {
    vec2 g = abs(fract(uv * divisions - 0.5) - 0.5) / fwidth(uv * divisions);
    return 1.0 - min(min(g.x, g.y), 1.0);
  }

  void main() {
    // Grid utama — kotak besar
    float g1 = grid(vUv, 8.0) * 0.8;
    // Sub-grid — kotak kecil di dalam
    float g2 = grid(vUv, 40.0) * 0.25;
    float g  = max(g1, g2);

    // Scanline berjalan
    float scan = smoothstep(0.995, 1.0, fract(vUv.y - uTime * 0.08)) * 0.5;

    // Fade ke tepi supaya natural
    float fadeX = 1.0 - pow(abs(vUv.x - 0.5) * 2.0, 2.5);
    float fadeY = 1.0 - pow(abs(vUv.y - 0.5) * 2.0, 2.5);
    float fade  = fadeX * fadeY;

    float alpha = (g * uOpacity + scan * 0.3) * fade;
    gl_FragColor = vec4(uColor, alpha);
  }
`

export const CyberpunkGrid = () => {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({
    uTime:    { value: 0 },
    uColor:   { value: new THREE.Color('#00ffff') },
    uOpacity: { value: 0.55 },
  }), [])

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
      <planeGeometry args={[80, 80, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        extensions={{ derivatives: true } as any}
      />
    </mesh>
  )
}
