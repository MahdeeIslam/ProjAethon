/**
 * Case studies for index and dynamic detail pages.
 *
 * Each study carries the copy (At A Glance, Problem, AETHON's Solution,
 * Outcome) plus a layout-aware media spec used by the detail page:
 *
 *   - `triple-vertical`     : three vertical R2 reels side-by-side
 *                             (e.g. Muslim Votes Matter, social campaign)
 *   - `side-vertical`       : single vertical reel on the right with
 *                             Problem + Solution body text on the left
 *                             (e.g. Virgin Mary Mosque, fundraiser story)
 *   - `horizontal-with-tour`: one full-width horizontal reel plus a
 *                             three-photo "tour" row beneath the solution
 *                             (e.g. Arabic Revival 360, event coverage)
 *
 * `heroImage` is the relevant thumbnail / banner image — used for the
 * index card *and* the top-of-page banner on each detail view.
 */

import { getHorizontalPhoto } from './placeholderPhotos'
import { YT } from './videoUrls'

export type CaseStudyMediaLayout =
  | 'triple-vertical'
  | 'side-vertical'
  | 'horizontal-with-tour'

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
  /** Hero / thumbnail image — index card + detail banner. */
  heroImage: string
  /** How the detail page renders the main media block. */
  mediaLayout: CaseStudyMediaLayout
  /** Reel URLs (R2). 1 for horizontal/side, 3 for triple-vertical. */
  mediaReels: string[]
  /** Tour photos (only consumed by 'horizontal-with-tour'). */
  tourPhotos?: string[]
  /** Legacy generic assets (kept for safety; not rendered on detail page). */
  assets?: { type: 'image' | 'video'; url: string; caption?: string }[]
  relatedIds: string[]
  /** Featured reel hint for the homepage Featured Case Studies block. */
  featuredReelSlug?: string
  metrics?: Array<{ value: string; label: string }>
  primaryMetric?: { value: string; label: string }
  secondaryMetric?: { value: string; label: string }
}

/** Safe accessors for metrics with fallback to atAGlance */
export function getMetrics(study: CaseStudy): Array<{ value: string; label: string }> {
  return study.metrics ?? study.atAGlance.slice(0, 3)
}

export function getPrimaryMetric(
  study: CaseStudy
): { value: string; label: string } | undefined {
  return study.primaryMetric ?? study.atAGlance[0]
}

