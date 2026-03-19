'use client'

import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Kicker from '@/components/ui/Kicker'
import DisplayTitle from '@/components/ui/DisplayTitle'
import { pricingTiers } from '@/data/pricing'
import PricingCard from './PricingCard'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'

export default function InvestmentMenu() {
  return (
    <Section>
      <Container narrow>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <Kicker className="mb-4 text-center">Pricing</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <DisplayTitle as="h2" className="section-title text-center mb-6">
              Investment Menu
            </DisplayTitle>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-center text-xl md:text-2xl opacity-90 mb-12 md:mb-16 leading-relaxed max-w-3xl mx-auto font-medium">
              Choose your growth velocity.
            </p>
          </Reveal>
          <RevealGroup stagger={0.15} delay={0.3} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {pricingTiers.map((tier, index) => (
              <PricingCard 
                key={tier.id}
                tier={tier} 
                isRecommended={index === 1}
              />
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  )
}
