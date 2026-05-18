/**
 * Server-only helper: contact form → inbox.
 *
 * Tries providers in order until one succeeds:
 *
 * 1. **Resend** — when `RESEND_API_KEY` is set (recommended for production).
 * 2. **Web3Forms** — when `WEB3FORMS_ACCESS_KEY` is set; reliable from
 *    serverless IPs (FormSubmit often times out or errors from datacentres).
 * 3. **FormSubmit** — JSON AJAX first, then classic URL-encoded POST (no API
 *    key; first use may require activating the inbox at formsubmit.co).
 *
 * Configuration (Vercel env vars):
 *   - RESEND_API_KEY         — https://resend.com
 *   - WEB3FORMS_ACCESS_KEY   — https://web3forms.com (inbox set in their dashboard)
 *   - CONTACT_EMAIL_FROM    — Resend `from`. Defaults to
 *                             `Aethon Website <onboarding@resend.dev>`.
 *   - CONTACT_EMAIL_TO      — override destination for Resend / FormSubmit;
 *                             must be a valid email or it is ignored in favour of
 *                             `CONTACT_EMAIL` from `lib/brand.ts`.
 */

import { Resend } from 'resend'
import { CONTACT_EMAIL } from '@/lib/brand'

export interface ContactPayload {
  name: string
  email: string
  organisation?: string
  budgetRange?: string
  goals?: string
  message: string
}

export interface SendResult {
  ok: boolean
  /** Stable, user-safe error code. Never leaks API details. */
  error?: 'invalid' | 'provider' | 'unknown'
}

const DEFAULT_FROM = 'Aethon Website <onboarding@resend.dev>'

function isValidEmailAddress(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

/**
 * Delivery inbox. `CONTACT_EMAIL_TO` overrides only when valid.
 */
function resolveDeliveryInbox(): string {
  const override = process.env.CONTACT_EMAIL_TO?.trim()
  if (override && isValidEmailAddress(override)) return override
  return CONTACT_EMAIL
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function row(label: string, value: string | undefined): string {
  if (!value || !value.trim()) return ''
  return `
    <tr>
      <td style="padding:6px 12px 6px 0;color:#86827b;font-size:12px;text-transform:uppercase;letter-spacing:0.14em;vertical-align:top;width:160px;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:6px 0;color:#1a1a1a;font-size:14px;line-height:1.55;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `
}

function renderHtml(p: ContactPayload): string {
  const messageHtml = escapeHtml(p.message).replace(/\n/g, '<br/>')
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;background:#f5f5f2;padding:32px;color:#1a1a1a;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e6e3dc;border-radius:12px;overflow:hidden;">
        <div style="background:#1a1a1a;color:#f5f5f2;padding:20px 28px;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#bdb8ad;">Aethon</p>
          <p style="margin:0;font-size:18px;font-weight:700;">New contact form submission</p>
        </div>
        <div style="padding:28px;">
          <table cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
            ${row('Name', p.name)}
            ${row('Email', p.email)}
            ${row('Organisation', p.organisation)}
            ${row('Budget', p.budgetRange)}
            ${row('Goals', p.goals)}
          </table>
          <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e6e3dc;">
            <p style="margin:0 0 10px;font-size:12px;text-transform:uppercase;letter-spacing:0.14em;color:#86827b;">Message</p>
            <p style="margin:0;font-size:14px;line-height:1.65;color:#1a1a1a;white-space:pre-wrap;">${messageHtml}</p>
          </div>
        </div>
        <div style="padding:14px 28px;background:#fafaf6;color:#86827b;font-size:11px;letter-spacing:0.06em;border-top:1px solid #e6e3dc;">
          Reply directly to this email to respond to ${escapeHtml(p.name)}.
        </div>
      </div>
    </div>
  `
}

function renderText(p: ContactPayload): string {
  const lines = [
    'New contact form submission — Aethon',
    '',
    `Name:         ${p.name}`,
    `Email:        ${p.email}`,
  ]
  if (p.organisation) lines.push(`Organisation: ${p.organisation}`)
  if (p.budgetRange) lines.push(`Budget:       ${p.budgetRange}`)
  if (p.goals) lines.push(`Goals:        ${p.goals}`)
  lines.push('', 'Message:', p.message)
  lines.push('', '— Reply to this email to respond directly.')
  return lines.join('\n')
}

function contactSubject(payload: ContactPayload): string {
  return `New enquiry — ${payload.name}${
    payload.organisation ? ` (${payload.organisation})` : ''
  }`
}

/**
 * Web3Forms — access key from https://web3forms.com; receiving address is set in their UI.
 */
async function sendViaWeb3Forms(
  payload: ContactPayload,
  accessKey: string
): Promise<boolean> {
  const lines = [`Name: ${payload.name}`, `Email: ${payload.email}`]
  if (payload.organisation) lines.push(`Organisation: ${payload.organisation}`)
  if (payload.budgetRange) lines.push(`Budget: ${payload.budgetRange}`)
  if (payload.goals) lines.push(`Goals: ${payload.goals}`)
  lines.push('', 'Message:', payload.message)

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: contactSubject(payload),
        name: payload.name,
        email: payload.email,
        message: lines.join('\n'),
        organisation: payload.organisation ?? '',
        budget: payload.budgetRange ?? '',
        goals: payload.goals ?? '',
      }),
    })

    const raw = await res.text()
    let data: { success?: boolean; message?: string } | null = null
    try {
      data = JSON.parse(raw) as { success?: boolean; message?: string }
    } catch {
      /* non-JSON */
    }

    const ok = res.ok && data?.success === true
    if (!ok) {
      console.error('[contact] Web3Forms:', res.status, raw.slice(0, 400))
    }
    return ok
  } catch (err) {
    console.error('[contact] Web3Forms fetch error:', err)
    return false
  }
}

async function sendViaFormSubmitAjax(
  payload: ContactPayload,
  to: string
): Promise<boolean> {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(to)}`
  const subject = contactSubject(payload)

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        _subject: subject,
        organisation: payload.organisation ?? '',
        budget: payload.budgetRange ?? '',
        goals: payload.goals ?? '',
        message: payload.message,
        _captcha: false,
      }),
    })

    const raw = await res.text()
    let data: { success?: string | boolean; message?: string } | null = null
    try {
      data = JSON.parse(raw) as { success?: string | boolean; message?: string }
    } catch {
      /* non-JSON body */
    }

    const ok =
      res.ok &&
      data != null &&
      (data.success === true || data.success === 'true')

    if (!ok) {
      console.error('[contact] FormSubmit (ajax):', res.status, raw.slice(0, 500))
    }
    return ok
  } catch (err) {
    console.error('[contact] FormSubmit (ajax) fetch error:', err)
    return false
  }
}

