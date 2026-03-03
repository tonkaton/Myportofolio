import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, AdaptiveDpr } from '@react-three/drei'
import { CameraRig } from './CameraRig'
import { Lights } from './Lights'
import { Environment } from './Environment'
import { CyberpunkGrid } from './objects/CyberpunkGrid'
import { FloatingGeometry } from './objects/FloatingGeometry'
import { Particles } from './objects/Particles'
import { BloomEffect } from './effects/BloomEffect'
import { GlitchEffect } from './effects/GlitchEffect'
import { NoiseEffect } from './effects/NoiseEffect'
import { useMouseParallax } from './hooks/useMouseParallax'
import { useGlobalStore } from '../../store/useGlobalStore'

const SceneContent = () => {
  const { smoothMouse } = useMouseParallax(0.8)

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
      <CameraRig mouseX={smoothMouse.x} mouseY={smoothMouse.y} />
      <Lights />
      <Environment />

      <Suspense fallback={null}>
        <CyberpunkGrid />
        <FloatingGeometry />
        <Particles />
      </Suspense>

      <BloomEffect />
      <GlitchEffect />
      <NoiseEffect />
    </>
  )
}

export const SceneCanvas = () => {
  const setSceneReady = useGlobalStore((s) => s.setSceneReady)

  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: 3, // ACESFilmicToneMapping
        toneMappingExposure: 1.2,
      }}
      onCreated={() => setSceneReady(true)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        background: 'transparent',
      }}
    >
      <AdaptiveDpr pixelated />
      <SceneContent />
    </Canvas>
  )
}
