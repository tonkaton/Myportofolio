import { useRef, useState } from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  disabled?: boolean
}

export const Button = ({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  disabled = false,
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  const baseStyles: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    padding: '12px 28px',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'none',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    textTransform: 'uppercase' as const,
    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: isHovered
        ? 'rgba(0, 255, 255, 0.15)'
        : 'transparent',
      border: '1px solid var(--cyan)',
      color: isHovered ? '#ffffff' : 'var(--cyan)',
      boxShadow: isHovered
        ? '0 0 20px var(--cyan-glow), inset 0 0 20px rgba(0,255,255,0.05)'
        : '0 0 10px var(--cyan-glow)',
    },
    secondary: {
      background: isHovered
        ? 'rgba(255, 0, 255, 0.15)'
        : 'transparent',
      border: '1px solid var(--magenta)',
      color: 'var(--magenta)',
      boxShadow: isHovered ? '0 0 20px var(--magenta-glow)' : 'none',
    },
    ghost: {
      background: 'transparent',
      border: '1px solid rgba(0, 255, 255, 0.3)',
      color: 'var(--cyan)',
      boxShadow: 'none',
    },
  }

  const style = { ...baseStyles, ...variantStyles[variant] }

  const Comp = href ? 'a' : 'button'

  return (
    <Comp
      // @ts-ignore
      ref={ref}
      href={href}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scan line on hover */}
      {isHovered && (
        <span
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,255,0.15) 50%, transparent 100%)',
            animation: 'scan-h 0.6s linear infinite',
            pointerEvents: 'none',
          }}
        />
      )}
      {children}
    </Comp>
  )
}