/**
 * Classic form POST — sometimes works when the AJAX endpoint fails from the edge.
 */
async function sendViaFormSubmitClassic(
  payload: ContactPayload,
  to: string
): Promise<boolean> {
  const subject = contactSubject(payload)
  const endpoint = `https://formsubmit.co/${encodeURIComponent(to)}`

  const params = new URLSearchParams()
  params.set('name', payload.name)
  params.set('email', payload.email)
  params.set('_subject', subject)
  params.set('message', payload.message)
  if (payload.organisation) params.set('organisation', payload.organisation)
  if (payload.budgetRange) params.set('budget', payload.budgetRange)
  if (payload.goals) params.set('goals', payload.goals)
  params.set('_captcha', 'false')

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'text/html,application/json;q=0.9,*/*;q=0.8',
      },
      body: params.toString(),
      redirect: 'manual',
    })

    const ok =
      res.status === 302 ||
      res.status === 303 ||
      (res.ok && res.status < 400)

    if (!ok) {
      const peek = await res.text().then((t) => t.slice(0, 400)).catch(() => '')
      console.error('[contact] FormSubmit (classic):', res.status, peek)
    }
    return ok
  } catch (err) {
    console.error('[contact] FormSubmit (classic) fetch error:', err)
    return false
  }
}

async function sendViaFormSubmit(
  payload: ContactPayload,
  to: string
): Promise<boolean> {
  if (await sendViaFormSubmitAjax(payload, to)) return true
  return sendViaFormSubmitClassic(payload, to)
}

async function sendViaResend(
  payload: ContactPayload,
  apiKey: string,
  to: string
): Promise<boolean> {
  const from = process.env.CONTACT_EMAIL_FROM || DEFAULT_FROM
  const resend = new Resend(apiKey)
  const result = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject: `New enquiry — ${payload.name}${
      payload.organisation ? ` (${payload.organisation})` : ''
    }`,
    html: renderHtml(payload),
    text: renderText(payload),
    tags: [{ name: 'source', value: 'contact_form' }],
  })

  if (result.error) {
    console.error('[contact] Resend error:', result.error)
    return false
  }
  return true
}

export async function sendContactEmail(
  payload: ContactPayload
): Promise<SendResult> {
  if (!payload.name.trim() || !payload.email.trim() || !payload.message.trim()) {
    return { ok: false, error: 'invalid' }
  }

  const to = resolveDeliveryInbox()
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY?.trim()

  if (apiKey) {
    try {
      const ok = await sendViaResend(payload, apiKey, to)
      if (ok) return { ok: true }
    } catch (err) {
      console.error('[contact] Resend exception:', err)
    }
  } else if (process.env.NODE_ENV !== 'production') {
    console.warn(
      '[contact] RESEND_API_KEY is not set — trying Web3Forms / FormSubmit.'
    )
  }

  if (web3Key) {
    const ok = await sendViaWeb3Forms(payload, web3Key)
    if (ok) return { ok: true }
  }

  const fallbackOk = await sendViaFormSubmit(payload, to)
  if (fallbackOk) return { ok: true }

  return { ok: false, error: 'provider' }
}
