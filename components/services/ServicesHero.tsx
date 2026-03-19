import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
import { HERO_STATS } from '@/data/servicesPage'

const CONTAINER_MAX = 'max-w-[1120px]'

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden border-b border-bone/10 bg-obsidian py-12 md:py-16 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 to-transparent" aria-hidden />

      <div className={`relative mx-auto w-full ${CONTAINER_MAX} px-6 md:px-10`}>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16 lg:gap-20">
          <Reveal>
            <div className="max-w-[65ch]">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-bone/60">
                Services
              </p>
              <h1 className="mb-3 text-3xl font-bold uppercase leading-[1.1] tracking-tight text-bone md:text-4xl lg:text-5xl">
                Services
              </h1>
              <p className="mb-4 text-xl font-medium leading-snug text-bone/95 md:text-2xl">
                World-class production, engineered for growth.
              </p>
              <p className="mb-3 max-w-[60ch] text-base leading-[1.7] text-bone/88">
                We don&apos;t just create content — we architect its impact. Every discipline, from ad strategy to web design, exists to extend the longevity and measurable success of your production across the funnel.
              </p>
              <p className="mb-6 max-w-[60ch] text-base leading-[1.7] text-bone/88">
                Strategy, production, and distribution in lockstep. One system, built to compound.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-bone/25 bg-bone/10 px-6 py-3 text-sm font-medium uppercase tracking-wider text-bone transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-bone/40 hover:bg-bone/15 hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/30 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  Request a strategic consultation
                </Link>
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center gap-1 text-sm font-medium uppercase tracking-wider text-bone/80 underline-offset-4 transition hover:text-bone hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/30 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
                >
                  View work
                  <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:translate-x-0">→</span>
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-bone/10 bg-bone/[0.03] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-8">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-bone/60">
                Service snapshot
              </p>
              <ul className="space-y-5">
                {HERO_STATS.map((stat) => (
                  <li key={stat.label}>
                    <p className="text-2xl font-bold tracking-tight text-bone md:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-bone/70">
                      {stat.label}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
