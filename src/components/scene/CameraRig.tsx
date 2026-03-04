import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useMouseParallax } from './hooks/useMouseParallax'

export const CameraRig = () => {
  const { camera } = useThree()
  const { mouseRaw, strength } = useMouseParallax(0.8)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const autoX = Math.sin(t * 0.1) * 0.1
    const autoY = Math.cos(t * 0.08) * 0.05

    const targetX = mouseRaw.y * 0.3 * strength + autoX
    const targetY = mouseRaw.x * 0.3 * strength + autoY

    // Lerp inside useFrame — zero React re-renders
    camera.position.x += (targetY - camera.position.x) * 0.03
    camera.position.y += (targetX - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })

  return null
}
