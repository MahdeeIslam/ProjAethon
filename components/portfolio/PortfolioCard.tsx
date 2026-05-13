'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { PortfolioItem } from '@/data/portfolio'
import { getPosterForItem } from '@/lib/portfolioPoster'
import { normalizeReelInput } from '@/lib/media/normalizeReel'
import ReelSurface from '@/components/media/ReelSurface'

interface PortfolioCardProps {
  item: PortfolioItem
  onClick: () => void
}

export default function PortfolioCard({ item, onClick }: PortfolioCardProps) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  const poster = getPosterForItem(item)
  const reel = useMemo(() => normalizeReelInput(item.src), [item.src])
  const isHorizontal = item.format === 'horizontal'

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <article
      ref={containerRef}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={`${item.client} — ${item.title}`}
      className={`group relative block w-full overflow-hidden rounded-[18px] border border-[rgba(245,245,242,0.10)] bg-obsidian transition-all duration-300 cursor-pointer hover:-translate-y-[2px] hover:border-[rgba(245,245,242,0.30)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone/40 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian ${
        isHorizontal ? 'aspect-video' : 'aspect-[9/16]'
      }`}
    >
      {/* Layer 1 — static poster (always visible as a fallback while the video loads) */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03] ${
          videoReady && !videoFailed ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden
      />

      {/* Layer 2 — actual reel surface (handles MP4 encoding, lazy mount, IntersectionObserver) */}
      {!videoFailed && (
        <ReelSurface
          reel={reel}
          context="grid"
          title={`${item.client} — ${item.title}`}
          autoplay
          muted
          loop
          reduceMotion={reduceMotion}
          mediaClassName={`transition-opacity duration-500 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
          onVideoReady={() => setVideoReady(true)}
          onVideoError={() => setVideoFailed(true)}
        />
      )}

      {/* Layer 3 — hover overlay: titling / details only visible on hover or focus */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:opacity-100 md:p-6"
      >
        {/* Reading gradient + slight dim so text is legible */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15"
          aria-hidden
        />
        <div className="relative">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bone/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
            {item.client}
          </p>
          <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-bone drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] md:text-xl">
            {item.title}
            <span className="ml-2 text-base font-medium text-bone/75 md:text-lg">
              — {item.type}
            </span>
          </h3>
          <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em] text-bone/90">
            View project
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
    </article>
  )
}
