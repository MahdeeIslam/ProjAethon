import { organisations } from '@/data/organisations'
import Reveal from '@/components/motion/Reveal'

/**
 * Stacked organisations grid. Logos arranged in rows; each row fades in/up
 * via `Reveal` as the user scrolls into view. No carousel.
 */

const COLUMNS_PER_ROW = 3

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

export default function OrgLogosStack() {
  const rows = chunk(organisations, COLUMNS_PER_ROW)

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {rows.map((row, idx) => (
        <Reveal key={idx} delay={idx * 0.05}>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {row.map((org) => (
              <div
                key={org.id}
                className="flex h-24 items-center justify-center rounded-2xl border border-bone/10 bg-bone/[0.02] px-6 py-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-bone/70 transition-colors duration-200 hover:border-bone/20 hover:bg-bone/[0.04] hover:text-bone md:h-28 md:text-sm"
              >
                {org.name}
              </div>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
