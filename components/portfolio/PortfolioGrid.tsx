'use client'

import type { PortfolioItem } from '@/data/portfolio'
import {
  PILLAR_LABELS,
  type Pillar,
} from '@/data/portfolioMeta'
import PortfolioCard from './PortfolioCard'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'
import Container from '@/components/ui/Container'

interface PortfolioGridProps {
  items: PortfolioItem[]
  onItemClick: (item: PortfolioItem, indexInFullList: number) => void
}

/**
 * Masonry layout via CSS multi-column. Each card breaks naturally
 * inside a column; vertical (9:16) and horizontal (16:9) clips share
 * the same column and pack tightly with no rigid rows.
 */
const MASONRY_CLASSES =
  'columns-1 gap-5 sm:columns-2 lg:columns-3 lg:gap-6 [&>*]:break-inside-avoid [&>*]:mb-5 lg:[&>*]:mb-6'

const PILLAR_ORDER: Pillar[] = ['institutions', 'narrative', 'digital']

const PILLAR_BLURBS: Record<Pillar, string> = {
  institutions:
    'Civic, religious, and public-trust organisations whose work shapes communities.',
  narrative:
    'Long-form documentary, short film, and reflective stories built to be remembered.',
  digital:
    'Ongoing short-form, branded content, and digital presence work.',
}

export default function PortfolioGrid({ items, onItemClick }: PortfolioGridProps) {
  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-bone/60">No portfolio videos to show.</p>
      </div>
    )
  }

  const byPillar: Record<Pillar, PortfolioItem[]> = {
    institutions: [],
    narrative: [],
    digital: [],
  }
  for (const item of items) {
    byPillar[item.pillar].push(item)
  }

  return (
    <section
      id="portfolio-grid"
      className="scroll-mt-24 bg-obsidian pt-16 pb-24 md:pt-20 md:pb-28"
      aria-label="Portfolio work, grouped by category"
    >
      <Container wide>
        {PILLAR_ORDER.map((pillar, sectionIdx) => {
          const list = byPillar[pillar]
          if (list.length === 0) return null

          return (
            <div
              key={pillar}
              className={sectionIdx > 0 ? 'mt-20 md:mt-24' : ''}
            >
              <Reveal>
                <div className="mb-8 flex flex-col gap-2 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-8">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bone/55">
                      {String(sectionIdx + 1).padStart(2, '0')}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold uppercase tracking-tight text-bone md:text-4xl lg:text-[2.5rem]">
                      {PILLAR_LABELS[pillar]}
                    </h2>
                  </div>
                  <p className="max-w-sm text-sm text-bone/65 md:text-base">
                    {PILLAR_BLURBS[pillar]}
                  </p>
                </div>
              </Reveal>

              <RevealGroup stagger={0.05} delay={0} className={MASONRY_CLASSES}>
                {list.map((item) => (
                  <PortfolioCard
                    key={item.id}
                    item={item}
                    onClick={() => onItemClick(item, items.indexOf(item))}
                  />
                ))}
              </RevealGroup>
            </div>
          )
        })}
      </Container>
    </section>
  )
}
