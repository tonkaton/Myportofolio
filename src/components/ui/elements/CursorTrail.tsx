import { useEffect, useRef } from 'react'

const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

const TRAIL = 10          // jumlah titik trail (dikurangi dari 14)
const LERP  = 0.18        // kecepatan ring catch-up

export const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotRef    = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMobile) return

    // ── state (semua ref, zero React re-render) ──
    const raw   = { x: -200, y: -200 }   // posisi cursor real
    const ring  = { x: -200, y: -200 }   // posisi ring (lerp)
    const trail: { x: number; y: number }[] = []

    // ── canvas setup ──
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d', { alpha: true, willReadFrequently: false })!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    // ── listeners ──
    const onMove = (e: MouseEvent) => {
      raw.x = e.clientX
      raw.y = e.clientY

      // Update dot via CSS transform — tidak trigger reflow
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${raw.x - 4}px,${raw.y - 4}px)`
      }

      trail.push({ x: raw.x, y: raw.y })
      if (trail.length > TRAIL) trail.shift()
    }

    const onDown = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = '0.6'
      if (ringRef.current) ringRef.current.style.transform =
        `translate(${ring.x - 16}px,${ring.y - 16}px) scale(1.5)`
    }
    const onUp = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = '1'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown, { passive: true })
    window.addEventListener('mouseup',   onUp,   { passive: true })
    window.addEventListener('resize',    resize,  { passive: true })

    // ── single rAF loop ──
    let frameId: number

    const tick = () => {
      // Lerp ring position
      ring.x += (raw.x - ring.x) * LERP
      ring.y += (raw.y - ring.y) * LERP

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.x - 16}px,${ring.y - 16}px)`
      }

      // Draw trail on canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const len = trail.length
      for (let i = 0; i < len; i++) {
        const t     = i / len           // 0=oldest, 1=newest
        const alpha = t * 0.45
        const size  = 1.5 + t * 4

        ctx.beginPath()
        ctx.arc(trail[i].x, trail[i].y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,255,${alpha.toFixed(2)})`
        ctx.fill()
      }

      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      window.removeEventListener('resize',    resize)
    }
  }, [])

  if (isMobile) return null

  return (
    <>
      {/* Trail canvas */}
      <canvas ref={canvasRef} style={{
        position: 'fixed', inset: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none', zIndex: 9996,
      }} />

      {/* Dot cursor — pure CSS, tidak bergerak via JS */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: '8px', height: '8px',
        borderRadius: '50%',
        background: '#00ffff',
        boxShadow: '0 0 8px #00ffff, 0 0 16px rgba(0,255,255,0.5)',
        pointerEvents: 'none', zIndex: 9999,
        transition: 'opacity 0.15s',
        willChange: 'transform',
      }} />

      {/* Ring cursor — lerped via rAF */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: '32px', height: '32px',
        borderRadius: '50%',
        border: '1px solid rgba(0,255,255,0.6)',
        boxShadow: '0 0 6px rgba(0,255,255,0.3)',
        pointerEvents: 'none', zIndex: 9998,
        willChange: 'transform',
        transition: 'transform 0.05s linear',
      }} />
    </>
  )
}
