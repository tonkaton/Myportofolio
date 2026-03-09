import { useEffect, useRef } from 'react'
import { useGlobalStore, type CursorMode } from '../../../store/useGlobalStore'

const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
const TRAIL = 10
const LERP  = 0.18

// Config tiap mode
const MODE_CONFIG: Record<CursorMode, {
  dotSize: number; dotColor: string; dotShadow: string
  ringSize: number; ringBorder: string; ringShadow: string
  trailColor: string; trailMaxAlpha: number
}> = {
  default: {
    dotSize: 8,  dotColor: '#00ffff', dotShadow: '0 0 8px #00ffff, 0 0 16px rgba(0,255,255,0.4)',
    ringSize: 32, ringBorder: '1px solid rgba(0,255,255,0.6)', ringShadow: '0 0 6px rgba(0,255,255,0.3)',
    trailColor: '0,255,255', trailMaxAlpha: 0.45,
  },
  laser: {
    dotSize: 4,  dotColor: '#ff0040', dotShadow: '0 0 12px #ff0040, 0 0 24px rgba(255,0,64,0.6)',
    ringSize: 24, ringBorder: '1px solid rgba(255,0,64,0.8)', ringShadow: '0 0 10px rgba(255,0,64,0.5)',
    trailColor: '255,0,64', trailMaxAlpha: 0.6,
  },
  crosshair: {
    dotSize: 2,  dotColor: '#ffff00', dotShadow: '0 0 6px #ffff00',
    ringSize: 36, ringBorder: '1px solid rgba(255,255,0,0.7)', ringShadow: '0 0 8px rgba(255,255,0,0.3)',
    trailColor: '255,255,0', trailMaxAlpha: 0.35,
  },
  neon: {
    dotSize: 10, dotColor: '#ff00ff', dotShadow: '0 0 14px #ff00ff, 0 0 28px rgba(255,0,255,0.5)',
    ringSize: 40, ringBorder: '2px solid rgba(255,0,255,0.7)', ringShadow: '0 0 12px rgba(255,0,255,0.4)',
    trailColor: '255,0,255', trailMaxAlpha: 0.5,
  },
}

export const CursorTrail = () => {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const dotRef     = useRef<HTMLDivElement>(null)
  const ringRef    = useRef<HTMLDivElement>(null)
  const hLineRef   = useRef<HTMLDivElement>(null)  // crosshair lines
  const vLineRef   = useRef<HTMLDivElement>(null)
  const modeRef    = useRef<CursorMode>('default')

  // Subscribe to store without re-render
  useEffect(() => {
    const unsub = useGlobalStore.subscribe((s) => {
      modeRef.current = s.cursorMode
      applyMode(s.cursorMode)
    })
    return () => unsub()
  }, [])

  const applyMode = (mode: CursorMode) => {
    const cfg = MODE_CONFIG[mode]
    const dot  = dotRef.current
    const ring = ringRef.current
    const hl   = hLineRef.current
    const vl   = vLineRef.current
    if (!dot || !ring) return

    dot.style.width      = `${cfg.dotSize}px`
    dot.style.height     = `${cfg.dotSize}px`
    dot.style.background = cfg.dotColor
    dot.style.boxShadow  = cfg.dotShadow

    ring.style.width     = `${cfg.ringSize}px`
    ring.style.height    = `${cfg.ringSize}px`
    ring.style.border    = cfg.ringBorder
    ring.style.boxShadow = cfg.ringShadow

    // Crosshair lines visibility
    const showCross = mode === 'crosshair'
    if (hl) hl.style.display = showCross ? 'block' : 'none'
    if (vl) vl.style.display = showCross ? 'block' : 'none'
  }

  useEffect(() => {
    if (isMobile) return

    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d', { alpha: true })!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const raw   = { x: -200, y: -200 }
    const ring  = { x: -200, y: -200 }
    const trail: { x: number; y: number }[] = []

    const onMove = (e: MouseEvent) => {
      raw.x = e.clientX
      raw.y = e.clientY
      const dot = dotRef.current
      const cfg = MODE_CONFIG[modeRef.current]
      const half = cfg.dotSize / 2
      if (dot) dot.style.transform = `translate(${raw.x - half}px,${raw.y - half}px)`

      // Crosshair lines follow cursor instantly
      const hl = hLineRef.current
      const vl = vLineRef.current
      if (hl) hl.style.transform = `translateY(${raw.y}px)`
      if (vl) vl.style.transform = `translateX(${raw.x}px)`

      trail.push({ x: raw.x, y: raw.y })
      if (trail.length > TRAIL) trail.shift()
    }

    const onDown = () => {
      const dot  = dotRef.current
      const ring = ringRef.current
      if (dot)  dot.style.opacity   = '0.6'
      if (ring) ring.style.transform = `translate(${ring.style.transform.match(/-?\d+\.?\d*/g)?.[0] ?? 0}px,${ring.style.transform.match(/-?\d+\.?\d*/g)?.[1] ?? 0}px) scale(1.5)`
    }
    const onUp = () => {
      const dot = dotRef.current
      if (dot) dot.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown, { passive: true })
    window.addEventListener('mouseup',   onUp,   { passive: true })
    window.addEventListener('resize',    resize,  { passive: true })

    let frameId: number
    const tick = () => {
      const cfg  = MODE_CONFIG[modeRef.current]
      const half = cfg.ringSize / 2

      ring.x += (raw.x - ring.x) * LERP
      ring.y += (raw.y - ring.y) * LERP

      const ringEl = ringRef.current
      if (ringEl) ringEl.style.transform = `translate(${ring.x - half}px,${ring.y - half}px)`

      // Draw trail
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const len = trail.length
      for (let i = 0; i < len; i++) {
        const t     = i / len
        const alpha = t * cfg.trailMaxAlpha
        const size  = 1.5 + t * 4
        ctx.beginPath()
        ctx.arc(trail[i].x, trail[i].y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${cfg.trailColor},${alpha.toFixed(2)})`
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
      <canvas ref={canvasRef} style={{ position:'fixed', inset:0, width:'100vw', height:'100vh', pointerEvents:'none', zIndex:9996 }} />

      {/* Crosshair lines — only visible in crosshair mode */}
      <div ref={hLineRef} style={{ display:'none', position:'fixed', left:0, top:0, width:'100vw', height:'1px', background:'rgba(255,255,0,0.15)', pointerEvents:'none', zIndex:9995, willChange:'transform' }} />
      <div ref={vLineRef} style={{ display:'none', position:'fixed', left:0, top:0, width:'1px', height:'100vh', background:'rgba(255,255,0,0.15)', pointerEvents:'none', zIndex:9995, willChange:'transform' }} />

      {/* Dot */}
      <div ref={dotRef} style={{ position:'fixed', top:0, left:0, width:'8px', height:'8px', borderRadius:'50%', background:'#00ffff', boxShadow:'0 0 8px #00ffff, 0 0 16px rgba(0,255,255,0.4)', pointerEvents:'none', zIndex:9999, transition:'opacity 0.15s, width 0.2s, height 0.2s, background 0.2s, box-shadow 0.2s', willChange:'transform' }} />

      {/* Ring */}
      <div ref={ringRef} style={{ position:'fixed', top:0, left:0, width:'32px', height:'32px', borderRadius:'50%', border:'1px solid rgba(0,255,255,0.6)', boxShadow:'0 0 6px rgba(0,255,255,0.3)', pointerEvents:'none', zIndex:9998, transition:'width 0.2s, height 0.2s, border 0.2s, box-shadow 0.2s', willChange:'transform' }} />
    </>
  )
}
