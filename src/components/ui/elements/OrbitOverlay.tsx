import { useEffect, useRef } from 'react'
import {
  Braces, Code2, Server, Zap, Box, Terminal as TermIcon,
  GitBranch, Container, Figma, Wind, Triangle, Cpu,
  type LucideIcon
} from 'lucide-react'
import { createRoot } from 'react-dom/client'

// ── Tech data ──
interface Tech {
  name: string
  Icon: LucideIcon
  color: string
  ringIdx: number   // 0-based
  phase: number     // initial angle radians
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

// Kecepatan orbit — ring dalam lebih cepat
const SPEEDS = [0.9, 0.65, 0.48, 0.36, 0.27, 0.20, 0.15] // rad/s

// Gambar icon Lucide ke canvas pakai offscreen DOM node
const iconCache = new Map<string, HTMLImageElement>()

function getIconImage(tech: Tech): Promise<HTMLImageElement> {
  if (iconCache.has(tech.name)) return Promise.resolve(iconCache.get(tech.name)!)

  return new Promise((resolve) => {
    const size = 20
    const container = document.createElement('div')
    container.style.cssText = `position:fixed;top:-9999px;left:-9999px;width:${size}px;height:${size}px;`
    document.body.appendChild(container)

    const root = createRoot(container)
    root.render(
      <tech.Icon size={size} color={tech.color} strokeWidth={1.8} />
    )

    // Tunggu React render, lalu serialize SVG
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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const anglesRef = useRef<number[]>(TECHS.map(t => t.phase))
  const imgsRef   = useRef<(HTMLImageElement | null)[]>(TECHS.map(() => null))
  const frameRef  = useRef<number>(0)
  const lastRef   = useRef<number>(0)

  useEffect(() => {
    // Preload semua icons
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

    const TILT = -30 * (Math.PI / 180)  // kemiringan orbit

    const draw = (now: number) => {
      const dt = Math.min((now - lastRef.current) / 1000, 0.05)
      lastRef.current = now

      // Update angles
      anglesRef.current = anglesRef.current.map((a, i) => a + SPEEDS[TECHS[i].ringIdx] * dt)

      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      // ── Pusat orbit — di 78% lebar, 45% tinggi ──
      const cx = W * 0.78
      const cy = H * 0.45

      // ── Ring sizes — proporsional ke layar ──
      // Orbit terluar = 42% lebar layar
      const BASE = Math.min(W * 0.42, H * 0.85) // max radius terluar
      const RINGS = [0.14, 0.22, 0.31, 0.42, 0.55, 0.68, 0.83].map(r => ({
        a: BASE * r,
        b: BASE * r * 0.34,  // rasio b/a = 0.34 → elips pipih seperti tata surya
      }))

      // ── Gambar ring ──
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(TILT)
      RINGS.forEach((ring, i) => {
        ctx.beginPath()
        ctx.ellipse(0, 0, ring.a, ring.b, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,255,255,${0.18 + i * 0.025})`
        ctx.lineWidth   = 0.8 + i * 0.1
        ctx.stroke()
      })
      ctx.restore()

      // ── Matahari ──
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22)
      grad.addColorStop(0, 'rgba(0,255,255,1)')
      grad.addColorStop(0.4, 'rgba(0,200,220,0.8)')
      grad.addColorStop(1, 'rgba(0,100,140,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, 22, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      // ── Glow matahari ──
      const glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 55)
      glow.addColorStop(0, 'rgba(0,255,255,0.25)')
      glow.addColorStop(1, 'rgba(0,255,255,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, 55, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()

      // ── Tech nodes ──
      TECHS.forEach((tech, i) => {
        const angle = anglesRef.current[i]
        const ring  = RINGS[tech.ringIdx]

        // Posisi di orbit (sebelum tilt)
        const ox = Math.cos(angle) * ring.a
        const oy = Math.sin(angle) * ring.b

        // Rotate sesuai TILT
        const px = cx + ox * Math.cos(TILT) - oy * Math.sin(TILT)
        const py = cy + ox * Math.sin(TILT) + oy * Math.cos(TILT)

        const R     = 18   // radius lingkaran node
        const ISIZE = 16   // ukuran icon

        // Background circle
        ctx.beginPath()
        ctx.arc(px, py, R, 0, Math.PI * 2)
        ctx.fillStyle = `${tech.color}25`
        ctx.fill()
        ctx.strokeStyle = `${tech.color}cc`
        ctx.lineWidth   = 1.2
        ctx.stroke()

        // Glow
        const ng = ctx.createRadialGradient(px, py, 0, px, py, R * 2)
        ng.addColorStop(0, `${tech.color}30`)
        ng.addColorStop(1, `${tech.color}00`)
        ctx.beginPath()
        ctx.arc(px, py, R * 2, 0, Math.PI * 2)
        ctx.fillStyle = ng
        ctx.fill()

        // Icon (jika sudah load)
        const img = imgsRef.current[i]
        if (img?.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, px - ISIZE/2, py - ISIZE/2, ISIZE, ISIZE)
        } else {
          // Fallback: huruf pertama
          ctx.fillStyle = tech.color
          ctx.font = `bold 11px monospace`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(tech.name[0], px, py)
        }

        // Label
        ctx.fillStyle = tech.color
        ctx.font = `bold 9px "Orbitron", monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        ctx.shadowColor = tech.color
        ctx.shadowBlur  = 8
        ctx.fillText(tech.name, px, py + R + 4)
        ctx.shadowBlur  = 0
      })

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  )
}
