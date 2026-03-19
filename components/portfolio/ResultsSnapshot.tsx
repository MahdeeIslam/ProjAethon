'use client'

const STATS = [
  { value: '40M+', label: 'Views generated' },
  { value: '$450k+', label: 'Raised' },
  { value: '450+', label: 'Clips delivered' },
  { value: '18', label: 'Campaigns' },
]

export default function ResultsSnapshot() {
  return (
    <section className="border-y border-[rgba(245,245,242,0.10)]">
      <div className="mx-auto flex min-h-[100px] max-w-[1440px] items-center justify-center gap-12 px-6 py-6 md:px-10 md:gap-20">
        {STATS.map((stat, idx) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center justify-center ${
              idx > 0 ? 'border-l border-[rgba(245,245,242,0.12)] pl-12 md:pl-20' : ''
            }`}
          >
            <p className="text-2xl font-bold tracking-tight text-bone md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-bone/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
