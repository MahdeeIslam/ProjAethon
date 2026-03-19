'use client'

import Link from 'next/link'
import { PRIMARY_CTA } from '@/lib/brand'

interface CTAButtonProps {
  variant?: 'primary' | 'secondary'
  /** Compact for header: 40px height, premium pill */
  compact?: boolean
  className?: string
}

export default function CTAButton({ variant = 'primary', compact = false, className = '' }: CTAButtonProps) {
  const baseStyles = compact
    ? 'inline-flex items-center justify-center h-10 px-5 text-[12px] font-semibold tracking-[0.12em] uppercase transition-all duration-200 border border-[var(--line2)] focus:outline-none focus:ring-2 focus:ring-bone/40 focus:ring-offset-2 focus:ring-offset-obsidian hover:-translate-y-0.5 hover:shadow-[var(--shadow)]'
    : 'inline-flex items-center justify-center h-10 px-6 text-[13px] font-semibold tracking-[0.12em] uppercase transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-bone/40 focus:ring-offset-2 focus:ring-offset-obsidian'

  const primaryStyles = 'bg-bone text-[#111] hover:bg-bone/95'
  const secondaryStyles = 'bg-transparent text-bone border-bone/30 hover:border-bone/60 hover:bg-bone/5'

  return (
    <Link
      href="/contact"
      className={`${baseStyles} ${variant === 'primary' ? primaryStyles : secondaryStyles} ${className}`}
    >
      {PRIMARY_CTA}
    </Link>
  )
}
