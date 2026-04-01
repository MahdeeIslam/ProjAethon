'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { caseStudies } from '@/data/caseStudies'
import { getMetrics, getPrimaryMetric, getSecondaryMetric } from '@/data/caseStudies'
import { getReelForCaseStudy } from '@/lib/reels'
import { getReelShuffleSeed, shuffleDeterministic } from '@/lib/shuffle'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'
import Container from '@/components/ui/Container'
import { YT } from '@/data/videoUrls'
import { filterLandscapeReelUrls } from '@/lib/youtube'
import { normalizeReelInput } from '@/lib/media/normalizeReel'
import ReelSurface from '@/components/media/ReelSurface'

const HERO_CASE_STUDY_ID = '1'
const FALLBACK_HORIZONTAL = YT.horizontalReels[0] ?? 'https://www.youtube.com/watch?v=REPLACE_ME'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

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
        const merged = paths.length > 0 ? paths : [...YT.horizontalReels]
        const filtered = filterLandscapeReelUrls(merged)
        setHorizontalPaths(
          filtered.length > 0 ? filtered : filterLandscapeReelUrls([...YT.horizontalReels])
        )
      })
      .catch(() => setHorizontalPaths(filterLandscapeReelUrls([...YT.horizontalReels])))
  }, [])

  const basePool = useMemo(() => {
    const merged = horizontalPaths.length > 0 ? horizontalPaths : [...YT.horizontalReels]
    const filtered = filterLandscapeReelUrls(merged)
    const base = filtered.length > 0 ? filtered : filterLandscapeReelUrls([...YT.horizontalReels])
    return [...base].sort((a, b) => a.localeCompare(b))
  }, [horizontalPaths])

  const [shuffledPool, setShuffledPool] = useState<string[] | null>(null)
  useEffect(() => {
    setShuffledPool(shuffleDeterministic([...basePool], getReelShuffleSeed()))
  }, [basePool])

  const horizontalPool = shuffledPool ?? basePool

  const { hero, stackCards, miniCards } = useMemo(() => {
    const all = [...caseStudies]
    const heroStudy = all.find((c) => c.id === HERO_CASE_STUDY_ID) ?? all[0]
    const rest = all.filter((c) => c.id !== heroStudy.id)
    const stackCards = rest.slice(0, 2)
    const miniCards = rest.slice(2, 5)
    return { hero: heroStudy, stackCards, miniCards }
  }, [])

  const heroReelUrl = useMemo(
    () => getReelForCaseStudy(hero, horizontalPool) ?? horizontalPool[0] ?? FALLBACK_HORIZONTAL,
    [hero, horizontalPool]
  )

  const heroReel = useMemo(() => normalizeReelInput(heroReelUrl), [heroReelUrl])

  const stackReels = useMemo(() => {
    const s = shuffleDeterministic([...horizontalPool], `${getReelShuffleSeed()}-stack`)
    return [s[0] ?? heroReelUrl, s[1] ?? s[0] ?? heroReelUrl]
  }, [horizontalPool, heroReelUrl])

  const miniReels = useMemo(() => {
    const s = shuffleDeterministic([...horizontalPool], `${getReelShuffleSeed()}-mini`)
    const n = Math.max(s.length, 1)
    return miniCards.map((_, i) => s[(i + 3) % n] ?? heroReelUrl)
  }, [horizontalPool, miniCards, heroReelUrl])

  const heroMetrics = getMetrics(hero).slice(0, 3)

  return (
    <section
      className="bg-obsidian border-t border-[rgba(245,245,242,0.12)] pt-5 pb-0 md:pt-6"
      aria-label="Featured case studies"
    >
      <Container wide>
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

        <div className="mt-5 grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12 lg:gap-5">
          <Reveal className="lg:col-span-7">
            <Link
              href={`/case-studies/${hero.slug}`}
              className="group/card relative block overflow-hidden rounded-[20px] border border-[rgba(245,245,242,0.12)] bg-[rgba(255,255,255,0.03)] shadow-none transition-[border-color,transform,box-shadow] duration-300 hover:border-[rgba(245,245,242,0.22)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/20 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none"
            >
              <span className="absolute right-6 top-6 z-10 text-xs font-medium text-bone/65">
                01 / 06
              </span>

              <div className="absolute inset-0">
                <ReelSurface
                  reel={heroReel}
                  context="featured"
                  title={`${hero.client} reel`}
                  autoplay
                  muted
                  loop
                  reduceMotion={reduceMotion}
                  mediaClassName="opacity-75 transition-transform duration-700 ease-out group-hover/card:scale-[1.02] motion-reduce:transition-none"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(0,0,0,0.55)' }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.25) 100%)',
                  }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)',
                  }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <RevealGroup stagger={0.06} duration={0.6} className="flex flex-col gap-4">
              {stackCards.map((study, i) => {
                const primary = getPrimaryMetric(study)
                const secondary = getSecondaryMetric(study)
                const reelSrc = stackReels[i] ?? FALLBACK_HORIZONTAL
                const reel = normalizeReelInput(reelSrc)
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
                    <div className="absolute right-0 top-0 bottom-0 w-11 border-l border-[rgba(245,245,242,0.10)] md:w-14">
                      <ReelSurface
                        reel={reel}
                        context="featured"
                        title={`${study.client} reel strip`}
                        autoplay
                        muted
                        loop
                        reduceMotion={reduceMotion}
                        mediaClassName="opacity-55"
                        videoStyle={
                          reel.source === 'mp4'
                            ? { filter: 'blur(10px) saturate(0.9) brightness(0.8)' }
                            : undefined
                        }
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
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

        {miniCards.length > 0 && (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <RevealGroup stagger={0.05} duration={0.6} className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-3">
              {miniCards.map((study, i) => {
                const primary = getPrimaryMetric(study)
                const reelSrc = miniReels[i] ?? heroReelUrl
                const reel = normalizeReelInput(reelSrc)
                return (
                  <Link
                    key={study.id}
                    href={`/case-studies/${study.slug}`}
                    className="group relative flex aspect-video w-full flex-col justify-end overflow-hidden rounded-[18px] border border-[rgba(245,245,242,0.12)] bg-black transition-all duration-200 hover:border-[rgba(245,245,242,0.2)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/20 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
                  >
                    <div className="absolute inset-0">
                      <ReelSurface
                        reel={reel}
                        context="grid"
                        title={`${study.client} reel`}
                        autoplay
                        muted
                        loop
                        reduceMotion={reduceMotion}
                        mediaClassName="opacity-90 transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"
                        aria-hidden
                      />
                    </div>
                    <div className="relative z-10 flex flex-col p-5">
                      {primary && (
                        <p className="text-xl font-bold text-bone md:text-2xl">{primary.value}</p>
                      )}
                      {primary && (
                        <p className="mt-0.5 text-xs text-bone/70">{primary.label}</p>
                      )}
                      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-bone/75">
                        {study.client}
                      </p>
                      <h3 className="mt-1 line-clamp-2 text-base font-bold tracking-tight text-bone">
                        {study.title}
                      </h3>
                      <span className="mt-3 border-b border-bone/25 pb-1 text-xs font-medium uppercase tracking-wider text-bone/85 transition-colors group-hover:border-bone w-fit">
                        Read case study →
                      </span>
                    </div>
                  </Link>
                )
              })}
            </RevealGroup>
          </div>
        )}

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
