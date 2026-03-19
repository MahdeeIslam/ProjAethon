'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Volume2, VolumeX } from 'lucide-react'
import Container from '@/components/ui/Container'
import { HERO_TAGLINE, HERO_CTA, BRAND_WORDMARK } from '@/lib/brand'

import { HERO_PHOTO } from '@/data/placeholderPhotos'
import { YT } from '@/data/videoUrls'
import { isYouTubeUrl } from '@/lib/youtube'
import YouTubeEmbed from '@/components/YouTubeEmbed'

const HERO_VIDEO_SRC = YT.heroBackground
const HERO_VIDEO_FALLBACK = YT.heroLoop
const HERO_VIDEO_FALLBACK2 = YT.heroLoop
const HERO_POSTER = HERO_PHOTO

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const HERO_STATS = [
  { value: '40M+', label: 'Views Generated' },
  { value: '$450k+', label: 'Revenue Driven' },
  { value: '450+', label: 'Clips Produced' },
]

const MOTION_DELAYS = { eyebrow: 0, headline: 150, subtext: 300, buttons: 450, metrics: 600 }

export default function HeroShowreel() {
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [showPoster, setShowPoster] = useState(true)
  const [videoSrc, setVideoSrc] = useState(HERO_VIDEO_SRC)
  const [mounted, setMounted] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [parallaxY, setParallaxY] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

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

  const onVideoError = () => {
    if (videoSrc === HERO_VIDEO_SRC) setVideoSrc(HERO_VIDEO_FALLBACK)
    else if (videoSrc === HERO_VIDEO_FALLBACK) setVideoSrc(HERO_VIDEO_FALLBACK2)
  }

  const show = reduceMotion || mounted
  const useYouTube = isYouTubeUrl(videoSrc)

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70vh] max-h-[720px] w-full flex-col overflow-hidden bg-[var(--obsidian)]"
      aria-label="Hero showreel"
    >
      {/* Layer 1: Background video */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallaxY * 0.5}px)` }}
      >
        {useYouTube ? (
          <YouTubeEmbed
            url={videoSrc}
            title="Aethon hero background"
            autoplay
            muted={!audioEnabled}
            loop
            controls={false}
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            playsInline
            muted={!audioEnabled}
            preload="auto"
            poster={HERO_POSTER}
            onCanPlay={onCanPlay}
            onError={onVideoError}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: 'saturate(1.08) contrast(1.05) brightness(0.92)' }}
            aria-hidden
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        {showPoster && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2d2a28] to-[#1f1c1a]" aria-hidden />
        )}
      </div>

      {/* Layer 2: Dark gradient overlay (cinematic) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.85) 100%)',
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
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.4) 100%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-h-[70vh] max-h-[720px] flex-col justify-between">
        <div className="flex-1 flex flex-col justify-center pt-24 pb-6">
          <Container wide>
            <div className="max-w-[600px]">
              {/* Eyebrow */}
              <p
                className="kicker text-bone text-xs uppercase tracking-[0.25em] mb-4 md:text-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
                style={{
                  opacity: show ? 1 : 0,
                  transform: show ? 'translateY(0)' : 'translateY(20px)',
                  transition: reduceMotion ? 'none' : `opacity 0.6s ease-out ${MOTION_DELAYS.eyebrow}ms, transform 0.6s ease-out ${MOTION_DELAYS.eyebrow}ms`,
                }}
              >
                {HERO_TAGLINE}
              </p>

              {/* Headline — two lines */}
              <h1
                className="text-4xl font-bold uppercase leading-[0.95] tracking-tight text-bone md:text-5xl lg:text-6xl xl:text-7xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
                style={{
                  textShadow: '0 0 48px rgba(0,0,0,0.4)',
                  opacity: show ? 1 : 0,
                  transform: show ? 'translateY(0)' : 'translateY(20px)',
                  transition: reduceMotion ? 'none' : `opacity 0.6s ease-out ${MOTION_DELAYS.headline}ms, transform 0.6s ease-out ${MOTION_DELAYS.headline}ms`,
                }}
              >
                World-class
                <br />
                visual systems.
              </h1>

              {/* Subtext */}
              <p
                className="mt-5 text-base leading-relaxed text-bone md:text-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
                style={{
                  opacity: show ? 1 : 0,
                  transform: show ? 'translateY(0)' : 'translateY(20px)',
                  transition: reduceMotion ? 'none' : `opacity 0.6s ease-out ${MOTION_DELAYS.subtext}ms, transform 0.6s ease-out ${MOTION_DELAYS.subtext}ms`,
                }}
              >
                Strategy, production, and distribution in lockstep.
              </p>
              <p
                className="mt-2 text-base leading-relaxed text-bone/90 md:text-lg"
                style={{
                  opacity: show ? 1 : 0,
                  transform: show ? 'translateY(0)' : 'translateY(20px)',
                  transition: reduceMotion ? 'none' : `opacity 0.6s ease-out ${MOTION_DELAYS.subtext + 50}ms, transform 0.6s ease-out ${MOTION_DELAYS.subtext + 50}ms`,
                }}
              >
                We turn visual media into a compounding growth asset.
              </p>

              {/* CTAs */}
              <div
                className="mt-8 flex flex-col gap-3"
                style={{
                  opacity: show ? 1 : 0,
                  transform: show ? 'translateY(0)' : 'translateY(20px)',
                  transition: reduceMotion ? 'none' : `opacity 0.6s ease-out ${MOTION_DELAYS.buttons}ms, transform 0.6s ease-out ${MOTION_DELAYS.buttons}ms`,
                }}
              >
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center h-12 px-7 text-sm font-semibold uppercase tracking-[0.12em] border-2 border-bone bg-bone text-obsidian transition-all duration-300 hover:bg-bone hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(245,245,242,0.3)] focus:outline-none focus:ring-2 focus:ring-bone/40 focus:ring-offset-2 focus:ring-offset-obsidian w-fit"
                >
                  {HERO_CTA}
                </Link>
                <Link
                  href="/case-studies"
                  className="group/link text-sm font-medium tracking-wider text-bone hover:text-bone border-b border-transparent hover:border-bone/60 w-fit transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] inline-flex items-center gap-1"
                >
                  Read case studies
                  <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1">→</span>
                </Link>
              </div>

              {/* Proof metrics */}
              <div
                className="mt-10 flex flex-wrap items-center gap-6 border-t border-bone/15 pt-8"
                style={{
                  opacity: show ? 1 : 0,
                  transform: show ? 'translateY(0)' : 'translateY(20px)',
                  transition: reduceMotion ? 'none' : `opacity 0.6s ease-out ${MOTION_DELAYS.metrics}ms, transform 0.6s ease-out ${MOTION_DELAYS.metrics}ms`,
                }}
              >
                {HERO_STATS.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-6">
                    {i > 0 && <div className="h-10 w-px bg-bone/15" aria-hidden />}
                    <div>
                      <p className="text-2xl font-bold text-bone md:text-3xl">{stat.value}</p>
                      <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.14em] text-bone/60">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* Scroll indicator */}
        <div
          className="flex shrink-0 justify-center pb-2"
          style={{
            opacity: show ? 1 : 0,
            transition: reduceMotion ? 'none' : `opacity 0.6s ease-out ${MOTION_DELAYS.metrics + 100}ms`,
          }}
        >
          <a
            href="#work-in-motion"
            className="flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-widest text-bone/50 hover:text-bone/80 transition-colors motion-reduce:animate-none"
            aria-label="Scroll to content"
          >
            <span className="animate-bounce motion-reduce:animate-none">↓</span>
            <span>Scroll</span>
          </a>
        </div>

        {/* Brand rail */}
        <div
          className="flex h-16 shrink-0 items-center justify-between border-t border-bone/20 bg-[rgba(26,26,26,0.75)] backdrop-blur-[10px]"
          style={{ boxShadow: '0 -1px 0 rgba(212,175,55,0.08)' }}
        >
          <Container wide className="flex items-center justify-between w-full">
            <span className="text-xl md:text-2xl font-bold uppercase tracking-[0.35em] text-bone/55">
              {BRAND_WORDMARK}
            </span>
            <button
              type="button"
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="flex items-center gap-2 border border-bone/25 bg-[rgba(255,255,255,0.06)] px-4 py-2.5 text-xs uppercase tracking-wider text-bone/85 rounded-full transition hover:border-bone/40 hover:text-bone hover:bg-[rgba(255,255,255,0.08)] focus:outline-none focus:ring-1 focus:ring-bone/50"
              aria-label={audioEnabled ? 'Mute' : 'Enable Audio'}
            >
              {audioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span>{audioEnabled ? 'Audio on' : 'Enable Audio'}</span>
            </button>
          </Container>
        </div>
      </div>

      {/* 120px gradient transition into light section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none z-[3]"
        style={{
          background: 'linear-gradient(to bottom, var(--obsidian) 0%, #2d2b28 25%, #6b6964 60%, #ebe9e4 100%)',
        }}
        aria-hidden
      />
    </section>
  )
}
