import type { ReactNode, CSSProperties } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  narrow?: boolean
}

export const Container = ({ children, className = '', style, narrow = false }: ContainerProps) => {
  return (
    <div
      className={`site-container ${className}`}
      style={{
        maxWidth: narrow ? '800px' : '1200px',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 60px)',
        width: '100%',
        position: 'relative',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
