'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BRAND_WORDMARK } from '@/lib/brand'

/** Minimal bar at very end of scroll — brand + single CTA only (no duplicate full nav). */
export default function BottomHeader() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 350
      setVisible(nearBottom)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed bottom-0 left-0 right-0 z-30 md:hidden border-t border-[var(--line)] bg-obsidian/95 backdrop-blur-md transition-transform duration-500 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-label="Bottom CTA"
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-3 md:px-10 lg:px-12">
        <Link href="/" className="text-sm font-bold uppercase tracking-[0.15em] text-bone/90 hover:text-bone">
          {BRAND_WORDMARK}
        </Link>
        <Link
          href="/contact"
          className="border border-bone/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-bone transition hover:border-bone hover:bg-bone hover:text-obsidian focus:outline-none focus:ring-2 focus:ring-bone/30"
        >
          Start a Project
        </Link>
      </div>
    </header>
  )
}
