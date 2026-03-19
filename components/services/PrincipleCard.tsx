import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
import { PRINCIPLE_TITLE, PRINCIPLE_BODY } from '@/data/servicesPage'

const CONTAINER_MAX = 'max-w-[1120px]'

export default function PrincipleCard() {
  return (
    <section className="border-b border-bone/10 py-12 md:py-16 lg:py-24">
      <div className={`mx-auto w-full ${CONTAINER_MAX} px-6 md:px-10`}>
        <Reveal>
          <div className="rounded-2xl border border-bone/10 bg-bone/[0.03] p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bone/60">
              AETHON principle
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-bone md:text-3xl">
              {PRINCIPLE_TITLE}
            </h2>
            <p className="mt-4 max-w-[60ch] text-base leading-[1.65] text-bone/88">
              {PRINCIPLE_BODY}
            </p>
            <div className="mt-6 h-px w-full max-w-md bg-bone/10" aria-hidden />
            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-1 text-sm font-medium uppercase tracking-wider text-bone/85 underline-offset-4 transition hover:text-bone hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/30 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
            >
              Request consultation
              <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:translate-x-0">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
