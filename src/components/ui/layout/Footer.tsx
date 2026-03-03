import { PERSONAL_INFO } from '../../../lib/constants'

export const Footer = () => {
  return (
    <footer style={{
      position: 'relative',
      zIndex: 10,
      padding: '40px',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px',
      background: 'rgba(0, 4, 8, 0.8)',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.9rem',
        fontWeight: 800,
        letterSpacing: '0.3em',
        color: 'var(--cyan)',
        textShadow: '0 0 15px var(--cyan)',
      }}>
        {PERSONAL_INFO.name}_PORTFOLIO
      </div>

      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.7rem',
        color: 'var(--text-dim)',
        letterSpacing: '0.1em',
      }}>
        © {new Date().getFullYear()} — BUILT WITH REACT + THREE.JS
      </div>

      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.65rem',
        color: 'var(--green)',
        letterSpacing: '0.15em',
      }}>
        SYSTEM_STATUS: ONLINE ▮
      </div>
    </footer>
  )
}
