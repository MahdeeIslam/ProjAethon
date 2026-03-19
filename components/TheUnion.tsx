'use client'

import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Kicker from '@/components/ui/Kicker'
import DisplayTitle from '@/components/ui/DisplayTitle'
import { founders } from '@/data/founders'
import FounderCard from './FounderCard'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'

export default function TheUnion() {
  return (
    <Section>
      <Container narrow>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <Kicker className="mb-4 text-center">Founders</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <DisplayTitle as="h2" className="section-title text-center mb-6">
              The Union
            </DisplayTitle>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-center text-xl md:text-2xl opacity-90 mb-20 leading-relaxed max-w-3xl mx-auto font-medium">
              Three specialists. One standard of excellence.
            </p>
          </Reveal>
          <RevealGroup stagger={0.1} delay={0.3} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {founders.map((founder) => (
              <FounderCard key={founder.id} founder={founder} />
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  )
}
