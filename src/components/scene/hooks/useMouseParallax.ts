import { useRef, useEffect } from 'react'

const mouseRaw = { x: 0, y: 0 }
const mouseSmooth = { x: 0, y: 0 }

// Global single listener — bukan per-component
let listenerCount = 0
const handleGlobal = (e: MouseEvent) => {
  mouseRaw.x =  ((e.clientX / window.innerWidth)  * 2 - 1)
  mouseRaw.y = -((e.clientY / window.innerHeight) * 2 - 1)
}

export const useMouseParallax = (strength = 1) => {
  const smoothRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (listenerCount === 0) {
      window.addEventListener('mousemove', handleGlobal, { passive: true })
    }
    listenerCount++
    return () => {
      listenerCount--
      if (listenerCount === 0) {
        window.removeEventListener('mousemove', handleGlobal)
      }
    }
  }, [])

  // Expose ref so CameraRig can lerp inside useFrame (zero React re-renders)
  return { smoothRef, mouseRaw, strength }
}
