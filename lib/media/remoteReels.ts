const HORIZONTAL_FILENAMES = [
  'Copy of Elders promo uncaptioned.mp4',
  'Copy of Third Space Teaser 1.mp4',
  'Copy of UMMA promo uncaptioned.mp4',
  'Copy of moe.vis client work.mp4',
  'Copy of recap elder event ver 5.mp4',
] as const

const VERTICAL_FILENAMES = [
  'Copy of M Gala Dinner Promo vid 1.mp4',
  'Copy of Shayan Alararming vid.mp4',
  'Copy of Yussf Xenocel Branding vid.mp4',
  'mvm gaza no intro.mp4',
  'Musibah.mp4',
  'Ree#1 03.MP4',
] as const

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '')
}

function toPublicUrl(baseUrl: string, folder: 'Horizontal' | 'Vertical', filename: string): string {
  return `${trimTrailingSlash(baseUrl)}/${folder}/${encodeURIComponent(filename)}`
}

export function getRemoteHorizontalReels(baseUrl: string): string[] {
  return HORIZONTAL_FILENAMES.map((name) => toPublicUrl(baseUrl, 'Horizontal', name))
}

export function getRemoteVerticalReels(baseUrl: string): string[] {
  return VERTICAL_FILENAMES.map((name) => toPublicUrl(baseUrl, 'Vertical', name))
}

