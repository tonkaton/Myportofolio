import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const CyberpunkGrid = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#00ffff') },
    uOpacity: { value: 0.4 },
  }), [])

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec2 vUv;

    float grid(vec2 uv, float divisions) {
      vec2 g = fract(uv * divisions);
      float gx = abs(g.x - 0.5);
      float gy = abs(g.y - 0.5);
      return 1.0 - smoothstep(0.01, 0.02, min(gx, gy));
    }

    void main() {
      float g1 = grid(vUv, 20.0) * 0.6;
      float g2 = grid(vUv, 4.0) * 1.0;

      // Animated scanline
      float scanY = fract(vUv.y - uTime * 0.1);
      float scan = smoothstep(0.99, 1.0, scanY) * 0.5;

      // Perspective fade
      float fade = 1.0 - pow(abs(vUv.y - 0.5) * 2.0, 2.0);
      float xFade = 1.0 - pow(abs(vUv.x - 0.5) * 2.0, 3.0);

      float lines = max(g1, g2);
      float alpha = lines * uOpacity * fade * xFade + scan * 0.3;

      gl_FragColor = vec4(uColor, alpha);
    }
  `

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[60, 60, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
