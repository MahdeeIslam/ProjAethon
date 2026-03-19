'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const BUDGET_OPTIONS = [
  { value: '', label: 'Select' },
  { value: '5k-15k', label: '$5k – $15k' },
  { value: '15k-50k', label: '$15k – $50k' },
  { value: '50k+', label: '$50k+' },
]

const inputBase =
  'w-full rounded-xl border border-bone/20 bg-[rgba(255,255,255,0.03)] px-4 py-3.5 text-bone placeholder:text-bone/40 transition-colors duration-200 focus:border-bone/50 focus:outline-none focus:ring-2 focus:ring-bone/20 focus:ring-offset-2 focus:ring-offset-obsidian hover:border-bone/30'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    budgetRange: '',
    goals: '',
    message: '',
  })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = 'Required'
    if (!formData.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email'
    if (!formData.message.trim()) e.message = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  return (
    <div className="relative min-h-screen bg-obsidian">
      {/* Background layers: gradient + noise + vignette */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{ backgroundImage: NOISE_SVG }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 20%, transparent 40%, rgba(0,0,0,0.35) 100%)',
          }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 pt-28 pb-32 md:pt-36 md:pb-40">
        <div className="mx-auto max-w-[640px] px-6 md:px-10">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
              Get in touch
            </p>
            <h1 className="mb-5 text-4xl font-bold uppercase leading-[1.05] tracking-tight text-bone md:text-5xl lg:text-[3rem]">
              Let&apos;s build something that lasts
            </h1>
            <p className="max-w-[540px] text-lg leading-relaxed text-bone/80">
              Projects begin with a conversation about goals, audience, and impact.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#form"
              className="inline-flex items-center justify-center rounded-xl border-2 border-bone bg-bone px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-obsidian transition-all duration-200 hover:-translate-y-0.5 hover:bg-bone hover:shadow-[0_0_24px_rgba(245,245,242,0.2)] focus:outline-none focus:ring-2 focus:ring-bone/40 focus:ring-offset-2 focus:ring-offset-obsidian"
            >
              Start a project
            </Link>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl border-2 border-bone/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-bone transition-colors hover:border-bone/60 hover:text-bone focus:outline-none focus:ring-2 focus:ring-bone/30 focus:ring-offset-2 focus:ring-offset-obsidian"
            >
              Book a call
            </a>
          </div>

          <div className="mt-14 border-t border-bone/15 pt-12">
            {submitted ? (
              <Reveal>
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl border border-bone/20 bg-[rgba(255,255,255,0.04)] p-10 text-center"
                >
                  <p className="text-lg font-medium text-bone">
                    Thank you. We&apos;ll be in touch soon.
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <form
                  id="form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  noValidate
                >
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-[0.14em] text-bone/70">
                        Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputBase}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-400/90">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.14em] text-bone/70">
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={inputBase}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-400/90">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="organisation" className="block text-xs font-semibold uppercase tracking-[0.14em] text-bone/70">
                      Organisation
                    </label>
                    <input
                      id="organisation"
                      type="text"
                      name="organisation"
                      value={formData.organisation}
                      onChange={handleChange}
                      placeholder="Company or organisation"
                      className={inputBase}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="budgetRange" className="block text-xs font-semibold uppercase tracking-[0.14em] text-bone/70">
                      Budget range
                    </label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className={`${inputBase} appearance-none bg-[rgba(255,255,255,0.03)] pr-10`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(245,245,242,0.5)' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                      }}
                    >
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt.value || 'empty'} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="goals" className="block text-xs font-semibold uppercase tracking-[0.14em] text-bone/70">
                      Goals
                    </label>
                    <input
                      id="goals"
                      type="text"
                      name="goals"
                      value={formData.goals}
                      onChange={handleChange}
                      placeholder="What do you want to achieve?"
                      className={inputBase}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-[0.14em] text-bone/70">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      className={`${inputBase} min-h-[140px] resize-y`}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-400/90">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="rounded-xl border-2 border-bone bg-bone px-10 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-obsidian transition-all duration-200 hover:-translate-y-0.5 hover:bg-bone hover:shadow-[0_0_24px_rgba(245,245,242,0.2)] focus:outline-none focus:ring-2 focus:ring-bone/40 focus:ring-offset-2 focus:ring-offset-obsidian"
                  >
                    Send
                  </button>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
