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
      '/videos/case-studies/mvm-mustafa.mp4',
      '/videos/case-studies/mvm-first.mp4',
      '/videos/case-studies/mvm-gaza.mp4',
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
    mediaReels: ['/videos/case-studies/vmm.mp4'],
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
    mediaReels: ['/videos/case-studies/ar360.mp4'],
    tourPhotos: [
      '/case-studies/ar360-tour-1.jpg',
      '/case-studies/ar360-tour-2.jpg',
      '/case-studies/ar360-tour-3.jpg',
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
