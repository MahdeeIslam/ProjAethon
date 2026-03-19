'use client'

import { organisations } from '@/data/organisations'
import { useEffect, useState } from 'react'
import Container from '@/components/ui/Container'

export default function HomeOrgMarquee() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
  }, [])

  const chips = organisations.map((org) => (
    <span
      key={org.id}
      className="flex h-8 shrink-0 items-center rounded-sm border border-[var(--line)] bg-[var(--panel)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-bone/50"
    >
      {org.name}
    </span>
  ))

  return (
    <section
      className="border-t border-[var(--line)] bg-obsidian py-6 md:py-8"
      aria-label="Sectors we serve"
    >
      <Container>
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-bone/40">
          Sectors we serve
        </p>
        <div className="overflow-hidden">
          <div
            className="flex w-max gap-4"
            style={{ animation: reduceMotion ? 'none' : 'homeMarquee 50s linear infinite' }}
          >
            <div className="flex shrink-0 gap-4">{chips}</div>
            <div className="flex shrink-0 gap-4" aria-hidden>
              {chips}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
