import { ReactNode } from 'react'

interface KickerProps {
  children: ReactNode
  className?: string
}

export default function Kicker({ children, className = '' }: KickerProps) {
  return <div className={`kicker ${className}`}>{children}</div>
}

