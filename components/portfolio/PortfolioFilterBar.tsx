'use client'

import { useCallback, useState } from 'react'
import { PILLAR_LABELS, type Pillar } from '@/data/portfolioMeta'
import type { PortfolioFormat } from '@/data/portfolio'

type SortOption = 'newest' | 'most-viewed' | 'featured'

interface PortfolioFilterBarProps {
  pillar: Pillar | null
  onPillarChange: (p: Pillar | null) => void
  format: PortfolioFormat | 'all'
  onFormatChange: (f: PortfolioFormat | 'all') => void
  sort: SortOption
  onSortChange: (s: SortOption) => void
  search: string
  onSearchChange: (s: string) => void
  sticky?: boolean
}

const PILLARS: { id: Pillar; label: string }[] = [
  { id: 'institutions', label: PILLAR_LABELS.institutions },
  { id: 'narrative', label: PILLAR_LABELS.narrative },
  { id: 'digital', label: PILLAR_LABELS.digital },
]

export default function PortfolioFilterBar({
  pillar,
  onPillarChange,
  format,
  onFormatChange,
  sort,
  onSortChange,
  search,
  onSearchChange,
  sticky = true,
}: PortfolioFilterBarProps) {
  const [isStuck, setIsStuck] = useState(false)
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!sticky || !node) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0)
        },
        { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
      )
      observer.observe(node)
      return () => observer.unobserve(node)
    },
    [sticky]
  )

  const barClasses =
    sticky && isStuck
      ? 'fixed left-0 right-0 top-0 z-40 border-b border-[rgba(245,245,242,0.10)] bg-[rgba(26,26,26,0.82)] backdrop-blur-md'
      : 'relative border-b border-[rgba(245,245,242,0.10)] bg-obsidian'

  return (
    <>
      <div ref={sentinelRef} className="h-px" aria-hidden />
      {isStuck && <div className="h-[52px]" aria-hidden />}
      <div className={barClasses}>
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-x-6 gap-y-3 px-6 py-3 md:px-10">
          {/* Pillar tabs */}
          <div className="flex overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 md:flex-1 md:overflow-visible">
            <div className="flex min-w-0 gap-1 md:gap-2">
              {PILLARS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onPillarChange(pillar === p.id ? null : p.id)}
                  className={`whitespace-nowrap rounded px-2 py-1.5 text-xs font-medium uppercase tracking-wider transition ${
                    pillar === p.id
                      ? 'border-b-2 border-bone text-bone opacity-100'
                      : 'text-bone/55 hover:text-bone/90 hover:opacity-100'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Format segmented control */}
          <div className="flex items-center rounded border border-bone/10 p-0.5">
            {(['all', 'horizontal', 'vertical'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => onFormatChange(f)}
                className={`rounded px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wider transition ${
                  format === f
                    ? 'bg-bone/10 text-bone'
                    : 'text-bone/55 hover:text-bone/90'
                }`}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>

          {/* Sort + Search */}
          <div className="flex items-center gap-4">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="border-none bg-transparent text-[11px] font-medium uppercase tracking-wider text-bone/75 focus:outline-none focus:ring-0"
              aria-label="Sort by"
            >
              <option value="newest">Newest</option>
              <option value="most-viewed">Most viewed</option>
              <option value="featured">Featured</option>
            </select>
            <input
              type="search"
              placeholder="Search…"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-28 border-none bg-transparent text-[11px] text-bone/75 placeholder:text-bone/40 focus:outline-none focus:ring-0 md:w-36"
              aria-label="Search portfolio"
            />
          </div>
        </div>
      </div>
    </>
  )
}
