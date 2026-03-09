import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CERTIFICATES } from '../../../lib/constants'
import { Container } from '../layout/Container'
import type { Certificate } from '../../../types/project'

gsap.registerPlugin(ScrollTrigger)

const CATEGORY_COLOR: Record<Certificate['category'], string> = {
  frontend : '#00ffff',
  backend  : '#00ff41',
  cloud    : '#ff00ff',
  design   : '#ffff00',
  other    : '#80cbc4',
}

const CertCard = ({ cert, index }: { cert: Certificate; index: number }) => {
  const [hovered, setHovered] = useState(false)
  const cardRef  = useRef<HTMLDivElement>(null)
  const scanRef  = useRef<HTMLDivElement>(null)
  const color    = CATEGORY_COLOR[cert.category]

  // Scanline animation on hover
  useEffect(() => {
    if (!scanRef.current) return
    if (hovered) {
      gsap.fromTo(scanRef.current,
        { top: '-10%', opacity: 0.6 },
        { top: '110%', opacity: 0, duration: 0.7, ease: 'none' }
      )
    }
  }, [hovered])

  return (
    <div
      ref={cardRef}
      className="cert-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ '--cert-color': color } as React.CSSProperties}
    >
      {/* Scan line sweep */}
      <div ref={scanRef} className="cert-scan" />

      {/* Corner accents */}
      <div className="cert-corner cert-corner-tl" />
      <div className="cert-corner cert-corner-br" />

      {/* Header */}
      <div className="cert-header">
        <span className="cert-index">CERT_{cert.id}</span>
        <span className="cert-category" style={{ color }}>{cert.category.toUpperCase()}</span>
      </div>

      {/* Title */}
      <h3 className="cert-title">{cert.title}</h3>

      {/* Meta */}
      <div className="cert-meta">
        <div className="cert-issuer">
          <span className="cert-meta-label">ISSUED_BY</span>
          <span className="cert-meta-value">{cert.issuer}</span>
        </div>
        <div className="cert-date">
          <span className="cert-meta-label">YEAR</span>
          <span className="cert-meta-value" style={{ color }}>{cert.date}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="cert-footer">
        <div className="cert-bar">
          <div className="cert-bar-fill" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
        </div>
        {cert.credentialUrl && cert.credentialUrl !== '#' && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-link"
            style={{ color }}
            onClick={e => e.stopPropagation()}
          >
            VIEW_CREDENTIAL →
          </a>
        )}
      </div>
    </div>
  )
}

