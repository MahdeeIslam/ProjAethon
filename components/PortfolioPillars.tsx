'use client'

import { useState } from 'react'
import { portfolioItems, PortfolioCategory } from '@/data/portfolioLegacy'
import Lightbox from './Lightbox'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Kicker from '@/components/ui/Kicker'
import DisplayTitle from '@/components/ui/DisplayTitle'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'

export default function PortfolioPillars() {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxMedia, setLightboxMedia] = useState<{ type: 'image' | 'video'; url: string }[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const pillars = [
    {
      category: 'institutional' as PortfolioCategory,
      title: 'Institutional',
      description: 'Brand films, strategic communications, executive content',
    },
    {
      category: 'impact' as PortfolioCategory,
      title: 'Impact',
      description: 'Documentaries, community stories, social change narratives',
    },
    {
      category: 'signature' as PortfolioCategory,
      title: 'Signature',
      description: 'Premium positioning, luxury brand identity, exclusive events',
    },
  ]

  const filteredItems = selectedCategory
    ? portfolioItems.filter((item) => item.category === selectedCategory)
    : portfolioItems

  const handleItemClick = (item: typeof portfolioItems[0]) => {
    setLightboxMedia(item.media)
    setLightboxIndex(0)
    setLightboxOpen(true)
  }

  return (
    <Section>
      <Container narrow>
        <Reveal>
          <Kicker className="mb-4 text-center">Portfolio</Kicker>
        </Reveal>
        <Reveal delay={0.1}>
          <DisplayTitle as="h2" className="section-title text-center mb-6">
            Our Work
          </DisplayTitle>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-center text-lg opacity-70 mb-16 leading-relaxed max-w-2xl mx-auto">
            Three pillars. Premium production. Measurable results.
          </p>
        </Reveal>

        {/* Pillar Grid */}
        <RevealGroup stagger={0.1} delay={0.3} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {pillars.map((pillar) => {
            const pillarItems = portfolioItems.filter((item) => item.category === pillar.category)

            return (
              <div
                key={pillar.category}
                className="border border-bone/10 hover:border-bone/30 transition-all duration-500 cursor-pointer group overflow-hidden"
                onClick={() => setSelectedCategory(pillar.category)}
              >
                {/* TODO: Replace placeholder with actual portfolio thumbnail */}
                {/* Placeholder gallery plate - replace /public/placeholders/plates/pillar-{category}.jpg */}
                <div className="aspect-[4/3] bg-bone/5 flex items-center justify-center relative overflow-hidden group-hover:bg-bone/10 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-obsidian/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(245,245,242,0.1) 10px, rgba(245,245,242,0.1) 20px)' }} />
                    <p className="absolute inset-0 flex items-center justify-center text-xs opacity-40 group-hover:opacity-60 transition-opacity">Gallery Plate</p>
                  </div>
                </div>
                <div className="p-8 md:p-10 group-hover:bg-bone/5 transition-colors duration-500">
                  <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4 tracking-tight">{pillar.title}</h3>
                  <p className="text-base md:text-lg opacity-90 mb-5 leading-relaxed">{pillar.description}</p>
                  <p className="text-sm opacity-70 uppercase tracking-wider font-medium">
                    {pillarItems.length} {pillarItems.length === 1 ? 'project' : 'projects'}
                  </p>
                </div>
              </div>
            )
          })}
        </RevealGroup>

        {/* Filtered Portfolio Grid */}
        {selectedCategory && (
          <Reveal className="mt-16">
            <div>
              <div className="flex gap-3 mb-12 justify-center flex-wrap">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-5 py-2.5 border text-xs tracking-wider uppercase transition-all duration-300 ${
                    !selectedCategory
                      ? 'border-bone bg-bone/10 text-bone'
                      : 'border-bone/20 hover:border-bone/40 text-bone/70 hover:text-bone'
                  }`}
                >
                  All
                </button>
                {pillars.map((pillar) => (
                  <button
                    key={pillar.category}
                    onClick={() => setSelectedCategory(pillar.category)}
                    className={`px-5 py-2.5 border text-xs tracking-wider uppercase transition-all duration-300 ${
                      selectedCategory === pillar.category
                        ? 'border-bone bg-bone/10 text-bone'
                        : 'border-bone/20 hover:border-bone/40 text-bone/70 hover:text-bone'
                    }`}
                  >
                    {pillar.title}
                  </button>
                ))}
              </div>

              <RevealGroup stagger={0.05} delay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-bone/10 hover:border-bone/30 transition-all duration-500 cursor-pointer group overflow-hidden"
                    onClick={() => handleItemClick(item)}
                  >
                    {/* TODO: Replace placeholder with actual portfolio thumbnail */}
                    <div className="aspect-video bg-bone/5 flex items-center justify-center relative overflow-hidden group-hover:bg-bone/10 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="w-full h-full relative bg-gradient-to-br from-obsidian/20 via-bone/5 to-obsidian/20">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(245,245,242,0.1) 10px, rgba(245,245,242,0.1) 20px)' }} />
                        <p className="absolute inset-0 flex items-center justify-center text-xs opacity-40 group-hover:opacity-0 transition-opacity">Gallery Plate</p>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <p className="text-sm font-medium text-center px-4">{item.title}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 md:p-7 group-hover:bg-bone/5 transition-colors duration-500">
                      <h4 className="font-serif text-xl md:text-2xl font-bold mb-3 tracking-tight">{item.title}</h4>
                      <p className="text-sm md:text-base opacity-80 mb-3 uppercase tracking-wide font-medium">{item.client} • {item.year}</p>
                      <p className="text-sm md:text-base opacity-90 leading-relaxed">{item.results}</p>
                    </div>
                  </div>
                ))}
              </RevealGroup>
            </div>
          </Reveal>
        )}

        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          media={lightboxMedia}
          currentIndex={lightboxIndex}
          onNavigate={setLightboxIndex}
        />
      </Container>
    </Section>
  )
}
