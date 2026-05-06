/**
 * Remote reel manifest for Cloudflare R2 (or any compatible CDN).
 *
 * Bucket layout (as of May 2026):
 *   - Horizontal clips live under the `Horizontal/` subfolder.
 *   - Vertical clips live under the `Vertical/` subfolder.
 *
 * Update these arrays when you upload new files to R2 — names must match
 * the object keys in the bucket exactly (including spaces, casing, and `#`).
 */

const HORIZONTAL_FILENAMES = [
  'Copy of Elders promo uncaptioned.mp4',
  'Copy of Third Space Teaser 1.mp4',
  'Copy of UMMA promo uncaptioned.mp4',
  'Copy of moe.vis client work.mp4',
  'Copy of recap elder event ver 5.mp4',
  'Copy of AR360 Basketball Event_Portfolio.mp4',
  'Copy of Copy of DWF scene 1 v3 with title screen.mp4',
  'Copy of Copy of DWF scene 3 final v5.mp4',
] as const

const VERTICAL_FILENAMES = [
  'Musibah.mp4',
  'MVM DR Mustafa V2.mp4',
  'mvm gaza no intro.mp4',
  'Ree#1 03.MP4',
  'Copy of MM Gala Dinner Promo vid 1.mp4',
  'Copy of Shayan Aurafarming vid.mp4',
  'Copy of Yussuf Personal Branding vid.mp4',
  'BAHDON STORY.mp4',
] as const

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '')
}

/** Encodes only the filename — preserves the configured folder path. */
function joinPublicUrl(baseUrl: string, folder: string, filename: string): string {
  const base = trimTrailingSlash(baseUrl)
  const safeFolder = folder ? `/${folder.replace(/^\/+|\/+$/g, '')}` : ''
  return `${base}${safeFolder}/${encodeURIComponent(filename)}`
}

export function getRemoteHorizontalReels(baseUrl: string): string[] {
  return HORIZONTAL_FILENAMES.map((name) => joinPublicUrl(baseUrl, 'Horizontal', name))
}

export function getRemoteVerticalReels(baseUrl: string): string[] {
  return VERTICAL_FILENAMES.map((name) => joinPublicUrl(baseUrl, 'Vertical', name))
}
