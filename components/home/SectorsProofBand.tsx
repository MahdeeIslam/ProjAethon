'use client'

import { organisations } from '@/data/organisations'
import Container from '@/components/ui/Container'

export default function SectorsProofBand() {
  return (
    <section
      className="bg-obsidian border-t border-[rgba(245,245,242,0.10)]"
      aria-label="Sectors we serve"
    >
      <Container wide className="py-5 md:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className="shrink-0 text-sm font-semibold uppercase tracking-[0.2em] text-bone/70">
            Sectors we serve
          </p>
          <div className="flex flex-wrap gap-2.5 max-w-3xl">
            {organisations.map((org) => (
              <span
                key={org.id}
                className="inline-flex items-center py-2.5 px-4 text-sm font-medium uppercase tracking-[0.1em] text-bone/80 transition-colors hover:text-bone hover:border-bone/25 border border-[rgba(245,245,242,0.14)] rounded-lg bg-[rgba(255,255,255,0.03)]"
              >
                {org.name}
              </span>
            ))}
          </div>
        </div>
      </Container>
      <div className="h-px w-full bg-[rgba(245,245,242,0.12)]" />
    </section>
  )
}
