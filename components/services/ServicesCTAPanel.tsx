import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'

const CONTAINER_MAX = 'max-w-[1120px]'

export default function ServicesCTAPanel() {
  return (
    <section className="bg-[rgba(0,0,0,0.25)] py-12 md:py-16 lg:py-24">
      <div className={`mx-auto w-full ${CONTAINER_MAX} px-6 text-center md:px-10`}>
        <Reveal>
          <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-bone md:text-4xl lg:text-5xl">
            Let&apos;s build something worth talking about.
          </h2>
          <p className="mx-auto mt-5 mb-10 max-w-[55ch] text-lg leading-relaxed text-bone/88 md:text-xl">
            Bring your goals. We&apos;ll take it from there.
          </p>
          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:justify-center sm:items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border-2 border-bone/25 bg-bone/10 px-6 py-3.5 text-sm font-medium uppercase tracking-wider text-bone transition-all duration-200 ease-out hover:border-bone/40 hover:bg-bone/15 hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/30 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Start a project
            </Link>
            <Link
              href="/portfolio"
              className="group inline-flex items-center justify-center gap-1 rounded-xl border-2 border-bone/20 px-6 py-3.5 text-sm font-medium uppercase tracking-wider text-bone/85 transition-all duration-200 ease-out hover:border-bone/35 hover:text-bone focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/30 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
            >
              View work
              <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:translate-x-0">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
