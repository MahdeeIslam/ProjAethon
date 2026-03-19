'use client'

import { useState } from 'react'
import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
import Section from '@/components/layout/Section'
import Container from '@/components/ui/Container'

const inputBase =
  'w-full h-11 border border-[var(--line)] bg-[rgba(255,255,255,0.03)] px-4 py-2.5 text-sm text-bone placeholder:text-bone/40 focus:border-bone/50 focus:outline-none focus:ring-2 focus:ring-bone/20 focus:ring-offset-0 transition-colors'
const inputClass = inputBase
const inputErrorClass = `${inputBase} border-red-400/50`

export default function HomeContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    budget: '',
    goals: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
  }
  const invalidName = touched.name && !formData.name.trim()
  const invalidEmail = touched.email && !formData.email.trim()

  return (
    <Section tone="dark" ariaLabel="Contact">
      <Container wide>
        <div className="mx-auto max-w-2xl">
        <Reveal>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-bone md:text-3xl">
            Let&apos;s Build Something That Lasts
          </h2>
          <p className="mt-3 mb-6 text-sm text-bone/75">
            Projects begin with a conversation about goals, audience, and impact.
          </p>
        </Reveal>
        <div className="mb-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center border border-bone bg-bone px-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-obsidian transition hover:bg-bone/95 hover:-translate-y-0.5 hover:shadow-[var(--shadow)] focus:outline-none focus:ring-2 focus:ring-bone/40 focus:ring-offset-2 focus:ring-offset-obsidian"
          >
            Start a Project
          </Link>
          <a
            href="#"
            className="inline-flex h-10 items-center justify-center border border-[var(--line2)] px-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-bone transition hover:border-bone hover:text-bone focus:outline-none focus:ring-2 focus:ring-bone/30 focus:ring-offset-2 focus:ring-offset-obsidian"
          >
            Book a Call
          </a>
        </div>
        {submitted ? (
          <Reveal>
            <div
              className="border border-[var(--line)] bg-[var(--panel)] p-8 text-center text-bone"
              role="status"
            >
              Message received. We&apos;ll respond within 1–2 business days.
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="home-name"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-bone/70"
                  >
                    Name *
                  </label>
                  <input
                    id="home-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={invalidName ? inputErrorClass : inputClass}
                    aria-invalid={invalidName}
                  />
                </div>
                <div>
                  <label
                    htmlFor="home-email"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-bone/70"
                  >
                    Email *
                  </label>
                  <input
                    id="home-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={invalidEmail ? inputErrorClass : inputClass}
                    aria-invalid={invalidEmail}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="home-org"
                  className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-bone/70"
                >
                  Organisation
                </label>
                <input
                  id="home-org"
                  type="text"
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="home-budget"
                  className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-bone/70"
                >
                  Budget range
                </label>
                <select
                  id="home-budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputClass} cursor-pointer appearance-none bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-10`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none' stroke='%23F5F5F2' stroke-width='1.5'%3E%3Cpath d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
                  }}
                >
                  <option value="">Select</option>
                  <option value="5k-15k">$5k – $15k</option>
                  <option value="15k-50k">$15k – $50k</option>
                  <option value="50k+">$50k+</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="home-goals"
                  className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-bone/70"
                >
                  Goals
                </label>
                <input
                  id="home-goals"
                  type="text"
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="home-message"
                  className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-bone/70"
                >
                  Message *
                </label>
                <textarea
                  id="home-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputClass} min-h-[100px] resize-y`}
                />
              </div>
              <div className="pt-1">
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center border border-bone bg-bone px-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-obsidian transition hover:bg-bone/95 focus:outline-none focus:ring-2 focus:ring-bone focus:ring-offset-2 focus:ring-offset-obsidian"
                >
                  Send
                </button>
              </div>
            </form>
          </Reveal>
        )}
        </div>
      </Container>
    </Section>
  )
}
