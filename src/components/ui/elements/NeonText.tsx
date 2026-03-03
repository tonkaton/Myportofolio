import { useRef, useEffect, type ElementType } from 'react'
import type React from 'react'
import { startGlitchLoop } from '../animations/glitchText'

interface NeonTextProps {
  children: string
  color?: 'cyan' | 'magenta' | 'green' | 'yellow'
  glitch?: boolean
  glitchInterval?: number
  className?: string
  as?: ElementType
}

export const NeonText = ({
  children,
  color = 'cyan',
  glitch = false,
  glitchInterval = 5000,
  className = '',
  as: _Tag = 'span',
}: NeonTextProps) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (glitch && ref.current) {
      const stop = startGlitchLoop(ref.current, glitchInterval)
      return stop
    }
  }, [glitch, glitchInterval])

  const colorMap: Record<string, string> = {
    cyan: 'neon-cyan',
    magenta: 'neon-magenta',
    green: 'neon-green',
    yellow: 'neon-yellow',
  }

  const combinedClass = `${colorMap[color]} ${glitch ? 'glitch' : ''} ${className}`.trim()

  // Render as span always — use className to style
  // ElementType dynamic tags cause TS inference issues, span covers all use cases
  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      data-text={children}
      className={combinedClass}
    >
      {children}
    </span>
  )
}

