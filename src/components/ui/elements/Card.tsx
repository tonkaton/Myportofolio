import { useState } from 'react'
import type { Project } from '../../../types/project'

interface ProjectCardProps {
  project: Project
  index: number
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="cyber-card corner-cut"
      style={{
        padding: '28px',
        position: 'relative',
        transition: 'all 0.4s ease',
        transform: isHovered ? 'translateY(-6px)' : 'none',
        cursor: 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Corner decoration */}
      <div style={{
        position: 'absolute',
        top: 12,
        right: 12,
        width: 20,
        height: 20,
        borderTop: '2px solid var(--cyan)',
        borderRight: '2px solid var(--cyan)',
        opacity: isHovered ? 1 : 0.4,
        transition: 'opacity 0.3s ease',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 12,
        left: 12,
        width: 20,
        height: 20,
        borderBottom: '2px solid var(--cyan)',
        borderLeft: '2px solid var(--cyan)',
        opacity: isHovered ? 1 : 0.4,
        transition: 'opacity 0.3s ease',
      }} />

      {/* Project number */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.6rem',
        color: 'var(--cyan)',
        opacity: 0.5,
        letterSpacing: '0.3em',
        marginBottom: '16px',
      }}>
        PROJECT_{project.id}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.1rem',
        fontWeight: 700,
        color: isHovered ? '#ffffff' : 'var(--text-primary)',
        letterSpacing: '0.1em',
        marginBottom: '12px',
        transition: 'color 0.3s ease',
        textShadow: isHovered ? '0 0 20px var(--cyan)' : 'none',
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-accent)',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        marginBottom: '20px',
      }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
        {project.tags.map((tag) => (
          <span key={tag} className="cyber-tag">{tag}</span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '16px' }}>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'var(--cyan)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'none',
              opacity: 0.8,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
          >
            ▶ LIVE_DEMO
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'none',
              opacity: 0.8,
              transition: 'opacity 0.2s',
            }}
          >
            ⌥ SOURCE
          </a>
        )}
      </div>

      {/* Hover glow line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '2px',
        background: 'linear-gradient(90deg, var(--cyan), var(--magenta))',
        transition: 'width 0.4s ease',
        width: isHovered ? '100%' : '0%',
      }} />
    </div>
  )
}
