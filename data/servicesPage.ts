/**
 * Services page: structured data for hero, navigator, service sections,
 * engagement options, and FAQ. Used by app/services/page.tsx.
 */

export interface CapabilityItem {
  title: string
  description: string
  tag?: string
}

export interface ProcessStep {
  label: string
  body: string
}

export interface ThirtyDaysPanel {
  week1: string
  week2: string
  week3: string
  week4: string
}

export interface ServiceSectionData {
  id: string
  title: string
  summary: string
  bestFor: string[]
  deliverables: string
  capabilities: CapabilityItem[]
  proof: string[]
  process: ProcessStep[]
  thirtyDays?: ThirtyDaysPanel
}

export const SERVICE_NAV_ITEMS = [
  { id: 'media-production', label: 'Media Production' },
  { id: 'social-media', label: 'Social Media Strategy & Growth' },
  { id: 'digital-platforms', label: 'Digital Platforms, Search & Systems' },
  { id: 'brand-narrative', label: 'Brand & Narrative' },
] as const

export const SERVICES: ServiceSectionData[] = [
  {
    id: 'media-production',
    title: 'Media Production',
    summary: 'End-to-end video, photography, design, and post-production. From concept to delivery, we build flagship assets and platform-optimised cutdowns that compound.',
    bestFor: ['Brand campaigns and product launches', 'Documentary and narrative storytelling', 'Event and campaign coverage'],
    deliverables: 'Brand films, campaign films, cutdowns, photography sets, visual systems, graded masters and platform deliverables.',
    capabilities: [
      { title: 'Creative Direction', description: 'Concept, treatment, and creative leadership.', tag: 'Pre-production' },
      { title: 'Script & Storyboard', description: 'Narrative structure and shot planning.', tag: 'Pre-production' },
      { title: 'Brand Films & Campaign Films', description: 'High-end flagship assets.', tag: 'Shoot' },
      { title: 'Documentary & Narrative', description: 'Community stories and long-form arcs.', tag: 'Shoot' },
      { title: 'Event & Campaign Coverage', description: 'Capture moments with purpose.', tag: 'Shoot' },
      { title: 'Post-production Suite', description: 'Editing, grading, sound, motion.', tag: 'Post' },
      { title: 'Brand & Lifestyle Photography', description: 'Visual identity and storytelling stills.', tag: 'Shoot' },
      { title: 'Product & Commercial', description: 'Product-led and commercial shoots.', tag: 'Shoot' },
      { title: 'Architectural & Interior', description: 'Space and place documentation.', tag: 'Shoot' },
      { title: 'Event Photography', description: 'Live and campaign event capture.', tag: 'Shoot' },
      { title: 'Campaign Visual Systems', description: 'Unified look and templates.', tag: 'Design' },
      { title: 'Social Media Creatives', description: 'Platform-native assets.', tag: 'Design' },
      { title: 'Thumbnails & Ad Assets', description: 'Performance-oriented creatives.', tag: 'Design' },
      { title: 'Brand Collateral', description: 'Marketing and brand materials.', tag: 'Design' },
      { title: 'Narrative Editing', description: 'Story-led cut and pace.', tag: 'Post' },
      { title: 'Cinematic Colour Grade', description: 'Look and consistency.', tag: 'Post' },
      { title: 'Motion Graphics & Titles', description: 'Motion and lower thirds.', tag: 'Post' },
      { title: 'Studio-grade Sound', description: 'Design and mix.', tag: 'Post' },
      { title: 'Platform Adaptations', description: 'Deliverable system and cutdowns.', tag: 'Distribution' },
    ],
    proof: ['Platform-optimised cutdowns', 'Campaign systems', 'Narrative-led edits', '40M+ views generated'],
    process: [
      { label: 'Discover', body: 'Goals, format, and success metrics.' },
      { label: 'Produce', body: 'Shoot, edit, grade, and deliver.' },
      { label: 'Adapt & Deploy', body: 'Cutdowns and platform delivery.' },
    ],
  },
  {
    id: 'social-media',
    title: 'Social Media Strategy & Growth',
    summary: 'Paid and organic strategy, creative testing, and optimisation. We turn content into a growth system with clear funnels and measurable outcomes.',
    bestFor: ['Scaling reach and followers', 'Launching or relaunching channels', 'Driving conversions from social'],
    deliverables: 'Strategy doc, content calendar, paid plans, creative tests, reporting dashboards, and ongoing optimisation.',
    capabilities: [
      { title: 'Paid Strategy & Media Planning', description: 'Budget, audience, and placement strategy.', tag: 'Strategy' },
      { title: 'Distribution Strategy', description: 'Organic and paid channel mix.', tag: 'Strategy' },
      { title: 'Creative Testing System', description: 'Iterate on what performs.', tag: 'Optimisation' },
      { title: 'Reporting & Optimisation', description: 'Insight-led iteration.', tag: 'Optimisation' },
      { title: 'Funnel & Journey Design', description: 'Audience and conversion paths.', tag: 'Strategy' },
      { title: 'Account Management & Publishing', description: 'Channel ops and publishing cadence.', tag: 'Execution' },
    ],
    proof: ['450+ clips delivered', 'Multi-platform systems', 'Campaign systems'],
    process: [
      { label: 'Audit & Goals', body: 'Current state and success metrics.' },
      { label: 'Strategy & Plan', body: 'Content system and distribution plan.' },
      { label: 'Execute & Optimise', body: 'Publish, test, and iterate.' },
    ],
    thirtyDays: {
      week1: 'Audit, goals, and content system design.',
      week2: 'Calendar and first batch of content.',
      week3: 'Publish, test, and initial reporting.',
      week4: 'Optimisation and iteration plan.',
    },
  },
  {
    id: 'digital-platforms',
    title: 'Digital Platforms, Search & Systems',
    summary: 'Media-first websites, conversion landing pages, SEO, and analytics. We build the systems that make your content findable and measurable.',
    bestFor: ['New or refreshed web presence', 'Campaign landing and conversion', 'SEO and search visibility'],
    deliverables: 'Websites, landing pages, SEO strategy, tracking setup, and reporting.',
    capabilities: [
      { title: 'Media-first Website Design', description: 'Sites built around video and visual content.', tag: 'Web' },
      { title: 'Conversion Landing Pages', description: 'Focused on sign-up and conversion.', tag: 'Web' },
      { title: 'SEO + Search Strategy', description: 'Findability and search presence.', tag: 'Search' },
      { title: 'Analytics & Tracking Systems', description: 'GA4, events, and attribution.', tag: 'Systems' },
    ],
    proof: ['GA4, Search Console, Meta Pixel', 'Tag Manager', 'Conversion tracking'],
    process: [
      { label: 'Scope & Architecture', body: 'Sitemap, conversion goals, and stack.' },
      { label: 'Build & Integrate', body: 'Design, build, and tracking.' },
      { label: 'Launch & Optimise', body: 'Go live and iterate on data.' },
    ],
  },
  {
    id: 'brand-narrative',
    title: 'Brand & Narrative',
    summary: 'Positioning, messaging, and visual identity. The foundation layer that makes everything else coherent and memorable.',
    bestFor: ['New brands or rebrands', 'Campaigns that need a clear story', 'Teams that need a content framework'],
    deliverables: 'Messaging doc, brand system, style guides, campaign concepts, and creative direction.',
    capabilities: [
      { title: 'Brand Positioning & Messaging', description: 'How you show up and what you say.', tag: 'Foundation' },
      { title: 'Visual Identity Systems', description: 'Logo, palette, typography, and usage.', tag: 'Foundation' },
      { title: 'Campaign Concepts & Direction', description: 'Big idea and narrative arc.', tag: 'Campaign' },
      { title: 'Content Frameworks & Style Guides', description: 'Tone, format, and templates.', tag: 'Foundation' },
    ],
    proof: ['Messaging doc', 'Brand system', 'Templates', 'Creative direction'],
    process: [
      { label: 'Position', body: 'Audience, offer, and message.' },
      { label: 'Define', body: 'Identity and style system.' },
      { label: 'Apply', body: 'Campaigns and content frameworks.' },
    ],
  },
]

