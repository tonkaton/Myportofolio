import { PERSONAL_INFO } from '../../../lib/constants'

export const Footer = () => {
  return (
    <footer className="site-footer">

      {/* Top border accent */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--cyan), var(--magenta), transparent)',
        opacity: 0.4,
        marginBottom: '0',
      }} />

      <div className="footer-inner">

        {/* Brand */}
        <div className="footer-brand">
          <span className="footer-logo">
            {PERSONAL_INFO.name}<span style={{ color: 'var(--magenta)' }}>_</span>
          </span>
          <span className="footer-tagline">CREATIVE DEVELOPER</span>
        </div>

        {/* Copyright */}
        <div className="footer-copy">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}
          <span className="footer-copy-sub"> — REACT + THREE.JS</span>
        </div>

        {/* Status */}
        <div className="footer-status">
          <span className="footer-dot" />
          SYSTEM_ONLINE
        </div>

      </div>

      <style>{`
        .site-footer {
          position: relative;
          z-index: 20;
          background: rgba(0, 0, 0, 0.97);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 28px clamp(20px, 5vw, 60px);
          /* iOS safe area support */
          padding-bottom: max(28px, env(safe-area-inset-bottom, 28px));
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex-shrink: 0;
        }

        .footer-logo {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 900;
          letter-spacing: 0.25em;
          color: var(--cyan);
          text-shadow: 0 0 14px var(--cyan);
        }

        .footer-tagline {
          font-family: var(--font-body);
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          color: rgba(0,255,255,0.3);
        }

        .footer-copy {
          font-family: var(--font-body);
          font-size: 0.6rem;
          color: var(--text-dim);
          letter-spacing: 0.08em;
          text-align: center;
          flex: 1;
          min-width: 0;
        }

        .footer-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body);
          font-size: 0.6rem;
          color: var(--green);
          letter-spacing: 0.12em;
          flex-shrink: 0;
        }

        .footer-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 8px var(--green);
          animation: pulse-glow 2s ease-in-out infinite;
          flex-shrink: 0;
          display: inline-block;
        }

        /* ── TABLET ── */
        @media (max-width: 768px) {
          .footer-copy-sub { display: none; }
          .footer-copy { font-size: 0.58rem; }
        }

        /* ── MOBILE ── */
        @media (max-width: 560px) {
          .footer-inner {
            flex-direction: column;
            align-items: center;
            gap: 14px;
            text-align: center;
          }
          .footer-brand {
            align-items: center;
          }
          .footer-copy {
            order: 3;
            font-size: 0.55rem;
            opacity: 0.7;
          }
          .footer-status {
            order: 2;
          }
          .footer-brand {
            order: 1;
          }
        }
      `}</style>
    </footer>
  )
}
