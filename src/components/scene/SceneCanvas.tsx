import { Suspense, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { CameraRig } from './CameraRig'
import { Lights } from './Lights'
import { Environment } from './Environment'
import { CyberpunkGrid } from './objects/CyberpunkGrid'
import { FloatingGeometry } from './objects/FloatingGeometry'
import { Particles } from './objects/Particles'
import { SceneEffects } from './effects/SceneEffects'
import { useGlobalStore } from '../../store/useGlobalStore'
import * as THREE from 'three'

const isMobile = window.matchMedia('(max-width: 768px)').matches
const isLowEnd = navigator.hardwareConcurrency <= 4

const SceneContent = () => (
  <>
    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
    <CameraRig />
    <Lights />
    {!isMobile && <Environment />}
    <Suspense fallback={null}>
      <CyberpunkGrid />
      <FloatingGeometry />
      {!isLowEnd && <Particles />}
    </Suspense>
    <SceneEffects />
  </>
)

export const SceneCanvas = () => {
  const setSceneReady = useGlobalStore((s) => s.setSceneReady)
  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    // NoToneMapping = warna keluar persis seperti di shader, tidak dikompresi
    gl.toneMapping = THREE.NoToneMapping
    gl.toneMappingExposure = 1.0
    setSceneReady(true)
  }, [setSceneReady])

  return (
    <Canvas
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
        precision: isMobile ? 'mediump' : 'highp',
      }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      frameloop="always"
      onCreated={handleCreated}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
      }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <SceneContent />
    </Canvas>
  )
}
