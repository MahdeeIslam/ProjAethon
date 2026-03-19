'use client'

import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'
import Container from '@/components/ui/Container'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const services = [
  {
    index: '01',
    title: 'Media Production',
    href: '/services#media-production',
    line: 'Video, photo, design, post.',
    bullets: ['Video + photo', 'On-site capture', 'Post-production'],
  },
  {
    index: '02',
    title: 'Social Media Strategy & Growth',
    href: '/services#social-media',
    line: 'Paid, organic, and optimisation.',
    bullets: ['Content strategy', 'Organic + paid', 'Reporting'],
  },
  {
    index: '03',
    title: 'Digital Platforms & Systems',
    href: '/services#digital-platforms',
    line: 'Web, SEO, analytics.',
    bullets: ['Web + SEO', 'Analytics', 'Funnels'],
  },
  {
    index: '04',
    title: 'Brand & Narrative',
    href: '/services#brand-narrative',
    line: 'Positioning and visual identity.',
    bullets: ['Positioning', 'Visual identity', 'Messaging'],
  },
]

export default function ServicesSection() {
  return (
    <section
      className="relative border-t border-[rgba(245,245,242,0.10)] bg-obsidian pt-14 pb-14 md:pt-20 md:pb-20"
      aria-label="Services"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: NOISE_SVG }}
        aria-hidden
      />
      <Container wide className="relative">
        {/* Header row */}
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/55">
                Capabilities
              </p>
              <h2 className="mt-2 text-3xl font-bold uppercase tracking-tight text-bone md:text-4xl lg:text-[2.5rem]">
                Services
              </h2>
              <p className="mt-2 text-base text-bone/75 max-w-lg">
                Strategy, production, and distribution — built as one system.
              </p>
            </div>
            <Link
              href="/services"
              className="text-sm font-medium uppercase tracking-wider text-bone/85 transition-colors hover:text-bone"
            >
              View services →
            </Link>
          </div>
        </Reveal>
        <div className="mt-6 h-px w-full bg-[rgba(245,245,242,0.10)]" />

        {/* Service cards */}
        <RevealGroup stagger={0.06} duration={0.6} className="mt-10 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-[20px] border border-[rgba(245,245,242,0.12)] bg-[rgba(255,255,255,0.03)] p-7 md:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(245,245,242,0.22)] hover:bg-[rgba(255,255,255,0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/20 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
            >
              <span className="absolute right-6 top-6 text-xs font-medium tracking-[0.12em] text-bone/55">
                {s.index}
              </span>
              <h3 className="pr-10 text-xl font-bold tracking-tight text-bone md:text-2xl">
                {s.title}
              </h3>
              <p className="mt-2 text-base text-bone/80">{s.line}</p>
              <ul className="mt-5 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="text-sm text-bone/80">
                    {b}
                  </li>
                ))}
              </ul>
              <span className="relative mt-auto pt-6 inline-block w-fit pb-1 text-sm font-medium uppercase tracking-wider text-bone/85 transition-colors group-hover:text-bone after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-bone after:transition-[width] after:duration-200 group-hover:after:w-full">
                Learn more →
              </span>
            </Link>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
