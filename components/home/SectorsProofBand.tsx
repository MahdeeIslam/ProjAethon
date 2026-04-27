'use client'

import { organisations } from '@/data/organisations'
import { useEffect, useState } from 'react'
import Container from '@/components/ui/Container'

export default function SectorsProofBand() {
  const [reduceMotion, setReduceMotion] = useState(false)
  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const chips = organisations.map((org) => (
    <span
      key={org.id}
      className="inline-flex h-10 shrink-0 items-center rounded-lg border border-[rgba(245,245,242,0.14)] bg-[rgba(255,255,255,0.03)] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-bone/80"
    >
      {org.name}
    </span>
  ))

  return (
    <section
      className="relative z-10 bg-obsidian border-t border-[rgba(245,245,242,0.10)]"
      aria-label="Organisations we've worked with"
    >
      <Container wide className="py-6 md:py-7">
        <div className="flex flex-col gap-4">
          <p className="shrink-0 pt-0.5 text-sm font-semibold uppercase tracking-[0.2em] text-bone/70">
            Organisations we&apos;ve worked with
          </p>
          <div className="overflow-hidden">
            <div
              className="flex w-max gap-3"
              style={{ animation: reduceMotion ? 'none' : 'homeMarquee 45s linear infinite' }}
            >
              <div className="flex shrink-0 gap-3">{chips}</div>
              <div className="flex shrink-0 gap-3" aria-hidden>
                {chips}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="h-px w-full bg-[rgba(245,245,242,0.12)]" />
    </section>
  )
}
