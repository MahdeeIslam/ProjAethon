import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { caseStudies, getCaseStudyBySlug, getCaseStudyById } from '@/data/caseStudies'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'
import CaseStudyMedia, { CaseStudyTour } from '@/components/caseStudies/CaseStudyMedia'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) return { title: 'Case Study' }
  return {
    title: study.title,
    description: `${study.client} — ${study.atAGlance[0]?.value} ${study.atAGlance[0]?.label}`,
  }
}

const STAT_CARD_BASE =
  'flex h-full min-h-[112px] flex-col justify-between rounded-2xl border border-[rgba(245,245,242,0.14)] bg-[rgba(255,255,255,0.04)] p-5 md:p-6'

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold uppercase tracking-tight text-bone md:text-3xl">
    {children}
  </h2>
)

const SectionBody = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-4 max-w-3xl text-base leading-relaxed text-bone/85 md:text-lg">
    {children}
  </p>
)

const SolutionList = ({ items }: { items: string[] }) => (
  <ul className="mt-5 max-w-3xl space-y-3">
    {items.map((line, i) => (
      <li
        key={i}
        className="flex items-start gap-3 text-base leading-relaxed text-bone/90 md:text-lg"
      >
        <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <span>{line}</span>
      </li>
    ))}
  </ul>
)

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) notFound()

  const related = study.relatedIds
    .map((id) => getCaseStudyById(id))
    .filter((r): r is NonNullable<typeof r> => r != null)
    .slice(0, 3)

  return (
    <div className="bg-obsidian">
      {/* Top banner image — same hero image used on the index card */}
      <div
        className="relative h-[260px] w-full overflow-hidden bg-cover bg-center md:h-[340px] lg:h-[420px]"
        style={{ backgroundImage: `url(${study.heroImage})` }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.65) 60%, rgba(10,10,10,0.95) 100%)',
          }}
        />
      </div>

      <Section>
        <Container narrow>
          {/* Title + client + At A Glance */}
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bone/55">
              Case study
            </p>
            <h1 className="mt-3 text-4xl font-bold uppercase leading-[1.02] tracking-tight text-bone md:text-5xl lg:text-[3.25rem]">
              {study.title}
            </h1>
            <p className="mt-4 text-lg font-medium text-bone/85 md:text-xl">
              {study.client}
            </p>

            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {study.atAGlance.map((item, i) => (
                <div key={i} className={STAT_CARD_BASE}>
                  <p className="text-2xl font-bold leading-tight tracking-tight text-bone md:text-[2rem]">
                    {item.value}
                  </p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-bone/65">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Layout-aware body
              ───────────────────
              • triple-vertical      : Problem → 3 vertical reels → Solution
              • side-vertical        : (Problem + Solution stacked) <-> 1 vertical reel
              • horizontal-with-tour : Problem → horizontal reel → Solution → 3-photo tour
          */}
          {study.mediaLayout === 'side-vertical' ? (
            <div className="mt-20 md:mt-24">
              <CaseStudyMedia
                study={study}
                leftContent={
                  <div>
                    <Reveal>
                      <SectionHeading>The Problem</SectionHeading>
                      <SectionBody>{study.problem}</SectionBody>
                    </Reveal>
                    <Reveal delay={0.05}>
                      <div className="mt-12">
                        <SectionHeading>AETHON&apos;s Solution</SectionHeading>
                        <SolutionList items={study.solution} />
                      </div>
                    </Reveal>
                  </div>
                }
              />
            </div>
          ) : (
            <>
              <Reveal>
                <div className="mt-20 md:mt-24">
                  <SectionHeading>The Problem</SectionHeading>
                  <SectionBody>{study.problem}</SectionBody>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="mt-12 md:mt-14">
                  <CaseStudyMedia study={study} />
                </div>
              </Reveal>

              <Reveal>
                <div className="mt-14 md:mt-16">
                  <SectionHeading>AETHON&apos;s Solution</SectionHeading>
                  <SolutionList items={study.solution} />
                </div>
              </Reveal>

              {study.mediaLayout === 'horizontal-with-tour' &&
                study.tourPhotos &&
                study.tourPhotos.length > 0 && (
                  <Reveal delay={0.05}>
                    <div className="mt-14 md:mt-16">
                      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-bone/55">
                        Inside the event
                      </p>
                      <CaseStudyTour
                        photos={study.tourPhotos}
                        client={study.client}
                      />
                    </div>
                  </Reveal>
                )}
            </>
          )}

          {/* The Outcome */}
          <Reveal>
            <div className="mt-20 md:mt-24">
              <SectionHeading>The Outcome</SectionHeading>
              <SectionBody>{study.outcome}</SectionBody>
              {study.keyOutcomes && study.keyOutcomes.length > 0 && (
                <ul className="mt-6 max-w-3xl space-y-3">
                  {study.keyOutcomes.map((line, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-base leading-relaxed text-bone/85 md:text-lg"
                    >
                      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>

          {/* Other case studies (renamed) — uniform cards */}
          {related.length > 0 && (
            <Reveal>
              <div className="mt-24 md:mt-28">
                <SectionHeading>Other case studies</SectionHeading>
                <RevealGroup
                  stagger={0.06}
                  className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3"
                >
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      href={`/case-studies/${r.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[rgba(245,245,242,0.10)] bg-[rgba(255,255,255,0.03)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[rgba(245,245,242,0.28)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
                    >
                      <div
                        className="aspect-[16/9] w-full overflow-hidden bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
                        style={{ backgroundImage: `url(${r.heroImage})` }}
                        aria-hidden
                      />
                      <div className="flex flex-1 flex-col p-5 md:p-6">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-bone/60">
                          {r.client}
                        </p>
                        <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug tracking-tight text-bone md:text-lg">
                          {r.title}
                        </h3>
                        <span className="mt-auto pt-5 border-b border-bone/30 pb-1 text-xs font-medium uppercase tracking-wider text-bone/80 transition-colors group-hover:border-bone w-fit">
                          Read case study →
                        </span>
                      </div>
                    </Link>
                  ))}
                </RevealGroup>
              </div>
            </Reveal>
          )}

          {/* CTA — centered Start a Project button */}
          <Reveal>
            <div className="mt-20 flex flex-col items-center gap-3 border-t border-bone/10 pt-14 text-center md:mt-24 md:pt-16">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-bone/70 bg-white/[0.06] px-8 h-12 text-sm font-semibold uppercase tracking-[0.14em] text-bone backdrop-blur-md transition-all duration-300 hover:bg-white/[0.14] hover:border-bone hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(245,245,242,0.22)] focus:outline-none focus:ring-2 focus:ring-bone/50 focus:ring-offset-2 focus:ring-offset-obsidian"
              >
                Start a project
              </Link>
              <Link
                href="/case-studies"
                className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-bone/55 transition-colors hover:text-bone/85"
              >
                ← All case studies
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  )
}
