import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  /** dark: obsidian bg, bone text. light: warm bone-tint bg, dark text. blend: gradient transition */
  tone?: 'dark' | 'light' | 'blend'
  className?: string
  /** Optional aria-label for accessibility */
  ariaLabel?: string
}

export default function Section({
  children,
  tone = 'dark',
  className = '',
  ariaLabel,
}: SectionProps) {
  const baseClasses = 'section-padding w-full'

  const toneClasses = {
    dark: 'bg-[var(--obsidian)] text-bone border-t border-[var(--line)]',
    light: 'bg-[var(--light-bg)] text-[var(--light-text)] border-t border-[var(--light-border)]',
    blend: 'bg-gradient-to-b from-[var(--obsidian)] to-[var(--light-bg)] text-bone border-t border-[var(--line)]',
  }

  return (
    <section
      className={`${baseClasses} ${toneClasses[tone]} ${className}`.trim()}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  )
}
