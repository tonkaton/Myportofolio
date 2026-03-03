import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface PageTransitionProps {
  onComplete?: () => void
}

export const usePageTransition = () => {
  const triggerTransition = (callback: () => void) => {
    const overlay = document.getElementById('page-transition-overlay')
    if (!overlay) { callback(); return }

    const bars = overlay.querySelectorAll('.trans-bar')

    gsap.timeline()
      .set(overlay, { display: 'flex' })
      .fromTo(bars,
        { scaleY: 0, transformOrigin: 'bottom' },
        { scaleY: 1, duration: 0.4, ease: 'power4.in', stagger: 0.05 },
      )
      .call(callback)
      .to(bars,
        { scaleY: 0, transformOrigin: 'top', duration: 0.4, ease: 'power4.out', stagger: 0.05 },
      )
      .set(overlay, { display: 'none' })
  }

  return { triggerTransition }
}

export const PageTransitionOverlay = () => {
  const colors = ['var(--cyan)', 'var(--magenta)', 'var(--cyan)', 'var(--magenta)', 'var(--cyan)']

  return (
    <div
      id="page-transition-overlay"
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        display: 'none', alignItems: 'stretch',
        pointerEvents: 'none',
      }}
    >
      {colors.map((color, i) => (
        <div
          key={i}
          className="trans-bar"
          style={{
            flex: 1,
            background: color,
            opacity: 0.9,
            transform: 'scaleY(0)',
            transformOrigin: 'bottom',
          }}
        />
      ))}
    </div>
  )
}
