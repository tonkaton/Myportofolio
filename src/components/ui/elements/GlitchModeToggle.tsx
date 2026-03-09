import { useEffect } from 'react'
import { useGlobalStore } from '../../../store/useGlobalStore'

export const GlitchModeToggle = () => {
  const isGlitchMode  = useGlobalStore((s) => s.isGlitchMode)
  const setGlitchMode = useGlobalStore((s) => s.setIsGlitchMode)

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
        background: isGlitchMode ? 'rgba(255,0,255,0.15)' : 'transparent',
        border: `1px solid ${isGlitchMode ? 'var(--magenta)' : 'rgba(0,255,255,0.35)'}`,
        color: isGlitchMode ? 'var(--magenta)' : 'var(--text-secondary)',
        fontFamily: 'var(--font-body)',
        fontSize: '0.58rem',
        letterSpacing: '0.15em',
        padding: '5px 10px',
        cursor: 'pointer',
        transition: 'all 0.25s',
        textShadow: isGlitchMode ? '0 0 10px var(--magenta)' : 'none',
        boxShadow: isGlitchMode ? '0 0 12px rgba(255,0,255,0.4), inset 0 0 6px rgba(255,0,255,0.1)' : 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <span style={{
        width: '6px', height: '6px', borderRadius: '50%',
        background: isGlitchMode ? 'var(--magenta)' : 'rgba(0,255,255,0.4)',
        boxShadow: isGlitchMode ? '0 0 6px var(--magenta)' : 'none',
        display: 'inline-block', flexShrink: 0,
        animation: isGlitchMode ? 'pulse-glow 0.8s ease-in-out infinite' : 'none',
      }} />
      {isGlitchMode ? 'GLITCH_ON' : 'GLITCH_OFF'}
    </button>
  )
}
