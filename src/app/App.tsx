import { useEffect, lazy, Suspense } from 'react'
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
import { Terminal } from '../components/ui/elements/Terminal'
import { PageTransitionOverlay } from '../components/ui/elements/PageTransition'
import { useGlobalKeyboard } from '../hooks/useGlobalKeyboard'

// Lazy load below-fold sections — not needed until user scrolls
const About    = lazy(() => import('../components/ui/sections/About').then(m => ({ default: m.About })))
const Projects = lazy(() => import('../components/ui/sections/Projects').then(m => ({ default: m.Projects })))
const Skills   = lazy(() => import('../components/ui/sections/Skills').then(m => ({ default: m.Skills })))
const Contact  = lazy(() => import('../components/ui/sections/Contact').then(m => ({ default: m.Contact })))

// Minimal fallback — invisible height placeholder to avoid layout shift
const SectionFallback = () => (
  <div style={{ minHeight: '100vh' }} />
)

function App() {
  const isLoading = useGlobalStore((s) => s.isLoading)
  useGlobalKeyboard()

  return (
    <>
      <SEO />
      <PageTransitionOverlay />
      <Terminal />
      <CursorTrail />

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

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column' }} className="app-wrapper">
        <Navbar />

        <main style={{ position: 'relative', flex: 1 }}>
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
