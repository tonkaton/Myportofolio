import { useEffect, useState, useRef } from 'react'

// Simulated visitor counter pakai localStorage + random seed
// Untuk production: ganti fetch ke API endpoint (Supabase/PlanetScale/Upstash)
const BASE_COUNT = 1247  // base visitors
const KEY        = 'katon_visit_count'
const SESSION    = 'katon_visited'

const getCount = (): number => {
  try {
    const stored = localStorage.getItem(KEY)
    if (stored) return parseInt(stored, 10)
    // First time — generate realistic count
    const count = BASE_COUNT + Math.floor(Math.random() * 300)
    localStorage.setItem(KEY, String(count))
    return count
  } catch { return BASE_COUNT }
}

const bumpCount = (): number => {
  try {
    // Hanya bump sekali per session
    if (sessionStorage.getItem(SESSION)) return getCount()
    sessionStorage.setItem(SESSION, '1')
    const next = getCount() + 1
    localStorage.setItem(KEY, String(next))
    return next
  } catch { return getCount() }
}

// Animasi number roll up
const useCountUp = (target: number, duration = 1200) => {
  const [display, setDisplay] = useState(0)
  const frame = useRef<number>(0)

  useEffect(() => {
    if (!target) return
    const begin = performance.now()
    const tick  = (now: number) => {
      const elapsed  = now - begin
      const progress = Math.min(elapsed / duration, 1)
      // Ease out expo
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplay(Math.floor(eased * target))
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [target, duration])

  return display
}

export const VisitorCounter = () => {
  const [count, setCount] = useState(0)
  const [online]          = useState(() => 3 + Math.floor(Math.random() * 8))
  const displayed         = useCountUp(count, 1400)

  useEffect(() => {
    // Bump + show after short delay for dramatic effect
    const t = setTimeout(() => setCount(bumpCount()), 600)
    return () => clearTimeout(t)
  }, [])

  const formatted = displayed.toLocaleString('en-US').padStart(5, '0')

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    }}>
      {/* Total visitors */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.1rem',
          letterSpacing: '0.12em',
          color: 'var(--cyan)',
          textShadow: '0 0 12px rgba(0,255,255,0.6)',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {formatted}
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.48rem',
          letterSpacing: '0.2em',
          color: 'var(--text-dim)',
        }}>
          TOTAL_VISITS
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '32px', background: 'var(--border)' }} />

      {/* Online now */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: 'var(--green)',
            boxShadow: '0 0 8px var(--green)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            letterSpacing: '0.12em',
            color: 'var(--green)',
            textShadow: '0 0 10px rgba(0,255,65,0.5)',
          }}>
            {online}
          </span>
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.48rem',
          letterSpacing: '0.2em',
          color: 'var(--text-dim)',
        }}>
          ONLINE_NOW
        </div>
      </div>
    </div>
  )
}
