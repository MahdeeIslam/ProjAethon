'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { getReelShuffleSeed, shuffleDeterministic } from '@/lib/shuffle'
import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import { YT } from '@/data/videoUrls'
import { normalizeReelInput } from '@/lib/media/normalizeReel'
import ReelSurface from '@/components/media/ReelSurface'

const FALLBACK_VERTICAL_REELS = [...YT.verticalReels]
const FALLBACK_HORIZONTAL_REELS = [...YT.horizontalReels]

const HERO_BACKGROUND_PATTERNS = ['backgroun', 'background', 'hero-loop']

function isHeroBackground(path: string): boolean {
  const lower = path.toLowerCase()
  return HERO_BACKGROUND_PATTERNS.some((p) => lower.includes(p))
}

interface ReelTile {
  src: string
  title: string
  category: string
  year: string
  format: 'vertical' | 'horizontal'
}

function ReelTileCard({ tile }: { tile: ReelTile }) {
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const reel = useMemo(() => normalizeReelInput(tile.src), [tile.src])

  useEffect(() => {
    if (reel.source === 'youtube') setVideoLoaded(true)
  }, [reel.source])

  useEffect(() => {
    setVideoFailed(false)
    setVideoLoaded(false)
  }, [tile.src])

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <Link
      href="/portfolio"
      className={`group relative block shrink-0 overflow-hidden rounded-[20px] border-2 border-black/10 bg-white shadow-md transition-all duration-300 hover:border-black/20 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-2 focus:ring-offset-[#f5f4f0] ${
        tile.format === 'vertical'
          ? 'h-[260px] w-[220px] sm:h-[320px] sm:w-[260px] md:h-[360px] md:w-[290px]'
          : 'h-[150px] w-[260px] sm:h-[185px] sm:w-[320px] md:h-[220px] md:w-[380px]'
      }`}
    >
      <div className="absolute inset-0 bg-[#252525]">
        {!videoFailed && !reduceMotion && (
          <ReelSurface
            reel={reel}
            context="grid"
            title={tile.title}
            autoplay
            muted
            loop
            reduceMotion={false}
            mediaClassName={`transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            videoStyle={{ filter: 'saturate(1.05) contrast(1.02)' }}
            onVideoError={() => setVideoFailed(true)}
            onVideoReady={() => setVideoLoaded(true)}
          />
        )}
        {(videoFailed || reduceMotion) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a]">
            <span className="text-xs font-medium uppercase tracking-wider text-bone/40">Preview</span>
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-5">
        <span className="block text-sm font-bold uppercase tracking-[0.12em] text-bone drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] md:text-base">
          {tile.title}
        </span>
        <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-bone/75 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          {tile.category} · {tile.year}
        </span>
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="inline-flex items-center rounded-full border border-bone/30 bg-black/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-bone shadow-lg backdrop-blur-sm">
          Open →
        </span>
      </div>
    </Link>
  )
}

export default function VerticalReelsCarousel() {
  const [verticalPaths, setVerticalPaths] = useState<string[]>([])
  const [horizontalPaths, setHorizontalPaths] = useState<string[]>([])
  const [reduceMotion, setReduceMotion] = useState(false)
  const [horizontalOffset, setHorizontalOffset] = useState(0)
  const [verticalOffset, setVerticalOffset] = useState(0)

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    Promise.all([
      fetch('/api/reels')
        .then((res) => res.json())
        .catch(() => ({ paths: [] as string[] })),
      fetch('/api/reels/horizontal')
        .then((res) => res.json())
        .catch(() => ({ paths: [] as string[] })),
    ]).then(([verticalData, horizontalData]) => {
      const v: string[] = Array.isArray(verticalData.paths) ? verticalData.paths : []
      const h: string[] = Array.isArray(horizontalData.paths) ? horizontalData.paths : []
      const filteredVertical = v.filter((p) => !isHeroBackground(p))
      setVerticalPaths(filteredVertical.length > 0 ? filteredVertical : FALLBACK_VERTICAL_REELS)
      setHorizontalPaths(h.length > 0 ? h : FALLBACK_HORIZONTAL_REELS)
    })
  }, [])

  const verticalBasePool = useMemo(() => {
    const merged = verticalPaths.length > 0 ? verticalPaths : FALLBACK_VERTICAL_REELS
    return [...merged].sort((a, b) => a.localeCompare(b))
  }, [verticalPaths])

  const horizontalBasePool = useMemo(() => {
    const merged = horizontalPaths.length > 0 ? horizontalPaths : FALLBACK_HORIZONTAL_REELS
    return [...merged].sort((a, b) => a.localeCompare(b))
  }, [horizontalPaths])

  const [shuffledVerticalPool, setShuffledVerticalPool] = useState<string[] | null>(null)
  const [shuffledHorizontalPool, setShuffledHorizontalPool] = useState<string[] | null>(null)
  useEffect(() => {
    setShuffledVerticalPool(
      shuffleDeterministic([...verticalBasePool], `${getReelShuffleSeed()}-vert-carousel`)
    )
  }, [verticalBasePool])

  useEffect(() => {
    setShuffledHorizontalPool(
      shuffleDeterministic([...horizontalBasePool], `${getReelShuffleSeed()}-horiz-carousel`)
    )
  }, [horizontalBasePool])

  const verticalPool = shuffledVerticalPool ?? verticalBasePool
  const horizontalPool = shuffledHorizontalPool ?? horizontalBasePool

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => {
      setHorizontalOffset((prev) => prev + 1)
      setVerticalOffset((prev) => prev + 1)
    }, 4500)
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  const rotateByOffset = (arr: string[], offset: number): string[] => {
    if (arr.length === 0) return arr
    const idx = ((offset % arr.length) + arr.length) % arr.length
    return [...arr.slice(idx), ...arr.slice(0, idx)]
  }
  const rotatedHorizontal = useMemo(
    () => rotateByOffset(horizontalPool, horizontalOffset),
    [horizontalPool, horizontalOffset]
  )
  const rotatedVertical = useMemo(
    () => rotateByOffset(verticalPool, verticalOffset),
    [verticalPool, verticalOffset]
  )

  const verticalTiles = useMemo((): ReelTile[] => {
    const titles = ['Muslim Votes Matter', 'Virgin Mary Mosque', 'Taqwa Initiative', 'Community Campaign', 'Institutional Series']
    const categories = ['Narrative', 'Digital', 'Institutional', 'Narrative', 'Digital']
    const years = ['2024', '2024', '2023', '2024', '2023']

    return rotatedVertical.map((src, i) => ({
      src,
      title: titles[i % titles.length],
      category: categories[i % categories.length],
      year: years[i % years.length],
      format: 'vertical',
    }))
  }, [rotatedVertical])

  const horizontalTiles = useMemo((): ReelTile[] => {
    const titles = ['Elders Promo', 'Third Space Teaser', 'UMMA Promo', 'Client Showreel', 'Event Recap']
    const categories = ['Institutional', 'Narrative', 'Institutional', 'Digital', 'Institutional']
    const years = ['2024', '2024', '2024', '2024', '2024']

    return rotatedHorizontal.map((src, i) => ({
      src,
      title: titles[i % titles.length],
      category: categories[i % categories.length],
      year: years[i % years.length],
      format: 'horizontal',
    }))
  }, [rotatedHorizontal])

  const horizontalMarqueeTiles = useMemo(
    () => (horizontalTiles.length > 0 ? [...horizontalTiles, ...horizontalTiles] : []),
    [horizontalTiles]
  )
  const verticalMarqueeTiles = useMemo(
    () => (verticalTiles.length > 0 ? [...verticalTiles, ...verticalTiles] : []),
    [verticalTiles]
  )

  return (
    <section
      id="work-in-motion"
      className="section-padding scroll-mt-20 text-[var(--light-text)]"
      style={{ background: 'linear-gradient(180deg, #ebe9e4 0%, #f5f4f0 50%, var(--light-bg) 100%)' }}
      aria-label="Work in motion"
    >
      <Container wide>
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-[var(--light-text)] md:text-4xl lg:text-[2.25rem]">
              Work in motion
            </h2>
            <Link
              href="/portfolio"
              className="shrink-0 text-sm font-medium uppercase tracking-wider text-[var(--light-text)]/85 hover:text-[var(--light-text)] border-b-2 border-transparent hover:border-black/30 pb-0.5 transition-colors"
            >
              View full portfolio →
            </Link>
          </div>
          <div className="mt-2 h-px w-full bg-[var(--light-border)]" />

          {horizontalMarqueeTiles.length > 0 && (
            <Reveal className="overflow-hidden" duration={0.6} direction="up">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--light-text)]/55">
                Horizontal reels
              </p>
              <div
                className="flex w-max gap-4"
                style={{ animation: reduceMotion ? 'none' : 'homeMarquee 42s linear infinite' }}
              >
                {horizontalMarqueeTiles.map((tile, i) => (
                  <ReelTileCard key={`horizontal-${tile.src}-${i}`} tile={tile} />
                ))}
              </div>
            </Reveal>
          )}

          {verticalMarqueeTiles.length > 0 && (
            <Reveal className="overflow-hidden pt-6" duration={0.6} direction="up">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--light-text)]/55">
                Vertical reels
              </p>
              <div
                className="flex w-max gap-4"
                style={{ animation: reduceMotion ? 'none' : 'homeMarquee 34s linear infinite' }}
              >
                {verticalMarqueeTiles.map((tile, i) => (
                  <ReelTileCard key={`vertical-${tile.src}-${i}`} tile={tile} />
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  )
}
