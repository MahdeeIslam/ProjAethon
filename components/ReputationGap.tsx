'use client'

import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Kicker from '@/components/ui/Kicker'
import DisplayTitle from '@/components/ui/DisplayTitle'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'

export default function ReputationGap() {
  const points = [
    'Institutions with strong values and impact often have weak digital presence',
    'Generic marketing fails to reflect institutional gravity and excellence',
    'Cultural misalignment in content production damages credibility',
    'Lack of strategic distribution means quality work goes unseen',
    'We bridge the gap: premium production + cultural alignment + strategic amplification',
  ]

  return (
    <Section>
      <Container narrow>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <Kicker className="mb-4 text-center">The Problem</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <DisplayTitle as="h2" className="section-title text-center mb-6">
              The Reputation Gap
            </DisplayTitle>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-2xl md:text-3xl opacity-95 mb-20 text-center leading-relaxed max-w-3xl mx-auto font-medium">
              Why institutions fail digitally—and how we bridge it.
            </p>
          </Reveal>
          <RevealGroup stagger={0.1} delay={0.3} className="space-y-8">
            {points.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-6 border-l-2 border-bone/20 pl-10 py-4 group hover:border-bone/40 transition-all duration-500"
              >
                <span className="text-accent text-4xl font-serif mt-1 opacity-60 group-hover:opacity-90 transition-opacity duration-300">—</span>
                <p className="text-xl md:text-2xl flex-1 leading-relaxed opacity-95 group-hover:opacity-100 transition-opacity duration-300 font-normal">{point}</p>
              </li>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  )
}
