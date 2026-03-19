'use client'

import Link from 'next/link'
import { caseStudies } from '@/data/caseStudies'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'
import Section from '@/components/layout/Section'
import Container from '@/components/ui/Container'

const featured = caseStudies.slice(0, 6)

export default function FeaturedCaseStudiesHome() {
  return (
    <Section tone="dark" ariaLabel="Featured case studies">
      <Container>
        <Reveal>
          <h2 className="mb-8 text-2xl font-bold uppercase tracking-tight text-bone md:text-3xl lg:text-4xl">
            Featured case studies
          </h2>
        </Reveal>
        <RevealGroup stagger={0.08} duration={0.7} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:auto-rows-[minmax(220px,auto)]">
          {featured.map((study) => (
            <Link
              key={study.id}
              href={`/case-studies/${study.slug}`}
              className="group flex min-h-[220px] flex-col border border-[var(--line)] bg-[var(--panel)] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--line2)] hover:bg-[var(--panel2)] focus:outline-none focus:ring-2 focus:ring-bone/20 focus:ring-offset-2 focus:ring-offset-obsidian"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-bone/55">
                {study.client}
              </p>
              <h3 className="mt-2 text-lg font-bold tracking-tight text-bone md:text-xl">
                {study.title}
              </h3>
              <p className="mt-3 text-base">
                <span className="font-semibold text-bone/95">
                  {study.atAGlance[0]?.value}
                </span>{' '}
                <span className="font-normal text-bone/65">{study.atAGlance[0]?.label}</span>
              </p>
              {study.atAGlance[1] && (
                <p className="mt-1 text-sm text-bone/60">
                  {study.atAGlance[1].value} {study.atAGlance[1].label}
                </p>
              )}
              <span className="mt-auto pt-5 border-b border-bone/25 pb-1 text-xs font-medium uppercase tracking-wider text-bone/85 transition-colors group-hover:border-bone self-start">
                Read Case Study →
              </span>
            </Link>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}
