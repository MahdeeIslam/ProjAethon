import type { Metadata } from 'next'
import Link from 'next/link'
import { team } from '@/data/team'
import { organisations } from '@/data/organisations'
import { getHorizontalPhoto } from '@/data/placeholderPhotos'
import Container from '@/components/ui/Container'
import Section from '@/components/layout/Section'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'

export const metadata: Metadata = {
  title: 'About',
  description: 'Visual Media is Leverage. We build visual systems that move people to act — with strategy, production, and distribution in lockstep.',
}

const PROOF_METRICS = [
  { value: '40M+', label: 'Views generated' },
  { value: '$450k+', label: 'Raised' },
  { value: '450+', label: 'Clips delivered' },
]

const SOLVE_CARDS = [
  {
    title: 'Fragmentation',
    body: 'Disjointed assets, inconsistent identity, and content that doesn\'t compound. We unify it into one system.',
  },
  {
    title: 'Friction',
    body: 'Great work with no funnel: no landing pages, no distribution, no tracking. We remove the bottlenecks.',
  },
  {
    title: 'Anonymity',
    body: 'You\'re doing meaningful work, but the market can\'t feel it. We engineer positioning that makes you memorable.',
  },
]

const HOW_WE_WORK_STEPS = [
  { num: '01', title: 'Discover', body: 'Goals, audience, success metrics.' },
  { num: '02', title: 'Strategy', body: 'Narrative, content system, distribution plan.' },
  { num: '03', title: 'Produce', body: 'Film, design, editing, delivery standards.' },
  { num: '04', title: 'Scale', body: 'Deploy, optimise, measure, iterate.' },
]

