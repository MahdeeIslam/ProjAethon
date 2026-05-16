/**
 * Brand Configuration
 * Single source of truth for Aethon brand assets and messaging
 */

export const BRAND_NAME = 'Aethon'
/** Uppercase wordmark for hero / key moments */
export const BRAND_WORDMARK = 'AETHON'

// Logo path - update this if your logo filename differs
// Supported formats: .svg (preferred), .png, .webp
// Place logo file in /public directory
export const LOGO_PATH = '/aethon-logo.png'

// Fallback logo paths (will be checked in order)
export const LOGO_FALLBACKS = [
  '/aethon-logo.png',
  '/logo.svg',
  '/logo.png',
]

// Brand tagline (footer-ready, plain-English positioning)
export const BRAND_TAGLINE = 'Creative production for organisations that take quality seriously.'
/** Hero / showreel kicker (small uppercase line above the headline) */
export const HERO_TAGLINE = 'melbourne-based creative studio'

// SEO-ready brand description
export const BRAND_DESCRIPTION =
  'Full-service production, design, websites, and paid campaigns, run by people who understand your world. One agency, full capability.'

// Site URL from environment variable (fallback for local development)
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// Logo URL (absolute)
export const LOGO_URL = `${SITE_URL}${LOGO_PATH}`

/**
 * Public contact email (mailto:, footer, CTAs) and the default inbox for
 * contact-form submissions sent via Resend (`/api/contact`).
 * Override delivery only with `CONTACT_EMAIL_TO` in server env if needed.
 */
export const CONTACT_EMAIL = 'contact@aethon.au'

/** Australian Business Number (footer / legal) */
export const CONTACT_ABN = '82 794 788 291'

// Primary CTA text (single source of truth)
export const PRIMARY_CTA = 'Start a conversation'
/** Hero section primary CTA */
export const HERO_CTA = 'View Portfolio'

/** Social profile links — replace `#` once handles are confirmed */
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/aethon.au/',
  tiktok: 'https://www.tiktok.com/@aethon.au',
  facebook: 'https://www.facebook.com/aethon.au',
  linkedin: 'https://www.linkedin.com/company/aethon-au/',
} as const

