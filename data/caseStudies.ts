/**
 * Case studies for index and dynamic detail pages.
 * At A Glance + Problem / AETHON's Solution / The Outcome.
 * Image assets use placeholder photos from placeholders/photos/.
 */
import { getHorizontalPhoto } from './placeholderPhotos'
import { YT } from './videoUrls'

export interface CaseStudy {
  id: string
  title: string
  client: string
  slug: string
  atAGlance: { label: string; value: string }[]
  problem: string
  solution: string[]
  outcome: string
  /** Optional extra outcome bullets */
  keyOutcomes?: string[]
  assets: { type: 'image' | 'video'; url: string; caption?: string }[]
  relatedIds: string[]
  /** TODO: Map to horizontal reel filename for hero card background. Fallback to first shuffled horizontal reel. */
  featuredReelSlug?: string
  /** For hero: 3 stat blocks. Fallback: atAGlance[0..2]. */
  metrics?: Array<{ value: string; label: string }>
  /** For supporting cards. Fallback: atAGlance[0]. */
  primaryMetric?: { value: string; label: string }
  /** For supporting cards. Fallback: atAGlance[1]. */
  secondaryMetric?: { value: string; label: string }
}

/** Safe accessors for metrics with fallback to atAGlance */
export function getMetrics(study: CaseStudy): Array<{ value: string; label: string }> {
  return study.metrics ?? study.atAGlance.slice(0, 3)
}

export function getPrimaryMetric(study: CaseStudy): { value: string; label: string } | undefined {
  return study.primaryMetric ?? study.atAGlance[0]
}

