'use client'

import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
import Section from '@/components/layout/Section'
import Container from '@/components/ui/Container'
import { CONTACT_EMAIL } from '@/lib/brand'

export default function HomeContactSection() {
  return (
    <Section tone="dark" ariaLabel="Work with us">
      <Container wide>
        <div className="mx-auto max-w-3xl py-6 md:py-10">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bone/55">
              Work with us
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-bone md:text-4xl lg:text-[2.5rem] leading-[1.05]">
              Have a project or a problem to solve?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone/80 md:text-lg">
              If you have a project or a problem you&apos;re trying to solve, we&apos;d like to hear about it.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className="group/cta inline-flex items-center gap-2 rounded-full border border-bone/70 bg-white/[0.06] px-7 h-12 text-sm font-semibold uppercase tracking-[0.14em] text-bone backdrop-blur-md transition-all duration-300 hover:bg-white/[0.14] hover:border-bone hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(245,245,242,0.22)] focus:outline-none focus:ring-2 focus:ring-bone/50 focus:ring-offset-2 focus:ring-offset-obsidian"
              >
                Start a conversation
                <span className="inline-block transition-transform duration-200 group-hover/cta:translate-x-1">
                  →
                </span>
              </Link>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm font-medium tracking-wider text-bone/75 border-b border-transparent transition-colors hover:text-bone hover:border-bone/50"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
