import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  narrow?: boolean
  /** Wider max-width for homepage; uses max-w-7xl (1280px) instead of 1120px */
  wide?: boolean
}

const MAX_WIDTH = 'max-w-[1120px]'
const WIDE_MAX = 'max-w-[1440px]'
const GUTTER = 'px-6 md:px-10'

export default function Container({ children, className = '', narrow = false, wide = false }: ContainerProps) {
  const maxWidth = wide ? WIDE_MAX : MAX_WIDTH
  const baseClasses = `mx-auto w-full ${maxWidth} ${GUTTER}`
  return <div className={`${baseClasses} ${className}`.trim()}>{children}</div>
}

