import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Code2, Database, Globe, Layers, Terminal, Box,
  Figma, GitBranch, Server, Cpu, Braces, Wind,
  Container, Wand2, Zap, Triangle,
} from 'lucide-react'
import { Container as PageContainer } from '../layout/Container'
import { Serializer } from 'v8'

gsap.registerPlugin(ScrollTrigger)

// Lucide tidak punya logo brand khusus, tapi kita bisa pilih icon paling relevan
const SKILLS = [
  // Frontend
  { name: 'React',       icon: Braces,    color: '#61dafb', level: 92, cat: 'Frontend'  },
  { name: 'TypeScript',  icon: Code2,     color: '#3178c6', level: 88, cat: 'Frontend'  },
  { name: 'Next.js',     icon: Triangle,  color: '#ffffff', level: 85, cat: 'Frontend'  },
  { name: 'GSAP',        icon: Zap,       color: '#88ce02', level: 85, cat: 'Frontend'  },
  { name: 'Tailwind',    icon: Wind,      color: '#38bdf8', level: 80, cat: 'Frontend'  },
  { name: 'PHP',         icon: Code2,     color: '#4396f5', level: 80, cat: 'Frontend'  },
  // 3D / Creative
  { name: 'Three.js',   icon: Box,       color: '#00ffff', level: 80, cat: '3D'        },
  { name: 'WebGL/GLSL', icon: Cpu,       color: '#ff00ff', level: 65, cat: '3D'        },
  { name: 'Blender',    icon: Layers,    color: '#ea7600', level: 60, cat: '3D'        },
  { name: 'R3F',        icon: Wand2,     color: '#f472b6', level: 78, cat: '3D'        },
  // Backend
  { name: 'Node.js',    icon: Server,    color: '#8cc84b', level: 78, cat: 'Backend'   },
  { name: 'Python',     icon: Terminal,  color: '#ffd43b', level: 72, cat: 'Backend'   },
  { name: 'PostgreSQL', icon: Database,  color: '#336791', level: 68, cat: 'Backend'   },
  { name: 'Laravel',    icon: Server,    color: '#ec7628', level: 68, cat: 'Backend'   },
  // Tools
  { name: 'Docker',     icon: Container, color: '#2496ed', level: 70, cat: 'Tools'     },
  { name: 'Git',        icon: GitBranch, color: '#f05032', level: 85, cat: 'Tools'     },
  { name: 'Figma',      icon: Figma,     color: '#f24e1e', level: 82, cat: 'Tools'     },
  { name: 'REST/API',   icon: Globe,     color: '#00ff41', level: 80, cat: 'Tools'     },
]

const CAT_COLOR: Record<string, string> = {
  Frontend : '#00ffff',
  '3D'     : '#ff00ff',
  Backend  : '#00ff41',
  Tools    : '#ffff00',
}

type SkillItem = typeof SKILLS[number]

const SkillCard = ({ skill, i }: { skill: SkillItem; i: number }) => {
  const Icon = skill.icon
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={cardRef}
      className="skill-icon-card"
      style={{ '--sk-color': skill.color } as React.CSSProperties}
    >
      {/* Icon */}
      <div className="skill-icon-wrap">
        <Icon size={28} strokeWidth={1.5} color={skill.color} />
        <div className="skill-icon-glow" style={{ background: skill.color }} />
      </div>

      {/* Name */}
      <span className="skill-name">{skill.name}</span>

      {/* Level bar */}
      <div className="skill-lvl-track">
        <div
          className="skill-lvl-fill"
          style={{ width: `${skill.level}%`, background: skill.color, boxShadow: `0 0 6px ${skill.color}` }}
        />
      </div>

      {/* Category badge */}
      <span className="skill-cat" style={{ color: CAT_COLOR[skill.cat] ?? '#00ffff' }}>
        {skill.cat}
      </span>
    </div>
  )
}

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const tid = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo('.skill-icon-card',
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
              toggleActions: 'play none none none',
            },
          }
        )
      }, sectionRef)
      return () => ctx.revert()
    }, 50)
    return () => clearTimeout(tid)
  }, [])

  return (
    <section id="skills" ref={sectionRef} style={{ position:'relative', zIndex:10, padding:'120px 0' }}>
      <PageContainer>

        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div className="section-label">TECH_STACK // 03</div>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,3vw,2.5rem)', fontWeight:800, letterSpacing:'0.05em', color:'var(--text-primary)', marginBottom: '12px' }}>
            SKILLS<span style={{ color:'var(--cyan)', opacity:0.7 }}>_</span>
          </h2>
          <p style={{ fontFamily:'var(--font-accent)', fontSize:'0.9rem', color:'var(--text-dim)', maxWidth:'420px' }}>
            Technologies I work with daily to build immersive digital experiences.
          </p>
        </div>

        {/* Grid of skill cards */}
        <div className="skill-icon-grid">
          {SKILLS.map((s, i) => <SkillCard key={s.name} skill={s} i={i} />)}
        </div>

      </PageContainer>

      <style>{`
        .skill-icon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 16px;
        }

        .skill-icon-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 20px 12px 16px;
          background: rgba(0,20,30,0.55);
          border: 1px solid rgba(255,255,255,0.07);
          cursor: none;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        }
        .skill-icon-card:hover {
          border-color: var(--sk-color, #00ffff);
          transform: translateY(-5px);
          box-shadow: 0 8px 24px color-mix(in srgb, var(--sk-color, #00ffff) 20%, transparent);
        }

        .skill-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .skill-icon-glow {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          opacity: 0;
          filter: blur(12px);
          transition: opacity 0.3s;
        }
        .skill-icon-card:hover .skill-icon-glow { opacity: 0.35; }

        .skill-name {
          font-family: var(--font-display);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: var(--text-primary);
          text-align: center;
        }

        .skill-lvl-track {
          width: 100%;
          height: 2px;
          background: rgba(255,255,255,0.07);
          border-radius: 2px;
          overflow: hidden;
        }
        .skill-lvl-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 1s ease;
        }

        .skill-cat {
          font-family: var(--font-body);
          font-size: 0.48rem;
          letter-spacing: 0.2em;
        }

        @media (max-width: 640px) {
          .skill-icon-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          .skill-icon-card { opacity: 1 !important; transform: none !important; }
        }
        @media (max-width: 380px) {
          .skill-icon-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  )
}
