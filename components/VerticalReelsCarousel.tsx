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

/** Shimmer + soft gradient backdrop so cards never look like a flat black box. */
const POSTER_BG: React.CSSProperties = {
  backgroundImage:
    'radial-gradient(ellipse 70% 65% at 50% 35%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.55) 100%), linear-gradient(135deg, #2a2724 0%, #1c1a18 100%)',
  backgroundBlendMode: 'overlay, normal',
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
      aria-label={`${tile.title} — ${tile.category} ${tile.year}`}
      className={`group relative block shrink-0 overflow-hidden rounded-[22px] border border-bone/12 bg-[#1c1a18] shadow-[0_4px_18px_rgba(0,0,0,0.32)] transition-all duration-300 hover:border-bone/25 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(0,0,0,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/40 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian ${
        tile.format === 'vertical'
          ? 'h-[280px] w-[230px] sm:h-[340px] sm:w-[265px] md:h-[380px] md:w-[295px]'
          : 'h-[170px] w-[280px] sm:h-[200px] sm:w-[340px] md:h-[230px] md:w-[400px]'
      }`}
    >
      {/* Layer 1: rich placeholder so the card always reads as cinematic */}
      <div className="absolute inset-0" style={POSTER_BG} aria-hidden />

      {/* Layer 2: video — every marquee tile is eager + priority so the row
          feels alive simultaneously instead of buffering as it scrolls. */}
      {!videoFailed && !reduceMotion && (
        <ReelSurface
          reel={reel}
          context="grid"
          title={tile.title}
          autoplay
          muted
          loop
          reduceMotion={false}
          priority
          mediaClassName={`transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          videoStyle={{ filter: 'saturate(1.06) contrast(1.02)' }}
          onVideoError={() => setVideoFailed(true)}
          onVideoReady={() => setVideoLoaded(true)}
        />
      )}

      {/* Layer 3: shimmer while loading (fades out once video shows) */}
      {!videoLoaded && !videoFailed && !reduceMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-y-0 -left-1/3 w-1/2 opacity-40"
            style={{
              background:
                'linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)',
              animation: 'shimmerSlide 2.6s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {/* Layer 4: gradient + caption overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/0" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
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

const VERTICAL_TITLES = ['Muslim Votes Matter', 'Virgin Mary Mosque', 'Taqwa Initiative', 'Community Campaign', 'Institutional Series', 'Brand Highlight']
const VERTICAL_CATEGORIES = ['Narrative', 'Digital', 'Institutional', 'Narrative', 'Digital', 'Brand']
const VERTICAL_YEARS = ['2024', '2024', '2023', '2024', '2023', '2024']

const HORIZONTAL_TITLES = ['Elders Promo', 'Third Space Teaser', 'UMMA Promo', 'Client Showreel', 'Event Recap', 'Bonfire Vid']
const HORIZONTAL_CATEGORIES = ['Institutional', 'Narrative', 'Institutional', 'Digital', 'Institutional', 'Narrative']
const HORIZONTAL_YEARS = ['2024', '2024', '2024', '2024', '2024', '2024']

export default function VerticalReelsCarousel() {
  const [verticalPaths, setVerticalPaths] = useState<string[]>([])
  const [horizontalPaths, setHorizontalPaths] = useState<string[]>([])
  const [reduceMotion, setReduceMotion] = useState(false)

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

  const verticalTiles = useMemo((): ReelTile[] => {
    return verticalPool.map((src, i) => ({
      src,
      title: VERTICAL_TITLES[i % VERTICAL_TITLES.length],
      category: VERTICAL_CATEGORIES[i % VERTICAL_CATEGORIES.length],
      year: VERTICAL_YEARS[i % VERTICAL_YEARS.length],
      format: 'vertical',
    }))
  }, [verticalPool])

  const horizontalTiles = useMemo((): ReelTile[] => {
    return horizontalPool.map((src, i) => ({
      src,
      title: HORIZONTAL_TITLES[i % HORIZONTAL_TITLES.length],
      category: HORIZONTAL_CATEGORIES[i % HORIZONTAL_CATEGORIES.length],
      year: HORIZONTAL_YEARS[i % HORIZONTAL_YEARS.length],
      format: 'horizontal',
    }))
  }, [horizontalPool])

  // Duplicate tiles so the marquee animates seamlessly (left edge feeds the right).
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
      className="section-padding scroll-mt-20 bg-obsidian text-bone"
      aria-label="Work in motion"
    >
      <Container wide>
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-bone/55">
                Live reel
              </p>
              <h2 className="text-3xl font-bold uppercase tracking-tight text-bone md:text-4xl lg:text-[2.5rem]">
                Work in motion
              </h2>
              <p className="mt-3 max-w-xl text-sm text-bone/75 md:text-base">
                A continuously refreshed wall of recent client output — from institutional campaigns to founder narratives.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="shrink-0 text-sm font-medium uppercase tracking-wider text-bone/85 hover:text-bone border-b-2 border-transparent hover:border-bone/30 pb-0.5 transition-colors"
            >
              View full portfolio →
            </Link>
          </div>
          <div className="mt-2 h-px w-full bg-bone/12" />

          {horizontalMarqueeTiles.length > 0 && (
            <Reveal className="overflow-hidden" duration={0.6} direction="up">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-bone/55">
                Horizontal reels
              </p>
              <div
                className="flex w-max gap-4 will-change-transform"
                style={{ animation: reduceMotion ? 'none' : 'homeMarquee 56s linear infinite' }}
              >
                {horizontalMarqueeTiles.map((tile, i) => (
                  <ReelTileCard key={`horizontal-${i}-${tile.src}`} tile={tile} />
                ))}
              </div>
            </Reveal>
          )}

          {verticalMarqueeTiles.length > 0 && (
            <Reveal className="overflow-hidden pt-6" duration={0.6} direction="up">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-bone/55">
                Vertical reels
              </p>
              <div
                className="flex w-max gap-4 will-change-transform"
                style={{ animation: reduceMotion ? 'none' : 'homeMarqueeReverse 64s linear infinite' }}
              >
                {verticalMarqueeTiles.map((tile, i) => (
                  <ReelTileCard key={`vertical-${i}-${tile.src}`} tile={tile} />
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  )
}
