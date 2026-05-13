'use client'

import Link from 'next/link'

export default function PortfolioCTA() {
  return (
    <section className="border-t border-[rgba(245,245,242,0.10)] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 text-center md:px-10">
        <h2 className="text-3xl font-bold uppercase tracking-tight text-bone md:text-4xl lg:text-[2.5rem]">
          Seen enough? Tell us about your project.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-bone/80 md:text-lg">
          If you have a project or a problem you&apos;re trying to solve, we&apos;d like to hear about it.
        </p>
        <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-bone/70 bg-white/[0.06] px-8 h-12 text-sm font-semibold uppercase tracking-[0.14em] text-bone backdrop-blur-md transition-all duration-300 hover:bg-white/[0.14] hover:border-bone hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(245,245,242,0.22)] focus:outline-none focus:ring-2 focus:ring-bone/50 focus:ring-offset-2 focus:ring-offset-obsidian"
          >
            Request a Strategic Consultation
          </Link>
          <Link
            href="/case-studies"
            className="group/link inline-flex items-center gap-1 text-sm font-medium uppercase tracking-wider text-bone/85 transition-colors hover:text-bone border-b border-transparent hover:border-bone/50"
          >
            View case studies
            <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
