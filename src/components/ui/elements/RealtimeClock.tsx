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
  const days = ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const day = days[time.getDay()]
  const dd = String(time.getDate()).padStart(2, '0')
  const mo = String(time.getMonth() + 1).padStart(2, '0')

  return (
    <div style={{
      fontFamily: 'var(--font-body)',
      letterSpacing: '0.1em',
      color: 'var(--text-secondary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '2px',
      userSelect: 'none',
    }}>
      {/* Time — bigger, prominent */}
      <span style={{
        fontSize: '0.85rem',
        color: 'var(--cyan)',
        textShadow: '0 0 10px rgba(0,255,255,0.7)',
        lineHeight: 1,
        fontWeight: 600,
        letterSpacing: '0.15em',
      }}>
        {hh}<span style={{ opacity: 0.5, animation: 'blink 1s step-end infinite' }}>:</span>{mm}<span style={{ opacity: 0.5, animation: 'blink 1s step-end infinite' }}>:</span>{ss}
      </span>
      {/* Date — smaller */}
      <span style={{
        fontSize: '0.6rem',
        opacity: 0.45,
        letterSpacing: '0.12em',
        lineHeight: 1,
      }}>
        {day} {dd}/{mo}
      </span>
    </div>
  )
}
