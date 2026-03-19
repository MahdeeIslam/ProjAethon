'use client'

import { useEffect, useState } from 'react'
import CTAButton from './CTAButton'

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling past 300px (frictionless navigation)
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    // Show immediately on mobile for better conversion
    setIsVisible(true)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Desktop: Sticky in header (handled by Header component) */}
      
      {/* Mobile: Bottom sticky bar */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-obsidian border-t border-bone/10 p-4 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="container mx-auto">
          <CTAButton className="w-full text-center" />
        </div>
      </div>
    </>
  )
}

