import { getVerticalPhoto, HEADS_PHOTOS } from './placeholderPhotos'

/**
 * Team data for About page.
 * First row: leadership (slightly larger). Second row: specialists.
 * Uses vertical placeholder photos from placeholders/photos/vertical/.
 */

export interface TeamMember {
  id: string
  name: string
  role: string
  /** One-line specialty for profile cards */
  specialty?: string
  /** Leadership row (Saad, Nazif, Barisa) shown larger */
  leadership?: boolean
  image?: string
}

export const team: TeamMember[] = [
  { id: 'saad', name: 'Saad', role: 'Creative Director', leadership: true, image: HEADS_PHOTOS.saad, specialty: 'Direction, narrative, and production leadership.' },
  { id: 'nazif', name: 'Nazif', role: 'Operations Manager', leadership: true, image: HEADS_PHOTOS.nazif, specialty: 'Systems, delivery, and client operations.' },
  { id: 'mahdee', name: 'Mahdee', role: 'Digital Systems Lead', leadership: true, image: getVerticalPhoto(3), specialty: 'Web systems, performance, and implementation.' },
  { id: 'labib', name: 'Labib', role: 'Client Strategy', leadership: false, image: getVerticalPhoto(2), specialty: 'Client strategy, discovery, and account momentum.' },
  { id: 'munzfx', name: 'Munzfx', role: 'Graphics Designer', leadership: false, image: getVerticalPhoto(4), specialty: 'Identity, layout, and visual consistency.' },
  { id: 'moeslave', name: 'Moe.slave', role: 'Motion Graphics Specialist', leadership: false, image: getVerticalPhoto(5), specialty: 'Reels, motion systems, editing cadence.' },
  { id: 'numan', name: 'Numan', role: 'Ad-Strategy Specialist', leadership: false, image: getVerticalPhoto(6), specialty: 'Distribution, targeting, and conversion.' },
]
