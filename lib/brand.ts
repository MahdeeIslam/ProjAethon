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

// Brand tagline (premium, minimal, museum vibe)
export const BRAND_TAGLINE = 'Cinematic Ihsan'
/** Hero / showreel tagline (e.g. "melbourne-based creative studio") */
export const HERO_TAGLINE = 'melbourne-based creative studio'

// SEO-ready brand description
export const BRAND_DESCRIPTION =
  'Premium Muslim community creative agency. Tier-1 cinematography with strict vocal-only/nasheed audio standard. Outsourced marketing department for institutions seeking excellence.'

// Site URL from environment variable (fallback for local development)
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// Logo URL (absolute)
export const LOGO_URL = `${SITE_URL}${LOGO_PATH}`

// Primary CTA text (single source of truth)
export const PRIMARY_CTA = 'Request a Strategic Consultation'
/** Hero section primary CTA */
export const HERO_CTA = 'View Portfolio'

