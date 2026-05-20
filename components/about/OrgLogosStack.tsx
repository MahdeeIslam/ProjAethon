import { organisations } from '@/data/organisations'
import Reveal from '@/components/motion/Reveal'

/**
 * Stacked organisations grid. Logos arranged in rows; each row fades in/up
 * via `Reveal` as the user scrolls into view. No carousel.
 */

const COLUMNS_PER_ROW_DESKTOP = 4

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

export default function OrgLogosStack() {
  const rows = chunk(organisations, COLUMNS_PER_ROW_DESKTOP)

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {rows.map((row, idx) => (
        <Reveal key={idx} delay={idx * 0.08}>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {row.map((org) => (
              <div
                key={org.id}
                className="flex h-36 items-center justify-center rounded-2xl border border-bone/10 bg-bone/[0.02] px-6 py-6 transition-colors duration-200 hover:border-bone/20 hover:bg-bone/[0.04] md:h-44 lg:h-48"
              >
                <img
                  src={org.logo}
                  alt={org.name}
                  className="max-h-24 w-auto max-w-[90%] object-contain opacity-85 transition-opacity duration-200 hover:opacity-100 md:max-h-28 lg:max-h-32"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
