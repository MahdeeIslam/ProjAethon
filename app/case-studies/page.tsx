import type { Metadata } from 'next'
import Link from 'next/link'
import { caseStudies } from '@/data/caseStudies'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'ROI-focused case studies. Real results and measurable impact.',
}

export default function CaseStudiesIndex() {
  return (
    <div className="pt-24 pb-32">
      <div className="container mx-auto px-6 md:px-8">
        <Reveal>
          <h1 className="mb-4 text-4xl font-bold uppercase tracking-tight text-bone md:text-5xl lg:text-6xl">
            Case Studies
          </h1>
          <p className="mb-16 max-w-2xl text-bone/80">
            Real results. Measurable impact. Premium execution.
          </p>
        </Reveal>
        <RevealGroup stagger={0.08} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <Link
              key={study.id}
              href={`/case-studies/${study.slug}`}
              className="group block border border-bone/10 bg-bone/5 p-6 transition hover:border-bone/30 hover:bg-bone/10 md:p-8"
            >
              <p className="text-xs uppercase tracking-wider text-bone/60">{study.client}</p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-bone md:text-2xl group-hover:opacity-90">
                {study.title}
              </h2>
              <p className="mt-3 text-sm text-bone/80 line-clamp-2">
                {study.atAGlance[0]?.value} {study.atAGlance[0]?.label}
              </p>
              <span className="mt-4 inline-block border-b border-bone/40 pb-1 text-sm font-medium text-bone/90 group-hover:border-bone">
                Read Case Study →
              </span>
            </Link>
          ))}
        </RevealGroup>
      </div>
    </div>
  )
}