const CONTAINER_MAX = 'max-w-[1180px]'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-obsidian text-bone">
      {/* ——— HERO: 2-column + proof sidebar ——— */}
      <section className="relative border-b border-bone/10 pt-24 pb-16 md:pt-[96px] md:pb-20">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.08]"
          style={{ backgroundImage: `url(${getHorizontalPhoto(1)})` }}
          aria-hidden
        />
        <div className={`relative mx-auto w-full ${CONTAINER_MAX} px-6 md:px-10`}>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_0.7fr] md:gap-16">
            <Reveal>
              <div className="max-w-[70ch]">
                <h1 className="mb-4 text-3xl font-bold uppercase tracking-tight text-bone md:text-4xl lg:text-5xl">
                  Visual media is leverage.
                </h1>
                <p className="mb-6 text-lg leading-relaxed text-bone/95">
                  We build visual systems that move people to act — with strategy, production, and distribution in lockstep.
                </p>
                <p className="mb-4 text-base leading-[1.7] text-bone/90">
                  Most creative work is treated as decoration: a one-off deliverable that looks good but does nothing. We don&apos;t do that.
                </p>
                <p className="mb-8 text-base leading-[1.7] text-bone/90">
                  We treat production like an engineering problem — how do we shape perception, earn attention, and convert it into measurable outcomes?
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-lg border border-bone/25 bg-bone/10 px-6 py-3 text-sm font-medium uppercase tracking-wider text-bone transition hover:-translate-y-px hover:border-bone/35 hover:bg-bone/15 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                  >
                    Request a strategic consultation
                  </Link>
                  <Link
                    href="/case-studies"
                    className="text-sm font-medium uppercase tracking-wider text-bone/90 underline-offset-4 transition hover:text-bone hover:underline"
                  >
                    View case studies →
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Proof sidebar */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-bone/10 bg-bone/[0.03] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-8">
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-bone/65">
                  Proof
                </p>
                <ul className="space-y-5">
                  {PROOF_METRICS.map((m) => (
                    <li key={m.label}>
                      <p className="text-2xl font-bold tracking-tight text-bone md:text-3xl">
                        {m.value}
                      </p>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-bone/80">
                        {m.label}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-bone/10 pt-5 text-sm leading-relaxed text-bone/80">
                  Built across institutions, campaigns, and public trust work.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— WHAT WE SOLVE: 3 premium cards ——— */}
      <Section className="!pt-24 !pb-24 md:!pt-[96px] md:!pb-[96px]">
        <div className={`mx-auto w-full ${CONTAINER_MAX} px-6 md:px-10`}>
          <Reveal>
            <h2 className="mb-3 text-2xl font-bold uppercase tracking-tight text-bone md:text-3xl">
              What we solve
            </h2>
            <p className="mb-12 max-w-[60ch] text-base leading-relaxed text-bone/90">
              Three failure modes that keep good organisations invisible.
            </p>
          </Reveal>
          <RevealGroup stagger={0.08} className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {SOLVE_CARDS.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-bone/10 bg-bone/[0.02] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-bone/20 hover:bg-bone/[0.04] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] md:p-8"
              >
                <h3 className="mb-3 text-xl font-bold tracking-tight text-bone">
                  {card.title}
                </h3>
                <p className="text-base leading-[1.65] text-bone/90">
                  {card.body}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ——— HOW WE WORK: 4-step strip ——— */}
      <Section className="!pt-24 !pb-24 md:!pt-[96px] md:!pb-[96px]">
        <div className={`mx-auto w-full ${CONTAINER_MAX} px-6 md:px-10`}>
          <Reveal>
            <h2 className="mb-3 text-2xl font-bold uppercase tracking-tight text-bone md:text-3xl">
              How we work
            </h2>
            <p className="mb-14 max-w-[60ch] text-base leading-relaxed text-bone/90">
              A simple system that turns content into a compounding asset.
            </p>
          </Reveal>
          <RevealGroup
            stagger={0.06}
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {HOW_WE_WORK_STEPS.map((step) => (
              <div key={step.num} className="flex gap-4">
                <div className="flex shrink-0 flex-col items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-bone/70">
                    {step.num}
                  </span>
                  <div className="mt-1 h-8 w-px bg-bone/15" aria-hidden />
                </div>
                <div>
                  <h3 className="mb-2 text-base font-bold uppercase tracking-wider text-bone">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-bone/88">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ——— ORGANISATIONS: credibility wall ——— */}
      <Section className="!pt-24 !pb-24 md:!pt-[96px] md:!pb-[96px]">
        <div className={`mx-auto w-full ${CONTAINER_MAX} px-6 md:px-10`}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
            <Reveal>
              <div>
                <h2 className="mb-3 text-2xl font-bold uppercase tracking-tight text-bone md:text-3xl">
                  Organisations we&apos;ve worked with
                </h2>
                <p className="max-w-[50ch] text-base leading-relaxed text-bone/90">
                  Institutions and community organisations across education, public trust, and media.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {organisations.map((org) => (
                  <div
                    key={org.id}
                    className="flex min-h-[64px] items-center justify-center rounded-xl border border-bone/10 bg-bone/[0.02] px-4 py-3.5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-bone/15 hover:bg-bone/[0.04]"
                  >
                    <span className="text-sm font-medium uppercase tracking-wider text-bone/88">
                      {org.name}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal>
            <p className="mt-8 text-sm text-bone/70">
              Full client list available on request.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ——— TEAM: main three (Saad, Nazif, Barisa) ——— */}
      <Section className="!pt-24 !pb-24 md:!pt-[96px] md:!pb-[96px]">
        <div className={`mx-auto w-full ${CONTAINER_MAX} px-6 md:px-10`}>
          <Reveal>
            <h2 className="mb-3 text-2xl font-bold uppercase tracking-tight text-bone md:text-3xl">
              Meet our team
            </h2>
            <p className="mb-14 max-w-[60ch] text-base leading-relaxed text-bone/90">
              A small, senior team built for high-stakes creative execution.
            </p>
          </Reveal>
          <RevealGroup
            stagger={0.08}
            className="grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            {team.filter((m) => m.leadership).map((member) => (
              <div
                key={member.id}
                className="group flex flex-col items-center rounded-2xl border border-bone/10 bg-bone/[0.02] p-8 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-bone/20 hover:bg-bone/[0.04] hover:shadow-[0_8px_28px_rgba(0,0,0,0.25)] md:p-10"
              >
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-bone/10 md:h-36 md:w-36">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-3xl font-bold text-bone/90">
                      {member.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-bone md:text-2xl">
                  {member.name}
                </h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-bone/80 md:text-base">
                  {member.role}
                </p>
                {member.specialty && (
                  <p className="mt-4 max-w-[280px] text-base leading-relaxed text-bone/90 md:text-lg">
                    {member.specialty}
                  </p>
                )}
              </div>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ——— FINAL CTA: closing argument panel ——— */}
      <section className="border-t border-bone/10 bg-[rgba(0,0,0,0.25)] py-16 md:py-24">
        <div className={`mx-auto w-full ${CONTAINER_MAX} px-6 text-center md:px-10`}>
          <Reveal>
            <h2 className="mb-4 text-2xl font-bold uppercase tracking-tight text-bone md:text-3xl lg:text-4xl">
              Ready to build a visual system that compounds?
            </h2>
            <p className="mx-auto mb-10 max-w-[60ch] text-base leading-relaxed text-bone/90">
              Bring your goals. We&apos;ll map the strategy, production plan, and distribution system — then execute.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-bone/25 bg-bone/10 px-6 py-3.5 text-sm font-medium uppercase tracking-wider text-bone transition hover:-translate-y-px hover:border-bone/35 hover:bg-bone/15 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
              >
                Request a strategic consultation
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-bone/25 px-6 py-3.5 text-sm font-medium uppercase tracking-wider text-bone/90 transition hover:border-bone/35 hover:text-bone"
              >
                Book a call
              </Link>
            </div>
            <p className="mt-6 text-sm text-bone/70">
              Typically 15–30 minutes. No pressure. We&apos;ll tell you if we&apos;re a fit.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
