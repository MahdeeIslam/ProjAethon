'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { getReelShuffleSeed, shuffleDeterministic } from '@/lib/shuffle'
import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import { YT } from '@/data/videoUrls'
import { normalizeReelInput } from '@/lib/media/normalizeReel'
import ReelSurface from '@/components/media/ReelSurface'

const FALLBACK_HORIZONTAL = [...YT.horizontalReels]

const LABELS = [
  { title: 'Elders Promo', category: 'Institutional', year: '2024' },
  { title: 'Third Space Teaser', category: 'Narrative', year: '2024' },
  { title: 'UMMA Promo', category: 'Institutional', year: '2024' },
  { title: 'Moe.vis Client Work', category: 'Digital', year: '2024' },
  { title: 'Elder Event Recap', category: 'Institutional', year: '2024' },
]

function ReelPlateCard({
  src,
  index,
  total,
  label,
}: {
  src: string
  index: number
  total: number
  label: { title: string; category: string; year: string }
}) {
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const reel = useMemo(() => normalizeReelInput(src), [src])

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reel.source === 'youtube') setVideoLoaded(true)
  }, [reel.source])

  const showVideo = !reduceMotion && !videoFailed

  return (
    <div className="relative shrink-0 w-[280px] sm:w-[340px] md:w-[440px] snap-center snap-always" data-rail-index={index}>
      <Link
        href="/portfolio"
        className="group block relative overflow-hidden rounded-[20px] border-2 border-bone/15 bg-[#2a2a2a] aspect-video transition-all duration-300 hover:border-bone/30 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-bone/25 focus:ring-offset-2 focus:ring-offset-obsidian"
      >
        <span className="absolute left-4 top-4 z-10 text-xs font-medium text-bone/50">
          {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>
        {showVideo && (
          <ReelSurface
            reel={reel}
            context="grid"
            title={label.title}
            autoplay
            muted
            loop
            reduceMotion={false}
            mediaClassName={`transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            videoStyle={{ filter: 'saturate(1.06) contrast(1.03)' }}
            onVideoError={() => setVideoFailed(true)}
            onVideoReady={() => setVideoLoaded(true)}
          />
        )}
        {(!showVideo || videoFailed) && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a] flex items-center justify-center">
            <span className="text-xs text-bone/40 uppercase tracking-wider">Preview</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/75 to-transparent">
          <span className="block text-base font-bold uppercase tracking-[0.1em] text-bone">
            {label.title}
          </span>
          <span className="block text-xs uppercase tracking-wider text-bone/70 mt-0.5">
            {label.category} · {label.year}
          </span>
        </div>
      </Link>
    </div>
  )
}

export default function WorkInMotionRail() {
  const [paths, setPaths] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/reels/horizontal')
      .then((res) => res.json())
      .then((data: { paths: string[] }) => {
        const raw =
          Array.isArray(data.paths) && data.paths.length > 0 ? data.paths : FALLBACK_HORIZONTAL
        const sorted = [...raw].sort((a, b) => a.localeCompare(b))
        setPaths(shuffleDeterministic(sorted, `${getReelShuffleSeed()}-work-rail`))
      })
      .catch(() => {
        const sorted = [...FALLBACK_HORIZONTAL].sort((a, b) => a.localeCompare(b))
        setPaths(shuffleDeterministic(sorted, `${getReelShuffleSeed()}-work-rail`))
      })
  }, [])

  const displayPaths = useMemo(() => paths.slice(0, 10), [paths])
  const total = displayPaths.length

  useEffect(() => {
    const el = scrollRef.current
    if (!el || total === 0) return

    const cards = el.querySelectorAll('[data-rail-index]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.railIndex)
            if (!Number.isNaN(idx)) setActiveIndex(idx)
          }
        })
      },
      { root: el, threshold: 0.5 }
    )
    cards.forEach((c) => observer.observe(c))
    return () => cards.forEach((c) => observer.unobserve(c))
  }, [total])

  if (total === 0) return null

  return (
    <section
      className="bg-obsidian border-t border-bone/15 py-10 md:py-12"
      aria-label="Work in motion"
    >
      <Container wide>
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-bone md:text-4xl">
              Work in motion
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium uppercase tracking-wider text-bone/60">
                {String(activeIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
              </span>
              <Link
                href="/portfolio"
                className="text-sm font-medium uppercase tracking-wider text-bone/85 hover:text-bone border-b-2 border-transparent hover:border-bone/50 transition-colors"
              >
                View full portfolio →
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-obsidian to-transparent pointer-events-none z-10"
          aria-hidden
        />
        <div
          ref={scrollRef}
          className="overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory scrollbar-hide flex gap-4 px-6 md:px-10 pb-2"
        >
          {displayPaths.map((src, i) => (
            <ReelPlateCard
              key={`${src}-${i}`}
              src={src}
              index={i}
              total={total}
              label={LABELS[i % LABELS.length]}
            />
          ))}
        </div>
        <div
          className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-obsidian to-transparent pointer-events-none z-10"
          aria-hidden
        />
      </div>
    </section>
  )
}
