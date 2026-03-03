import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SKILLS } from '../../../lib/constants'
import { Container } from '../layout/Container'
import type { Skill } from '../../../types/project'

gsap.registerPlugin(ScrollTrigger)

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
  const barRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barRef.current || !fillRef.current) return

    const fill = fillRef.current
    const isMobile = window.innerWidth <= 900
    if (isMobile) {
      document.querySelectorAll('.project-card, .about-content, .about-visual').forEach((el: any) => { el.style.opacity = '1' })
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(fill,
        { width: '0%' },
        {
          width: `${skill.level}%`,
          duration: 1.2,
          delay: index * 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 90%',
          }
        }
      )
    }, barRef)

    return () => ctx.revert()
  }, [skill.level, index])

  const categoryColors: Record<Skill['category'], string> = {
    frontend: '#00ffff',
    backend: '#00ff41',
    '3d': '#ff00ff',
    tools: '#ffff00',
    other: '#80cbc4',
  }

  const color = categoryColors[skill.category]

  return (
    <div ref={barRef} style={{ marginBottom: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
      }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'var(--text-primary)',
          letterSpacing: '0.05em',
        }}>
          {skill.name}
        </span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.6rem',
          color,
          letterSpacing: '0.1em',
        }}>
          {skill.level}%
        </span>
      </div>

      <div className="neon-progress">
        <div
          ref={fillRef}
          className="neon-progress-fill"
          style={{
            width: '0%',
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>
    </div>
  )
}

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null)

  const categories = [
    { key: 'frontend', label: 'FRONTEND' },
    { key: '3d', label: '3D / CREATIVE' },
    { key: 'backend', label: 'BACKEND' },
    { key: 'tools', label: 'TOOLS' },
  ] as const

  return (
    <section
      id="skills"
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
          <div className="section-label">TECH_STACK // 03</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 800,
            letterSpacing: '0.05em',
            color: 'var(--text-primary)',
          }}>
            SKILLS<span style={{ color: 'var(--cyan)', opacity: 0.7 }}>_</span>
          </h2>
        </div>

        {/* Skills grid by category */}
        <div className="skills-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: '40px 60px',
        }}>
          {categories.map(({ key, label }) => {
            const categorySkills = SKILLS.filter((s) => s.category === key)
            if (categorySkills.length === 0) return null

            return (
              <div key={key}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.3em',
                  color: 'var(--cyan)',
                  marginBottom: '24px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    background: 'var(--cyan)',
                    borderRadius: '50%',
                    boxShadow: '0 0 8px var(--cyan)',
                  }} />
                  {label}
                </div>
                {categorySkills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            )
          })}
        </div>
      </Container>
    <style>{`
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
