/**
 * Remote reel manifest for Cloudflare R2.
 *
 * Current bucket layout (May 2026, post-recompression):
 *   - Horizontal clips:  `Vertical/horizontal/horizontal/<file>`
 *   - Vertical clips:    `Vertical/vertical/<file>`
 *   - Landing page hero: `Vertical/landing page/final aethon showreel.mp4`
 *
 * This file is the single source of truth for video URLs across the
 * entire site. Both the API routes (server) and `data/videoUrls.ts`
 * (client) import from here. Update the filename arrays + base URL
 * when the bucket changes — nothing else.
 */

/** Public CDN base served from R2 via the `media.aethon.au` custom domain. */
export const PUBLIC_MEDIA_BASE_URL = 'https://media.aethon.au'

const HORIZONTAL_FOLDER = 'Vertical/horizontal/horizontal'
const VERTICAL_FOLDER = 'Vertical/vertical'
const LANDING_PAGE_FOLDER = 'Vertical/landing page'

const LANDING_PAGE_HERO_FILENAME = 'final aethon showreel.mp4'

const HORIZONTAL_FILENAMES = [
  'Arabic Revival 360 Basketball Tournament.mp4',
  'Copy of Copy of DWF scene 1 v3 with title screen.mp4',
  'Copy of Copy of DWF scene 2 final v3.mp4',
  'Copy of Copy of DWF scene 3 final v5.mp4',
  'Copy of Elders promo uncaptioned.mp4',
  'Copy of Third Space Teaser 1.mp4',
  'Copy of UMMA promo uncaptioned.mp4',
] as const

const VERTICAL_FILENAMES = [
  'BAHDON STORY.mp4',
  'Beckham Baker Broll.mp4',
  'Captions_06AFE6.mp4',
  'Captions_9326EE.mp4',
  'Captions_BFEB6C.mp4',
  'Captions_D7EF39.mp4',
  'Copy of MM Gala Dinner Promo vid 1.mp4',
  'Copy of Shayan Aurafarming vid.mp4',
  'Copy of Third Space AR360 Bonfire Vid Promo.mp4',
  'Copy of Yussuf Personal Branding vid.mp4',
  'Musibah.mp4',
  'QUBA REMINDER .mp4',
  'Ree#1 03.mp4',
  'TAOFIQ STORY V2.mp4',
] as const

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '')
}

/** Encodes only the filename — preserves the configured folder path verbatim. */
function joinPublicUrl(baseUrl: string, folder: string, filename: string): string {
  const base = trimTrailingSlash(baseUrl)
  const trimmedFolder = folder.replace(/^\/+|\/+$/g, '')
  const safeFolder = trimmedFolder
    ? '/' +
      trimmedFolder
        .split('/')
        .map((seg) => encodeURIComponent(seg))
        .join('/')
    : ''
  return `${base}${safeFolder}/${encodeURIComponent(filename)}`
}

/** API-route helper: build horizontal URLs from a given base. */
export function getRemoteHorizontalReels(baseUrl: string): string[] {
  return HORIZONTAL_FILENAMES.map((name) => joinPublicUrl(baseUrl, HORIZONTAL_FOLDER, name))
}

/** API-route helper: build vertical URLs from a given base. */
export function getRemoteVerticalReels(baseUrl: string): string[] {
  return VERTICAL_FILENAMES.map((name) => joinPublicUrl(baseUrl, VERTICAL_FOLDER, name))
}

/** API-route helper: build the hero showreel URL from a given base. */
export function getRemoteHeroBackground(baseUrl: string): string {
  return joinPublicUrl(baseUrl, LANDING_PAGE_FOLDER, LANDING_PAGE_HERO_FILENAME)
}

/**
 * Public (client-side) URL constants. Use these everywhere a video URL
 * is needed outside of the API routes.
 */
export const PUBLIC_HORIZONTAL_REELS = getRemoteHorizontalReels(PUBLIC_MEDIA_BASE_URL)
export const PUBLIC_VERTICAL_REELS = getRemoteVerticalReels(PUBLIC_MEDIA_BASE_URL)
export const PUBLIC_HERO_BACKGROUND_URL = getRemoteHeroBackground(PUBLIC_MEDIA_BASE_URL)
