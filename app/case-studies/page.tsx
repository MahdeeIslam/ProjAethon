import type { Metadata } from 'next'
import Link from 'next/link'
import { caseStudies, getPrimaryMetric } from '@/data/caseStudies'
import { getHorizontalPhoto } from '@/data/placeholderPhotos'
import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Aethon case studies — real campaigns, real outcomes. Mosques, movements, and event-led funnels.',
}

const BANNER_IMAGE = getHorizontalPhoto(3)

export default function CaseStudiesIndex() {
  return (
    <div className="bg-obsidian">
      {/* Top banner image — full-bleed, sits before "Case Studies" heading */}
      <div
        className="relative h-[280px] w-full overflow-hidden bg-cover bg-center md:h-[380px] lg:h-[460px]"
        style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0.92) 100%)',
          }}
        />
      </div>

      <div className="pt-16 pb-32 md:pt-20">
        <Container wide>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bone/55">
              Selected work
            </p>
            <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight text-bone md:text-5xl lg:text-[3.5rem]">
              Case studies
            </h1>
            <p className="mt-4 max-w-2xl text-base text-bone/80 md:text-lg">
              Real campaigns, measured outcomes, and the work that proves it.
            </p>
          </Reveal>

          <RevealGroup
            stagger={0.06}
            className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-8"
          >
            {caseStudies.map((study) => {
              const primary = getPrimaryMetric(study)
              return (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[rgba(245,245,242,0.10)] bg-[rgba(255,255,255,0.03)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[rgba(245,245,242,0.28)] hover:shadow-[0_14px_44px_rgba(0,0,0,0.4)]"
                >
                  <div
                    className="aspect-[16/9] w-full overflow-hidden bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{ backgroundImage: `url(${study.heroImage})` }}
                    aria-hidden
                  />
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-bone/60">
                      {study.client}
                    </p>
                    <h2 className="mt-2.5 line-clamp-2 min-h-[3.25rem] text-lg font-bold leading-snug tracking-tight text-bone md:text-xl">
                      {study.title}
                    </h2>
                    {primary && (
                      <p className="mt-5 text-2xl font-bold tracking-tight text-bone md:text-3xl">
                        {primary.value}
                      </p>
                    )}
                    {primary && (
                      <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-bone/65">
                        {primary.label}
                      </p>
                    )}
                    <span className="mt-auto pt-7 border-b border-bone/30 pb-1 text-xs font-medium uppercase tracking-wider text-bone/85 transition-colors group-hover:border-bone w-fit">
                      Read case study →
                    </span>
                  </div>
                </Link>
              )
            })}
          </RevealGroup>
        </Container>
      </div>
    </div>
  )
}
