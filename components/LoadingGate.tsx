'use client'

import { ReactNode, useEffect, useState } from 'react'
import { BRAND_WORDMARK } from '@/lib/brand'

interface LoadingGateProps {
  children: ReactNode
  /** Duration in ms before content is revealed after animation */
  minDisplayMs?: number
}

export default function LoadingGate({ children, minDisplayMs = 1200 }: LoadingGateProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    const t = setTimeout(() => setVisible(true), minDisplayMs)
    return () => clearTimeout(t)
  }, [minDisplayMs])

  if (!mounted) {
    return (
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-[#F5F5F2]"
        aria-live="polite"
        aria-label="Loading"
      >
        <div className="loading-wordmark text-[#1A1A1A] text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase">
          {BRAND_WORDMARK}
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-[#F5F5F2] pointer-events-none transition-opacity duration-700"
        style={{ opacity: visible ? 0 : 1 }}
        aria-hidden
      >
        <div className="text-[#1A1A1A] text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase">
          {BRAND_WORDMARK}
        </div>
      </div>
      <div
        className="transition-opacity duration-700"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {children}
      </div>
    </>
  )
}
