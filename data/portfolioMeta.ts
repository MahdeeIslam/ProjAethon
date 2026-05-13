/**
 * Metadata mapping for portfolio reels.
 *
 * Each entry maps the *decoded filename* of a reel hosted on
 * Cloudflare R2 (see `lib/media/remoteReels.ts`) to the human-readable
 * fields shown on the portfolio page.
 *
 * Each clip has:
 *   - `client`   : the organisation or person the work was made for
 *   - `title`    : the proper project name (not the file name)
 *   - `type`     : short descriptor — e.g. "Documentary", "Campaign Film"
 *   - `category` : one of the three portfolio categories displayed on
 *                  the page ("film" | "campaigns" | "content"). These
 *                  mirror the "Film. Campaigns. Content." sub-heading
 *                  in the portfolio hero.
 *   - `pillar`   : legacy taxonomy retained for back-compat with the
 *                  rest of the site (case studies etc.).
 */

import { extractYouTubeId } from '@/lib/youtube'

export type Pillar = 'institutions' | 'narrative' | 'digital'

/** Three top-level portfolio categories (Film. Campaigns. Content.). */
export type PortfolioCategory = 'film' | 'campaigns' | 'content'

export interface PortfolioItemMeta {
  client: string
  title: string
  type: string
  category: PortfolioCategory
  pillar: Pillar
  year: number
  tags: string[]
  description?: string
  metrics?: { label: string; value: string }[]
}

export const CATEGORY_LABELS: Record<PortfolioCategory, string> = {
  film: 'Film',
  campaigns: 'Campaigns',
  content: 'Content',
}

export const CATEGORY_BLURBS: Record<PortfolioCategory, string> = {
  film: 'Long-form story, documentary, and event films.',
  campaigns: 'Promos, teasers, and paid campaigns built to reach the right people.',
  content: 'Short-form social, branding, and ongoing content.',
}

export const CATEGORY_ORDER: PortfolioCategory[] = ['film', 'campaigns', 'content']

/**
 * Key = decoded filename returned by `getFilename(path)` below.
 * Covers all clips currently in the R2 bucket.
 */
const META_BY_PATH: Record<string, Partial<PortfolioItemMeta>> = {
  // --- Horizontal / landscape clips ----------------------------------------
  'Arabic Revival 360 Basketball Tournament.mp4': {
    client: 'Arabic Revival 360',
    title: 'Basketball Tournament',
    type: 'Event Film',
    category: 'film',
    pillar: 'narrative',
    year: 2025,
    tags: ['event', 'sport', 'film'],
  },
  'Copy of Copy of DWF scene 1 v3 with title screen.mp4': {
    client: 'DWF',
    title: 'Scene One',
    type: 'Documentary',
    category: 'film',
    pillar: 'narrative',
    year: 2024,
    tags: ['documentary', 'film'],
  },
  'Copy of Copy of DWF scene 2 final v3.mp4': {
    client: 'DWF',
    title: 'Scene Two',
    type: 'Documentary',
    category: 'film',
    pillar: 'narrative',
    year: 2024,
    tags: ['documentary', 'film'],
  },
  'Copy of Copy of DWF scene 3 final v5.mp4': {
    client: 'DWF',
    title: 'Scene Three',
    type: 'Documentary',
    category: 'film',
    pillar: 'narrative',
    year: 2024,
    tags: ['documentary', 'film'],
  },
  'Copy of Elders promo uncaptioned.mp4': {
    client: 'Elders',
    title: 'Community Promo',
    type: 'Campaign Film',
    category: 'campaigns',
    pillar: 'institutions',
    year: 2024,
    tags: ['promo', 'community'],
    metrics: [{ label: 'Reach', value: '50K+' }],
  },
  'Copy of Third Space Teaser 1.mp4': {
    client: 'Third Space',
    title: 'Brand Teaser',
    type: 'Promo',
    category: 'campaigns',
    pillar: 'digital',
    year: 2024,
    tags: ['teaser', 'brand'],
  },
  'Copy of UMMA promo uncaptioned.mp4': {
    client: 'UMMA',
    title: 'Annual Promo',
    type: 'Campaign Film',
    category: 'campaigns',
    pillar: 'institutions',
    year: 2024,
    tags: ['promo', 'institutional'],
    metrics: [{ label: 'Views', value: '100K+' }],
  },

  // --- Vertical / portrait clips -------------------------------------------
  'BAHDON STORY.mp4': {
    client: 'Bahdon',
    title: 'Bahdon Story',
    type: 'Short Film',
    category: 'film',
    pillar: 'narrative',
    year: 2024,
    tags: ['story', 'short-form'],
  },
  'Beckham Baker Broll.mp4': {
    client: 'Beckham Baker',
    title: 'Brand B-Roll',
    type: 'Content',
    category: 'content',
    pillar: 'digital',
    year: 2025,
    tags: ['b-roll', 'brand'],
  },
  'Captions_06AFE6.mp4': {
    client: 'Aethon',
    title: 'Captioned Reel I',
    type: 'Short-Form Content',
    category: 'content',
    pillar: 'digital',
    year: 2025,
    tags: ['short-form', 'social'],
  },
  'Captions_9326EE.mp4': {
    client: 'Aethon',
    title: 'Captioned Reel II',
    type: 'Short-Form Content',
    category: 'content',
    pillar: 'digital',
    year: 2025,
    tags: ['short-form', 'social'],
  },
  'Captions_BFEB6C.mp4': {
    client: 'Aethon',
    title: 'Captioned Reel III',
    type: 'Short-Form Content',
    category: 'content',
    pillar: 'digital',
    year: 2025,
    tags: ['short-form', 'social'],
  },
  'Captions_D7EF39.mp4': {
    client: 'Aethon',
    title: 'Captioned Reel IV',
    type: 'Short-Form Content',
    category: 'content',
    pillar: 'digital',
    year: 2025,
    tags: ['short-form', 'social'],
  },
  'Copy of MM Gala Dinner Promo vid 1.mp4': {
    client: 'MM',
    title: 'Gala Dinner Promo',
    type: 'Event Campaign',
    category: 'campaigns',
    pillar: 'institutions',
    year: 2024,
    tags: ['promo', 'event'],
  },
  'Copy of Shayan Aurafarming vid.mp4': {
    client: 'Shayan',
    title: 'Aurafarming',
    type: 'Personal Brand Content',
    category: 'content',
    pillar: 'digital',
    year: 2025,
    tags: ['personal-brand', 'short-form'],
  },
  'Copy of Third Space AR360 Bonfire Vid Promo.mp4': {
    client: 'Third Space × AR360',
    title: 'Bonfire Promo',
    type: 'Event Campaign',
    category: 'campaigns',
    pillar: 'narrative',
    year: 2025,
    tags: ['promo', 'event'],
  },
  'Copy of Yussuf Personal Branding vid.mp4': {
    client: 'Yussuf',
    title: 'Personal Branding',
    type: 'Brand Content',
    category: 'content',
    pillar: 'digital',
    year: 2025,
    tags: ['personal-brand', 'short-form'],
  },
  'Musibah.mp4': {
    client: 'Aethon',
    title: 'Musibah',
    type: 'Short Film',
    category: 'film',
    pillar: 'narrative',
    year: 2024,
    tags: ['short-form', 'story'],
    metrics: [{ label: 'Views', value: '200K+' }],
  },
  'QUBA REMINDER .mp4': {
    client: 'Quba',
    title: 'The Reminder',
    type: 'Short Film',
    category: 'film',
    pillar: 'narrative',
    year: 2024,
    tags: ['short-form', 'reminder'],
  },
  'Ree#1 03.mp4': {
    client: 'Aethon',
    title: 'Reel No. 1',
    type: 'Social Reel',
    category: 'content',
    pillar: 'digital',
    year: 2024,
    tags: ['short-form', 'social'],
  },
  'TAOFIQ STORY V2.mp4': {
    client: 'Taofiq',
    title: 'His Story',
    type: 'Short Film',
    category: 'film',
    pillar: 'narrative',
    year: 2024,
    tags: ['short-form', 'story'],
  },
}

