interface DividerProps {
  variant?: 'full' | 'thin'
  className?: string
}

export default function Divider({ variant = 'full', className = '' }: DividerProps) {
  const classes = variant === 'full' ? 'divider' : 'divider-thin'
  return <div className={`${classes} ${className}`} aria-hidden="true" />
}