export const ENGAGEMENT_OPTIONS = [
  {
    id: 'project',
    title: 'Project-Based',
    bestFor: 'One-off campaigns, films, or launches.',
    timeline: 'Weeks to months, depending on scope.',
    included: ['Clear scope and deliverables', 'Single project focus', 'Handover and assets'],
    cta: 'Request Consultation',
  },
  {
    id: 'monthly',
    title: 'Monthly System',
    bestFor: 'Ongoing content, social, and optimisation.',
    timeline: 'Minimum 3 months recommended.',
    included: ['Strategy and calendar', 'Production and publishing', 'Reporting and iteration'],
    cta: 'Request Consultation',
  },
  {
    id: 'sprint',
    title: 'Campaign Sprint',
    bestFor: 'Time-bound campaigns with a clear end date.',
    timeline: 'Typically 4–8 weeks.',
    included: ['Campaign concept and plan', 'Production and deployment', 'Measurement and wrap'],
    cta: 'Request Consultation',
  },
]

export const FAQ_ITEMS = [
  { q: 'What\'s the minimum engagement?', a: 'It depends on the service. Project-based work can start with a single film or campaign. Retainers and monthly systems typically run for at least 3 months so we can build and optimise.' },
  { q: 'Do you handle distribution or only production?', a: 'Both. We design distribution strategy (organic and paid), set up tracking, and can manage publishing and optimisation. Production and distribution are built as one system.' },
  { q: 'Do you work with teams or solo founders?', a: 'Both. We work with organisations of all sizes — from solo founders to larger teams. The engagement is tailored to your capacity and goals.' },
  { q: 'How do you measure performance?', a: 'We define success metrics up front (views, reach, conversions, revenue, etc.) and use analytics and tracking to report on them. You get clear reporting and recommendations.' },
  { q: 'Can we start with one shoot and scale?', a: 'Yes. Many clients start with a single project (e.g. a brand film or campaign) and then expand into ongoing production, social, or web once they see the impact.' },
  { q: 'Do you do retainers?', a: 'Yes. We offer monthly and retainer-based engagements for ongoing strategy, production, and optimisation. Typically a minimum of 3 months for systems work.' },
]

export const PRINCIPLE_TITLE = 'Visual media is leverage.'
export const PRINCIPLE_BODY = 'We build high-end visual systems where design, photography, and film work in lockstep with strategy. We treat production as an engineering problem: shape perception, earn attention, convert into measurable outcomes.'

export const HERO_STATS = [
  { value: '40M+', label: 'views generated' },
  { value: '$450k+', label: 'raised' },
  { value: '450+', label: 'clips delivered' },
  { value: 'Multi-platform', label: 'systems' },
]
