'use client'

import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'
import Section from '@/components/layout/Section'
import Container from '@/components/ui/Container'

const steps = [
  { num: '01', kicker: 'Discover', line: 'We align on goals, audience, and success metrics.' },
  { num: '02', kicker: 'Strategy', line: 'We design the system: content, distribution, and tracking.' },
  { num: '03', kicker: 'Produce', line: 'World-class production with vocal-only audio standards.' },
  { num: '04', kicker: 'Scale', line: 'We launch, optimise, and report on measurable impact.' },
]

export default function FourStepProcess() {
  return (
    <Section tone="dark" ariaLabel="Our 4 step process">
      <Container>
        <Reveal>
          <h2 className="mb-8 text-2xl font-bold uppercase tracking-tight text-bone md:text-3xl lg:text-4xl">
            Our 4 step process
          </h2>
        </Reveal>
        <RevealGroup stagger={0.08} duration={0.7} className="grid gap-6 md:grid-cols-2 md:gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative flex gap-5 border-l border-[var(--line)] pl-5"
            >
              <span
                className="absolute -left-px top-0 h-full w-px bg-[var(--line)]"
                aria-hidden
              />
              <span className="shrink-0 text-sm font-bold text-bone/40">
                {step.num}
              </span>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bone/55">
                  {step.kicker}
                </span>
                <p className="mt-1 text-sm leading-relaxed text-bone/85">
                  {step.line}
                </p>
              </div>
            </div>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}