/** When portfolio uses YouTube URLs (legacy). */
const META_BY_YOUTUBE_ID: Record<string, Partial<PortfolioItemMeta>> = {
  XK_wiMNxfCE: META_BY_PATH['Copy of Elders promo uncaptioned.mp4'],
  uiZELAehGNM: META_BY_PATH['Copy of Third Space Teaser 1.mp4'],
  KkKKx13q6Bc: META_BY_PATH['Copy of Elders promo uncaptioned.mp4'],
  hkDefsMzmqY: META_BY_PATH['Copy of Elders promo uncaptioned.mp4'],
  kTeN7EMQQeI: META_BY_PATH['Musibah.mp4'],
  '5g3Tz_ZICps': META_BY_PATH['BAHDON STORY.mp4'],
  Dcs18A4JFhc: META_BY_PATH['Copy of UMMA promo uncaptioned.mp4'],
  nTfIrIHp23I: META_BY_PATH['Ree#1 03.mp4'],
  '22K2-0-fGMg': META_BY_PATH['Ree#1 03.mp4'],
  nlPPQRuaABY: META_BY_PATH['TAOFIQ STORY V2.mp4'],
}

function getFilename(path: string): string {
  const withoutQuery = path.split('?')[0]
  const parts = withoutQuery.split('/')
  const raw = parts[parts.length - 1] ?? withoutQuery
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

function prettifyFromFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/^Copy of (Copy of )?/i, '')
    .replace(/\s+v?\d+(\.\d+)?$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getMetaForReel(path: string): PortfolioItemMeta {
  const ytId = extractYouTubeId(path)
  if (ytId) {
    const override = META_BY_YOUTUBE_ID[ytId]
    if (override) {
      return {
        client: override.client ?? 'Aethon',
        title: override.title ?? ytId,
        type: override.type ?? 'Video',
        category: override.category ?? 'content',
        pillar: override.pillar ?? 'digital',
        year: override.year ?? 2024,
        tags: override.tags ?? ['video'],
        description: override.description,
        metrics: override.metrics,
      }
    }
  }

  const filename = getFilename(path)
  const override = META_BY_PATH[filename]

  return {
    client: override?.client ?? 'Aethon',
    title: override?.title ?? prettifyFromFilename(filename),
    type: override?.type ?? 'Video',
    category: override?.category ?? 'content',
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
