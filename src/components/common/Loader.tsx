import { useEffect, useState } from 'react'
import { useGlobalStore } from '../../store/useGlobalStore'

export const Loader = () => {
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState('INITIALIZING_SYSTEM')
  const setIsLoading = useGlobalStore((s) => s.setIsLoading)

  const loadingTexts = [
    'INITIALIZING_SYSTEM',
    'LOADING_SHADERS',
    'BUILDING_3D_SCENE',
    'CALIBRATING_CAMERA',
    'STARTING_PORTFOLIO',
  ]

  useEffect(() => {
    let current = 0

    const interval = setInterval(() => {
      current += Math.random() * 15 + 5
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setTimeout(() => setIsLoading(false), 600)
      }

      setProgress(Math.min(current, 100))
      setText(loadingTexts[Math.floor((current / 100) * loadingTexts.length)])
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '32px',
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '3rem',
        fontWeight: 900,
        letterSpacing: '0.3em',
        color: 'var(--cyan)',
        textShadow: '0 0 40px var(--cyan), 0 0 80px rgba(0,255,255,0.3)',
        animation: 'pulse-glow 2s ease-in-out infinite',
      }}>
        K_
      </div>

      {/* Progress bar */}
      <div style={{
        width: '300px',
        height: '2px',
        background: 'rgba(0, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--cyan), var(--magenta))',
          boxShadow: '0 0 10px var(--cyan)',
          transition: 'width 0.2s ease',
        }} />
      </div>

      {/* Loading text */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.6rem',
        letterSpacing: '0.3em',
        color: 'var(--cyan)',
        opacity: 0.6,
      }}>
        {text} [{Math.floor(progress)}%]
      </div>

      {/* Decorative lines */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '40px',
        right: '40px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
        opacity: 0.3,
      }} />
    </div>
  )
}
