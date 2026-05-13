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
      'A civic campaign that needed to cut through noise and mobilize a national audience with limited budget and no existing visual narrative.',
    solution: [
      'Created a clear visual and narrative identity for the movement.',
      'Produced high-impact short-form and social content for maximum shareability.',
      'Aligned distribution with grassroots and digital channels for national reach.',
    ],
    outcome:
      '500K+ views, 35K+ likes, 8K+ shares, and measurable impact on national political mobilization.',
    heroImage: getHorizontalPhoto(0),
    mediaLayout: 'triple-vertical',
    mediaReels: [
      YT.verticalReels[2],
      YT.verticalReels[3],
      YT.verticalReels[4],
    ],
    relatedIds: ['2', '3'],
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
      'A mosque fundraising campaign with no paid budget, relying entirely on organic reach and community trust.',
    solution: [
      'Designed a story-led campaign that turned the cause into shareable, emotional content.',
      'Produced film and digital assets optimized for organic sharing and donations.',
      'Structured the funnel and messaging for clarity and conversion without paid media.',
    ],
    outcome:
      '$250K raised in 4 weeks, 7,000%+ estimated ROI, $0 ad spend, and a perpetual revenue stream secured.',
    heroImage: getHorizontalPhoto(1),
    mediaLayout: 'side-vertical',
    mediaReels: [YT.verticalReels[10]],
    relatedIds: ['1', '3'],
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
      { label: 'Coverage', value: '5 Days of Continuous coverage' },
    ],
    problem:
      'An event with strong in-person impact but no system to capture attention and convert viewers into enrolled students.',
    solution: [
      'Treated the event as a media moment with full coverage and story-led content.',
      'Built an event-to-funnel system: content captured interest and drove sign-ups.',
      'Delivered 5 days of continuous coverage and repurposed into enrolment-focused assets.',
    ],
    outcome:
      '400% increase in student enrolments, 200K+ views, $15K+ revenue, and a repeatable event-to-funnel model.',
    heroImage: getHorizontalPhoto(2),
    mediaLayout: 'horizontal-with-tour',
    mediaReels: [YT.horizontalReels[0]],
    tourPhotos: [
      getHorizontalPhoto(0),
      getHorizontalPhoto(1),
      getHorizontalPhoto(3),
    ],
    relatedIds: ['1', '2'],
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.id === id)
}
