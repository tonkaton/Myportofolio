import { gsap } from 'gsap'

// ─────────────────────────────────────────
// MODEL: Clean horizontal slice wipe
// Ringan, tidak ngelag, smooth
//
// Urutan:
//  1. Single panel hitam slide masuk dari kiri (0.3s)
//  2. callback() dipanggil
//  3. Panel slide keluar ke kanan (0.28s)
// ─────────────────────────────────────────

export const usePageTransition = () => {
  const triggerTransition = (callback: () => void) => {
    const overlay = document.getElementById('pt-overlay')
    if (!overlay) { callback(); return }

    const panel = overlay.querySelector<HTMLElement>('.pt-panel')!

    gsap.timeline()
      .set(overlay, { display: 'block' })
      .fromTo(panel,
        { xPercent: -100 },
        { xPercent: 0, duration: 0.28, ease: 'power2.inOut' }
      )
      .call(callback)
      .to(panel,
        { xPercent: 100, duration: 0.26, ease: 'power2.inOut' }
      )
      .set(overlay, { display: 'none' })
  }

  return { triggerTransition }
}

export const PageTransitionOverlay = () => (
  <div
    id="pt-overlay"
    style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      display: 'none', pointerEvents: 'none',
      overflow: 'hidden',
    }}
  >
    <div
      className="pt-panel"
      style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, #000810 60%, #001520 100%)',
        borderRight: '2px solid rgba(0,255,255,0.5)',
        boxShadow: '4px 0 24px rgba(0,255,255,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.5rem',
        letterSpacing: '0.6em',
        color: 'rgba(0,255,255,0.3)',
      }}>
        SYS//NAVIGATE
      </span>
    </div>
  </div>
)
