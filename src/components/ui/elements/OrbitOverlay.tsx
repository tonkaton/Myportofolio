import { useEffect, useRef, useState } from 'react'
import {
  Braces, Code2, Server, Zap, Box, Terminal as TermIcon,
  GitBranch, Container, Figma, Wind, Triangle, Cpu,
  type LucideIcon
} from 'lucide-react'
import { createRoot } from 'react-dom/client'

interface Tech {
  name: string
  Icon: LucideIcon
  color: string
  ringIdx: number
  phase: number
}

const TECHS: Tech[] = [
  { name: 'React',      Icon: Braces,    color: '#61dafb', ringIdx: 0, phase: 0 },
  { name: 'TypeScript', Icon: Code2,     color: '#3178c6', ringIdx: 1, phase: 0 },
  { name: 'Node.js',    Icon: Server,    color: '#8cc84b', ringIdx: 1, phase: Math.PI },
  { name: 'GSAP',       Icon: Zap,       color: '#88ce02', ringIdx: 2, phase: Math.PI * 0.5 },
  { name: 'Three.js',   Icon: Box,       color: '#00ffff', ringIdx: 2, phase: Math.PI * 1.5 },
  { name: 'Python',     Icon: TermIcon,  color: '#ffd43b', ringIdx: 3, phase: 0 },
  { name: 'Docker',     Icon: Container, color: '#2496ed', ringIdx: 3, phase: Math.PI },
  { name: 'Figma',      Icon: Figma,     color: '#f24e1e', ringIdx: 4, phase: Math.PI * 0.3 },
  { name: 'Next.js',    Icon: Triangle,  color: '#e2e8f0', ringIdx: 4, phase: Math.PI * 1.3 },
  { name: 'Tailwind',   Icon: Wind,      color: '#38bdf8', ringIdx: 5, phase: Math.PI * 0.7 },
  { name: 'Git',        Icon: GitBranch, color: '#f05032', ringIdx: 5, phase: Math.PI * 1.7 },
  { name: 'WebGL',      Icon: Cpu,       color: '#ff00ff', ringIdx: 6, phase: Math.PI * 0.1 },
]

const SPEEDS = [0.9, 0.65, 0.48, 0.36, 0.27, 0.20, 0.15]

const iconCache = new Map<string, HTMLImageElement>()

function getIconImage(tech: Tech): Promise<HTMLImageElement> {
  if (iconCache.has(tech.name)) return Promise.resolve(iconCache.get(tech.name)!)
  return new Promise((resolve) => {
    const size = 20
    const container = document.createElement('div')
    container.style.cssText = `position:fixed;top:-9999px;left:-9999px;width:${size}px;height:${size}px;`
    document.body.appendChild(container)
    const root = createRoot(container)
    root.render(<tech.Icon size={size} color={tech.color} strokeWidth={1.8} />)
    setTimeout(() => {
      const svg = container.querySelector('svg')
      if (!svg) { resolve(new Image()); return }
      const serialized = new XMLSerializer().serializeToString(svg)
      const blob = new Blob([serialized], { type: 'image/svg+xml' })
      const url  = URL.createObjectURL(blob)
      const img  = new Image(size, size)
      img.onload = () => {
        iconCache.set(tech.name, img)
        URL.revokeObjectURL(url)
        root.unmount()
        document.body.removeChild(container)
        resolve(img)
      }
      img.src = url
    }, 50)
  })
}

