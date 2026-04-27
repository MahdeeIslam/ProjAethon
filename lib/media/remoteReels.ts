const HORIZONTAL_FILENAMES = [
  'Copy of Elders promo uncaptioned.mp4',
  'Copy of Third Space Teaser 1.mp4',
  'Copy of UMMA promo uncaptioned.mp4',
  'Copy of moe.vis client work.mp4',
  'Copy of recap elder event ver 5.mp4',
] as const

const VERTICAL_FILENAMES = [
  'MVM DR Mustafa V2.mp4',
  'MVM GAZA UPDATEDv3.mp4',
  'Musibah.mp4',
  'TAOFIQ STORY V2.mp4',
] as const

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '')
}

function toPublicUrl(baseUrl: string, folder: 'Horizontal' | 'Vertical', filename: string): string {
  return `${trimTrailingSlash(baseUrl)}/reels/${folder}/${encodeURIComponent(filename)}`
}

export function getRemoteHorizontalReels(baseUrl: string): string[] {
  return HORIZONTAL_FILENAMES.map((name) => toPublicUrl(baseUrl, 'Horizontal', name))
}

export function getRemoteVerticalReels(baseUrl: string): string[] {
  return VERTICAL_FILENAMES.map((name) => toPublicUrl(baseUrl, 'Vertical', name))
}

