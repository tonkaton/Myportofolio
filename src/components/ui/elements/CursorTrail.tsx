import { useEffect, useRef } from 'react'

interface TrailDot {
  x: number
  y: number
  alpha: number
  scale: number
  id: number
}

const TRAIL_LENGTH = 20
const isMobile = window.matchMedia('(max-width: 768px)').matches

export const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trail = useRef<TrailDot[]>([])
  const mouse = useRef({ x: -999, y: -999 })
  const frameRef = useRef<number>(0)
  const idRef = useRef(0)

  useEffect(() => {
    // Skip on mobile — touch devices don't have cursor
    if (isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }

      // Add new dot to trail
      trail.current.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 1,
        scale: 1,
        id: idRef.current++,
      })

      // Keep trail length bounded
      if (trail.current.length > TRAIL_LENGTH) {
        trail.current.shift()
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      trail.current.forEach((dot, i) => {
        const progress = i / trail.current.length // 0 = oldest, 1 = newest

        // Fade out older dots
        dot.alpha = progress * 0.8
        dot.scale = 0.3 + progress * 0.7

        const size  = dot.scale * 6
        const alpha = dot.alpha

        // Cyan particle with glow
        ctx.save()
        ctx.globalAlpha = alpha * 0.9

        // Outer glow
        const grad = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, size * 3)
        grad.addColorStop(0, `rgba(0, 255, 255, ${alpha})`)
        grad.addColorStop(0.5, `rgba(0, 255, 255, ${alpha * 0.3})`)
        grad.addColorStop(1, 'rgba(0, 255, 255, 0)')

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, size * 3, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Core dot
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.shadowBlur = 8
        ctx.shadowColor = '#00ffff'
        ctx.fill()

        ctx.restore()
      })

      frameRef.current = requestAnimationFrame(render)
    }

    frameRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  if (isMobile) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9997,
      }}
    />
  )
}
