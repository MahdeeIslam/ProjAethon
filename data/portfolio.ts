/**
 * Portfolio data types and unified item builder.
 * Combines horizontal + vertical reels with metadata from portfolioMeta.
 */

import { getMetaForReel, type Pillar } from './portfolioMeta'

export type PortfolioFormat = 'horizontal' | 'vertical'

export interface PortfolioItem {
  id: string
  title: string
  client: string
  year: number
  pillar: Pillar
  format: PortfolioFormat
  tags: string[]
  metrics?: { label: string; value: string }[]
  src: string
  poster?: string
  description?: string
}

const HERO_BACKGROUND_PATTERNS = ['backgroun', 'background', 'hero-loop']

function isHeroBackground(path: string): boolean {
  const lower = path.toLowerCase()
  return HERO_BACKGROUND_PATTERNS.some((p) => lower.includes(p))
}

function slugify(path: string): string {
  return path
    .replace(/\/placeholders\/reels\/(Vertical|Horizontal)\//, '')
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .toLowerCase()
}

export function buildPortfolioItems(
  horizontalPaths: string[],
  verticalPaths: string[]
): PortfolioItem[] {
  const items: PortfolioItem[] = []
  let idx = 0

  for (const path of horizontalPaths) {
    const meta = getMetaForReel(path)
    items.push({
      id: `h-${idx}`,
      title: meta.title,
      client: meta.client,
      year: meta.year,
      pillar: meta.pillar,
      format: 'horizontal',
      tags: meta.tags,
      metrics: meta.metrics,
      src: path,
      description: meta.description,
    })
    idx++
  }

  for (const path of verticalPaths) {
    if (isHeroBackground(path)) continue
    const meta = getMetaForReel(path)
    items.push({
      id: `v-${idx}`,
      title: meta.title,
      client: meta.client,
      year: meta.year,
      pillar: meta.pillar,
      format: 'vertical',
      tags: meta.tags,
      metrics: meta.metrics,
      src: path,
      description: meta.description,
    })
    idx++
  }

  return items
}
