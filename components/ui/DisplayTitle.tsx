import { ReactNode } from 'react'

interface DisplayTitleProps {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export default function DisplayTitle({ 
  children, 
  className = '', 
  as: Component = 'h1' 
}: DisplayTitleProps) {
  return <Component className={`display-title ${className}`}>{children}</Component>
}

