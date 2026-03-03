import { useRef, useEffect, type CSSProperties } from 'react'
import { triggerGlitch } from '../animations/glitchText'
import { fadeIn } from '../animations/fadeIn'

interface AnimatedHeadingProps {
  children: string
  level?: 1 | 2 | 3
  className?: string
  glitch?: boolean
  animate?: boolean
}

export const AnimatedHeading = ({
  children,
  level = 2,
  className = '',
  glitch = true,
  animate = true,
}: AnimatedHeadingProps) => {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (animate && ref.current) {
      fadeIn(ref.current, { delay: 0.1 })
    }

    if (glitch && ref.current) {
      const el = ref.current
      const timer = setTimeout(() => triggerGlitch(el, 600), 500)
      const interval = setInterval(() => triggerGlitch(el, 400), 6000)
      return () => {
        clearTimeout(timer)
        clearInterval(interval)
      }
    }
  }, [animate, glitch])

  const sharedProps = {
    ref,
    'data-text': children,
    className: `${glitch ? 'glitch' : ''} ${className}`.trim(),
    style: {
      fontFamily: 'var(--font-display)',
      opacity: animate ? 0 : 1,
    } as CSSProperties,
  }

  if (level === 1) return <h1 {...sharedProps}>{children}</h1>
  if (level === 3) return <h3 {...sharedProps}>{children}</h3>
  return <h2 {...sharedProps}>{children}</h2>
}
