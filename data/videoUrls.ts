/**
 * Single export of every video URL used by the site.
 *
 * All URLs point at Cloudflare R2 via `media.aethon.au`. No YouTube /
 * external sources — to add or change a clip, update the filename
 * arrays in `lib/media/remoteReels.ts` (the bucket source of truth).
 */

import {
  PUBLIC_HERO_BACKGROUND_URL,
  PUBLIC_HORIZONTAL_REELS,
  PUBLIC_VERTICAL_REELS,
} from '@/lib/media/remoteReels'

const horizontalReels = PUBLIC_HORIZONTAL_REELS
const verticalReels = PUBLIC_VERTICAL_REELS

// Pick stable indexes for the case study + portfolio slots. Falls back to
// the first horizontal/vertical reel if the bucket ever shrinks below
// the expected count.
const pickH = (i: number) => horizontalReels[i] ?? horizontalReels[0]
const pickV = (i: number) => verticalReels[i] ?? verticalReels[0]

export const YT = {
  /** Homepage hero background — the dedicated landing-page showreel. */
  heroBackground: PUBLIC_HERO_BACKGROUND_URL,
  /**
   * Soft fallback used elsewhere on the site if the hero clip can't load.
   * Points at the most polished horizontal reel.
   */
  heroLoop: pickH(5), // Copy of Third Space Teaser 1
  horizontalReels,
  verticalReels,
  caseStudyReels: {
    reel01: pickH(4), // Elders promo
    reel02: pickH(5), // Third Space Teaser
    reel03: pickH(6), // UMMA promo
    reel04: pickH(0), // Arabic Revival 360 Basketball Tournament
    reel05: pickH(1), // DWF scene 1
    reel06: pickH(2), // DWF scene 2
  },
  portfolioLegacy: {
    portfolio1: pickH(4), // Elders promo
    portfolio2: pickH(5), // Third Space Teaser
    portfolio3: pickH(6), // UMMA promo
    portfolio4: pickH(2), // DWF scene 2
    portfolio5: pickV(10), // Musibah
    portfolio6: pickV(0), // BAHDON STORY
    portfolio7: pickV(13), // TAOFIQ STORY V2
  },
} as const
