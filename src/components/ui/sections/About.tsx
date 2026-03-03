import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PERSONAL_INFO } from '../../../lib/constants'
import { Container } from '../layout/Container'

// ─── GANTI INI dengan path foto lo ───────────────────────────────────────────
// Letakkan foto lo di: src/assets/profile.jpg (atau .png / .webp)
// Lalu import di bawah ini:
// import profilePhoto from '../../../assets/profile.jpg'
// Dan ganti PHOTO_SRC jadi: profilePhoto
const PHOTO_SRC = '' // Kosong = tampil avatar initials (fallback)
// ─────────────────────────────────────────────────────────────────────────────

gsap.registerPlugin(ScrollTrigger)

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-content',
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
      gsap.fromTo('.about-visual',
        { opacity: 0, x: 60, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} style={{ position: 'relative', zIndex: 10, padding: '120px 0' }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="about-grid">

          {/* Content */}
          <div className="about-content" style={{ opacity: 0 }}>
            <div className="section-label">ABOUT_ME // 01</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '24px', lineHeight: 1.2 }}>
              CRAFTING DIGITAL<br />
              <span style={{ color: 'var(--cyan)', textShadow: '0 0 20px var(--cyan)' }}>REALITIES</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-accent)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
              {PERSONAL_INFO.bio}
            </p>
            <p style={{ fontFamily: 'var(--font-accent)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '40px' }}>
              My approach combines technical precision with creative vision.
              Every project is an opportunity to push boundaries, explore
              new technologies, and create something the web has never seen before.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'LOCATION', value: PERSONAL_INFO.location },
                { label: 'EMAIL',    value: PERSONAL_INFO.email },
                { label: 'STATUS',   value: 'AVAILABLE FOR PROJECTS' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--cyan)', opacity: 0.7, minWidth: '80px' }}>{label}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: label === 'STATUS' ? 'var(--green)' : 'var(--text-primary)', letterSpacing: '0.05em' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual — Photo or Avatar fallback */}
          <div className="about-visual" style={{ opacity: 0 }}>
            <div ref={photoRef} style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>

              <div style={{
                position: 'absolute', inset: 0,
                border: '1px solid var(--border)',
                overflow: 'hidden',
                background: 'radial-gradient(ellipse at center, rgba(0,255,255,0.06) 0%, transparent 70%)',
              }} className="corner-cut">

                {PHOTO_SRC ? (
                  /* ── REAL PHOTO ── */
                  <>
                    <img
                      src={PHOTO_SRC}
                      alt={PERSONAL_INFO.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block',
                        filter: 'saturate(0.9) contrast(1.05)',
                        mixBlendMode: 'normal',
                      }}
                    />
                    {/* Cyan overlay scan effect on top of photo */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(180deg, transparent 60%, rgba(0,255,255,0.08) 100%)',
                      pointerEvents: 'none',
                    }} />
                    {/* Name badge overlay */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      padding: '20px',
                      background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%)',
                      display: 'flex', flexDirection: 'column', gap: '4px',
                    }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 900, letterSpacing: '0.15em', color: 'var(--cyan)', textShadow: '0 0 15px var(--cyan)' }}>
                        {PERSONAL_INFO.name}
                      </span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-secondary)' }}>
                        {PERSONAL_INFO.title}
                      </span>
                    </div>
                  </>
                ) : (
                  /* ── AVATAR FALLBACK (kalau belum ada foto) ── */
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--cyan)', opacity: 0.15, position: 'absolute', inset: 0, overflow: 'hidden', display: 'flex', flexWrap: 'wrap', padding: '8px' }}>
                      {'01'.repeat(400)}
                    </div>
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '2px solid var(--cyan)', boxShadow: '0 0 30px var(--cyan-glow), inset 0 0 30px rgba(0,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--cyan)', textShadow: '0 0 20px var(--cyan)', animation: 'float 4s ease-in-out infinite', zIndex: 1 }}>
                      {PERSONAL_INFO.name.charAt(0)}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--magenta)', textShadow: '0 0 10px var(--magenta)', zIndex: 1 }}>
                      {PERSONAL_INFO.name}.DEV
                    </div>
                  </div>
                )}

                {/* Scanline animation — always on top */}
                <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)', opacity: 0.4, animation: 'scanV 3s linear infinite', pointerEvents: 'none' }} />
              </div>

              {/* Corner accents */}
              {([
                { top: -10,   left: -10,  bTop: true,    bLeft: true  },
                { top: -10,   right: -10, bTop: true,    bRight: true },
                { bottom: -10,left: -10,  bBottom: true, bLeft: true  },
                { bottom: -10,right: -10, bBottom: true, bRight: true },
              ] as const).map((c, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  top:    'top'    in c ? c.top    : undefined,
                  bottom: 'bottom' in c ? c.bottom : undefined,
                  left:   'left'   in c ? c.left   : undefined,
                  right:  'right'  in c ? c.right  : undefined,
                  width: '20px', height: '20px',
                  borderTop:    'bTop'    in c && c.bTop    ? '2px solid var(--cyan)' : undefined,
                  borderBottom: 'bBottom' in c && c.bBottom ? '2px solid var(--cyan)' : undefined,
                  borderLeft:   'bLeft'   in c && c.bLeft   ? '2px solid var(--cyan)' : undefined,
                  borderRight:  'bRight'  in c && c.bRight  ? '2px solid var(--cyan)' : undefined,
                }} />
              ))}
            </div>
          </div>

        </div>
      </Container>

      <style>{`
        @keyframes scanV { 0% { top: 0 } 100% { top: 100% } }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
