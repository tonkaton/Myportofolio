import { useState, useEffect } from 'react'

export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('down')
  const [prevY, setPrevY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const percent = total > 0 ? (y / total) * 100 : 0

      setDirection(y > prevY ? 'down' : 'up')
      setPrevY(y)
      setScrollY(y)
      setScrollPercent(percent)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevY])

  return { scrollY, scrollPercent, direction }
}
