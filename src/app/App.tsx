import { useEffect, useRef } from 'react'
import { useGlobalStore } from '../store/useGlobalStore'
import { SceneCanvas } from '../components/scene/SceneCanvas'
import { Navbar } from '../components/ui/layout/Navbar'
import { Footer } from '../components/ui/layout/Footer'
import { Hero } from '../components/ui/sections/Hero'
import { About } from '../components/ui/sections/About'
import { Projects } from '../components/ui/sections/Projects'
import { Skills } from '../components/ui/sections/Skills'
import { Contact } from '../components/ui/sections/Contact'
import { Loader } from '../components/common/Loader'
import { ErrorBoundary } from '../components/common/ErrorBoundary'
import { SEO } from '../components/common/SEO'
import { ErrorBoundary as SceneErrorBoundary } from '../components/common/ErrorBoundary'

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

    window.addEventListener('mousemove', onMouseMove)

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

    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

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
      <CyberpunkCursor />

      {isLoading && <Loader />}

      {/* 3D Scene Background */}
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

      {/* UI Layer */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />

        <main>
          <ErrorBoundary>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </ErrorBoundary>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
