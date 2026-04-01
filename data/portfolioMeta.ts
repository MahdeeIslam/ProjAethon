/**
 * Metadata mapping for portfolio reels.
 * Maps reel paths/filenames to client, title, pillar, year, tags, and metrics.
 * TODO: Replace placeholders with real project metadata.
 */

import { extractYouTubeId } from '@/lib/youtube'

export type Pillar = 'institutions' | 'narrative' | 'digital'

export interface PortfolioItemMeta {
  client: string
  title: string
  pillar: Pillar
  year: number
  tags: string[]
  description?: string
  metrics?: { label: string; value: string }[]
}

/** Key: reel path (normalized) or filename. Value: metadata override. */
const META_BY_PATH: Record<string, Partial<PortfolioItemMeta>> = {
  // Horizontal reels
  'Copy of Elders promo uncaptioned.mp4': {
    client: 'Elders Community',
    title: 'Elders Promo',
    pillar: 'narrative',
    year: 2024,
    tags: ['promo', 'community'],
    metrics: [{ label: 'Reach', value: '50K+' }],
  },
  'Copy of Third Space Teaser 1.mp4': {
    client: 'Third Space',
    title: 'Third Space Teaser',
    pillar: 'digital',
    year: 2024,
    tags: ['teaser', 'digital'],
  },
  'Copy of UMMA promo uncaptioned.mp4': {
    client: 'UMMA',
    title: 'UMMA Promo',
    pillar: 'institutions',
    year: 2024,
    tags: ['promo', 'institutional'],
    metrics: [{ label: 'Views', value: '100K+' }],
  },
  'Copy of moe.vis client work.mp4': {
    client: 'moe.vis',
    title: 'Client Showreel',
    pillar: 'digital',
    year: 2024,
    tags: ['showreel', 'digital'],
  },
  'Copy of recap elder event ver 5.mp4': {
    client: 'Elders Community',
    title: 'Elder Event Recap',
    pillar: 'narrative',
    year: 2024,
    tags: ['event', 'recap'],
  },
  // Vertical reels (exclude hero/background)
  'Musibah.mp4': {
    client: 'Community',
    title: 'Musibah Story',
    pillar: 'narrative',
    year: 2024,
    tags: ['short-form', 'story'],
    metrics: [{ label: 'Views', value: '200K+' }],
  },
  'TAOFIQ STORY V2.mp4': {
    client: 'Taofiq',
    title: 'Taofiq Story',
    pillar: 'narrative',
    year: 2024,
    tags: ['short-form', 'story'],
  },
  'MVM DR Mustafa V2.mp4': {
    client: 'Virgin Mary Mosque',
    title: 'Dr. Mustafa Feature',
    pillar: 'institutions',
    year: 2024,
    tags: ['campaign', 'institutional'],
    metrics: [
      { label: 'Raised', value: '$250K' },
      { label: 'Ad Spend', value: '$0' },
    ],
  },
  'MVM GAZA UPDATEDv3.mp4': {
    client: 'Virgin Mary Mosque',
    title: 'Gaza Campaign Update',
    pillar: 'institutions',
    year: 2024,
    tags: ['campaign', 'appeal'],
    metrics: [{ label: 'Raised', value: '$250K+' }],
  },
  'Ree#1 03.MP4': {
    client: 'Client',
    title: 'Reel #1',
    pillar: 'digital',
    year: 2024,
    tags: ['short-form', 'social'],
  },
  'Reel#3 02.MP4': {
    client: 'Client',
    title: 'Reel #3',
    pillar: 'digital',
    year: 2024,
    tags: ['short-form', 'social'],
  },
}

/** When portfolio uses YouTube URLs (e.g. production without local MP4s). */
const META_BY_YOUTUBE_ID: Record<string, Partial<PortfolioItemMeta>> = {
  XK_wiMNxfCE: META_BY_PATH['Copy of Elders promo uncaptioned.mp4'],
  uiZELAehGNM: META_BY_PATH['Copy of Third Space Teaser 1.mp4'],
  KkKKx13q6Bc: META_BY_PATH['Copy of moe.vis client work.mp4'],
  hkDefsMzmqY: META_BY_PATH['Copy of recap elder event ver 5.mp4'],
  kTeN7EMQQeI: META_BY_PATH['Musibah.mp4'],
  '5g3Tz_ZICps': META_BY_PATH['MVM DR Mustafa V2.mp4'],
  Dcs18A4JFhc: META_BY_PATH['MVM GAZA UPDATEDv3.mp4'],
  nTfIrIHp23I: META_BY_PATH['Ree#1 03.MP4'],
  '22K2-0-fGMg': META_BY_PATH['Reel#3 02.MP4'],
  nlPPQRuaABY: META_BY_PATH['TAOFIQ STORY V2.mp4'],
}

function getFilename(path: string): string {
  const parts = path.split('/')
  return parts[parts.length - 1] ?? path
}

export function getMetaForReel(path: string): PortfolioItemMeta {
  const ytId = extractYouTubeId(path)
  if (ytId) {
    const override = META_BY_YOUTUBE_ID[ytId]
    if (override) {
      return {
        client: override.client ?? 'Client',
        title: override.title ?? ytId,
        pillar: override.pillar ?? 'digital',
        year: override.year ?? 2024,
        tags: override.tags ?? ['video'],
        description: override.description,
        metrics: override.metrics,
      }
    }
  }

  const filename = getFilename(path).split('?')[0]
  const override = META_BY_PATH[filename]

  return {
    client: override?.client ?? 'Client',
    title: override?.title ?? filename.replace(/\.mp4$/i, '').replace(/-/g, ' '),
    pillar: override?.pillar ?? 'digital',
    year: override?.year ?? 2024,
    tags: override?.tags ?? ['video'],
    description: override?.description,
    metrics: override?.metrics,
  }
}

export const PILLAR_LABELS: Record<Pillar, string> = {
  institutions: 'Institutions, Campaigns & Public Trust',
  narrative: 'Narrative & Reflective Works',
  digital: 'Digital Presence & Ongoing Media',
}
