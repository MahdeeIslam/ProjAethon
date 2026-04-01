/**
 * Explicit reel metadata. Prefer this over URL heuristics for aspect and cover.
 * Keys are YouTube video IDs or canonical slug (for MP4 basename matching).
 */

export type ReelAspect = 'landscape' | 'portrait' | 'square'

export type ReelSource = 'mp4' | 'youtube'

export type ReelMeta = {
  id: string
  source: ReelSource
  youtubeId?: string
  /** Match `Copy of Third Space Teaser 1.mp4` → "third-space-teaser" or basename key */
  fileSlug?: string
  src?: string
  poster?: string
  aspect?: ReelAspect
  coverScale?: number
  featuredCoverScale?: number
  heroCoverScale?: number
  gridCoverScale?: number
  modalCoverScale?: number
  forceCoverMode?: boolean
  title?: string
}

export const reelMetaById: Record<string, ReelMeta> = {
  uiZELAehGNM: {
    id: 'uiZELAehGNM',
    source: 'youtube',
    youtubeId: 'uiZELAehGNM',
    aspect: 'portrait',
    coverScale: 1.28,
    heroCoverScale: 1.32,
    featuredCoverScale: 1.32,
    forceCoverMode: true,
    title: 'Third Space teaser',
  },
  XK_wiMNxfCE: {
    id: 'XK_wiMNxfCE',
    source: 'youtube',
    youtubeId: 'XK_wiMNxfCE',
    aspect: 'landscape',
    title: 'Elders promo',
  },
  KkKKx13q6Bc: {
    id: 'KkKKx13q6Bc',
    source: 'youtube',
    youtubeId: 'KkKKx13q6Bc',
    aspect: 'landscape',
    title: 'Moe.vis client work',
  },
  hkDefsMzmqY: {
    id: 'hkDefsMzmqY',
    source: 'youtube',
    youtubeId: 'hkDefsMzmqY',
    aspect: 'landscape',
    title: 'Elder event recap',
  },
  'XIVQ-LYGflw': {
    id: 'XIVQ-LYGflw',
    source: 'youtube',
    youtubeId: 'XIVQ-LYGflw',
    aspect: 'landscape',
    title: 'Hero loop',
  },
  kTeN7EMQQeI: {
    id: 'kTeN7EMQQeI',
    source: 'youtube',
    youtubeId: 'kTeN7EMQQeI',
    aspect: 'portrait',
    coverScale: 1.28,
    gridCoverScale: 1.28,
    title: 'Musibah',
  },
  '5g3Tz_ZICps': {
    id: '5g3Tz_ZICps',
    source: 'youtube',
    youtubeId: '5g3Tz_ZICps',
    aspect: 'portrait',
    coverScale: 1.28,
    gridCoverScale: 1.28,
    title: 'MVM Dr Mustafa V2',
  },
  Dcs18A4JFhc: {
    id: 'Dcs18A4JFhc',
    source: 'youtube',
    youtubeId: 'Dcs18A4JFhc',
    aspect: 'portrait',
    coverScale: 1.28,
    gridCoverScale: 1.28,
    title: 'MVM Gaza Updated',
  },
  nTfIrIHp23I: {
    id: 'nTfIrIHp23I',
    source: 'youtube',
    youtubeId: 'nTfIrIHp23I',
    aspect: 'portrait',
    coverScale: 1.28,
    gridCoverScale: 1.28,
    title: 'Ree#1',
  },
  '22K2-0-fGMg': {
    id: '22K2-0-fGMg',
    source: 'youtube',
    youtubeId: '22K2-0-fGMg',
    aspect: 'portrait',
    coverScale: 1.28,
    gridCoverScale: 1.28,
    title: 'Reel#3',
  },
  nlPPQRuaABY: {
    id: 'nlPPQRuaABY',
    source: 'youtube',
    youtubeId: 'nlPPQRuaABY',
    aspect: 'portrait',
    coverScale: 1.28,
    gridCoverScale: 1.28,
    title: 'TAOFIQ STORY',
  },
}
