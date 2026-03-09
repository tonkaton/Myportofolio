import { useState, useEffect, useRef } from 'react'
import { NAV_LINKS, PERSONAL_INFO } from '../../../lib/constants'
import { useGlobalStore } from '../../../store/useGlobalStore'
import { RealtimeClock } from '../elements/RealtimeClock'
import { GlitchModeToggle } from '../elements/GlitchModeToggle'
import { usePageTransition } from '../elements/PageTransition'
import { CursorModeSwitcher } from '../elements/CursorModeSwitcher'

export const Navbar = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useGlobalStore()
  const [activeLink] = useState('home')
  const navRef = useRef<HTMLElement>(null)
  const { triggerTransition } = usePageTransition()

  // Zero re-render scroll detection — direct DOM manipulation
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const onScroll = () => {
      const scrolled = window.scrollY > 50
      nav.style.background = scrolled ? 'rgba(0,4,8,0.95)' : 'rgba(0,0,0,0.2)'
      nav.style.borderBottomColor = scrolled ? 'rgba(0,255,255,0.2)' : 'rgba(0,255,255,0.06)'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    triggerTransition(() => {
      const el = document.getElementById(href.replace('#', ''))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    })
  }

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
        gap: '20px',
        background: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,255,255,0.06)',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}>

        {/* ── LOGO ── */}
        <button onClick={() => handleNavClick('#home')} style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.1rem',
          fontWeight: 900,
          letterSpacing: '0.25em',
          color: 'var(--cyan)',
          textShadow: '0 0 20px rgba(0,255,255,0.8)',
          background: 'none', border: 'none', cursor: 'none',
          whiteSpace: 'nowrap', flexShrink: 0, padding: 0,
        }}>
          {PERSONAL_INFO.name}<span style={{ color: 'var(--magenta)', opacity: 0.9 }}>_</span>
        </button>

        {/* ── DIVIDER ── */}
        <div style={{ width: '1px', height: '28px', background: 'var(--border)', flexShrink: 0 }} className="nav-extras" />

        {/* ── CLOCK + GLITCH ── */}
        <div className="nav-extras" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          <RealtimeClock />
          <GlitchModeToggle />
        </div>

        {/* ── SPACER ── */}
        <div style={{ flex: 1 }} />

        {/* ── NAV LINKS ── */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          {NAV_LINKS.map(({ label, href }) => (
            <NavItem key={label} label={label} href={href}
              active={activeLink === href.replace('#', '')}
              onClick={() => handleNavClick(href)}
            />
          ))}
        </div>

        {/* ── CURSOR MODE SWITCHER ── */}
        <div className="nav-right" style={{ flexShrink: 0 }}>
          <CursorModeSwitcher />
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ width: '1px', height: '28px', background: 'var(--border)', flexShrink: 0 }} className="nav-right" />

        {/* ── CV DOWNLOAD ── */}
        <a
          href="/cv.pdf"
          download="Katon_CV.pdf"
          className="nav-right cv-btn"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            color: 'var(--cyan)',
            border: '1px solid rgba(0,255,255,0.4)',
            padding: '7px 14px',
            textDecoration: 'none',
            cursor: 'none',
            transition: 'all 0.25s',
            background: 'transparent',
            whiteSpace: 'nowrap',
            clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0,255,255,0.1)'
            e.currentTarget.style.boxShadow  = '0 0 16px rgba(0,255,255,0.3)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.boxShadow  = 'none'
          }}
        >
          ↓ CV
        </a>

        {/* ── DIVIDER ── */}
        <div style={{ width: '1px', height: '28px', background: 'var(--border)', flexShrink: 0 }} className="nav-right" />

        {/* ── STATUS + HINT ── */}
        <div className="nav-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--green)', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', animation: 'pulse-glow 2s ease-in-out infinite', flexShrink: 0, display: 'inline-block' }} />
            AVAILABLE_FOR_WORK
          </div>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.52rem', color: 'rgba(0,255,255,0.55)', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
            PRESS ` FOR TERMINAL
          </span>
        </div>

        {/* ── HAMBURGER (mobile) ── */}
        <button className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', gap: '5px', background: 'none', border: '1px solid rgba(0,255,255,0.3)', padding: '10px', cursor: 'none', flexShrink: 0 }}
        >
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              width: '22px', height: '2px', background: 'var(--cyan)',
              transition: 'all 0.3s',
              transform: isMobileMenuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                : i === 1 ? 'none' : 'rotate(-45deg) translate(5px, -5px)'
                : 'none',
              opacity: isMobileMenuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(0,4,8,0.97)', backdropFilter: 'blur(16px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '0',
        }}>
          {/* Mobile logo */}
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', letterSpacing: '0.4em', color: 'rgba(0,255,255,0.4)', marginBottom: '40px' }}>
            {PERSONAL_INFO.name}_MENU
          </div>
          {NAV_LINKS.map(({ label, href }, i) => (
            <button key={label} onClick={() => handleNavClick(href)} style={{
              fontFamily: 'var(--font-display)', fontSize: '1.4rem',
              letterSpacing: '0.25em', color: 'var(--text-primary)',
              background: 'none', border: 'none', cursor: 'none',
              padding: '16px 40px', width: '100%', textAlign: 'center',
              borderBottom: i < NAV_LINKS.length - 1 ? '1px solid rgba(0,255,255,0.08)' : 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            >
              <span style={{ color: 'rgba(0,255,255,0.55)', fontSize: '0.55rem', marginRight: '12px', letterSpacing: '0.2em' }}>0{i + 1}</span>
              {label}
            </button>
          ))}
          {/* Mobile clock */}
          <div style={{ marginTop: '40px', fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'rgba(0,255,255,0.4)' }}>
            <RealtimeClock />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .nav-extras  { display: none !important; }
          .nav-right   { display: none !important; }
          .hamburger   { display: flex !important; }
        }
        @media (max-width: 480px) {
          nav { padding: 0 20px !important; }
        }
      `}</style>
    </>
  )
}

const NavItem = ({ label, href: _href, active, onClick }: {
  label: string; href: string; active: boolean; onClick: () => void
}) => {
  const [hovered, setHovered] = useState(false)
  const on = active || hovered
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-display)', fontSize: '0.65rem', letterSpacing: '0.22em',
        color: on ? 'var(--cyan)' : 'rgba(200,220,225,0.8)',
        background: 'none', border: 'none', cursor: 'none',
        position: 'relative', padding: '6px 0',
        transition: 'color 0.25s', textShadow: on ? '0 0 12px var(--cyan)' : 'none',
      }}
    >
      {label}
      <span style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '1px', background: 'var(--cyan)',
        transform: on ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left', transition: 'transform 0.25s ease',
        boxShadow: '0 0 8px var(--cyan)',
      }} />
    </button>
  )
}
