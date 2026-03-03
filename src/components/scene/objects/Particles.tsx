import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Adaptive particle count based on device capability
const isMobile = window.matchMedia('(max-width: 768px)').matches
const isLowEnd = navigator.hardwareConcurrency <= 4
const COUNT = isMobile ? 200 : isLowEnd ? 400 : 800

export const Particles = () => {
  const meshRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const { positions, randoms } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const randoms = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
      randoms[i] = Math.random()
    }
    return { positions, randoms }
  }, [])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSize: { value: 2.5 },
  }), [])

  const vertexShader = `
    attribute float aRandom;
    uniform float uTime;
    uniform float uSize;
    
    varying float vAlpha;
    
    void main() {
      vec3 pos = position;
      
      // Drift upward slowly
      float drift = fract(aRandom + uTime * 0.02);
      pos.y += (drift - 0.5) * 20.0;
      pos.y = mod(pos.y + 10.0, 20.0) - 10.0;
      
      // Subtle x drift
      pos.x += sin(uTime * 0.1 + aRandom * 6.28) * 0.3;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = uSize * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
      
      vAlpha = aRandom;
    }
  `

  const fragmentShader = `
    varying float vAlpha;
    
    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      float dist = length(uv);
      if (dist > 0.5) discard;
      
      float alpha = smoothstep(0.5, 0.0, dist) * vAlpha * 0.8;
      
      // Color variation: cyan to white
      float whiteMix = smoothstep(0.0, 0.3, dist);
      vec3 color = mix(vec3(0.0, 1.0, 1.0), vec3(0.8, 1.0, 1.0), whiteMix);
      
      gl_FragColor = vec4(color, alpha);
    }
  `

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })

  const bufferGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
    return geo
  }, [positions, randoms])

  return (
    <points ref={meshRef} geometry={bufferGeometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
