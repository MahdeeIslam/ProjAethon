/**
 * Server-only helper that turns a validated contact-form payload into
 * an email and ships it via Resend.
 *
 * Configuration (Vercel env vars):
 *   - RESEND_API_KEY        (required) — sign up at https://resend.com,
 *                            free tier is 3,000 emails / month.
 *   - CONTACT_EMAIL_FROM    (optional) — the "from" address. Defaults to
 *                            'Aethon Website <onboarding@resend.dev>',
 *                            which Resend allows out-of-the-box even
 *                            without verifying a domain. Once the
 *                            aethon.au domain is verified in Resend,
 *                            switch this to e.g. 'contact@aethon.au'.
 *   - CONTACT_EMAIL_TO      (optional) — override destination inbox. Must be
 *                            a valid email if set; otherwise messages go to
 *                            `CONTACT_EMAIL` in `lib/brand.ts` (contact@aethon.au).
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
  error?: 'config' | 'invalid' | 'provider' | 'unknown'
}

const DEFAULT_FROM = 'Aethon Website <onboarding@resend.dev>'

function isValidEmailAddress(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

/**
 * Where Resend delivers the message. `CONTACT_EMAIL_TO` may point at a
 * staging inbox; invalid or empty values fall back to `CONTACT_EMAIL`.
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

export async function sendContactEmail(
  payload: ContactPayload
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[contact] RESEND_API_KEY is not set — contact email cannot be delivered.'
      )
    }
    return { ok: false, error: 'config' }
  }

  if (!payload.name.trim() || !payload.email.trim() || !payload.message.trim()) {
    return { ok: false, error: 'invalid' }
  }

  const from = process.env.CONTACT_EMAIL_FROM || DEFAULT_FROM
  const to = resolveDeliveryInbox()

  try {
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
      return { ok: false, error: 'provider' }
    }

    return { ok: true }
  } catch (err) {
    console.error('[contact] Unexpected send error:', err)
    return { ok: false, error: 'unknown' }
  }
}
