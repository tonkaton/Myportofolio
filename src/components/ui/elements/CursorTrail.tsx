import { useEffect, useRef } from 'react'

const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

const TRAIL_LENGTH = 14 // dikurangi dari 20

export const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trail     = useRef<{ x: number; y: number }[]>([])
  const frameRef  = useRef<number>(0)

  useEffect(() => {
    if (isMobile) return

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d', { alpha: true })!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const onMove = (e: MouseEvent) => {
      trail.current.push({ x: e.clientX, y: e.clientY })
      if (trail.current.length > TRAIL_LENGTH) trail.current.shift()
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const len = trail.current.length
      for (let i = 0; i < len; i++) {
        const { x, y } = trail.current[i]
        const t     = i / len              // 0=oldest 1=newest
        const alpha = t * 0.55
        const size  = 2 + t * 5

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,255,${alpha})`
        ctx.fill()
      }

      frameRef.current = requestAnimationFrame(render)
    }
    frameRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  if (isMobile) return null

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', top: 0, left: 0,
      width: '100vw', height: '100vh',
      pointerEvents: 'none', zIndex: 9997,
    }} />
  )
}
