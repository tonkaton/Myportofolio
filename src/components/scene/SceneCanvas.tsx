import { Suspense, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
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

// Detect device capability once at module level
const isMobile = window.matchMedia('(max-width: 768px)').matches
const isLowEnd = navigator.hardwareConcurrency <= 4

const SceneContent = () => {
  const { smoothMouse } = useMouseParallax(0.8)

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
      <CameraRig mouseX={smoothMouse.x} mouseY={smoothMouse.y} />
      <Lights />
      {!isMobile && <Environment />}

      <Suspense fallback={null}>
        <CyberpunkGrid />
        <FloatingGeometry />
        {!isLowEnd && <Particles />}
      </Suspense>

      <BloomEffect />
      {!isMobile && <GlitchEffect />}
      <NoiseEffect />
    </>
  )
}

export const SceneCanvas = () => {
  const setSceneReady = useGlobalStore((s) => s.setSceneReady)
  const handleCreated = useCallback(() => setSceneReady(true), [setSceneReady])

  return (
    <Canvas
      gl={{
        antialias: !isMobile,          // Disable antialias on mobile — big GPU saving
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: 3,
        toneMappingExposure: 1.2,
        precision: isMobile ? 'mediump' : 'highp', // Lower precision on mobile
      }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}  // Cap DPR: mobile max 1.5x, desktop max 2x
      onCreated={handleCreated}
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
      <AdaptiveEvents />
      <SceneContent />
    </Canvas>
  )
}
