'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { caseStudies } from '@/data/caseStudies'
import { getMetrics, getPrimaryMetric, getSecondaryMetric } from '@/data/caseStudies'
import { getReelForCaseStudy } from '@/lib/reels'
import { shuffleArray } from '@/lib/shuffle'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'
import Container from '@/components/ui/Container'

const HERO_CASE_STUDY_ID = '1'
const FALLBACK_HORIZONTAL = '/placeholders/reels/Horizontal/Copy of Elders promo uncaptioned.mp4'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

function encodePath(p: string): string {
  return p.split('/').map((s) => encodeURIComponent(s)).join('/')
}

export default function FeaturedCaseStudiesModule() {
  const [horizontalPaths, setHorizontalPaths] = useState<string[]>([])
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    fetch('/api/reels/horizontal')
      .then((res) => res.json())
      .then((data: { paths: string[] }) => {
        const paths = Array.isArray(data.paths) ? data.paths : []
        setHorizontalPaths(paths.length > 0 ? paths : [FALLBACK_HORIZONTAL])
      })
      .catch(() => setHorizontalPaths([FALLBACK_HORIZONTAL]))
  }, [])

  const { hero, stackCards, miniCards } = useMemo(() => {
    const all = [...caseStudies]
    const hero = all.find((c) => c.id === HERO_CASE_STUDY_ID) ?? all[0]
    const rest = all.filter((c) => c.id !== hero.id)
    const stackCards = rest.slice(0, 2)
    const miniCards = rest.slice(2, 5)
    return { hero, stackCards, miniCards }
  }, [])

  const heroReel = useMemo(
    () => getReelForCaseStudy(hero, horizontalPaths) ?? FALLBACK_HORIZONTAL,
    [hero, horizontalPaths]
  )

  const stackReels = useMemo(() => {
    const shuffled = shuffleArray([...horizontalPaths])
    return [shuffled[0] ?? FALLBACK_HORIZONTAL, shuffled[1] ?? shuffled[0] ?? FALLBACK_HORIZONTAL]
  }, [horizontalPaths])

  const heroMetrics = getMetrics(hero).slice(0, 3)

  return (
    <section
      className="bg-obsidian border-t border-[rgba(245,245,242,0.12)] pt-5 pb-0 md:pt-6"
      aria-label="Featured case studies"
    >
      <Container wide>
        {/* Header row */}
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/55">
                Proof
              </p>
              <h2 className="mt-2 text-3xl font-bold uppercase tracking-tight text-bone md:text-4xl">
                Featured case studies
              </h2>
              <p className="mt-2 text-base text-bone/75 max-w-lg">
                Measured outcomes across distribution, growth, and revenue.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/case-studies"
                className="relative inline-block text-sm font-medium uppercase tracking-wider text-bone/80 transition-colors hover:text-bone after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-bone/50 after:transition-[width] after:duration-200 hover:after:w-full"
              >
                View all case studies →
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center border border-[rgba(245,245,242,0.35)] px-6 text-sm font-semibold uppercase tracking-[0.12em] text-bone transition-colors hover:border-bone/50 hover:bg-[rgba(245,245,242,0.06)] focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/30 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
              >
                Request a Strategic Consultation
              </Link>
            </div>
          </div>
        </Reveal>
        <div className="mt-5 h-px w-full bg-[rgba(245,245,242,0.12)]" />

        {/* Hero + stack grid */}
        <div className="mt-5 grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12 lg:gap-5">
          {/* Hero (7 cols) */}
          <Reveal className="lg:col-span-7">
            <Link
              href={`/case-studies/${hero.slug}`}
              className="group/card block relative overflow-hidden rounded-[20px] border border-[rgba(245,245,242,0.12)] bg-[rgba(255,255,255,0.03)] shadow-none transition-[border-color,transform,box-shadow] duration-300 hover:border-[rgba(245,245,242,0.22)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/20 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none"
            >
              <span className="absolute right-6 top-6 z-10 text-xs font-medium text-bone/65">
                01 / 06
              </span>

              {/* Video layer */}
              <div className="absolute inset-0">
                {!reduceMotion && (
                  <video
                    src={encodePath(heroReel)}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-700 ease-out group-hover/card:scale-[1.02] motion-reduce:transition-none"
                    style={{
                      filter: 'saturate(0.8) contrast(0.9) brightness(0.9)',
                    }}
                  />
                )}
                {/* Layer 1: global dark tint */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(0,0,0,0.55)' }}
                  aria-hidden
                />
                {/* Layer 2: left-to-right gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.25) 100%)',
                  }}
                  aria-hidden
                />
                {/* Layer 3: bottom fade */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)',
                  }}
                  aria-hidden
                />
                {/* Noise */}
                <div
                  className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
                  style={{ backgroundImage: NOISE_SVG }}
                  aria-hidden
                />
              </div>

              <div className="relative flex min-h-[380px] flex-col justify-end p-8 md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-bone/80">
                  {hero.client}
                </p>
                <h3 className="mt-2 text-[32px] font-bold leading-[1.05] tracking-tight text-bone md:text-[40px] line-clamp-2">
                  {hero.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-base text-bone/80">
                  {hero.outcome}
                </p>

                {/* Stats - no dividers, baseline above */}
                <div className="mt-5 border-t border-bone/[0.12] pt-5">
                  <div className="flex flex-col gap-5 sm:flex-row sm:gap-12">
                    {heroMetrics.map((m) => (
                      <div key={m.label} className="flex flex-col">
                        <span className="text-2xl font-semibold text-bone md:text-3xl">
                          {m.value}
                        </span>
                        <span className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-bone/70">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <span className="relative mt-6 inline-block w-fit pb-1 text-sm font-medium uppercase tracking-wider text-bone/90 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-bone after:transition-[width] after:duration-300 group-hover/card:after:w-full motion-reduce:after:transition-none">
                  Read case study →
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Stack (5 cols) */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <RevealGroup stagger={0.06} duration={0.6} className="flex flex-col gap-4">
              {stackCards.map((study, i) => {
                const primary = getPrimaryMetric(study)
                const secondary = getSecondaryMetric(study)
                const reelSrc = stackReels[i] ?? FALLBACK_HORIZONTAL
                return (
                  <Link
                    key={study.id}
                    href={`/case-studies/${study.slug}`}
                    className="group relative flex overflow-hidden rounded-[20px] border border-[rgba(245,245,242,0.12)] bg-[rgba(255,255,255,0.03)] transition-all duration-200 hover:border-[rgba(245,245,242,0.2)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/20 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
                  >
                    <div className="flex min-h-[200px] flex-1 flex-col p-6 pr-[72px] md:pr-[80px]">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-bone/65">
                        {study.client}
                      </p>
                      <h3 className="mt-2.5 line-clamp-2 text-lg font-bold tracking-tight text-bone md:text-xl">
                        {study.title}
                      </h3>
                      {primary && (
                        <p className="mt-4 text-2xl font-bold text-bone/95 md:text-3xl">
                          {primary.value}
                        </p>
                      )}
                      {primary && (
                        <p className="mt-0.5 text-xs text-bone/70">{primary.label}</p>
                      )}
                      {secondary && (
                        <p className="mt-2 text-base text-bone/75">
                          {secondary.value} {secondary.label}
                        </p>
                      )}
                      <span className="mt-auto pt-5 border-b border-bone/20 pb-1.5 text-sm font-medium uppercase tracking-wider text-bone/80 transition-colors group-hover:border-bone w-fit">
                        Read case study →
                      </span>
                    </div>
                    {/* Reel strip - narrower, gradient blend */}
                    <div className="absolute right-0 top-0 bottom-0 w-11 border-l border-[rgba(245,245,242,0.10)] md:w-14">
                      {!reduceMotion ? (
                        <video
                          src={encodePath(reelSrc)}
                          muted
                          loop
                          playsInline
                          autoPlay
                          preload="metadata"
                          className="absolute inset-0 h-full w-full object-cover opacity-55"
                          style={{
                            filter: 'blur(10px) saturate(0.9) brightness(0.8)',
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]" />
                      )}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(to left, rgba(26,26,26,0) 0%, rgba(26,26,26,0.65) 100%)',
                        }}
                        aria-hidden
                      />
                    </div>
                  </Link>
                )
              })}
            </RevealGroup>
          </div>
        </div>

        {/* Mini row */}
        {miniCards.length > 0 && (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <RevealGroup stagger={0.05} duration={0.6} className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-3">
              {miniCards.map((study) => {
                const primary = getPrimaryMetric(study)
                return (
                  <Link
                    key={study.id}
                    href={`/case-studies/${study.slug}`}
                    className="group flex min-h-[160px] flex-col rounded-[18px] border border-[rgba(245,245,242,0.12)] bg-[rgba(255,255,255,0.03)] p-5 transition-all duration-200 hover:border-[rgba(245,245,242,0.2)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/20 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
                  >
                    {primary && (
                      <p className="text-xl font-bold text-bone/95 md:text-2xl">{primary.value}</p>
                    )}
                    {primary && (
                      <p className="mt-0.5 text-xs text-bone/70">{primary.label}</p>
                    )}
                    <h3 className="mt-2.5 line-clamp-2 text-base font-bold tracking-tight text-bone">
                      {study.title}
                    </h3>
                    <span className="mt-auto pt-4 border-b border-bone/20 pb-1 text-xs font-medium uppercase tracking-wider text-bone/80 transition-colors group-hover:border-bone w-fit">
                      Read case study →
                    </span>
                  </Link>
                )
              })}
            </RevealGroup>
          </div>
        )}

        {/* Results snapshot - resolving row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-12 border-t border-[rgba(245,245,242,0.10)] py-6 min-h-[96px]">
          <div className="text-center">
            <p className="text-2xl font-bold text-bone md:text-3xl">40M+</p>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-bone/60 mt-1">
              Views generated
            </p>
          </div>
          <div className="h-12 w-px bg-[rgba(245,245,242,0.12)]" />
          <div className="text-center">
            <p className="text-2xl font-bold text-bone md:text-3xl">$450k+</p>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-bone/60 mt-1">
              Revenue influenced
            </p>
          </div>
          <div className="h-12 w-px bg-[rgba(245,245,242,0.12)]" />
          <div className="text-center">
            <p className="text-2xl font-bold text-bone md:text-3xl">450+</p>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-bone/60 mt-1">
              Clips delivered
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
