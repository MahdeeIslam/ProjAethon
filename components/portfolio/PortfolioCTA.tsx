'use client'

import Link from 'next/link'

export default function PortfolioCTA() {
  return (
    <section className="border-t border-[rgba(245,245,242,0.10)] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 text-center md:px-10">
        <h2 className="text-3xl font-bold tracking-tight text-bone md:text-4xl">
          Ready to build something that lasts?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-bone/80">
          Projects begin with a conversation about goals, audience, and impact.
        </p>
        <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border-2 border-bone/30 bg-bone/5 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition hover:border-bone/50 hover:bg-bone/10"
          >
            Request a Strategic Consultation
          </Link>
          <a
            href="mailto:hello@aethon.com"
            className="text-sm font-medium uppercase tracking-wider text-bone/75 underline-offset-4 hover:text-bone hover:underline"
          >
            Email us →
          </a>
        </div>
      </div>
    </section>
  )
}
