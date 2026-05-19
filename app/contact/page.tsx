'use client'

import { useState } from 'react'
import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
import { CONTACT_EMAIL } from '@/lib/brand'

/**
 * Web3Forms access key (intentionally public — Web3Forms is browser-direct).
 * Server-side calls to api.web3forms.com get blocked by Cloudflare's managed
 * challenge (the same JS challenge blocks Vercel serverless egress and any
 * non-browser client). Submitting from the real user's browser satisfies the
 * challenge automatically and routes mail to contact@aethon.au via the key's
 * destination configured at web3forms.com.
 *
 * Rotate at https://web3forms.com if abuse occurs.
 */
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  '20314ee0-a846-444c-8d79-a83594f76671'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const BUDGET_OPTIONS = [
  { value: '', label: 'Select' },
  { value: '5k-15k', label: '$5k – $15k' },
  { value: '15k-50k', label: '$15k – $50k' },
  { value: '50k+', label: '$50k+' },
]

const inputBase =
  'w-full rounded-xl border border-bone/20 bg-[rgba(255,255,255,0.03)] px-4 py-3.5 text-bone placeholder:text-bone/40 transition-colors duration-200 focus:border-bone/50 focus:outline-none focus:ring-2 focus:ring-bone/20 focus:ring-offset-2 focus:ring-offset-obsidian hover:border-bone/30 disabled:cursor-not-allowed disabled:opacity-60'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const ERROR_MESSAGES: Record<string, string> = {
  invalid: 'Please check the form fields and try again.',
  provider:
    'We could not deliver your message through our form just now. Please try again in a few minutes, or use "Or email us directly" below.',
  unknown:
    'Something went wrong on our end. Please try again or email us directly.',
  network:
    "We couldn't reach our server. Please check your connection and try again.",
}

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorKey, setErrorKey] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    budgetRange: '',
    goals: '',
    message: '',
    // honeypot — never shown to humans
    company_website: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    // Honeypot — bots that fill `company_website` get a silent fake success
    // so they don't retry. Real users never see this field.
    if (formData.company_website.trim()) {
      setStatus('success')
      return
    }

    setStatus('submitting')
    setErrorKey('')

    const summary = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.organisation && `Organisation: ${formData.organisation}`,
      formData.budgetRange && `Budget: ${formData.budgetRange}`,
      formData.goals && `Goals: ${formData.goals}`,
      '',
      'Message:',
      formData.message,
    ]
      .filter(Boolean)
      .join('\n')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New enquiry — ${formData.name}${
            formData.organisation ? ` (${formData.organisation})` : ''
          }`,
          from_name: formData.name,
          replyto: formData.email,
          name: formData.name,
          email: formData.email,
          organisation: formData.organisation,
          budget: formData.budgetRange,
          goals: formData.goals,
          message: summary,
        }),
      })

      const data: { success?: boolean; message?: string } = await res
        .json()
        .catch(() => ({}))

      if (res.ok && data.success) {
        setStatus('success')
        return
      }

      setErrorKey('provider')
      setStatus('error')
    } catch {
      setErrorKey('network')
      setStatus('error')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    if (status === 'error') setStatus('idle')
  }

  const isSubmitting = status === 'submitting'

  return (
    <div className="relative min-h-screen bg-obsidian">
      {/* Background layers: gradient + noise + vignette */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
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
            background:
              'radial-gradient(ellipse 80% 60% at 50% 20%, transparent 40%, rgba(0,0,0,0.35) 100%)',
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

          <div className="mt-14 border-t border-bone/15 pt-12">
            {status === 'success' ? (
              <Reveal>
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl border border-bone/20 bg-[rgba(255,255,255,0.04)] p-10 text-center"
                >
                  <p className="text-lg font-medium text-bone">
                    Thank you — your message is on its way. We&apos;ll be in touch shortly.
                  </p>
                  <p className="mt-4 text-sm text-bone/65">
                    If you need a faster reply, email{' '}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-bone underline-offset-4 hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    .
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
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold uppercase tracking-[0.14em] text-bone/70"
                      >
                        Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        disabled={isSubmitting}
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
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-[0.14em] text-bone/70"
                      >
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        disabled={isSubmitting}
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
                    <label
                      htmlFor="organisation"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-bone/70"
                    >
                      Organisation
                    </label>
                    <input
                      id="organisation"
                      type="text"
                      name="organisation"
                      disabled={isSubmitting}
                      value={formData.organisation}
                      onChange={handleChange}
                      placeholder="Company or organisation"
                      className={inputBase}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="budgetRange"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-bone/70"
                    >
                      Budget range
                    </label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      disabled={isSubmitting}
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
                    <label
                      htmlFor="goals"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-bone/70"
                    >
                      Goals
                    </label>
                    <input
                      id="goals"
                      type="text"
                      name="goals"
                      disabled={isSubmitting}
                      value={formData.goals}
                      onChange={handleChange}
                      placeholder="What do you want to achieve?"
                      className={inputBase}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-bone/70"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      className={`${inputBase} min-h-[140px] resize-y`}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-400/90">{errors.message}</p>
                    )}
                  </div>

                  {/* Honeypot — hidden from humans, catches naive bots */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      left: '-10000px',
                      width: '1px',
                      height: '1px',
                      overflow: 'hidden',
                    }}
                  >
                    <label htmlFor="company_website">Company website</label>
                    <input
                      id="company_website"
                      type="text"
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.company_website}
                      onChange={handleChange}
                    />
                  </div>

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200"
                    >
                      {ERROR_MESSAGES[errorKey] ?? ERROR_MESSAGES.unknown}{' '}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="font-medium text-red-100 underline-offset-4 hover:underline"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  )}

                  <p className="text-[11px] leading-relaxed text-bone/50">
                    Submissions are sent securely to{' '}
                    <span className="font-medium text-bone/70">{CONTACT_EMAIL}</span>.
                  </p>

                  <div className="flex flex-wrap items-center gap-5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center rounded-full border border-bone/70 bg-white/[0.06] px-9 h-12 text-sm font-semibold uppercase tracking-[0.14em] text-bone backdrop-blur-md transition-all duration-300 hover:bg-white/[0.14] hover:border-bone hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(245,245,242,0.22)] focus:outline-none focus:ring-2 focus:ring-bone/50 focus:ring-offset-2 focus:ring-offset-obsidian disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-white/[0.06]"
                    >
                      {isSubmitting ? 'Sending…' : 'Send message'}
                    </button>
                    <Link
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-sm font-medium uppercase tracking-wider text-bone/75 transition-colors hover:text-bone border-b border-transparent hover:border-bone/50"
                    >
                      Or email us directly
                    </Link>
                  </div>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
