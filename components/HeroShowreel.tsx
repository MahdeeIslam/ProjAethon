'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Volume2, VolumeX } from 'lucide-react'
import Container from '@/components/ui/Container'
import { HERO_TAGLINE, HERO_CTA } from '@/lib/brand'

import { HERO_PHOTO } from '@/data/placeholderPhotos'
import { YT } from '@/data/videoUrls'

const HERO_POSTER = HERO_PHOTO

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const MOTION_DELAYS = { eyebrow: 0, headline: 150, subtext: 300, buttons: 450 }

export default function HeroShowreel() {
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [showPoster, setShowPoster] = useState(true)
  const [videoFailed, setVideoFailed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [parallaxY, setParallaxY] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const videoSrc = YT.heroBackground

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = !audioEnabled
  }, [audioEnabled])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduceMotion(prefersReduced)
    if (prefersReduced) setMounted(true)
    else {
      const t = requestAnimationFrame(() => setMounted(true))
      return () => cancelAnimationFrame(t)
    }
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const height = el.offsetHeight
      if (rect.bottom < 0) setParallaxY(20)
      else if (rect.top < height) setParallaxY((1 - rect.top / height) * 20)
      else setParallaxY(0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduceMotion])

  const onCanPlay = () => setShowPoster(false)
  const onVideoError = () => setVideoFailed(true)

  const show = reduceMotion || mounted

  return (
    <section
      ref={sectionRef}
      className="group/hero relative flex min-h-screen w-full flex-col overflow-hidden bg-[var(--obsidian)]"
      aria-label="Hero showreel"
    >
      {/* Layer 1: Background video — full-bleed across the entire viewport */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallaxY * 0.5}px)` }}
      >
        {!videoFailed && (
          <video
            ref={videoRef}
            key={videoSrc}
            src={videoSrc}
            autoPlay
            loop
            playsInline
            muted={!audioEnabled}
            preload="auto"
            poster={HERO_POSTER}
            onCanPlay={onCanPlay}
            onError={onVideoError}
            className="absolute inset-0 h-full w-full object-cover opacity-[0.92] transition-transform duration-700 ease-out motion-reduce:transition-none group-hover/hero:scale-[1.02]"
            style={{ filter: 'saturate(1.06) contrast(1.04) brightness(0.94)' }}
            aria-hidden
          />
        )}
        {(showPoster || videoFailed) && (
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2d2a28] to-[#1f1c1a]"
            aria-hidden
            style={
              videoFailed
                ? {
                    backgroundImage: `url(${HERO_POSTER})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : undefined
            }
          />
        )}
      </div>

      {/* Layer 2: Dark gradient overlay (cinematic) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.82) 100%)',
        }}
        aria-hidden
      />

      {/* Layer 3: Noise texture ~4% */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: NOISE_SVG }}
        aria-hidden
      />

      {/* Layer 4: Light vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.4) 100%)',
        }}
        aria-hidden
      />

      {/* Floating audio toggle (subtle, top-right) */}
      <button
        type="button"
        onClick={() => setAudioEnabled(!audioEnabled)}
        className="absolute right-4 top-24 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone/25 bg-black/30 text-bone/85 backdrop-blur-md transition hover:border-bone/50 hover:bg-black/45 hover:text-bone focus:outline-none focus:ring-1 focus:ring-bone/50 md:right-8"
        aria-label={audioEnabled ? 'Mute background video' : 'Enable audio for background video'}
      >
        {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>

      <div className="relative z-10 flex min-h-screen flex-col justify-center pb-[28vh]">
        <Container wide>
          <div className="max-w-[860px] py-20 md:py-24">
            {/* Eyebrow */}
            <p
              className="kicker text-bone text-xs uppercase tracking-[0.22em] mb-5 md:text-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] text-left"
              style={{
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(20px)',
                transition: reduceMotion
                  ? 'none'
                  : `opacity 0.6s ease-out ${MOTION_DELAYS.eyebrow}ms, transform 0.6s ease-out ${MOTION_DELAYS.eyebrow}ms`,
              }}
            >
              {HERO_TAGLINE}
            </p>

            {/* Headline — client-approved positioning */}
            <h1
              className="font-bold uppercase leading-[0.96] tracking-[-0.02em] text-bone drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
              style={{
                fontSize: 'clamp(2rem, 5.6vw, 5.5rem)',
                textShadow: '0 0 56px rgba(0,0,0,0.45)',
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(20px)',
                transition: reduceMotion
                  ? 'none'
                  : `opacity 0.7s ease-out ${MOTION_DELAYS.headline}ms, transform 0.7s ease-out ${MOTION_DELAYS.headline}ms`,
              }}
            >
              Built for organisations
              <br />
              that take quality seriously.
            </h1>

            {/* Subheading */}
            <p
              className="mt-6 max-w-[640px] text-base leading-relaxed text-bone/90 md:mt-7 md:text-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
              style={{
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(20px)',
                transition: reduceMotion
                  ? 'none'
                  : `opacity 0.6s ease-out ${MOTION_DELAYS.subtext}ms, transform 0.6s ease-out ${MOTION_DELAYS.subtext}ms`,
              }}
            >
              Full-service production, design, websites, and paid campaigns, run by people who understand your world.
            </p>

            {/* CTAs */}
            <div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 sm:mt-12"
              style={{
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(20px)',
                transition: reduceMotion
                  ? 'none'
                  : `opacity 0.6s ease-out ${MOTION_DELAYS.buttons}ms, transform 0.6s ease-out ${MOTION_DELAYS.buttons}ms`,
              }}
            >
              <Link
                href="/portfolio"
                className="inline-flex w-fit items-center justify-center h-12 px-7 text-sm font-semibold uppercase tracking-[0.14em] border border-bone/70 bg-white/[0.06] text-bone backdrop-blur-md rounded-full transition-all duration-300 hover:bg-white/[0.14] hover:border-bone hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(245,245,242,0.25)] focus:outline-none focus:ring-2 focus:ring-bone/50 focus:ring-offset-2 focus:ring-offset-obsidian"
              >
                {HERO_CTA}
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom gradient — keeps the hero's bottom edge legible without
          tinting to bone (next section is dark, not light, since we
          unified the page tone in the Metropolis-pin layout). */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[100px] pointer-events-none z-[3] md:h-[120px]"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(15,15,15,0.5) 50%, rgba(10,10,10,0.92) 100%)',
        }}
        aria-hidden
      />

      {/* Full-bleed AETHON wordmark — anchored to the very bottom of the
          hero, the way Metropolis sits their logo across the bottom edge.
          Opacity dialed back so it acts as an architectural element rather
          than a competing display headline (the showreel video itself
          already contains AETHON brand frames). */}
      <div
        className="pointer-events-none absolute bottom-2 left-0 right-0 z-[4] flex justify-between px-6 md:bottom-3 md:px-10 lg:px-12"
        aria-hidden
        style={{
          opacity: show ? 0.55 : 0,
          transform: show ? 'translateY(0)' : 'translateY(12px)',
          transition: reduceMotion
            ? 'none'
            : `opacity 1s ease-out 600ms, transform 1s ease-out 600ms`,
        }}
      >
        {Array.from('AETHON').map((char, i) => (
          <span
            key={i}
            className="text-bone font-bold leading-[0.85] uppercase select-none drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]"
            style={{
              fontSize: 'clamp(2.75rem, 14vw, 13rem)',
              letterSpacing: '-0.04em',
              fontFamily:
                "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </section>
  )
}
