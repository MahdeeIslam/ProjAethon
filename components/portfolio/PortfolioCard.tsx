'use client'

import { useEffect, useRef, useState } from 'react'
import type { PortfolioItem } from '@/data/portfolio'
import { getPosterForItem } from '@/lib/portfolioPoster'

function encodePath(p: string): string {
  return p.split('/').map((s) => encodeURIComponent(s)).join('/')
}

interface PortfolioCardProps {
  item: PortfolioItem
  onClick: () => void
}

export default function PortfolioCard({ item, onClick }: PortfolioCardProps) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const poster = getPosterForItem(item)
  const src = encodePath(item.src)
  const tag = item.tags[0] ?? 'video'
  const metric = item.metrics?.[0]

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '200px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v || !isInView || reduceMotion) return
    v.play().catch(() => {})
  }, [isInView, reduceMotion])

  const showVideo = !reduceMotion && !videoFailed && isInView
  const isHorizontal = item.format === 'horizontal'

  return (
    <article
      ref={containerRef}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className="group relative overflow-hidden rounded-[20px] border border-[rgba(245,245,242,0.12)] bg-[rgba(255,255,255,0.03)] transition-all duration-300 hover:-translate-y-[2px] hover:border-[rgba(245,245,242,0.22)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]"
    >
      <div
        className={`relative overflow-hidden bg-obsidian ${
          isHorizontal ? 'aspect-video' : 'aspect-[9/16] max-h-[720px]'
        }`}
      >
        {/* Poster - always visible as base */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02] ${
            showVideo ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundImage: `url(${poster})` }}
          aria-hidden
        />
        {/* Video - plays when in view */}
        {isInView && (
          <>
            {!videoFailed && (
              <video
                ref={videoRef}
                src={src}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                poster={poster}
                onError={() => setVideoFailed(true)}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  showVideo ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
            {videoFailed && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${poster})` }}
                aria-hidden
              />
            )}
          </>
        )}
        {/* Bottom gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"
          aria-hidden
        />
      </div>

      <div className="p-5 md:px-6 md:pb-6 md:pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bone/75 line-clamp-1">
          {item.client}
        </p>
        <h3 className="mt-1.5 line-clamp-2 text-lg font-bold tracking-tight text-bone md:text-xl">
          {item.title}
        </h3>
        <p className="mt-1.5 text-xs uppercase tracking-wider text-bone/70 opacity-80">
          {tag} · {item.year} · {item.format}
          {metric && ` · ${metric.value}`}
        </p>
      </div>
    </article>
  )
}
