/**
 * Services page: structured data for hero, navigator, and service sections.
 * Used by app/services/page.tsx.
 */

export interface CapabilityItem {
  title: string
}

export interface CapabilityGroup {
  /** Optional column heading (e.g. "Video Production") — used by media-production. */
  heading?: string
  items: CapabilityItem[]
}

export interface ServiceSectionData {
  id: string
  title: string
  /** Short subheading shown directly under the title. */
  subheading: string
  /** One flat list of capabilities, OR multiple titled groups (for media-production). */
  capabilities?: CapabilityItem[]
  capabilityGroups?: CapabilityGroup[]
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
    subheading:
      'High-end production, built around what it needs to deliver, not just how it looks.',
    capabilityGroups: [
      {
        heading: 'Video Production',
        items: [
          { title: 'Creative Direction & Concept Development' },
          { title: 'Scriptwriting & Storyboarding' },
          { title: 'Commercial & Brand Films' },
          { title: 'High-Impact Social & Short-Form Content' },
          { title: 'Documentary & Narrative Storytelling' },
          { title: 'Event & Campaign Coverage' },
        ],
      },
      {
        heading: 'Photography',
        items: [
          { title: 'Brand & Lifestyle Photography' },
          { title: 'Product & Commercial Shoots' },
          { title: 'Architectural & Interior Photography' },
          { title: 'Event Photography' },
        ],
      },
      {
        heading: 'Graphic Design',
        items: [
          { title: 'Social Media Creatives' },
          { title: 'Thumbnails & Ad Assets' },
        ],
      },
      {
        heading: 'Post-Production',
        items: [
          { title: 'Narrative-Driven Editing' },
          { title: 'Cinematic Colour Grading' },
          { title: 'Advanced Motion Graphics & Titles' },
          { title: 'Studio-Grade Sound Design & Mixing' },
          { title: 'Platform-Optimised Cutdowns & Adaptations' },
        ],
      },
    ],
  },
  {
    id: 'social-media',
    title: 'Social Media Strategy & Growth',
    subheading:
      'Our team designs and leads performance strategies that place your content in front of the right audience and make it work harder across every channel.',
    capabilities: [
      { title: 'Paid Strategy & Media Planning' },
      { title: 'Distribution Strategy' },
      { title: 'Creative Testing System' },
      { title: 'Reporting & Optimisation' },
      { title: 'Funnel & Journey Design' },
      { title: 'Account Management & Publishing' },
    ],
  },
  {
    id: 'digital-platforms',
    title: 'Digital Platforms, Search & Systems',
    subheading:
      'We build websites, landing pages and tracking systems that make your content findable and your results measurable.',
    capabilities: [
      { title: 'Media-first Website Design' },
      { title: 'Conversion Landing Pages' },
      { title: 'SEO + Search Strategy' },
      { title: 'Analytics & Tracking Systems' },
    ],
  },
  {
    id: 'brand-narrative',
    title: 'Brand & Narrative',
    subheading:
      'We define your positioning, messaging and visual identity so every piece of content says the right thing about who you are.',
    capabilities: [
      { title: 'Brand Positioning & Messaging' },
      { title: 'Visual Identity Systems' },
      { title: 'Campaign Concepts & Direction' },
      { title: 'Content Frameworks & Style Guides' },
    ],
  },
]
