import { NextResponse } from 'next/server'
import { sendContactEmail, type ContactPayload } from '@/lib/contact/sendContactEmail'

export const runtime = 'nodejs'

const MAX_LENGTH = {
  name: 120,
  email: 200,
  organisation: 200,
  budgetRange: 60,
  goals: 400,
  message: 5000,
}

function getString(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 })
  }

  // Honeypot — silently drop bot submissions but pretend they succeeded
  // so the bot doesn't retry. Real users never fill `company_website`.
  const honeypot = getString(body.company_website, 200)
  if (honeypot.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const payload: ContactPayload = {
    name: getString(body.name, MAX_LENGTH.name),
    email: getString(body.email, MAX_LENGTH.email),
    organisation: getString(body.organisation, MAX_LENGTH.organisation) || undefined,
    budgetRange: getString(body.budgetRange, MAX_LENGTH.budgetRange) || undefined,
    goals: getString(body.goals, MAX_LENGTH.goals) || undefined,
    message: getString(body.message, MAX_LENGTH.message),
  }

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json(
      { ok: false, error: 'invalid', message: 'Name, email, and message are required.' },
      { status: 400 }
    )
  }
  if (!isValidEmail(payload.email)) {
    return NextResponse.json(
      { ok: false, error: 'invalid', message: 'Please enter a valid email address.' },
      { status: 400 }
    )
  }

  const result = await sendContactEmail(payload)

  if (!result.ok) {
    const status = result.error === 'config' ? 503 : 502
    return NextResponse.json({ ok: false, error: result.error }, { status })
  }

  return NextResponse.json({ ok: true })
}
