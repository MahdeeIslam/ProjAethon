'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { shuffleArray } from '@/lib/shuffle'
import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import { YT } from '@/data/videoUrls'
import { isYouTubeUrl } from '@/lib/youtube'
import YouTubeEmbed from '@/components/YouTubeEmbed'

const FALLBACK_REEL_PATHS = [...YT.verticalReels]

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
  variant: 'featured' | 'secondary' | 'grid'
}

function encodeReelPath(path: string): string {
  return path
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/')
}

function ReelTileCard({ tile }: { tile: ReelTile }) {
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const src = encodeReelPath(tile.src)
  const useYouTube = isYouTubeUrl(tile.src)
  useEffect(() => {
    if (useYouTube) setVideoLoaded(true)
  }, [useYouTube])

  const heightClass =
    tile.variant === 'featured'
      ? 'h-[320px] md:h-[420px]'
      : tile.variant === 'secondary'
        ? 'h-[160px] md:h-[204px]'
        : 'h-[200px] md:h-[240px]'

  return (
    <Link
      href="/portfolio"
      className={`group relative block overflow-hidden rounded-[20px] border-2 border-black/10 bg-white shadow-md transition-all duration-300 hover:border-black/20 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-2 focus:ring-offset-[#f5f4f0] ${heightClass}`}
    >
      <div className="absolute inset-0 bg-[#252525]">
        {!videoFailed && (
          useYouTube ? (
            <YouTubeEmbed
              url={tile.src}
              title={tile.title}
              autoplay
              muted
              loop
              controls={false}
              className={`h-full w-full transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          ) : (
            <video
              src={src}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              onError={() => setVideoFailed(true)}
              onLoadedData={() => setVideoLoaded(true)}
              className={`h-full w-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ filter: 'saturate(1.05) contrast(1.02)' }}
            />
          )
        )}
        {videoFailed && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a]">
            <span className="text-xs font-medium uppercase tracking-wider text-bone/40">Preview</span>
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <span className="block text-sm font-bold uppercase tracking-[0.12em] text-bone md:text-base">
          {tile.title}
        </span>
        <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-bone/60">
          {tile.category} · {tile.year}
        </span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/15">
        <span className="border-b border-transparent pb-1 text-[11px] font-medium uppercase tracking-wider text-bone opacity-0 transition-all duration-200 group-hover:border-bone group-hover:opacity-100">
          Open →
        </span>
      </div>
    </Link>
  )
}

export default function VerticalReelsCarousel() {
  const [reelPaths, setReelPaths] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/reels')
      .then((res) => res.json())
      .then((data: { paths: string[] }) => {
        const paths = Array.isArray(data.paths) ? data.paths : []
        const filtered = paths.filter((p) => !isHeroBackground(p))
        setReelPaths(filtered.length > 0 ? filtered : FALLBACK_REEL_PATHS)
      })
      .catch(() => setReelPaths(FALLBACK_REEL_PATHS))
  }, [])

  const tiles = useMemo((): ReelTile[] => {
    const paths = reelPaths.length > 0 ? shuffleArray([...reelPaths]) : FALLBACK_REEL_PATHS
    const titles = ['FairDinkum Podcast', 'Muslim Votes Matter', 'Virgin Mary Mosque', 'Taqwa Initiative', 'Community Campaign', 'Institutional Series']
    const categories = ['Institutional', 'Narrative', 'Digital', 'Institutional', 'Narrative', 'Digital']
    const years = ['2024', '2024', '2024', '2023', '2024', '2023']

    return [
      { src: paths[0], title: titles[0], category: categories[0], year: years[0], variant: 'featured' },
      { src: paths[1], title: titles[1], category: categories[1], year: years[1], variant: 'secondary' },
      { src: paths[2], title: titles[2], category: categories[2], year: years[2], variant: 'secondary' },
      { src: paths[3], title: titles[3], category: categories[3], year: years[3], variant: 'grid' },
      { src: paths[4], title: titles[4], category: categories[4], year: years[4], variant: 'grid' },
      { src: paths[5], title: titles[5], category: categories[5], year: years[5], variant: 'grid' },
    ]
  }, [reelPaths])

  return (
    <section
      id="work-in-motion"
      className="section-padding text-[var(--light-text)]"
      style={{ background: 'linear-gradient(180deg, #ebe9e4 0%, #f5f4f0 50%, var(--light-bg) 100%)' }}
      aria-label="Work in motion"
    >
      <Container wide>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-[var(--light-text)] md:text-4xl lg:text-[2.25rem]">
              Work in motion
            </h2>
            <Link
              href="/portfolio"
              className="text-sm font-medium uppercase tracking-wider text-[var(--light-text)]/80 hover:text-[var(--light-text)] border-b-2 border-transparent hover:border-black/25 w-fit transition-colors"
            >
              View full portfolio →
            </Link>
          </div>
          <div className="h-px w-full bg-[var(--light-border)]" />

          <Reveal
            className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-3"
            duration={0.6}
            direction="up"
          >
            {tiles[0] && (
              <div className="md:col-span-8">
                <ReelTileCard tile={tiles[0]} />
              </div>
            )}
            <div className="flex flex-col gap-3 md:col-span-4">
              {tiles[1] && <ReelTileCard tile={tiles[1]} />}
              {tiles[2] && <ReelTileCard tile={tiles[2]} />}
            </div>
            {tiles.slice(3, 6).map((tile, i) => (
              <div key={i} className="md:col-span-4">
                <ReelTileCard tile={tile} />
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
