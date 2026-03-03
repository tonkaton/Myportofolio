import { useState } from 'react'
import { NAV_LINKS, PERSONAL_INFO } from '../../../lib/constants'
import { useScrollPosition } from '../../../hooks/useScrollPosition'
import { useGlobalStore } from '../../../store/useGlobalStore'
import { RealtimeClock } from '../elements/RealtimeClock'
import { GlitchModeToggle } from '../elements/GlitchModeToggle'
import { usePageTransition } from '../elements/PageTransition'

export const Navbar = () => {
  const { scrollY } = useScrollPosition()
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useGlobalStore()
  const [activeLink] = useState('home')

  const isScrolled = scrollY > 50
  const { triggerTransition } = usePageTransition()

  const handleNavClick = (href: string) => {
    triggerTransition(() => {
      const id = href.replace('#', '')
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    })
  }

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 40px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: isScrolled
          ? 'rgba(0, 4, 8, 0.85)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontWeight: 900,
            letterSpacing: '0.3em',
            color: 'var(--cyan)',
            textShadow: '0 0 20px var(--cyan)',
            cursor: 'none',
          }}
          onClick={() => handleNavClick('#home')}
        >
          {PERSONAL_INFO.name}
          <span style={{ color: 'var(--magenta)', opacity: 0.8 }}>_</span>
        </div>

        {/* Left side extras: clock + glitch toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="nav-extras">
          <RealtimeClock />
          <GlitchModeToggle />
        </div>

        {/* Desktop links */}
        <div
          className="desktop-nav"
          style={{
            display: 'flex',
            gap: '40px',
            listStyle: 'none',
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <NavItem
              key={label}
              label={label}
              href={href}
              active={activeLink === href.replace('#', '')}
              onClick={() => handleNavClick(href)}
            />
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: '1px solid var(--border)',
            padding: '8px',
            cursor: 'none',
          }}
          className="hamburger"
        >
          <div style={{
            width: '22px',
            height: '2px',
            background: 'var(--cyan)',
            marginBottom: '5px',
            transition: 'all 0.3s',
            transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }} />
          <div style={{
            width: '22px',
            height: '2px',
            background: 'var(--cyan)',
            marginBottom: '5px',
            opacity: isMobileMenuOpen ? 0 : 1,
          }} />
          <div style={{
            width: '22px',
            height: '2px',
            background: 'var(--cyan)',
            transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            transition: 'all 0.3s',
          }} />
        </button>

        {/* Status indicator */}
        <div style={{
          position: 'absolute',
          right: '180px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          color: 'var(--green)',
          letterSpacing: '0.1em',
        }}
          className="status-indicator"
        >
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--green)',
            boxShadow: '0 0 8px var(--green)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }} />
          AVAILABLE_FOR_WORK
        </div>

        {/* Terminal hint */}
        <div style={{
          position: 'absolute',
          right: '16px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.55rem',
          color: 'rgba(0,255,255,0.3)',
          letterSpacing: '0.1em',
          userSelect: 'none',
        }} className="terminal-hint">
          PRESS ~ FOR TERMINAL
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'rgba(0, 4, 8, 0.97)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          backdropFilter: 'blur(10px)',
        }}>
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => handleNavClick(href)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                letterSpacing: '0.3em',
                color: 'var(--text-primary)',
                cursor: 'none',
                padding: '8px 16px',
                background: 'none',
                border: 'none',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .nav-extras { display: none !important; }
          .terminal-hint { display: none !important; }
          .hamburger { display: block !important; }
          .status-indicator { display: none !important; }
        }
      `}</style>
    </>
  )
}

const NavItem = ({
  label,
  href: _href,
  active,
  onClick,
}: {
  label: string
  href: string
  active: boolean
  onClick: () => void
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.65rem',
        letterSpacing: '0.25em',
        color: active || hovered ? 'var(--cyan)' : 'var(--text-secondary)',
        background: 'none',
        border: 'none',
        cursor: 'none',
        position: 'relative',
        padding: '4px 0',
        transition: 'color 0.3s ease',
        textShadow: active || hovered ? '0 0 10px var(--cyan)' : 'none',
      }}
    >
      {label}
      <span style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '1px',
        background: 'var(--cyan)',
        boxShadow: '0 0 6px var(--cyan)',
        transition: 'width 0.3s ease',
        width: active || hovered ? '100%' : '0%',
      }} />
    </button>
  )
}
