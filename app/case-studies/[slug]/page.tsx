import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { caseStudies, getCaseStudyBySlug, getCaseStudyById } from '@/data/caseStudies'
import CaseStudySidebar from '@/components/CaseStudySidebar'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'

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

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) notFound()

  const related = study.relatedIds
    .map((id) => getCaseStudyById(id))
    .filter((r): r is NonNullable<typeof r> => r != null)
    .slice(0, 3)

  return (
    <div className="pt-24">
      <CaseStudySidebar />
      <Section>
        <Container narrow>
          {/* Title + client + At A Glance */}
          <Reveal>
            <h1 className="mb-4 text-4xl font-bold uppercase tracking-tight text-bone md:text-5xl lg:text-6xl">
              {study.title}
            </h1>
            <p className="mb-10 text-xl text-bone/90">{study.client}</p>
            <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
              {study.atAGlance.map((item, i) => (
                <div
                  key={i}
                  className="border border-bone/20 bg-bone/5 p-4 md:p-6"
                >
                  <p className="text-2xl font-bold tracking-tight text-bone md:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-bone/70">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* THE PROBLEM */}
          <Reveal>
            <h2 className="mb-4 text-xl font-bold uppercase tracking-tight text-bone md:text-2xl">
              The Problem
            </h2>
            <p className="max-w-3xl text-bone/90 leading-relaxed">
              {study.problem}
            </p>
          </Reveal>

          {/* Media plate placeholder */}
          <Reveal delay={0.1}>
            <div className="my-16 aspect-video w-full bg-bone/5 border border-bone/10 flex items-center justify-center">
              {/* TODO: Replace with actual media - /public/placeholders/plates/ */}
              <span className="text-xs uppercase tracking-wider text-bone/40">
                Media plate
              </span>
            </div>
          </Reveal>

          {/* AETHON'S SOLUTION */}
          <Reveal>
            <h2 className="mb-4 text-xl font-bold uppercase tracking-tight text-bone md:text-2xl">
              AETHON&apos;s Solution
            </h2>
            <ul className="max-w-3xl space-y-3">
              {study.solution.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-bone/90 leading-relaxed"
                >
                  <span className="text-accent">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Media plates 2–4 images + 1 video */}
          <RevealGroup stagger={0.08} className="my-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {study.assets.slice(0, 4).map((asset, i) => (
              <div
                key={i}
                className="aspect-[4/3] border border-bone/10 bg-bone/5 flex items-center justify-center overflow-hidden"
              >
                {asset.type === 'video' ? (
                  <video
                    src={asset.url}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    {/* TODO: Replace with actual image - /public/placeholders/plates/ */}
                    <span className="text-xs uppercase tracking-wider text-bone/40">
                      {asset.caption || 'Image'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </RevealGroup>

          {/* THE OUTCOME */}
          <Reveal>
            <h2 className="mb-4 text-xl font-bold uppercase tracking-tight text-bone md:text-2xl">
              The Outcome
            </h2>
            <p className="max-w-3xl text-bone/90 leading-relaxed">
              {study.outcome}
            </p>
            {study.keyOutcomes && study.keyOutcomes.length > 0 && (
              <ul className="mt-6 max-w-3xl space-y-2">
                {study.keyOutcomes.map((line, i) => (
                  <li key={i} className="flex items-start gap-3 text-bone/90">
                    <span className="text-accent">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          {/* Related work */}
          {related.length > 0 && (
            <Reveal>
              <h2 className="mb-6 mt-20 text-xl font-bold uppercase tracking-tight text-bone md:text-2xl">
                Related work
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/case-studies/${r.slug}`}
                    className="block border border-bone/10 p-6 transition hover:border-bone/30"
                  >
                    <h3 className="text-lg font-bold text-bone">{r.title}</h3>
                    <p className="mt-1 text-sm text-bone/70">{r.client}</p>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}

          {/* CTA */}
          <Reveal>
            <div className="mt-16 pt-12 border-t border-bone/10">
              <Link
                href="/contact"
                className="inline-block border-2 border-bone bg-bone px-8 py-3.5 text-obsidian font-bold uppercase tracking-wider transition hover:bg-bone/90"
              >
                Start a Project
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  )
}
