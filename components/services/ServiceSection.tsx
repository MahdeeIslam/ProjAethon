import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'
import type { ServiceSectionData } from '@/data/servicesPage'
import CapabilityCard from './CapabilityCard'

const CONTAINER_MAX = 'max-w-[1120px]'

interface ServiceSectionProps {
  service: ServiceSectionData
}

export default function ServiceSection({ service }: ServiceSectionProps) {
  return (
    <section
      id={service.id}
      className="scroll-mt-[90px] border-b border-bone/10 py-12 md:py-16 lg:py-24 md:scroll-mt-[120px]"
    >
      <div className={`mx-auto w-full ${CONTAINER_MAX} px-6 md:px-10`}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Left: sticky summary + CTA (sticky only on lg) */}
          <Reveal>
            <div className="lg:sticky lg:top-[7.5rem]">
              <h2 className="text-2xl font-bold uppercase leading-tight tracking-tight text-bone md:text-3xl">
                {service.title}
              </h2>
              <p className="mt-4 max-w-[50ch] text-base leading-[1.65] text-bone/88">
                {service.summary}
              </p>
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-bone/65">
                  Best for
                </p>
                <ul className="mt-2 space-y-1.5">
                  {service.bestFor.map((item) => (
                    <li key={item} className="text-sm text-bone/82">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 max-w-[55ch] text-xs leading-relaxed text-bone/75">
                <span className="font-medium text-bone/85">Typical deliverables:</span>{' '}
                {service.deliverables}
              </p>
              <Link
                href="/contact"
                className="group mt-6 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-bone/82 underline-offset-4 transition hover:text-bone hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/30 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
              >
                Request consult
                <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:translate-x-0">→</span>
              </Link>
            </div>
          </Reveal>

          {/* Right: capability grid + proof + process */}
          <div className="space-y-10">
            <RevealGroup stagger={0.04} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {service.capabilities.map((cap) => (
                <CapabilityCard
                  key={cap.title}
                  title={cap.title}
                  description={cap.description}
                  tag={cap.tag}
                />
              ))}
            </RevealGroup>

            {/* Optional: What you get in 30 days (e.g. Social) */}
            {service.thirtyDays && (
              <Reveal>
                <div className="rounded-2xl border border-bone/10 bg-bone/[0.03] p-5 md:p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-bone/65">
                    What you get in 30 days
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-xs font-medium text-bone/60">Week 1</p>
                      <p className="mt-0.5 text-sm text-bone/88">{service.thirtyDays.week1}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-bone/60">Week 2</p>
                      <p className="mt-0.5 text-sm text-bone/88">{service.thirtyDays.week2}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-bone/60">Week 3</p>
                      <p className="mt-0.5 text-sm text-bone/88">{service.thirtyDays.week3}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-bone/60">Week 4</p>
                      <p className="mt-0.5 text-sm text-bone/88">{service.thirtyDays.week4}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Proof row */}
            <Reveal>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-bone/65">
                  Outcome & proof
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.proof.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-bone/15 bg-bone/[0.04] px-3 py-1.5 text-xs font-medium tracking-wider text-bone/82"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Process mini-timeline */}
            <Reveal>
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-bone/65">
                  Process highlight
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  {service.process.map((step, i) => (
                    <div key={step.label} className="flex gap-3">
                      <div className="flex shrink-0 flex-col items-center">
                        <span className="text-xs font-bold text-bone/60">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {i < service.process.length - 1 && (
                          <div className="mt-1 h-6 w-px bg-bone/15 sm:h-8" aria-hidden />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-bone">
                          {step.label}
                        </p>
                        <p className="mt-0.5 max-w-[45ch] text-xs leading-relaxed text-bone/75">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
