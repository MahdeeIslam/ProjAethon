'use client'

import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, ArrowDown } from 'lucide-react'
import Logo from '@/components/Logo'
import CTAButton from '@/components/CTAButton'
import Link from 'next/link'
import { BRAND_NAME } from '@/lib/brand'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'

export default function HeroClarityTrio() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [showPoster, setShowPoster] = useState(true)
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isAudioEnabled
    }
  }, [isAudioEnabled])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicatorVisible(false)
      } else {
        setScrollIndicatorVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleVideoLoad = () => {
    setShowPoster(false)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked, but video should still load
      })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed silent loop video - museum framing */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          muted={!isAudioEnabled}
          onLoadedData={handleVideoLoad}
          onCanPlay={() => setShowPoster(false)}
          preload="auto"
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: 0.65,
            objectFit: 'cover',
            objectPosition: 'center',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          } as React.CSSProperties}
          poster="/placeholders/posters/hero-poster.jpg"
        >
          <source src="/placeholders/hero-loop.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Sophisticated gradient overlay for depth and text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/85 via-obsidian/50 to-obsidian/90 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-obsidian/40 pointer-events-none" />
        
        {/* Subtle vignette effect */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-obsidian/20 pointer-events-none" 
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(26, 26, 26, 0.3) 100%)'
          }}
        />
      </div>

      {/* Fallback poster */}
      {showPoster && (
        <div className="absolute inset-0 z-10 bg-obsidian/95 flex items-center justify-center">
          <div className="text-center opacity-40">
            <p className="text-xs tracking-wider uppercase mb-1">Hero Video Placeholder</p>
            <p className="text-xs opacity-60">Replace /public/placeholders/hero-loop.mp4</p>
          </div>
        </div>
      )}

      {/* Clarity Trio Content - Enhanced with animations */}
      <div className="relative z-20 container mx-auto px-6 md:px-8 lg:px-12 py-20 md:py-32">
        <div className="max-w-6xl">
          {/* Logo + Brand - Subtle reveal */}
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4 mb-12 md:mb-16 opacity-95">
              <Logo className="h-10 md:h-14 w-auto" />
              <span className="font-serif text-xl md:text-3xl font-semibold tracking-tight">{BRAND_NAME}</span>
            </div>
          </Reveal>

          {/* H1: Outcome + Audience - Dramatic typography */}
          <Reveal delay={0.2}>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 md:mb-10 tracking-tight leading-[1.1] max-w-5xl">
              Premium creative agency for institutions seeking measurable digital excellence.
            </h1>
          </Reveal>

          {/* Subline - Refined spacing */}
          <Reveal delay={0.3}>
            <p className="text-lg md:text-2xl lg:text-3xl opacity-95 mb-10 md:mb-12 leading-relaxed font-normal max-w-4xl">
              Tier-1 cinematography with a strict vocal-only/nasheed audio standard.
            </p>
          </Reveal>

          {/* 3 short bullets - Enhanced visual hierarchy */}
          <RevealGroup stagger={0.08} delay={0.4} className="space-y-4 mb-12 md:mb-16">
            <div className="flex items-center gap-4 text-base md:text-xl lg:text-2xl opacity-95 group">
              <span className="text-accent text-2xl md:text-3xl opacity-80 group-hover:opacity-100 transition-opacity">→</span>
              <span className="font-medium">Strategy → Production → Distribution</span>
            </div>
            <div className="flex items-center gap-4 text-base md:text-xl lg:text-2xl opacity-95 group">
              <span className="text-accent text-2xl md:text-3xl opacity-80 group-hover:opacity-100 transition-opacity">→</span>
              <span className="font-medium">Built for institutional trust</span>
            </div>
            <div className="flex items-center gap-4 text-base md:text-xl lg:text-2xl opacity-95 group">
              <span className="text-accent text-2xl md:text-3xl opacity-80 group-hover:opacity-100 transition-opacity">→</span>
              <span className="font-medium">ROI-first creative systems</span>
            </div>
          </RevealGroup>

          {/* Primary CTA + Secondary Link - Enhanced spacing */}
          <Reveal delay={0.5}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <CTAButton variant="primary" />
              <Link
                href="/case-studies"
                className="text-base md:text-lg opacity-75 hover:opacity-100 transition-all duration-300 border-b border-bone/30 hover:border-bone/80 pb-1 font-medium"
              >
                See case studies →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Optional audio toggle - Enhanced positioning */}
      <Reveal delay={0.6}>
        <button
          onClick={() => setIsAudioEnabled(!isAudioEnabled)}
          className="absolute bottom-12 right-8 md:bottom-16 md:right-12 z-30 p-4 border border-bone/20 hover:border-bone/50 transition-all duration-300 bg-obsidian/80 backdrop-blur-md hover:bg-obsidian/90 group shadow-lg"
          aria-label={isAudioEnabled ? 'Mute audio' : 'Enable audio (Vocal-Only/Nasheed)'}
        >
          {isAudioEnabled ? (
            <Volume2 size={20} className="opacity-80 group-hover:opacity-100 transition-opacity" />
          ) : (
            <VolumeX size={20} className="opacity-60 group-hover:opacity-90 transition-opacity" />
          )}
        </button>
      </Reveal>

      {/* Scroll indicator - Elegant animation */}
      {scrollIndicatorVisible && (
        <Reveal delay={0.8}>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-500">
            <span className="text-xs uppercase tracking-wider font-medium">Scroll</span>
            <ArrowDown size={20} className="animate-bounce" />
          </div>
        </Reveal>
      )}
    </section>
  )
}

