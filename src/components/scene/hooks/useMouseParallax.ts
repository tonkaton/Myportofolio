import { useState, useEffect, useCallback } from 'react'

interface MousePosition {
  x: number    // -1 to 1
  y: number    // -1 to 1
  rawX: number
  rawY: number
}

export const useMouseParallax = (strength = 1) => {
  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0, rawX: 0, rawY: 0 })
  const [smoothMouse, setSmoothMouse] = useState<MousePosition>({ x: 0, y: 0, rawX: 0, rawY: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = ((e.clientX / window.innerWidth) * 2 - 1) * strength
    const y = -((e.clientY / window.innerHeight) * 2 - 1) * strength

    setMouse({ x, y, rawX: e.clientX, rawY: e.clientY })
  }, [strength])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // Smooth lerp
  useEffect(() => {
    let frame: number

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      setSmoothMouse(prev => ({
        x: lerp(prev.x, mouse.x, 0.05),
        y: lerp(prev.y, mouse.y, 0.05),
        rawX: lerp(prev.rawX, mouse.rawX, 0.05),
        rawY: lerp(prev.rawY, mouse.rawY, 0.05),
      }))
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [mouse])

  return { mouse, smoothMouse }
}
