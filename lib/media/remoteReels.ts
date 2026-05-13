/**
 * Remote reel manifest for Cloudflare R2 (or any compatible CDN).
 *
 * Current bucket layout (May 2026, post-recompression):
 *   - Horizontal clips: `Vertical/horizontal/horizontal/<file>`
 *   - Vertical clips:   `Vertical/vertical/<file>`
 *   - Landing page hero: `Vertical/landing page/final aethon showreel.mp4`
 *     (consumed directly by `data/videoUrls.ts → heroBackground`.)
 *
 * Update these arrays when you upload new files to R2 — names must match
 * the object keys in the bucket exactly (including spaces, casing, and `#`).
 */

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

export function getRemoteHorizontalReels(baseUrl: string): string[] {
  return HORIZONTAL_FILENAMES.map((name) =>
    joinPublicUrl(baseUrl, 'Vertical/horizontal/horizontal', name)
  )
}

export function getRemoteVerticalReels(baseUrl: string): string[] {
  return VERTICAL_FILENAMES.map((name) => joinPublicUrl(baseUrl, 'Vertical/vertical', name))
}
