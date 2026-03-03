import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const useSceneAnimation = () => {
  const clockRef = useRef(new THREE.Clock())
  const elapsedRef = useRef(0)

  useFrame(() => {
    elapsedRef.current = clockRef.current.getElapsedTime()
  })

  return { elapsed: elapsedRef }
}

export const useFloatAnimation = (speed = 1, amplitude = 0.1) => {
  const ref = useRef<THREE.Object3D>(null)
  const initialY = useRef(0)

  useEffect(() => {
    if (ref.current) {
      initialY.current = ref.current.position.y
    }
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        initialY.current + Math.sin(state.clock.elapsedTime * speed) * amplitude
    }
  })

  return ref
}

export const useRotationAnimation = (
  speedX = 0,
  speedY = 0.5,
  speedZ = 0
) => {
  const ref = useRef<THREE.Object3D>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += speedX * delta
      ref.current.rotation.y += speedY * delta
      ref.current.rotation.z += speedZ * delta
    }
  })

  return ref
}