export function getSecondaryMetric(study: CaseStudy): { value: string; label: string } | undefined {
  return study.secondaryMetric ?? study.atAGlance[1]
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'fairdinkum-podcast-25-million-views',
    title: 'From Ground Zero to 25 Million Views',
    client: 'FairDinkum Podcast',
    atAGlance: [
      { label: 'Total Views Generated', value: '25.47M' },
      { label: 'Total Followers Gained', value: '83.7K' },
      { label: 'Episodes Recorded', value: '250+' },
      { label: 'Platforms', value: 'YouTube, Instagram, TikTok' },
    ],
    problem: 'A podcast with strong content but no visual system or distribution strategy. Starting from zero audience and no established presence across platforms.',
    solution: [
      'Built a full visual system and content pipeline aligned with the show’s voice.',
      'Designed thumbnails, formats, and cutdowns for YouTube, Instagram, and TikTok.',
      'Implemented distribution and growth strategy to scale reach and followers.',
    ],
    outcome: 'From ground zero to 25.47M views and 83.7K followers, with 250+ episodes produced and a multi-platform presence that drives ongoing growth.',
    assets: [
      { type: 'video', url: YT.caseStudyReels.reel01, caption: 'Showreel' },
      { type: 'image', url: getHorizontalPhoto(0), caption: 'Campaign' },
      { type: 'image', url: getHorizontalPhoto(1), caption: 'Social' },
    ],
    relatedIds: ['2', '5', '3'],
  },
  {
    id: '2',
    slug: 'muslim-votes-matter-national-movement',
    title: 'Mobilizing a National Movement',
    client: 'Muslim Votes Matter',
    atAGlance: [
      { label: 'Views', value: '500,000+' },
      { label: 'Likes', value: '35,000+' },
      { label: 'Shares', value: '8,000+' },
      { label: 'Impact', value: 'National Political Mobilization' },
    ],
    problem: 'A civic campaign that needed to cut through noise and mobilize a national audience with limited budget and no existing visual narrative.',
    solution: [
      'Created a clear visual and narrative identity for the movement.',
      'Produced high-impact short-form and social content for maximum shareability.',
      'Aligned distribution with grassroots and digital channels for national reach.',
    ],
    outcome: '500K+ views, 35K+ likes, 8K+ shares, and measurable impact on national political mobilization.',
    assets: [
      { type: 'video', url: YT.caseStudyReels.reel02, caption: 'Campaign' },
      { type: 'image', url: getHorizontalPhoto(2), caption: 'Assets' },
    ],
    relatedIds: ['1', '4', '6'],
  },
  {
    id: '3',
    slug: 'virgin-mary-mosque-250k-4-weeks',
    title: '$250k in 4 Weeks with Zero Ad Spend',
    client: 'Virgin Mary Mosque',
    atAGlance: [
      { label: 'Raised in 4 Weeks', value: '$250,000' },
      { label: 'Estimated ROI', value: '7,000%+' },
      { label: 'Ad Spend', value: '$0' },
      { label: 'Revenue Stream', value: 'Perpetual Revenue Stream Secured' },
    ],
    problem: 'A mosque fundraising campaign with no paid budget, relying entirely on organic reach and community trust.',
    solution: [
      'Designed a story-led campaign that turned the cause into shareable, emotional content.',
      'Produced film and digital assets optimized for organic sharing and donations.',
      'Structured the funnel and messaging for clarity and conversion without paid media.',
    ],
    outcome: '$250K raised in 4 weeks, 7,000%+ estimated ROI, $0 ad spend, and a perpetual revenue stream secured.',
    assets: [
      { type: 'video', url: YT.caseStudyReels.reel03, caption: 'Campaign film' },
      { type: 'image', url: getHorizontalPhoto(3), caption: 'Campaign' },
    ],
    relatedIds: ['4', '1', '2'],
  },
  {
    id: '4',
    slug: 'arabic-revival-360-event-funnel',
    title: '400% Growth via "Event-to-Funnel" Media',
    client: 'Arabic Revival 360 (Arabic Discovery Tour 2.0)',
    atAGlance: [
      { label: 'Increase in Student Enrolments', value: '400%' },
      { label: 'Views Generated', value: '200,000+' },
      { label: 'Revenue Generated', value: '$15,000+' },
      { label: 'Coverage', value: '5 Days of Continuous coverage' },
    ],
    problem: 'An event with strong in-person impact but no system to capture attention and convert viewers into enrolled students.',
    solution: [
      'Treated the event as a media moment with full coverage and story-led content.',
      'Built an event-to-funnel system: content captured interest and drove sign-ups.',
      'Delivered 5 days of continuous coverage and repurposed into enrolment-focused assets.',
    ],
    outcome: '400% increase in student enrolments, 200K+ views, $15K+ revenue, and a repeatable event-to-funnel model.',
    assets: [
      { type: 'video', url: YT.caseStudyReels.reel04, caption: 'Event coverage' },
      { type: 'image', url: getHorizontalPhoto(0), caption: 'Event' },
      { type: 'image', url: getHorizontalPhoto(1), caption: 'Social' },
    ],
    relatedIds: ['2', '5', '6'],
  },
  {
    id: '5',
    slug: 'onedeen-global-storytelling-platform',
    title: 'Creating a global storytelling platform reaching millions worldwide',
    client: 'OneDeen',
    atAGlance: [
      { label: 'Total Views Generated', value: '14M' },
      { label: 'Total Followers Gained', value: '108,000+' },
      { label: 'Clips Recorded', value: '180+' },
      { label: 'Platforms', value: 'Instagram, TikTok' },
      { label: 'Content Category', value: 'Islamic Media, Digital Dawah, Short-Form storytelling' },
    ],
    problem: 'A mission to reach millions with Islamic media and dawah, but no scalable content system or distribution strategy.',
    solution: [
      'Built a global storytelling platform with a consistent visual and narrative system.',
      'Produced 180+ short-form clips optimized for Instagram and TikTok.',
      'Implemented distribution and growth strategy to scale followers and views.',
    ],
    outcome: '14M total views, 108K+ followers, 180+ clips, and a global short-form storytelling platform in Islamic media and digital dawah.',
    assets: [
      { type: 'video', url: YT.caseStudyReels.reel05, caption: 'Short-form' },
      { type: 'image', url: getHorizontalPhoto(2), caption: 'Platform' },
    ],
    relatedIds: ['1', '4', '6'],
  },
  {
    id: '6',
    slug: 'al-haramain-travels-umrah-brand',
    title: 'Scaling Al-Haramain Travels into a High Demand Umrah Brand',
    client: 'Al-Haramain Travels',
    atAGlance: [
      { label: 'Total Views Generated', value: '1.1M' },
      { label: 'Revenue Gained', value: '$200,000+' },
      { label: 'Clips Recorded', value: '25+' },
      { label: 'Platforms', value: 'Instagram, TikTok' },
      { label: 'Category', value: 'Muslim Travel Company, Umrah & Hajj specialist' },
    ],
    problem: 'A travel brand with a niche offer that needed to stand out and convert in a crowded space.',
    solution: [
      'Positioned Al-Haramain Travels as a high-demand Umrah and Hajj specialist through clear brand storytelling.',
      'Produced 25+ clips and assets tailored for Instagram and TikTok.',
      'Aligned content and funnels with search and social behaviour to drive bookings.',
    ],
    outcome: '1.1M views, $200K+ revenue, 25+ clips, and a recognizable, high-demand Umrah brand.',
    keyOutcomes: [
      'Strong brand recognition in the Muslim travel space.',
      'Scalable content system for ongoing campaigns.',
      'Measurable revenue tied to content and distribution.',
    ],
    assets: [
      { type: 'video', url: YT.caseStudyReels.reel06, caption: 'Brand' },
      { type: 'image', url: getHorizontalPhoto(3), caption: 'Campaign' },
      { type: 'image', url: getHorizontalPhoto(0), caption: 'Social' },
    ],
    relatedIds: ['4', '5', '3'],
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.id === id)
}
