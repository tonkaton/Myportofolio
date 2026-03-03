import { useState, useEffect, useRef } from 'react'

export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('down')
  const prevY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const y = window.scrollY
        const total = document.documentElement.scrollHeight - window.innerHeight
        const percent = total > 0 ? (y / total) * 100 : 0

        setDirection(y > prevY.current ? 'down' : 'up')
        prevY.current = y
        setScrollY(y)
        setScrollPercent(percent)
        ticking.current = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollY, scrollPercent, direction }
}