export const Certificates = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [filter, setFilter]   = useState<Certificate['category'] | 'all'>('all')

  const categories: { key: Certificate['category'] | 'all'; label: string }[] = [
    { key: 'all',      label: 'ALL'      },
    { key: 'frontend', label: 'FRONTEND' },
    { key: 'backend',  label: 'BACKEND'  },
    { key: 'cloud',    label: 'CLOUD'    },
    { key: 'design',   label: 'DESIGN'   },
    { key: 'other',    label: 'OTHER'    },
  ]

  const filtered = filter === 'all'
    ? CERTIFICATES
    : CERTIFICATES.filter(c => c.category === filter)

  useEffect(() => {
    // Small delay so DOM has re-rendered filtered cards
    const tid = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo('.cert-card',
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
        ScrollTrigger.refresh()
      }, sectionRef)  // scoped to sectionRef — won't touch other sections
      return () => ctx.revert()
    }, 50)
    return () => clearTimeout(tid)
  }, [filter])

  return (
    <section id="certificates" ref={sectionRef} className="cert-section">
      <Container>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div className="section-label">CREDENTIALS // 05</div>
          <h2 className="cert-heading">
            CERTIFICATES<span style={{ color: 'var(--cyan)', opacity: 0.7 }}>_</span>
          </h2>
          <p className="cert-subheading">
            Verified credentials and completed training programs.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="cert-filters">
          {categories.map(({ key, label }) => {
            const active = filter === key
            const color  = key === 'all' ? 'var(--cyan)' : CATEGORY_COLOR[key as Certificate['category']]
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="cert-filter-btn"
                style={{
                  borderColor : active ? color : 'var(--border)',
                  color       : active ? color : 'rgba(180,200,210,0.7)',
                  boxShadow   : active ? `0 0 10px ${color}40` : 'none',
                  background  : active ? `${color}10` : 'transparent',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Cards grid */}
        <div className="cert-grid">
          {filtered.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>

        {/* Total count */}
        <div className="cert-total">
          <span style={{ color: 'var(--cyan)', opacity: 0.4 }}>◈</span>
          &nbsp;SHOWING {filtered.length} OF {CERTIFICATES.length} CREDENTIALS
        </div>

      </Container>

      <style>{`
        .cert-section {
          position: relative;
          z-index: 10;
          padding: 120px 0;
        }

        /* ── Heading ── */
        .cert-heading {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 800;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          margin-bottom: 12px;
        }
        .cert-subheading {
          font-family: var(--font-accent);
          font-size: 0.95rem;
          color: var(--text-dim);
          max-width: 440px;
        }

        /* ── Filters ── */
        .cert-filters {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .cert-filter-btn {
          font-family: var(--font-display);
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          padding: 6px 16px;
          border: 1px solid;
          border-radius: 0;
          cursor: none;
          transition: all 0.25s ease;
          background: transparent;
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
        }
        .cert-filter-btn:hover {
          opacity: 0.85;
        }

        /* ── Grid ── */
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        /* ── Card ── */
        .cert-card {
          position: relative;
          background: rgba(0, 20, 30, 0.6);
          border: 1px solid rgba(0, 255, 255, 0.12);
          padding: 24px;
          cursor: none;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        }
        .cert-card:hover {
          border-color: var(--cert-color, var(--cyan));
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 255, 255, 0.08);
        }

        /* Scan line */
        .cert-scan {
          position: absolute;
          left: 0; right: 0;
          top: -10%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--cert-color, var(--cyan)), transparent);
          opacity: 0;
          pointer-events: none;
          z-index: 2;
        }

        /* Corner accents */
        .cert-corner {
          position: absolute;
          width: 14px; height: 14px;
          opacity: 0.5;
          transition: opacity 0.3s;
        }
        .cert-card:hover .cert-corner { opacity: 1; }
        .cert-corner-tl {
          top: 8px; right: 8px;
          border-top: 2px solid var(--cert-color, var(--cyan));
          border-right: 2px solid var(--cert-color, var(--cyan));
        }
        .cert-corner-br {
          bottom: 8px; left: 8px;
          border-bottom: 2px solid var(--cert-color, var(--cyan));
          border-left: 2px solid var(--cert-color, var(--cyan));
        }

        /* Header row */
        .cert-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .cert-index {
          font-family: var(--font-body);
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          color: var(--text-dim);
        }
        .cert-category {
          font-family: var(--font-display);
          font-size: 0.52rem;
          letter-spacing: 0.2em;
        }

        /* Title */
        .cert-title {
          font-family: var(--font-display);
          font-size: clamp(0.8rem, 1.5vw, 0.95rem);
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-primary);
          line-height: 1.4;
          margin-bottom: 16px;
          min-height: 2.8em;
        }

        /* Meta */
        .cert-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 12px;
          margin-bottom: 16px;
        }
        .cert-issuer, .cert-date {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .cert-meta-label {
          font-family: var(--font-body);
          font-size: 0.5rem;
          letter-spacing: 0.18em;
          color: var(--text-dim);
        }
        .cert-meta-value {
          font-family: var(--font-body);
          font-size: 0.72rem;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        /* Footer */
        .cert-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .cert-bar {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
          position: relative;
          overflow: hidden;
        }
        .cert-bar-fill {
          position: absolute;
          left: 0; top: 0;
          width: 100%; height: 100%;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s ease;
        }
        .cert-card:hover .cert-bar-fill {
          transform: scaleX(1);
        }
        .cert-link {
          font-family: var(--font-display);
          font-size: 0.52rem;
          letter-spacing: 0.15em;
          text-decoration: none;
          opacity: 0.7;
          transition: opacity 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .cert-link:hover { opacity: 1; }

        /* Total */
        .cert-total {
          font-family: var(--font-body);
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: var(--text-dim);
          text-align: center;
        }

        /* Mobile */
        @media (max-width: 640px) {
          .cert-grid { grid-template-columns: 1fr; }
          .cert-filters { gap: 8px; }
          .cert-filter-btn { font-size: 0.52rem; padding: 5px 12px; }
          .cert-card { opacity: 1 !important; }
        }
      `}</style>
    </section>
  )
}
