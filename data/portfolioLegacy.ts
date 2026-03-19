/**
 * Legacy portfolio data for FeaturedWorkFeed and PortfolioPillars.
 * Uses the old category/pillar naming for compatibility.
 * Uses placeholder photos from placeholders/photos/ (horizontal for thumbnails and media).
 */
import { getHorizontalPhoto } from './placeholderPhotos'

export type PortfolioCategory = 'institutional' | 'impact' | 'signature'

export interface LegacyPortfolioItem {
  id: string
  title: string
  client: string
  category: PortfolioCategory
  year: number
  results: string
  tags?: string[]
  featured?: boolean
  thumbnail: string
  media: { type: 'image' | 'video'; url: string; caption?: string }[]
}

export const portfolioCategorySections: {
  id: PortfolioCategory
  title: string
  description?: string
}[] = [
  {
    id: 'institutional',
    title: 'Institutions, Campaigns & Public Trust',
    description: 'Brand films, strategic communications, and public trust campaigns.',
  },
  {
    id: 'impact',
    title: 'Narrative & Reflective Works',
    description: 'Documentaries, community stories, and reflective content.',
  },
  {
    id: 'signature',
    title: 'Digital Presence & Ongoing Media',
    description: 'Ongoing media, social content, and digital presence.',
  },
]

export const portfolioItems: LegacyPortfolioItem[] = [
  {
    id: '1',
    title: 'Annual Fundraising Campaign',
    client: 'Islamic School Network',
    category: 'institutional',
    year: 2024,
    results: '340% increase in donations, $2.1M raised',
    thumbnail: getHorizontalPhoto(0),
    media: [
      { type: 'video', url: '/placeholders/portfolio-1-video.mp4' },
      { type: 'image', url: getHorizontalPhoto(0) },
      { type: 'image', url: getHorizontalPhoto(1) },
    ],
  },
  {
    id: '2',
    title: 'Community Impact Documentary',
    client: 'Muslim Community Center',
    category: 'impact',
    year: 2024,
    results: '1.2M views, 45K shares, national recognition',
    thumbnail: getHorizontalPhoto(1),
    media: [
      { type: 'video', url: '/placeholders/portfolio-2-video.mp4' },
      { type: 'image', url: getHorizontalPhoto(2) },
    ],
  },
  {
    id: '3',
    title: 'Brand Identity Launch',
    client: 'Premium Educational Institution',
    category: 'signature',
    year: 2023,
    results: 'Complete brand transformation, 200% enrollment increase',
    thumbnail: getHorizontalPhoto(2),
    media: [
      { type: 'image', url: getHorizontalPhoto(3) },
      { type: 'image', url: getHorizontalPhoto(0) },
      { type: 'video', url: '/placeholders/portfolio-3-video.mp4' },
    ],
  },
  {
    id: '4',
    title: 'Strategic Communications Campaign',
    client: 'Islamic Foundation',
    category: 'institutional',
    year: 2024,
    results: '500% engagement increase, 50K new followers',
    thumbnail: getHorizontalPhoto(3),
    media: [{ type: 'video', url: '/placeholders/portfolio-4-video.mp4' }],
  },
  {
    id: '5',
    title: 'Social Impact Series',
    client: 'Community Development Org',
    category: 'impact',
    year: 2023,
    results: 'Award-winning series, 800K total views',
    thumbnail: getHorizontalPhoto(0),
    media: [
      { type: 'video', url: '/placeholders/portfolio-5-video.mp4' },
      { type: 'image', url: getHorizontalPhoto(1) },
    ],
  },
  {
    id: '6',
    title: 'Executive Leadership Series',
    client: 'Educational Board',
    category: 'signature',
    year: 2024,
    results: 'Premium positioning, 90% stakeholder approval',
    thumbnail: getHorizontalPhoto(1),
    media: [
      { type: 'image', url: getHorizontalPhoto(2) },
      { type: 'video', url: '/placeholders/portfolio-6-video.mp4' },
    ],
  },
  {
    id: '7',
    title: 'Instagram Performance Campaign',
    client: 'Pillars of Guidance Community Centre',
    category: 'impact',
    year: 2024,
    results: '701K views, 84K reach, +102.5% growth, 16.3K interactions',
    thumbnail: getHorizontalPhoto(2),
    media: [
      { type: 'video', url: '/placeholders/portfolio-7-video.mp4' },
      { type: 'image', url: getHorizontalPhoto(3) },
    ],
  },
]
