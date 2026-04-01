'use client'

import { useEffect, useState } from 'react'
import { buildPortfolioItems, type PortfolioItem } from '@/data/portfolio'
import { YT } from '@/data/videoUrls'

function defaultPortfolioItems(): PortfolioItem[] {
  return buildPortfolioItems([...YT.horizontalReels], [...YT.verticalReels])
}
import PortfolioHero from '@/components/portfolio/PortfolioHero'
import FeaturedRail from '@/components/portfolio/FeaturedRail'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import PortfolioModal from '@/components/portfolio/PortfolioModal'
import ResultsSnapshot from '@/components/portfolio/ResultsSnapshot'
import PortfolioCTA from '@/components/portfolio/PortfolioCTA'

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>(() => defaultPortfolioItems())
  const [modalItem, setModalItem] = useState<PortfolioItem | null>(null)
  const [modalIndex, setModalIndex] = useState(0)

  useEffect(() => {
    Promise.all([
      fetch('/api/reels/horizontal')
        .then((r) => r.json())
        .catch(() => ({ paths: [] as string[] })),
      fetch('/api/reels')
        .then((r) => r.json())
        .catch(() => ({ paths: [] as string[] })),
    ]).then(([horiz, vert]) => {
      const h = Array.isArray(horiz.paths) && horiz.paths.length > 0 ? horiz.paths : [...YT.horizontalReels]
      const v = Array.isArray(vert.paths) && vert.paths.length > 0 ? vert.paths : [...YT.verticalReels]
      setItems(buildPortfolioItems(h, v))
    })
  }, [])

  const horizontalItems = items.filter((i) => i.format === 'horizontal')

  const openModal = (item: PortfolioItem, index: number) => {
    setModalItem(item)
    setModalIndex(index)
  }

  const closeModal = () => setModalItem(null)

  const navigateModal = (index: number) => {
    setModalIndex(index)
    setModalItem(items[index] ?? null)
  }

  return (
    <div className="min-h-screen bg-obsidian">
      <PortfolioHero />

      <FeaturedRail
        items={horizontalItems}
        onItemClick={(item) => {
          const idx = items.indexOf(item)
          if (idx >= 0) openModal(item, idx)
        }}
      />

      <PortfolioGrid items={items} onItemClick={openModal} />

      <ResultsSnapshot />

      <PortfolioCTA />

      <PortfolioModal
        isOpen={!!modalItem}
        item={modalItem}
        allItems={items}
        currentIndex={modalIndex}
        onClose={closeModal}
        onNavigate={navigateModal}
      />
    </div>
  )
}
