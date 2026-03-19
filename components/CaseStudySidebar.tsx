'use client'

import { useEffect, useState } from 'react'
import CTAButton from './CTAButton'
import Reveal from './motion/Reveal'

export default function CaseStudySidebar() {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isSticky) return null

  return (
    <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
      <Reveal>
        <div className="border border-bone/20 bg-obsidian/95 backdrop-blur-sm p-6 w-64">
          <p className="text-sm opacity-80 mb-4 leading-relaxed">
            Ready to see measurable results?
          </p>
          <CTAButton variant="primary" className="w-full text-center" />
        </div>
      </Reveal>
    </div>
  )
}