export function getSecondaryMetric(
  study: CaseStudy
): { value: string; label: string } | undefined {
  return study.secondaryMetric ?? study.atAGlance[1]
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'muslim-votes-matter-national-movement',
    title: 'Mobilizing a National Movement',
    client: 'Muslim Votes Matter',
    atAGlance: [
      { label: 'Views', value: '500,000+' },
      { label: 'Likes', value: '35,000+' },
      { label: 'Shares', value: '8,000+' },
      { label: 'Impact', value: 'National Political Mobilization' },
    ],
    problem:
      'Despite widespread frustration within the Australian Muslim community regarding government inaction on Gaza, the sentiment lacked a unified political direction. Muslim Votes Matter emerged as a new organization with a critical challenge: they had to consolidate a fragmented voter base and transform raw emotion into a disciplined, electorally relevant movement in a very short window of time.',
    solution: [
      'Narrative Weight: Centered the campaign on first-hand testimony from Dr. Mohammad Mustafa, an Emergency Physician from the UK with multiple medical missions in Gaza — using lived experience to establish immediate credibility and a powerful emotional foundation for the movement.',
      'Accountability Framework: Reframed voting from a symbolic gesture into a concrete mechanism for accountability, positioning the organisation as a strategic guide for political participation across the Muslim community and the wider Australian public.',
      'High-Impact Distribution: Applied premium production values so the message broke out of niche circles and into the broader media landscape, establishing the organisation as a major player in national discourse.',
    ],
    outcome:
      'In an incredibly short timeframe, the campaign amassed over half a million views and mobilized thousands of voters. As a newly formed organisation, this initial impact set a powerful precedent — Muslim Votes Matter is now a permanent, credible force in Australian politics, poised for even greater influence in the years to come.',
    heroImage: '/case-studies/mvm-mustafa-thumb.jpg',
    mediaLayout: 'triple-vertical',
    mediaReels: [
      YT.verticalReels[2],
      YT.verticalReels[3],
      YT.verticalReels[4],
    ],
    relatedIds: ['2', '4'],
  },
  {
    id: '2',
    slug: 'virgin-mary-mosque-250k-4-weeks',
    title: '$250k in 4 Weeks with Zero Ad Spend',
    client: 'Virgin Mary Mosque',
    atAGlance: [
      { label: 'Raised in 4 Weeks', value: '$250,000' },
      { label: 'Estimated ROI', value: '7,000%+' },
      { label: 'Ad Spend', value: '$0' },
      { label: 'Revenue Stream', value: 'Perpetual Revenue Stream Secured' },
    ],
    problem:
      'The Virgin Mary Mosque had a four-week window to raise $250,000 to purchase a neighboring property. The objective was to secure this asset as a long-term investment, providing the mosque with a steady source of rental income and a more stable financial foundation.',
    solution: [
      'Cinematic Narrative Architecture: Replaced generic fundraising pleas with high-fidelity, emotion-driven storytelling. This repositioned the donation from a "charity cost" to a "legacy investment", significantly increasing the average donation size.',
      'Viral Content Engineering: Crafted the video specifically to trigger deep emotional resonance. Once seeded on WhatsApp and Instagram, it compelled voluntary sharing across private networks, creating a self-sustaining viral loop without manual management.',
      'Revenue Optimisation: Restructured the user journey to prioritise recurring, perpetual contributions over one-off gifts — securing a revenue stream that continued long after the campaign deadline.',
    ],
    outcome:
      'In four weeks the campaign raised $250,000, achieving a 7,000%+ estimated ROI driven entirely by the strength of the creative. Crucially, it established a perpetual revenue stream, securing the mosque’s financial stability for the long term — proof that authentic, cinematic storytelling drives higher conversion and deeper community loyalty than traditional outreach.',
    heroImage: '/case-studies/vmm-thumb.jpg',
    mediaLayout: 'side-vertical',
    mediaReels: [YT.verticalReels[10]],
    relatedIds: ['1', '5'],
  },
  {
    id: '3',
    slug: 'arabic-revival-360-event-funnel',
    title: '400% Growth via Event-to-Funnel Media',
    client: 'Arabic Revival 360',
    atAGlance: [
      { label: 'Increase in Student Enrolments', value: '400%' },
      { label: 'Views Generated', value: '200,000+' },
      { label: 'Revenue Generated', value: '$15,000+' },
      { label: 'Coverage', value: '5 Days of Continuous Coverage' },
    ],
    problem:
      'Arabic Revival 360 needed to capture their intense 5-day Arabic Discovery Tour in Melbourne, featuring international speaker Muhammad Al Andalusi. With a schedule packed with 2-3 daily events ranging from university workshops to bonfires, they needed a strategic media partner to turn live event energy into immediate "FOMO" to fill seats for the next day, while building a long-term content library for future course enrolments.',
    solution: [
      'Embedded Production: Integrated a dedicated creative lead into the tour team for the full 5-day duration, covering every angle from morning hikes to evening lectures.',
      'Real-Time "Hype" Engine: Delivered high-impact photos and social reels within 24 hours of each event, creating immediate FOMO on Instagram Stories that drove ticket sales for subsequent days.',
      'Legacy Asset Creation: Beyond daily social clips, produced long-form assets including a cinematic highlight film and full lecture recordings to serve as core marketing material for the next 12-18 months.',
    ],
    outcome:
      'The strategic, rapid-response coverage transformed the tour into a high-converting digital funnel. The campaign generated over 200,000 views and drove a 400% increase in student enrolments, directly attributing 2x in revenue to the project. AETHON proved that speed and cinematic quality can coexist to drive immediate business results.',
    heroImage: '/case-studies/ar360-thumb.jpg',
    mediaLayout: 'horizontal-with-tour',
    mediaReels: [YT.horizontalReels[0]],
    tourPhotos: [
      '/case-studies/ar360-tour-1.jpg',
      '/case-studies/ar360-tour-2.jpg',
      '/case-studies/ar360-tour-3.jpg',
    ],
    relatedIds: ['6', '4'],
  },
  {
    id: '4',
    slug: 'fairdinkum-podcast-25m-views',
    title: 'From Ground Zero to 25 Million Views',
    client: 'FairDinkum Podcast',
    atAGlance: [
      { label: 'Total Views Generated', value: '25.47M' },
      { label: 'Total Followers Gained', value: '83.7K' },
      { label: 'Episodes Recorded', value: '250+' },
      { label: 'Platforms', value: 'YouTube · Instagram · TikTok' },
    ],
    problem:
      'In 2020, FairDinkum Podcast started at ground zero: no audience and no platform. The challenge was two-fold — a lack of authentic, long-form content for the Australian Muslim community, and the difficulty of converting casual social media scrollers into a loyal community.',
    solution: [
      'Short-Form Engine: Dissected podcasts into high-impact snippets for TikTok and Reels, engineered for debate and shareability to dominate the "For You" page.',
      'Search-Centric Discovery: Overhauled YouTube metadata to rank for global searches, pulling in passive viewers 24/7.',
      'Visual Authority: Optimised visual presence with cinematic thumbnails and a cohesive brand aesthetic, significantly increasing CTR and perceived quality.',
    ],
    outcome:
      'Over six years, FairDinkum Podcast grew into a staple of the Australian Muslim digital space, amassing over 25 million views across multiple platforms. The strategy proved that you don’t need to be a major media company to have massive impact — you just need to be authentic and strategic about how you share your voice.',
    heroImage: getHorizontalPhoto(3),
    mediaLayout: 'horizontal-with-tour',
    mediaReels: [YT.horizontalReels[1] ?? YT.horizontalReels[0]],
    tourPhotos: [
      getHorizontalPhoto(1),
      getHorizontalPhoto(2),
      getHorizontalPhoto(0),
    ],
    relatedIds: ['5', '1'],
  },
  {
    id: '5',
    slug: 'onedeen-global-storytelling-platform',
    title: 'A Global Storytelling Platform Reaching Millions',
    client: 'OneDeen',
    atAGlance: [
      { label: 'Total Views Generated', value: '14M+' },
      { label: 'Total Followers Gained', value: '108,000+' },
      { label: 'Clips Recorded', value: '180+' },
      { label: 'Platforms', value: 'Instagram · TikTok' },
    ],
    problem:
      'When OneDeen launched, it entered an overcrowded social media environment dominated by recycled lecture clips, low-quality visuals, and content that struggled to connect with a lack of authenticity. The aim was to change the narrative by capturing emotionally compelling, short-form Islamic storytelling and motivational content.',
    solution: [
      'Street-interview storytelling format optimised for retention.',
      'Aggressive short-form publishing cadence.',
      'Emotionally driven interviews.',
      'Platform-optimised video structure to maximise watch time.',
    ],
    outcome:
      'AETHON transformed OneDeen from a zero-audience startup into a globally known short-form Islamic media platform generating 14 million+ views. This case study proves that with the right strategy, execution, and understanding of modern content, niche media brands can achieve massive global reach organically.',
    heroImage: getHorizontalPhoto(2),
    mediaLayout: 'triple-vertical',
    mediaReels: [
      YT.verticalReels[5] ?? YT.verticalReels[0],
      YT.verticalReels[6] ?? YT.verticalReels[1],
      YT.verticalReels[7] ?? YT.verticalReels[2],
    ],
    relatedIds: ['4', '6'],
  },
  {
    id: '6',
    slug: 'al-haramain-travels-umrah-brand',
    title: 'Scaling Al-Haramain Travels into a High-Demand Umrah Brand',
    client: 'Al-Haramain Travels',
    atAGlance: [
      { label: 'Total Views Generated', value: '1.1M+' },
      { label: 'Revenue Gained', value: '$200,000+' },
      { label: 'Clips Recorded', value: '25+' },
      { label: 'Platforms', value: 'Instagram · TikTok' },
    ],
    problem:
      'Al-Haramain Travels operates in one of the most trust-sensitive and competitive markets: Islamic pilgrimage travel. Despite offering high-quality Umrah packages, they faced limited digital authority and visibility in a highly competitive market with minimal brand differentiation.',
    solution: [
      'Trust-Driven Content Strategy: Emotionally driven content including cinematic Umrah visual storytelling and educational content about the Umrah journey.',
      'Short-Form Distribution & Algorithmic Reach: Platform-optimised vertical video strategy.',
      'High-retention editing structure designed for travel and pilgrimage decision-making.',
    ],
    outcome:
      'Through strategic execution, Al-Haramain Travels experienced significant digital growth and brand authority expansion. This resulted in higher engagement on social media and an increase in ticket purchases — transitioning the company from a traditional travel provider into a digitally authoritative Islamic travel brand.',
    keyOutcomes: [
      'Thousands of organic impressions generated',
      'Thousands of prospective pilgrims reached',
      'Significant increase in brand awareness and digital trust',
      'Strong inbound interest from prospective Umrah travelers',
    ],
    heroImage: getHorizontalPhoto(1),
    mediaLayout: 'side-vertical',
    mediaReels: [YT.verticalReels[8] ?? YT.verticalReels[0]],
    relatedIds: ['3', '5'],
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.id === id)
}
