'use client'

import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'

export default function WhatWeDo() {
  const pillars = [
    {
      label: 'Institutional',
      short: 'I',
      description: 'Brand films, strategic communications, executive content',
      capabilities: [
        'Brand identity systems',
        'Executive leadership content',
        'Strategic communications',
        'Institutional positioning',
        'Stakeholder engagement',
        'Premium event documentation',
        'Annual reports & publications',
        'Crisis communications',
      ],
    },
    {
      label: 'Impact',
      short: 'Im',
      description: 'Documentaries, community stories, social change narratives',
      capabilities: [
        'Impact documentaries',
        'Community storytelling',
        'Social change campaigns',
        'Non-profit narratives',
        'Advocacy content',
        'Awareness campaigns',
        'Fundraising films',
        'Testimonial series',
      ],
    },
    {
      label: 'Signature',
      short: 'Si',
      description: 'Premium positioning, luxury brand identity, exclusive events',
      capabilities: [
        'Luxury brand identity',
        'Exclusive event documentation',
        'Premium positioning',
        'High-touch service model',
        'Discrete partnerships',
        'Executive portraits',
        'Signature campaigns',
        'Elite market presence',
      ],
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-obsidian/50">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              What We Do
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl md:text-2xl opacity-90 mb-16 leading-relaxed max-w-3xl">
              Three pillars. Complete system. Measurable outcomes.
            </p>
          </Reveal>

          {/* Three pillar blocks */}
          <RevealGroup stagger={0.15} delay={0.2} className="space-y-20 md:space-y-24">
            {pillars.map((pillar) => (
              <div
                key={pillar.label}
                className="border-b border-bone/10 pb-16 md:pb-20 last:border-b-0"
              >
                <div className="flex items-start gap-6 md:gap-8 mb-8">
                  <div className="flex-shrink-0">
                    <span className="text-4xl md:text-5xl font-serif font-bold opacity-40">
                      {pillar.short}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                      {pillar.label}
                    </h3>
                    <p className="text-lg md:text-xl opacity-80 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                {/* Capabilities list (tight, executive) */}
                <div className="ml-16 md:ml-20">
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pillar.capabilities.map((capability, capIndex) => (
                      <li
                        key={capIndex}
                        className="text-sm md:text-base opacity-80 leading-relaxed"
                      >
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}

