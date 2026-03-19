'use client'

import { useMemo, useState } from 'react'
import type { PortfolioItem } from '@/data/portfolio'
import { PILLAR_LABELS, type Pillar } from '@/data/portfolioMeta'
import PortfolioCard from './PortfolioCard'
import RevealGroup from '@/components/motion/RevealGroup'
import Container from '@/components/ui/Container'

const INITIAL_COUNT = 16
const LOAD_MORE_COUNT = 12

type SortOption = 'newest' | 'most-viewed' | 'featured'

interface PortfolioGridProps {
  items: PortfolioItem[]
  pillar: Pillar | null
  format: 'horizontal' | 'vertical' | 'all'
  search: string
  sort: SortOption
  /** Called with (item, indexInFullList) for modal navigation */
  onItemClick: (item: PortfolioItem, indexInFullList: number) => void
}

function filterAndSort(
  items: PortfolioItem[],
  pillar: Pillar | null,
  format: 'horizontal' | 'vertical' | 'all',
  search: string,
  sort: SortOption
): PortfolioItem[] {
  let result = [...items]

  if (pillar) {
    result = result.filter((i) => i.pillar === pillar)
  }

  if (format !== 'all') {
    result = result.filter((i) => i.format === format)
  }

  if (search.trim()) {
    const q = search.toLowerCase().trim()
    result = result.filter(
      (i) =>
        i.client.toLowerCase().includes(q) ||
        i.title.toLowerCase().includes(q) ||
        i.tags.some((t) => t.toLowerCase().includes(q))
    )
  }

  if (sort === 'newest') {
    result.sort((a, b) => b.year - a.year)
  } else if (sort === 'most-viewed') {
    result.sort((a, b) => {
      const av = parseInt(a.metrics?.[0]?.value?.replace(/\D/g, '') ?? '0', 10)
      const bv = parseInt(b.metrics?.[0]?.value?.replace(/\D/g, '') ?? '0', 10)
      return bv - av
    })
  } else if (sort === 'featured') {
    const horizontal = result.filter((i) => i.format === 'horizontal')
    const vertical = result.filter((i) => i.format === 'vertical')
    result = [...horizontal, ...vertical]
  }

  return result
}

export default function PortfolioGrid({
  items,
  pillar,
  format,
  search,
  sort,
  onItemClick,
}: PortfolioGridProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

  const filtered = useMemo(
    () => filterAndSort(items, pillar, format, search, sort),
    [items, pillar, format, search, sort]
  )

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleLoadMore = () => {
    setVisibleCount((n) => Math.min(n + LOAD_MORE_COUNT, filtered.length))
  }

  if (filtered.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-bone/60">No projects match your filters.</p>
      </div>
    )
  }

  return (
    <section id="portfolio-grid" className="scroll-mt-24 pt-14 pb-24 md:pt-16 md:pb-28">
      <Container wide>
        {pillar && (
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.15em] text-bone/60">
            {PILLAR_LABELS[pillar]}
          </p>
        )}

        <RevealGroup
          stagger={0.05}
          delay={0}
          className="columns-1 gap-8 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:break-inside-avoid [&>*]:mb-8"
        >
          {visible.map((item) => {
            const fullIndex = items.indexOf(item)
            return (
              <PortfolioCard
                key={item.id}
                item={item}
                onClick={() => onItemClick(item, fullIndex)}
              />
            )
          })}
        </RevealGroup>

        {hasMore && (
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="rounded-xl border-2 border-bone/25 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-bone/90 transition hover:border-bone/50 hover:text-bone"
            >
              Load more
            </button>
          </div>
        )}
      </Container>
    </section>
  )
}
