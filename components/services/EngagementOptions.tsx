import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'
import { ENGAGEMENT_OPTIONS } from '@/data/servicesPage'

const CONTAINER_MAX = 'max-w-[1120px]'

export default function EngagementOptions() {
  return (
    <section className="border-b border-bone/10 py-12 md:py-16 lg:py-24">
      <div className={`mx-auto w-full ${CONTAINER_MAX} px-6 md:px-10`}>
        <Reveal>
          <h2 className="text-2xl font-bold uppercase leading-tight tracking-tight text-bone md:text-3xl">
            Engagement options
          </h2>
          <p className="mt-3 max-w-[55ch] text-base leading-relaxed text-bone/85">
            How we package work. No prices listed — we scope to your goals and budget.
          </p>
        </Reveal>
        <RevealGroup stagger={0.08} className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-3 md:gap-8">
          {ENGAGEMENT_OPTIONS.map((opt) => (
            <div
              key={opt.id}
              className="flex flex-col rounded-2xl border border-bone/10 bg-bone/[0.02] p-6 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-bone/20 hover:bg-bone/[0.04] hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-8"
            >
              <h3 className="text-lg font-bold tracking-tight text-bone md:text-xl">
                {opt.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bone/85">
                <span className="font-medium text-bone/95">Best for:</span> {opt.bestFor}
              </p>
              <p className="mt-2 text-sm text-bone/75">
                <span className="font-medium text-bone/85">Typical timeline:</span> {opt.timeline}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-bone/65">
                What&apos;s included
              </p>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-bone/85">
                {opt.included.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl border-2 border-bone/25 bg-bone/5 px-5 py-3 text-sm font-medium uppercase tracking-wider text-bone transition-all duration-200 ease-out hover:border-bone/35 hover:bg-bone/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/30 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian motion-reduce:transition-none sm:w-fit md:py-3"
              >
                {opt.cta}
              </Link>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
