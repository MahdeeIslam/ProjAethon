'use client'

import { useEffect, useRef, useState } from 'react'
import type { PortfolioItem } from '@/data/portfolio'
import { getPosterForItem } from '@/lib/portfolioPoster'

function encodePath(p: string): string {
  return p.split('/').map((s) => encodeURIComponent(s)).join('/')
}

interface FeaturedPlateProps {
  item: PortfolioItem
  index: number
  total: number
}

function FeaturedPlate({ item, index, total }: FeaturedPlateProps) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '100px', threshold: 0 }
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
  const poster = getPosterForItem(item)
  const src = encodePath(item.src)
  const tag = item.tags[0] ?? 'video'
  const metric = item.metrics?.[0]?.value

  return (
    <div
      ref={containerRef}
      className="relative w-[340px] shrink-0 snap-center snap-always sm:w-[440px] md:w-[540px] lg:w-[600px] xl:w-[640px]"
    >
      <div className="group relative overflow-hidden rounded-[20px] border border-[rgba(245,245,242,0.12)] bg-[rgba(255,255,255,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(245,245,242,0.22)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-t-[20px] bg-obsidian">
          {/* Poster - fallback when video not playing */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02] ${
              showVideo ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ backgroundImage: `url(${poster})` }}
            aria-hidden
          />
          {/* Video - plays when in view */}
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
          {/* Bottom gradient for overlay readability */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
            aria-hidden
          />
          {/* Progress indicator top-right */}
          <span
            className="absolute right-3 top-3 text-[10px] font-medium uppercase tracking-wider text-bone/70"
            aria-hidden
          >
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          {/* Overlay content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-bone/90">
              {item.client}
            </p>
            <p className="mt-0.5 text-base font-bold tracking-tight text-bone md:text-lg line-clamp-1">
              {item.title}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-bone/70">
              {tag} · {item.year} · {item.format}
            </p>
            {metric && (
              <span className="mt-2 inline-block rounded border border-bone/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-bone/80">
                {metric}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface FeaturedRailProps {
  items: PortfolioItem[]
  onItemClick?: (item: PortfolioItem, index: number) => void
}

export default function FeaturedRail({ items, onItemClick }: FeaturedRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el || items.length === 0) return

    const updateProgress = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el
      const maxScroll = scrollWidth - clientWidth
      const idx = items.length > 1
        ? Math.round((scrollLeft / Math.max(maxScroll, 1)) * (items.length - 1))
        : 0
      setActiveIndex(Math.min(idx, items.length - 1))
      setScrollProgress(maxScroll > 0 ? scrollLeft / maxScroll : 1)
    }

    updateProgress()
    el.addEventListener('scroll', updateProgress)
    return () => el.removeEventListener('scroll', updateProgress)
  }, [items.length])

  if (items.length === 0) return null

  return (
    <section className="border-b border-[rgba(245,245,242,0.10)] py-12 md:py-14">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-bone/85">
            Featured Work
          </h2>
          <a
            href="#portfolio-grid"
            className="text-sm font-medium uppercase tracking-wider text-bone/75 transition hover:text-bone"
          >
            View full portfolio →
          </a>
        </div>
      </div>

      <div className="relative -mx-6 md:-mx-10">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-8 overflow-x-auto px-6 pb-5 md:px-10"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {items.map((item, idx) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              className="cursor-pointer"
              onClick={() => onItemClick?.(item, idx)}
              onKeyDown={(e) => e.key === 'Enter' && onItemClick?.(item, idx)}
            >
              <FeaturedPlate item={item} index={idx} total={items.length} />
            </div>
          ))}
        </div>

        {/* Custom progress bar */}
        <div className="mx-auto mt-5 max-w-[1440px] px-6 md:px-10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-bone/50">
              {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <div className="h-0.5 w-24 overflow-hidden rounded-full bg-bone/10">
              <div
                className="h-full rounded-full bg-bone/40 transition-all duration-200"
                style={{ width: `${scrollProgress * 100}%` }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
