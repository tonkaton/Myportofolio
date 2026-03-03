import { useEffect, useRef, lazy, Suspense } from 'react'
import { useGlobalStore } from '../store/useGlobalStore'
import { SceneCanvas } from '../components/scene/SceneCanvas'
import { Navbar } from '../components/ui/layout/Navbar'
import { Footer } from '../components/ui/layout/Footer'
import { Hero } from '../components/ui/sections/Hero'
import { Loader } from '../components/common/Loader'
import { ErrorBoundary } from '../components/common/ErrorBoundary'
import { SEO } from '../components/common/SEO'
import { ErrorBoundary as SceneErrorBoundary } from '../components/common/ErrorBoundary'
import { CursorTrail } from '../components/ui/elements/CursorTrail'

// Lazy load below-fold sections — not needed until user scrolls
const About    = lazy(() => import('../components/ui/sections/About').then(m => ({ default: m.About })))
const Projects = lazy(() => import('../components/ui/sections/Projects').then(m => ({ default: m.Projects })))
const Skills   = lazy(() => import('../components/ui/sections/Skills').then(m => ({ default: m.Skills })))
const Contact  = lazy(() => import('../components/ui/sections/Contact').then(m => ({ default: m.Contact })))

// Minimal fallback — invisible height placeholder to avoid layout shift
const SectionFallback = () => (
  <div style={{ minHeight: '100vh' }} />
)

// Custom Cursor
const CyberpunkCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 6}px`
        cursorRef.current.style.top = `${e.clientY - 6}px`
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    let frame: number
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animateRing = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12)
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12)

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x - 18}px`
        ringRef.current.style.top = `${ringPos.current.y - 18}px`
      }

      frame = requestAnimationFrame(animateRing)
    }

    frame = requestAnimationFrame(animateRing)

    const onMouseDown = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'scale(0.7)'
      if (ringRef.current) ringRef.current.style.transform = 'scale(1.4)'
    }
    const onMouseUp = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'scale(1)'
      if (ringRef.current) ringRef.current.style.transform = 'scale(1)'
    }

    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999, transition: 'transform 0.15s ease' }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9998, transition: 'transform 0.3s ease' }}
      />
    </>
  )
}

function App() {
  const isLoading = useGlobalStore((s) => s.isLoading)

  return (
    <>
      <SEO />
      <CursorTrail />
      <CyberpunkCursor />

      {isLoading && <Loader />}

      <SceneErrorBoundary
        fallback={
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'radial-gradient(ellipse at center, #040c14 0%, #000 100%)',
            zIndex: 0,
          }} />
        }
      >
        <SceneCanvas />
      </SceneErrorBoundary>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />

        <main>
          <ErrorBoundary>
            {/* Hero loads immediately — above fold */}
            <Hero />

            {/* Below-fold sections lazy loaded */}
            <Suspense fallback={<SectionFallback />}>
              <About />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Skills />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Contact />
            </Suspense>
          </ErrorBoundary>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
