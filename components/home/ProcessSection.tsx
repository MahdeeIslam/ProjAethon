'use client'

import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'
import Container from '@/components/ui/Container'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const steps = [
  { num: '01', kicker: 'Discover', line: 'We align on goals, audience, and success metrics.' },
  { num: '02', kicker: 'Strategy', line: 'We design the system: content, distribution, and tracking.' },
  { num: '03', kicker: 'Produce', line: 'World-class production with vocal-only audio standards.' },
  { num: '04', kicker: 'Scale', line: 'We launch, optimise, and report on measurable impact.' },
]

export default function ProcessSection() {
  return (
    <section
      className="relative mt-8 mb-12 border-t border-[rgba(245,245,242,0.10)] bg-obsidian pt-14 pb-14 md:mb-12 md:pt-20 md:pb-20"
      aria-label="Our 4 step process"
    >
      {/* Optional noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: NOISE_SVG }}
        aria-hidden
      />
      <Container wide className="relative">
        <Reveal>
          <h2 className="mb-10 text-3xl font-bold uppercase tracking-tight text-bone md:text-4xl lg:text-[2.5rem]">
            Our 4 step process
          </h2>
        </Reveal>
        <RevealGroup
          stagger={0.06}
          duration={0.6}
          className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:items-stretch md:gap-x-8 md:gap-y-6 [&>div]:min-h-0 [&>div]:h-full"
        >
          {steps.map((step) => (
            <div
              key={step.num}
              className="group relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-[20px] border border-[rgba(245,245,242,0.12)] bg-[rgba(255,255,255,0.03)] p-7 md:p-8 transition-all duration-200 hover:border-[rgba(245,245,242,0.22)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none"
            >
              <div className="flex shrink-0 items-start justify-between gap-4">
                <span className="text-sm font-medium tabular-nums tracking-[0.2em] text-bone/70">
                  {step.num}
                </span>
                <span className="text-right text-sm font-semibold uppercase tracking-[0.2em] text-bone/90">
                  {step.kicker}
                </span>
              </div>
              <p className="mt-5 flex-1 text-balance text-base leading-relaxed text-bone/85 md:text-lg">
                {step.line}
              </p>
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[rgba(245,245,242,0.12)] transition-colors duration-200 group-hover:bg-[rgba(245,245,242,0.35)]"
                aria-hidden
              />
            </div>
          ))}
        </RevealGroup>

        {/* CTA row */}
        <Reveal>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="text-base text-bone/75">Prefer a guided start?</p>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center border border-[rgba(245,245,242,0.35)] px-6 text-sm font-semibold uppercase tracking-[0.12em] text-bone transition-colors hover:border-bone/50 hover:bg-[rgba(245,245,242,0.06)] focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/30 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
            >
              Request a Strategic Consultation
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
