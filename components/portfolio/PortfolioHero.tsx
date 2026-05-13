'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import { HERO_PHOTO } from '@/data/placeholderPhotos'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const MOTION_DELAYS = { title: 0, pillars: 140, subtext: 260, ctas: 380 }

export default function PortfolioHero() {
  const [mounted, setMounted] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduceMotion(prefersReduced)
    if (prefersReduced) setMounted(true)
    else {
      const t = requestAnimationFrame(() => setMounted(true))
      return () => cancelAnimationFrame(t)
    }
  }, [])

  const show = reduceMotion || mounted
  const transition = (delay: number) =>
    reduceMotion ? 'none' : `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`

  return (
    <section
      className="relative overflow-hidden border-b border-bone/10 bg-obsidian pt-32 pb-20 md:pt-40 md:pb-28"
      aria-label="Portfolio hero"
    >
      {/* Background image */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_PHOTO})` }}
        aria-hidden
      />

      {/* Dark gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,10,0.86) 0%, rgba(15,15,15,0.78) 40%, rgba(20,20,20,0.92) 100%)',
        }}
        aria-hidden
      />

      {/* Cinematic vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 35% 40%, transparent 35%, rgba(0,0,0,0.55) 100%)',
        }}
        aria-hidden
      />

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: NOISE_SVG }}
        aria-hidden
      />

      <Container className="relative">
        <div className="max-w-3xl">
          {/* PORTFOLIO */}
          <h1
            className="text-[44px] font-bold uppercase leading-[0.98] tracking-[-0.01em] text-bone md:text-[88px] lg:text-[104px] drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? 'translateY(0)' : 'translateY(20px)',
              transition: transition(MOTION_DELAYS.title),
              textShadow: '0 0 60px rgba(0,0,0,0.4)',
            }}
          >
            Portfolio
          </h1>

          {/* Film. Campaigns. Content. */}
          <p
            className="mt-4 text-xl font-semibold uppercase tracking-[0.04em] text-bone md:mt-5 md:text-3xl lg:text-[2rem] drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? 'translateY(0)' : 'translateY(20px)',
              transition: transition(MOTION_DELAYS.pillars),
            }}
          >
            Film.{' '}
            <span className="text-bone/85">Campaigns.</span>{' '}
            <span className="text-bone/70">Content.</span>
          </p>

          {/* Sub-text */}
          <p
            className="mt-7 max-w-xl text-lg leading-relaxed text-bone/85 md:text-xl"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? 'translateY(0)' : 'translateY(20px)',
              transition: transition(MOTION_DELAYS.subtext),
            }}
          >
            See what we&apos;ve built.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-wrap items-center gap-5 md:mt-12"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? 'translateY(0)' : 'translateY(20px)',
              transition: transition(MOTION_DELAYS.ctas),
            }}
          >
            <a
              href="#portfolio-grid"
              className="group/btn inline-flex items-center justify-center rounded-full border border-bone/70 bg-white/[0.06] px-7 h-12 text-sm font-semibold uppercase tracking-[0.14em] text-bone backdrop-blur-md transition-all duration-300 hover:bg-white/[0.14] hover:border-bone hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(245,245,242,0.22)] focus:outline-none focus:ring-2 focus:ring-bone/50 focus:ring-offset-2 focus:ring-offset-obsidian"
            >
              View work
            </a>
            <Link
              href="/contact"
              className="group/link inline-flex items-center gap-1 text-sm font-medium uppercase tracking-wider text-bone/85 transition-colors hover:text-bone border-b border-transparent hover:border-bone/50"
            >
              Request a strategic consultation
              <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
