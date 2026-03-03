import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { PERSONAL_INFO } from '../../../lib/constants'
import { Button } from '../elements/Button'
import { Container } from '../layout/Container'
import { startGlitchLoop } from '../animations/glitchText'

export const Hero = () => {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const lineRef  = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef   = useRef<HTMLDivElement>(null)
  const bioRef   = useRef<HTMLParagraphElement>(null)
  const ctaRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = window.innerWidth <= 768

    if (isMobile) {
      // On mobile just show everything immediately, no animation
      if (wrapRef.current) wrapRef.current.style.opacity = '1'
      return
    }

    const tl = gsap.timeline({ delay: 0.3 })
    tl.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3'
      )
      .fromTo(subRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4'
      )
      .fromTo(bioRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4'
      )

    if (titleRef.current) {
      setTimeout(() => {
        if (titleRef.current) startGlitchLoop(titleRef.current, 7000)
      }, 2500)
    }
  }, [])

  return (
    <section id="home" className="hero-section">
      <Container>
        <div ref={wrapRef} className="hero-wrap">

          {/* ── Label ── */}
          <p className="hero-label">SYSTEM_ONLINE // PORTFOLIO_v2.5</p>

          {/* ── Accent line ── */}
          <div ref={lineRef} className="hero-line" />

          {/* ── Name ── */}
          <h1 ref={titleRef} data-text={PERSONAL_INFO.name} className="hero-title">
            {PERSONAL_INFO.name}
          </h1>

          {/* ── Title / subtitle ── */}
          <div ref={subRef} className="hero-subtitle">
            <span className="hero-arrow">▶</span>
            <span>{PERSONAL_INFO.title}</span>
            <span className="cursor-blink" />
          </div>

          {/* ── Bio ── */}
          <p ref={bioRef} className="hero-bio">
            {PERSONAL_INFO.bio}
          </p>

          {/* ── CTAs ── */}
          <div ref={ctaRef} className="hero-cta">
            <Button variant="primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              VIEW PROJECTS
            </Button>
            <Button variant="secondary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              CONTACT ME
            </Button>
          </div>

          {/* ── Stats ── */}
          <div className="hero-stats">
            {[
              { value: '50+', label: 'PROJECTS'  },
              { value: '3+',  label: 'YEARS EXP' },
              { value: '20+', label: 'CLIENTS'   },
            ].map(({ value, label }) => (
              <div key={label} className="hero-stat-item">
                <span className="hero-stat-value">{value}</span>
                <span className="hero-stat-label">{label}</span>
              </div>
            ))}
          </div>

        </div>
      </Container>

      {/* Scroll indicator — hidden on mobile */}
      <div className="hero-scroll">
        <span className="hero-scroll-text">SCROLL</span>
        <div className="hero-scroll-line" />
      </div>

      <style>{`
        /* ── HERO BASE ── */
        .hero-section {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 72px; /* navbar height */
        }

        .hero-wrap {
          max-width: 680px;
          padding: 60px 0 80px;
        }

        .hero-label {
          font-family: var(--font-body);
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          color: var(--cyan);
          opacity: 0.55;
          margin-bottom: 20px;
        }

        .hero-line {
          height: 3px;
          width: 100%;
          background: linear-gradient(90deg, var(--cyan), var(--magenta));
          box-shadow: 0 0 10px var(--cyan);
          margin-bottom: 28px;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 7vw, 5.5rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          color: var(--cyan);
          text-shadow: 0 0 40px rgba(0,255,255,0.45), 0 0 80px rgba(0,255,255,0.15);
          line-height: 1.05;
          margin-bottom: 16px;
        }

        .hero-subtitle {
          font-family: var(--font-display);
          font-size: clamp(0.75rem, 2vw, 1rem);
          letter-spacing: 0.25em;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }

        .hero-arrow {
          color: var(--magenta);
          opacity: 0.8;
          flex-shrink: 0;
        }

        .hero-bio {
          font-family: var(--font-accent);
          font-size: clamp(0.9rem, 1.4vw, 1rem);
          color: var(--text-secondary);
          line-height: 1.8;
          max-width: 500px;
          margin-bottom: 40px;
        }

        .hero-cta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 56px;
        }

        .hero-stats {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
          padding-top: 28px;
          border-top: 1px solid var(--border);
        }

        .hero-stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hero-stat-value {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--cyan);
          text-shadow: 0 0 12px var(--cyan);
          line-height: 1;
        }

        .hero-stat-label {
          font-family: var(--font-display);
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          color: var(--text-dim);
        }

        /* Scroll indicator */
        .hero-scroll {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .hero-scroll-text {
          font-family: var(--font-display);
          font-size: 0.5rem;
          letter-spacing: 0.3em;
          color: var(--text-dim);
        }

        .hero-scroll-line {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, var(--cyan), transparent);
          animation: pulse-glow 2s ease-in-out infinite;
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .hero-section {
            align-items: flex-start;
          }
          .hero-wrap {
            padding: 40px 0 60px;
            max-width: 100%;
          }
          .hero-title {
            font-size: clamp(2rem, 12vw, 3rem);
            letter-spacing: 0.05em;
            word-break: break-word;
          }
          .hero-subtitle {
            font-size: 0.7rem;
            letter-spacing: 0.15em;
            gap: 8px;
          }
          .hero-bio {
            font-size: 0.9rem;
            max-width: 100%;
          }
          .hero-cta {
            flex-direction: column;
            gap: 12px;
          }
          .hero-cta > * {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
          .hero-stats {
            gap: 24px;
          }
          .hero-stat-value {
            font-size: 1.4rem;
          }
          .hero-scroll {
            display: none;
          }
          .hero-label {
            font-size: 0.55rem;
            letter-spacing: 0.18em;
          }
        }

        @media (max-width: 400px) {
          .hero-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  )
}
