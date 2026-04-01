'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 400)
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-4 z-[60] flex h-9 items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(26,26,26,0.88)] px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-bone/70 shadow-lg backdrop-blur-md transition-all duration-200 hover:border-[var(--line2)] hover:text-bone focus:outline-none focus:ring-2 focus:ring-bone/20 focus:ring-offset-2 focus:ring-offset-obsidian md:bottom-8 md:right-6"
      aria-label="Back to top"
    >
      <ArrowUp size={12} />
      <span>Top</span>
    </button>
  )
}
