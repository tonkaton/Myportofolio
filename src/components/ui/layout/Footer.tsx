import { PERSONAL_INFO } from '../../../lib/constants'

export const Footer = () => {
  return (
    <footer style={{
      position: 'relative',
      zIndex: 20,                    /* lebih tinggi dari section */
      padding: '32px clamp(20px, 5vw, 60px)',
      borderTop: '1px solid rgba(0,255,255,0.15)',
      background: 'rgba(0,0,0,0.95)',
      backdropFilter: 'blur(16px)',
    }}>
      {/* Desktop: 3 kolom sejajar */}
      <div className="footer-inner">

        <div className="footer-brand">
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 900,
            letterSpacing: '0.25em',
            color: 'var(--cyan)',
            textShadow: '0 0 16px var(--cyan)',
          }}>
            {PERSONAL_INFO.name}<span style={{ color: 'var(--magenta)' }}>_</span>
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.58rem',
            color: 'rgba(0,255,255,0.35)',
            letterSpacing: '0.15em',
            marginTop: '4px',
            display: 'block',
          }}>
            CREATIVE DEVELOPER
          </span>
        </div>

        <div className="footer-copy">
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.62rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.1em',
          }}>
            © {new Date().getFullYear()} {PERSONAL_INFO.name} — BUILT WITH REACT + THREE.JS
          </span>
        </div>

        <div className="footer-status">
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.62rem',
            color: 'var(--green)',
            letterSpacing: '0.12em',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--green)',
              boxShadow: '0 0 8px var(--green)',
              animation: 'pulse-glow 2s ease-in-out infinite',
              flexShrink: 0,
              display: 'inline-block',
            }} />
            SYSTEM_ONLINE
          </span>
        </div>

      </div>

      <style>{`
        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .footer-brand { flex-shrink: 0; }
        .footer-copy  { flex: 1; text-align: center; min-width: 180px; }
        .footer-status { flex-shrink: 0; }

        @media (max-width: 640px) {
          .footer-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 16px;
          }
          .footer-copy {
            min-width: unset;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}
