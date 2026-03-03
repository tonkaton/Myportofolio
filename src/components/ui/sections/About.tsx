import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PERSONAL_INFO } from '../../../lib/constants'
import { Container } from '../layout/Container'

gsap.registerPlugin(ScrollTrigger)

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-content',
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      )

      gsap.fromTo('.about-visual',
        { opacity: 0, x: 60, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '120px 0',
      }}
    >
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
          className="about-grid"
        >
          {/* Content */}
          <div className="about-content" style={{ opacity: 0 }}>
            <div className="section-label">ABOUT_ME // 01</div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '0.05em',
              color: 'var(--text-primary)',
              marginBottom: '24px',
              lineHeight: 1.2,
            }}>
              CRAFTING DIGITAL
              <br />
              <span style={{ color: 'var(--cyan)', textShadow: '0 0 20px var(--cyan)' }}>
                REALITIES
              </span>
            </h2>

            <p style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '24px',
            }}>
              {PERSONAL_INFO.bio}
            </p>

            <p style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '40px',
            }}>
              My approach combines technical precision with creative vision. 
              Every project is an opportunity to push boundaries, explore 
              new technologies, and create something the web has never seen before.
            </p>

            {/* Key info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'LOCATION', value: PERSONAL_INFO.location },
                { label: 'EMAIL', value: PERSONAL_INFO.email },
                { label: 'STATUS', value: 'AVAILABLE FOR PROJECTS' },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: 'var(--cyan)',
                    opacity: 0.7,
                    minWidth: '80px',
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: label === 'STATUS' ? 'var(--green)' : 'var(--text-primary)',
                    letterSpacing: '0.05em',
                  }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="about-visual" style={{ opacity: 0 }}>
            <div style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '100%',
            }}>
              {/* Placeholder avatar / hologram */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, rgba(0,255,255,0.08) 0%, transparent 70%)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
                className="corner-cut"
              >
                {/* Hologram-like avatar placeholder */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: 'var(--cyan)',
                  opacity: 0.5,
                  textAlign: 'center',
                }}>
                  {/* Decorative hex grid */}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '4px',
                      marginBottom: '4px',
                    }}>
                      {Array.from({ length: 10 }).map((_, j) => (
                        <span key={j} style={{
                          opacity: Math.random() > 0.5 ? 0.8 : 0.1,
                          fontSize: '0.5rem',
                        }}>
                          {Math.random() > 0.5 ? '1' : '0'}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>

                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                }}>
                  {/* Avatar initials */}
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    border: '2px solid var(--cyan)',
                    boxShadow: '0 0 30px var(--cyan-glow), inset 0 0 30px rgba(0,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: 'var(--cyan)',
                    textShadow: '0 0 20px var(--cyan)',
                    animation: 'float 4s ease-in-out infinite',
                  }}>
                    K
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.3em',
                    color: 'var(--magenta)',
                    textShadow: '0 0 10px var(--magenta)',
                  }}>
                    KATON.DEV
                  </div>
                </div>

                {/* Scan line */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
                  opacity: 0.5,
                  animation: 'scanV 3s linear infinite',
                }} />
              </div>

              {/* Corner accents */}
              {[
                { top: -10, left: -10, borderTop: true, borderLeft: true },
                { top: -10, right: -10, borderTop: true, borderRight: true },
                { bottom: -10, left: -10, borderBottom: true, borderLeft: true },
                { bottom: -10, right: -10, borderBottom: true, borderRight: true },
              ].map((corner, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  ...corner,
                  width: '20px',
                  height: '20px',
                  borderTop: corner.borderTop ? '2px solid var(--cyan)' : undefined,
                  borderLeft: corner.borderLeft ? '2px solid var(--cyan)' : undefined,
                  borderRight: corner.borderRight ? '2px solid var(--cyan)' : undefined,
                  borderBottom: corner.borderBottom ? '2px solid var(--cyan)' : undefined,
                }} />
              ))}
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes scanV {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
