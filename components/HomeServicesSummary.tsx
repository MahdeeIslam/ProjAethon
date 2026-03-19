'use client'

import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'
import Section from '@/components/layout/Section'
import Container from '@/components/ui/Container'

const pillars = [
  { title: 'Media Production', href: '/services#media-production', line: 'Video, photo, design, post.' },
  { title: 'Social Media Strategy & Growth', href: '/services#social-media', line: 'Paid, organic, and optimisation.' },
  { title: 'Digital Platforms & Systems', href: '/services#digital-platforms', line: 'Web, SEO, analytics.' },
  { title: 'Brand & Narrative', href: '/services#brand-narrative', line: 'Positioning and visual identity.' },
]

export default function HomeServicesSummary() {
  return (
    <Section tone="dark" ariaLabel="Services">
      <Container>
        <Reveal>
          <h2 className="mb-8 text-2xl font-bold uppercase tracking-tight text-bone md:text-3xl lg:text-4xl">
            Services
          </h2>
        </Reveal>
        <RevealGroup stagger={0.08} duration={0.7} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex flex-col border border-[var(--line)] bg-[var(--panel)] p-6 transition duration-200 hover:border-[var(--line2)] hover:bg-[var(--panel2)] focus:outline-none focus:ring-2 focus:ring-bone/20 focus:ring-offset-2 focus:ring-offset-obsidian"
            >
              <span className="mb-3 block h-px w-6 bg-bone/25" aria-hidden />
              <h3 className="text-base font-bold tracking-tight text-bone md:text-lg">
                {p.title}
              </h3>
              <p className="mt-1 text-xs text-bone/65">{p.line}</p>
              <span className="mt-auto pt-4 inline-block border-b border-bone/20 pb-1 text-xs font-medium uppercase tracking-wider text-bone/70 transition-colors group-hover:border-bone w-fit">
                Learn more →
              </span>
            </Link>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}
