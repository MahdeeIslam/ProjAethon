import type { Metadata } from 'next'
import Link from 'next/link'
import { team } from '@/data/team'
import { getHorizontalPhoto } from '@/data/placeholderPhotos'
import OrgLogosStack from '@/components/about/OrgLogosStack'
import Section from '@/components/layout/Section'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Aligning public perception with institutional value. Strategic visual communication built to establish immediate authority and sustained momentum.',
}

const PROOF_METRICS = [
  { value: '10M+', label: 'Views generated' },
  { value: '$800K+', label: 'Revenue generated' },
  { value: '150+', label: 'Projects delivered' },
]

const MANDATE_CARDS = [
  {
    num: '01',
    title: 'The Disconnect',
    body: 'The most meaningful institutions often lack the visual gravity they deserve. You are doing the heavy lifting, but the market cannot feel it. We exist to correct that imbalance.',
  },
  {
    num: '02',
    title: 'The Standard',
    body: 'We reject the industry default of high-volume, disposable content. Serious organisations require media that carries weight, executed with visual excellence and strategic intent.',
  },
  {
    num: '03',
    title: 'The Utility',
    body: 'Looking the part is not a luxury. We build visual assets that serve a strict operational purpose: proving your credibility before a single word is read.',
  },
]

const CONTAINER_MAX = 'max-w-[1180px]'

const leadership = team.filter((m) => m.leadership)
const specialists = team.filter((m) => !m.leadership)

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
                <h1 className="mb-6 text-3xl font-bold uppercase leading-[1.1] tracking-tight text-bone md:text-4xl lg:text-5xl">
                  Aligning public perception with institutional value
                </h1>
                <p className="mb-4 text-lg leading-relaxed text-bone/95">
                  Most organisations do better work than their media suggests.
                </p>
                <p className="mb-6 text-lg font-semibold leading-relaxed text-bone">
                  We close that gap.
                </p>
                <p className="mb-8 text-base leading-[1.7] text-bone/90">
                  Strategic visual communication that&apos;s built to establish immediate authority and sustained momentum.
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

      {/* ——— THE MANDATE: 3 premium cards ——— */}
      <Section className="!pt-24 !pb-24 md:!pt-[96px] md:!pb-[96px]">
        <div className={`mx-auto w-full ${CONTAINER_MAX} px-6 md:px-10`}>
          <Reveal>
            <h2 className="mb-3 text-2xl font-bold uppercase tracking-tight text-bone md:text-3xl">
              The Mandate
            </h2>
            <p className="mb-12 max-w-[60ch] text-base leading-relaxed text-bone/90">
              Bridging the gap between the importance of your work and how the world perceives it.
            </p>
          </Reveal>
          <RevealGroup stagger={0.08} className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {MANDATE_CARDS.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-bone/10 bg-bone/[0.02] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-bone/20 hover:bg-bone/[0.04] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] md:p-8"
              >
                <p className="mb-3 text-xs font-bold tracking-[0.2em] text-bone/55">
                  {card.num}
                </p>
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

      {/* ——— ORGANISATIONS: stacked logos with scroll fade-in ——— */}
      <Section className="!pt-24 !pb-24 md:!pt-[96px] md:!pb-[96px]">
        <div className={`mx-auto w-full ${CONTAINER_MAX} px-6 md:px-10`}>
          <Reveal>
            <h2 className="mb-3 text-2xl font-bold uppercase tracking-tight text-bone md:text-3xl">
              Organisations we&apos;ve worked with
            </h2>
            <p className="mb-12 max-w-[50ch] text-base leading-relaxed text-bone/90">
              Institutions and community organisations across education, public trust, and media.
            </p>
          </Reveal>
          <OrgLogosStack />
        </div>
      </Section>

      {/* ——— TEAM: leadership row (large) + specialists row (smaller) ——— */}
      <Section className="!pt-24 !pb-24 md:!pt-[96px] md:!pb-[96px]">
        <div className={`mx-auto w-full ${CONTAINER_MAX} px-6 md:px-10`}>
          <Reveal>
            <p className="mb-3 inline-block rounded-full border border-bone/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-bone/80">
              Meet the team
            </p>
            <h2 className="mb-14 text-3xl font-bold tracking-tight text-bone md:text-4xl">
              Who you&apos;ll be working with
            </h2>
          </Reveal>

          {/* Leadership — bigger images, optional italic specialty */}
          <RevealGroup
            stagger={0.08}
            className="mx-auto grid max-w-[820px] grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12"
          >
            {leadership.map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center text-center"
              >
                <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-2xl bg-bone/10 md:h-56 md:w-56">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-5xl font-bold text-bone/90">
                      {member.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-bone md:text-2xl">
                  {member.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-bone/85 md:text-base">
                  {member.role}
                </p>
                {member.specialty && (
                  <p className="mt-3 max-w-[34ch] text-sm italic leading-relaxed text-bone/70 md:text-[15px]">
                    {member.specialty}
                  </p>
                )}
              </div>
            ))}
          </RevealGroup>

          {/* Divider line */}
          <div className="my-14 h-px w-full bg-bone/10 md:my-16" aria-hidden />

          {/* Specialists — smaller, names + roles only */}
          <RevealGroup
            stagger={0.05}
            className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-10"
          >
            {specialists.map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center text-center"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-bone/10 md:h-32 md:w-32">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-2xl font-bold text-bone/90">
                      {member.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-base font-bold tracking-tight text-bone md:text-lg">
                  {member.name}
                </h3>
                <p className="mt-1 max-w-[18ch] text-xs leading-snug text-bone/75 md:text-sm">
                  {member.role}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ——— FINAL CTA: closing argument panel ——— */}
      <section className="border-t border-bone/10 bg-[rgba(0,0,0,0.25)] py-16 md:py-24">
        <div className={`mx-auto w-full ${CONTAINER_MAX} px-6 text-center md:px-10`}>
          <Reveal>
            <h2 className="mb-4 text-3xl font-bold uppercase tracking-tight text-bone md:text-4xl lg:text-5xl">
              No compromises.
            </h2>
            <p className="mx-auto mb-10 max-w-[60ch] text-base leading-relaxed text-bone/90 md:text-lg">
              If the work your institution does matters, your media should reflect it. Let&apos;s discuss your next project.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-bone/25 bg-bone/10 px-6 py-3.5 text-sm font-medium uppercase tracking-wider text-bone transition hover:-translate-y-px hover:border-bone/35 hover:bg-bone/15 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
              >
                Request a strategic consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
