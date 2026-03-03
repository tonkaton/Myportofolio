import { useState, useEffect } from 'react'

export const RealtimeClock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')
  const hh = pad(time.getHours())
  const mm = pad(time.getMinutes())
  const ss = pad(time.getSeconds())
  const dd = String(time.getDate()).padStart(2, '0')
  const mo = String(time.getMonth() + 1).padStart(2, '0')
  const yy = time.getFullYear()

  return (
    <div style={{
      fontFamily: 'var(--font-body)',
      fontSize: '0.6rem',
      letterSpacing: '0.12em',
      color: 'var(--text-secondary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      lineHeight: 1.4,
      userSelect: 'none',
    }}>
      <span style={{ color: 'var(--cyan)', textShadow: '0 0 6px var(--cyan)' }}>
        {hh}:{mm}:{ss}
      </span>
      <span style={{ opacity: 0.5, fontSize: '0.55rem' }}>
        {dd}/{mo}/{yy}
      </span>
    </div>
  )
}
