import { useEffect } from 'react'
import { useGlobalStore } from '../../../store/useGlobalStore'

export const GlitchModeToggle = () => {
  const isGlitchMode  = useGlobalStore((s) => s.isGlitchMode)
  const setGlitchMode = useGlobalStore((s) => s.setIsGlitchMode)

  // Apply glitch-mode class to <html> whenever state changes
  useEffect(() => {
    if (isGlitchMode) {
      document.documentElement.classList.add('glitch-mode')
    } else {
      document.documentElement.classList.remove('glitch-mode')
    }
  }, [isGlitchMode])

  return (
    <button
      onClick={() => setGlitchMode(!isGlitchMode)}
      title="Toggle Glitch Mode"
      style={{
        background: 'none',
        border: `1px solid ${isGlitchMode ? 'var(--magenta)' : 'var(--border)'}`,
        color: isGlitchMode ? 'var(--magenta)' : 'var(--text-secondary)',
        fontFamily: 'var(--font-body)',
        fontSize: '0.55rem',
        letterSpacing: '0.15em',
        padding: '4px 8px',
        cursor: 'none',
        transition: 'all 0.3s',
        textShadow: isGlitchMode ? '0 0 8px var(--magenta)' : 'none',
        boxShadow: isGlitchMode ? '0 0 10px rgba(255,0,255,0.3)' : 'none',
      }}
    >
      {isGlitchMode ? 'GLITCH_ON' : 'GLITCH_OFF'}
    </button>
  )
}
