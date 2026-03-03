import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { PERSONAL_INFO } from '../../../lib/constants'
import { Button } from '../elements/Button'
import { Container } from '../layout/Container'
import { startGlitchLoop } from '../animations/glitchText'

export const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    tl.fromTo(lineRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1, ease: 'power3.inOut' }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 40, skewX: -5 },
      { opacity: 1, y: 0, skewX: 0, duration: 1, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(bioRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    )

    // Start glitch loop on title
    if (titleRef.current) {
      setTimeout(() => {
        if (titleRef.current) startGlitchLoop(titleRef.current, 7000)
      }, 2000)
    }
  }, [])

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '100px 0 80px',
        paddingTop: 'max(100px, calc(72px + 28px))',
      }}
    >
      <Container>
        <div style={{ maxWidth: '700px' }}>
          {/* Pre-label */}
          <div className="section-label" style={{ marginBottom: '1.5rem', opacity: 0 }} ref={decorRef}>
            SYSTEM_ONLINE // PORTFOLIO_v2.5
          </div>

          {/* Main title */}
          <div ref={lineRef} style={{
            height: '3px',
            background: 'linear-gradient(90deg, var(--cyan), var(--magenta))',
            marginBottom: '24px',
            boxShadow: '0 0 10px var(--cyan)',
          }} />

          <h1
            ref={titleRef}
            data-text={PERSONAL_INFO.name}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 900,
              letterSpacing: '0.1em',
              color: 'var(--cyan)',
              textShadow: '0 0 40px rgba(0,255,255,0.5), 0 0 80px rgba(0,255,255,0.2)',
              lineHeight: 1,
              marginBottom: '8px',
            }}
          >
            {PERSONAL_INFO.name}
          </h1>

          {/* Subtitle */}
          <div
            ref={subtitleRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              fontWeight: 400,
              letterSpacing: '0.3em',
              color: 'var(--text-secondary)',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <span style={{ color: 'var(--magenta)', opacity: 0.7 }}>▶</span>
            {PERSONAL_INFO.title}
            <span className="cursor-blink" style={{ color: 'var(--cyan)', fontSize: '0.8rem' }} />
          </div>

          {/* Bio */}
          <p
            ref={bioRef}
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              maxWidth: '520px',
              marginBottom: '48px',
            }}
          >
            {PERSONAL_INFO.bio}
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="hero-cta"
            style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
          >
            <Button
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              variant="primary"
            >
              VIEW PROJECTS
            </Button>
            <Button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              variant="secondary"
            >
              CONTACT ME
            </Button>
          </div>

          {/* Stats row */}
          <div className="hero-stats" style={{
            display: 'flex',
            gap: '40px',
            flexWrap: 'wrap',
            marginTop: '60px',
            paddingTop: '32px',
            borderTop: '1px solid var(--border)',
          }}>
            {[
              { value: '50+', label: 'PROJECTS' },
              { value: '3+', label: 'YEARS EXP' },
              { value: '20+', label: 'CLIENTS' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: 'var(--cyan)',
                  textShadow: '0 0 15px var(--cyan)',
                  lineHeight: 1,
                }}>
                  {value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: 'var(--text-dim)',
                  marginTop: '4px',
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location tag */}
        <div style={{
          position: 'absolute',
          right: '0',
          bottom: '-40px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          color: 'var(--text-dim)',
          letterSpacing: '0.15em',
          writingMode: 'horizontal-tb',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{ color: 'var(--cyan)', opacity: 0.5 }}>◈</span>
          {PERSONAL_INFO.location}
        </div>
      </Container>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.55rem',
          letterSpacing: '0.3em',
          color: 'var(--text-dim)',
        }}>SCROLL</div>
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, var(--cyan), transparent)',
          animation: 'pulse-glow 2s ease-in-out infinite',
        }} />
      </div>
      <style>{`
        @media (max-width: 640px) {
          .hero-stats { gap: 24px !important; }
          .hero-cta   { flex-direction: column !important; }
          .hero-cta > * { width: 100% !important; text-align: center; }
        }
      `}</style>
    </section>
  )
}
