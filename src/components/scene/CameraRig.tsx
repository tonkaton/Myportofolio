import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface CameraRigProps {
  mouseX?: number
  mouseY?: number
}

export const CameraRig = ({ mouseX = 0, mouseY = 0 }: CameraRigProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Gentle auto-rotation
    const autoX = Math.sin(t * 0.1) * 0.1
    const autoY = Math.cos(t * 0.08) * 0.05

    // Mouse parallax
    const targetX = mouseY * 0.3 + autoX
    const targetY = mouseX * 0.3 + autoY

    camera.position.x += (targetY - camera.position.x) * 0.03
    camera.position.y += (targetX - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })

  return <group ref={groupRef} />
}
