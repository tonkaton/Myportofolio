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
      className={className}
      style={{
        maxWidth: narrow ? '800px' : '1200px',
        margin: '0 auto',
        padding: '0 40px',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
