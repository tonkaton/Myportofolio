import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '../../../lib/constants'
import { Container } from '../layout/Container'
import { ProjectCard } from '../elements/Card'

gsap.registerPlugin(ScrollTrigger)

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '120px 0',
      }}
    >
      <Container>
        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <div className="section-label">SELECTED_WORK // 02</div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 800,
            letterSpacing: '0.05em',
            color: 'var(--text-primary)',
            marginBottom: '16px',
          }}>
            PROJECTS
            <span style={{ color: 'var(--magenta)', marginLeft: '8px', opacity: 0.7 }}>_</span>
          </h2>

          <p style={{
            fontFamily: 'var(--font-accent)',
            fontSize: '0.95rem',
            color: 'var(--text-dim)',
            maxWidth: '500px',
          }}>
            A selection of recent work spanning immersive web experiences,
            full-stack applications, and experimental 3D interfaces.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
            gap: '24px',
          }}
          className="projects-grid"
        >
          {PROJECTS.map((project, i) => (
            <div key={project.id} className="project-card" style={{ opacity: 0 }}>
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        {/* View all */}
        <div style={{
          marginTop: '48px',
          textAlign: 'center',
        }}>
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: 'var(--cyan)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'none',
              opacity: 0.7,
              transition: 'opacity 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
          >
            ALL_PROJECTS
            <span style={{
              display: 'inline-block',
              width: '40px',
              height: '1px',
              background: 'var(--cyan)',
            }} />
          </a>
        </div>
      </Container>
    <style>{`
        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 900px) {
          .project-card { opacity: 1 !important; }
        }
      `}</style>
    </section>
  )
}