export const OrbitOverlay = () => {
  // ── Mobile check pakai state + listener supaya benar responsive ──
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900)
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const anglesRef  = useRef<number[]>(TECHS.map(t => t.phase))
  const imgsRef    = useRef<(HTMLImageElement | null)[]>(TECHS.map(() => null))
  const frameRef   = useRef<number>(0)
  const lastRef    = useRef<number>(0)

  useEffect(() => {
    if (isMobile) return   // jangan setup canvas di mobile

    TECHS.forEach((t, i) => {
      getIconImage(t).then(img => { imgsRef.current[i] = img })
    })

    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const TILT = -28 * (Math.PI / 180)

    const draw = (now: number) => {
      const dt = Math.min((now - lastRef.current) / 1000, 0.05)
      lastRef.current = now
      anglesRef.current = anglesRef.current.map((a, i) => a + SPEEDS[TECHS[i].ringIdx] * dt)

      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // ── CENTER: 78% dari kiri, 44% dari atas ──
      const cx = W * 0.75
      const cy = H * 0.44

      // ── BASE: diperkecil, DIBATASI supaya ring kiri tidak overflow ──
      // Ring terluar (scale 0.83) kali a: harus < (W - cx) dari sisi kanan
      // Sisi kiri: cx - BASE*0.83*a_ratio < 0 OK karena terpotong canvas
      // Tapi sisi kanan tidak overflow: cx + BASE*0.83 < W
      // Jadi BASE < (W - cx) / 0.83 = W*0.22 / 0.83
      const maxBase = (W - cx) / 0.83  // ring terluar tidak melewati tepi kanan
      const BASE = Math.min(maxBase * 1.05, H * 0.60, W * 0.32)

      const RING_SCALES = [0.14, 0.22, 0.31, 0.42, 0.55, 0.68, 0.83]
      const RINGS = RING_SCALES.map(r => ({
        a: BASE * r,
        b: BASE * r * 0.36,
      }))

      // ── Ring lines ──
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(TILT)
      RINGS.forEach((ring, i) => {
        ctx.beginPath()
        ctx.ellipse(0, 0, ring.a, ring.b, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,255,255,${0.20 + i * 0.03})`
        ctx.lineWidth   = 0.7 + i * 0.12
        ctx.stroke()
      })
      ctx.restore()

      // ── Matahari ──
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20)
      grad.addColorStop(0, 'rgba(0,255,255,1)')
      grad.addColorStop(0.45, 'rgba(0,190,210,0.85)')
      grad.addColorStop(1, 'rgba(0,90,130,0)')
      ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2)
      ctx.fillStyle = grad; ctx.fill()
      const glow = ctx.createRadialGradient(cx, cy, 8, cx, cy, 50)
      glow.addColorStop(0, 'rgba(0,255,255,0.22)')
      glow.addColorStop(1, 'rgba(0,255,255,0)')
      ctx.beginPath(); ctx.arc(cx, cy, 50, 0, Math.PI * 2)
      ctx.fillStyle = glow; ctx.fill()

      // ── Tech nodes ──
      TECHS.forEach((tech, i) => {
        const angle = anglesRef.current[i]
        const ring  = RINGS[tech.ringIdx]
        const ox = Math.cos(angle) * ring.a
        const oy = Math.sin(angle) * ring.b
        const px = cx + ox * Math.cos(TILT) - oy * Math.sin(TILT)
        const py = cy + ox * Math.sin(TILT) + oy * Math.cos(TILT)

        // Clip — jangan render node yang keluar sisi kiri (overlap konten)
        if (px < W * 0.38) return

        const R = 17, ISIZE = 15
        ctx.beginPath(); ctx.arc(px, py, R, 0, Math.PI * 2)
        ctx.fillStyle   = `${tech.color}22`; ctx.fill()
        ctx.strokeStyle = `${tech.color}bb`; ctx.lineWidth = 1.2; ctx.stroke()

        const ng = ctx.createRadialGradient(px, py, 0, px, py, R * 2.2)
        ng.addColorStop(0, `${tech.color}28`); ng.addColorStop(1, `${tech.color}00`)
        ctx.beginPath(); ctx.arc(px, py, R * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = ng; ctx.fill()

        const img = imgsRef.current[i]
        if (img?.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, px - ISIZE/2, py - ISIZE/2, ISIZE, ISIZE)
        } else {
          ctx.fillStyle = tech.color; ctx.font = 'bold 10px monospace'
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
          ctx.fillText(tech.name[0], px, py)
        }

        ctx.fillStyle = tech.color
        ctx.font = `bold 8px "Orbitron", monospace`
        ctx.textAlign = 'center'; ctx.textBaseline = 'top'
        ctx.shadowColor = tech.color; ctx.shadowBlur = 7
        ctx.fillText(tech.name, px, py + R + 3)
        ctx.shadowBlur = 0
      })

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [isMobile])

  // Mobile: render null total
  if (isMobile) return null

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2 }}
    />
  )
}
