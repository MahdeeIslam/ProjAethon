'use client'

import { useState } from 'react'
import Reveal from '@/components/motion/Reveal'
import { FAQ_ITEMS } from '@/data/servicesPage'
import { ChevronDown } from 'lucide-react'

const CONTAINER_MAX = 'max-w-[1120px]'

export default function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="border-b border-bone/10 py-12 md:py-16 lg:py-24">
      <div className={`mx-auto w-full ${CONTAINER_MAX} px-6 md:px-10`}>
        <Reveal>
          <h2 className="text-2xl font-bold uppercase leading-tight tracking-tight text-bone md:text-3xl">
            FAQ
          </h2>
          <p className="mt-3 max-w-[55ch] text-base leading-relaxed text-bone/85">
            Common questions about how we work and what to expect.
          </p>
        </Reveal>
        <div className="mt-10 space-y-2">
          {FAQ_ITEMS.map((item, index) => (
            <Reveal key={index}>
              <div className="rounded-2xl border border-bone/10 bg-bone/[0.02] transition-colors duration-200 hover:border-bone/15">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full min-h-[56px] touch-manipulation items-center justify-between gap-4 px-5 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/30 focus-visible:ring-inset focus-visible:ring-offset-0 sm:px-6"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="text-left text-sm font-medium text-bone sm:text-base">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-bone/60 transition-transform duration-200 ease-out motion-reduce:transition-none ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    aria-hidden
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out motion-reduce:transition-none ${
                    openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="border-t border-bone/10 px-5 py-5 text-sm leading-relaxed text-bone/88 sm:px-6 sm:py-6 sm:text-base">
                    {item.a}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
