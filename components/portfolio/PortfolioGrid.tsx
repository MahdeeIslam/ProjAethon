'use client'

import type { PortfolioItem } from '@/data/portfolio'
import PortfolioCard from './PortfolioCard'
import RevealGroup from '@/components/motion/RevealGroup'
import Container from '@/components/ui/Container'

interface PortfolioGridProps {
  items: PortfolioItem[]
  onItemClick: (item: PortfolioItem, indexInFullList: number) => void
}

export default function PortfolioGrid({ items, onItemClick }: PortfolioGridProps) {
  const horizontal = items.filter((i) => i.format === 'horizontal')
  const vertical = items.filter((i) => i.format === 'vertical')

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-bone/60">No portfolio videos to show.</p>
      </div>
    )
  }

  const gridClass =
    'columns-1 gap-8 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:break-inside-avoid [&>*]:mb-8'

  return (
    <section id="portfolio-grid" className="scroll-mt-24 pt-14 pb-24 md:pt-16 md:pb-28">
      <Container wide>
        {horizontal.length > 0 && (
          <div className="mb-16 md:mb-20">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-bone/55">
              Landscape · 16:9
            </p>
            <RevealGroup stagger={0.05} delay={0} className={gridClass}>
              {horizontal.map((item) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  onClick={() => onItemClick(item, items.indexOf(item))}
                />
              ))}
            </RevealGroup>
          </div>
        )}

        {vertical.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-bone/55">
              Portrait · 9:16
            </p>
            <RevealGroup stagger={0.05} delay={0} className={gridClass}>
              {vertical.map((item) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  onClick={() => onItemClick(item, items.indexOf(item))}
                />
              ))}
            </RevealGroup>
          </div>
        )}
      </Container>
    </section>
  )
}
