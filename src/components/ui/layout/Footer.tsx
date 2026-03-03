import { PERSONAL_INFO } from '../../../lib/constants'

export const Footer = () => {
  return (
    <footer style={{
      position: 'relative',
      zIndex: 10,
      padding: 'clamp(24px, 4vw, 40px) clamp(20px, 5vw, 60px)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '12px',
      background: 'rgba(0, 4, 8, 0.85)',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
        fontWeight: 800,
        letterSpacing: '0.2em',
        color: 'var(--cyan)',
        textShadow: '0 0 12px var(--cyan)',
      }}>
        {PERSONAL_INFO.name}_
      </div>

      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.65rem',
        color: 'var(--text-dim)',
        letterSpacing: '0.1em',
        textAlign: 'center',
        flex: 1,
        minWidth: '160px',
      }}>
        © {new Date().getFullYear()} — REACT + THREE.JS
      </div>

      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.6rem',
        color: 'var(--green)',
        letterSpacing: '0.12em',
        whiteSpace: 'nowrap',
      }}>
        SYSTEM_STATUS: ONLINE ▮
      </div>
    </footer>
  )
}
