/**
 * Services page: 4 groups with exact bullets from spec.
 */

export interface ServiceGroup {
  id: string
  title: string
  items: { category: string; bullets: string[] }[]
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'media-production',
    title: 'Media Production',
    items: [
      {
        category: 'Video Production',
        bullets: [
          'Creative Direction & Concept Development',
          'Scriptwriting & Storyboarding',
          'Commercial & Brand Films',
          'High-Impact Social & Short-Form Content',
          'Documentary & Narrative Storytelling',
          'Event & Campaign Coverage',
        ],
      },
      {
        category: 'Photography',
        bullets: [
          'Brand & Lifestyle Photography',
          'Product & Commercial Shoots',
          'Architectural & Interior Photography',
          'Event Photography',
        ],
      },
      {
        category: 'Graphic Design',
        bullets: [
          'Campaign Visual Systems',
          'Social Media Creatives',
          'Thumbnails & Ad Assets',
          'Brand & Marketing Collateral',
        ],
      },
      {
        category: 'Post-Production',
        bullets: [
          'Narrative-Driven Editing',
          'Cinematic Colour Grading',
          'Advanced Motion Graphics & Titles',
          'Studio-Grade Sound Design & Mixing',
          'Platform-Optimised Cutdowns & Adaptations',
        ],
      },
    ],
  },
  {
    id: 'social-media',
    title: 'Social Media Strategy & Growth',
    items: [
      {
        category: 'Social Media Strategy & Growth',
        bullets: [
          'Paid Ads Strategy & Media Planning',
          'Platform & Distribution Strategy',
          'Performance-Driven Creative Testing',
          'Insight-Led Reporting & Optimisation',
          'Funnel & Audience Journey Design',
          'Social Media Account Management',
          'Content Publishing & Channel Optimisation',
        ],
      },
    ],
  },
  {
    id: 'digital-platforms',
    title: 'Digital Platforms, Search & Systems',
    items: [
      {
        category: 'Digital Platforms, Search & Systems',
        bullets: [
          'Media-First Website Design & Development',
          'Conversion-Focused Landing Pages',
          'SEO Integration & Strategy',
          'Analytics, Tracking & Performance Systems',
        ],
      },
    ],
  },
  {
    id: 'brand-narrative',
    title: 'Brand & Narrative',
    items: [
      {
        category: 'Brand & Narrative',
        bullets: [
          'Brand Positioning & Messaging',
          'Visual Identity Systems',
          'Campaign Concepts & Narrative Direction',
          'Content Frameworks & Style Guides',
        ],
      },
    ],
  },
]

export const philosophyText = `Visual media is not decoration. It is leverage. At AETHON we build high-end visual systems where design, photography, and film work in lockstep with strategy. We treat creative production as an engineering problem: how do you shape perception and move an audience to act? By unifying world-class production with distribution systems and performance tracking, we turn content into a compounding asset.`
