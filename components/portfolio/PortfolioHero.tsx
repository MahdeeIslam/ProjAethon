'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const PROOF_STATS = [
  { value: '40M+', label: 'Views generated' },
  { value: '$450k+', label: 'Raised' },
  { value: '450+', label: 'Clips delivered' },
]

const MOTION_DELAYS = { eyebrow: 0, line1: 80, line2: 160, line3: 240, subtext: 340, ctas: 440, proof: 540 }

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
    reduceMotion ? 'none' : `opacity 0.55s ease-out ${delay}ms, transform 0.55s ease-out ${delay}ms`

  return (
    <section className="relative overflow-hidden border-b border-bone/10 bg-obsidian pt-24 pb-20 md:pt-28 md:pb-24">
      {/* Background layers: gradient + noise + vignette */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{ backgroundImage: NOISE_SVG }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 90% 70% at 30% 30%, transparent 30%, rgba(0,0,0,0.25) 100%)',
          }}
          aria-hidden
        />
      </div>

      <Container className="relative flex flex-col gap-12 md:flex-row md:items-end md:justify-between md:gap-20">
        <div className="max-w-2xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-bone/60"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? 'translateY(0)' : 'translateY(16px)',
              transition: transition(MOTION_DELAYS.eyebrow),
            }}
          >
            Portfolio
          </p>

          <h1 className="mb-6">
            <span
              className="block text-3xl font-bold leading-[1.1] tracking-tight text-bone md:text-4xl lg:text-5xl"
              style={{
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(16px)',
                transition: transition(MOTION_DELAYS.line1),
              }}
            >
              Three pillars.
            </span>
            <span
              className="block text-3xl font-bold leading-[1.1] tracking-tight text-bone md:text-4xl lg:text-5xl"
              style={{
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(16px)',
                transition: transition(MOTION_DELAYS.line2),
              }}
            >
              Premium production.
            </span>
            <span
              className="block text-3xl font-bold leading-[1.1] tracking-tight text-bone md:text-4xl lg:text-5xl"
              style={{
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(16px)',
                transition: transition(MOTION_DELAYS.line3),
              }}
            >
              Measurable results.
            </span>
          </h1>

          <p
            className="mb-8 max-w-lg text-base leading-relaxed text-bone/85 md:text-lg"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? 'translateY(0)' : 'translateY(16px)',
              transition: transition(MOTION_DELAYS.subtext),
            }}
          >
            Strategy, production, and distribution—delivered in lockstep.
          </p>

          <div
            className="flex flex-wrap items-center gap-5"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? 'translateY(0)' : 'translateY(16px)',
              transition: transition(MOTION_DELAYS.ctas),
            }}
          >
            <a
              href="#portfolio-grid"
              className="group/btn inline-flex items-center justify-center rounded-xl border-2 border-bone bg-bone px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-obsidian transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(245,245,242,0.22)] focus:outline-none focus:ring-2 focus:ring-bone/40 focus:ring-offset-2 focus:ring-offset-obsidian"
            >
              View work
            </a>
            <Link
              href="/contact"
              className="group/link inline-flex items-center gap-1 text-sm font-medium uppercase tracking-wider text-bone/80 transition-colors hover:text-bone"
            >
              Request a strategic consultation
              <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Proof strip */}
        <div
          className="flex flex-wrap items-end gap-10 border-l border-bone/15 pl-8 pt-2 md:pl-12"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(16px)',
            transition: transition(MOTION_DELAYS.proof),
          }}
        >
          {PROOF_STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold tracking-tight text-bone md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-bone/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
