import { getVerticalPhoto, HEADS_PHOTOS } from './placeholderPhotos'

/**
 * Team data for About page.
 * `leadership: true` → top row (Nazif, Saad), shown with larger images.
 * Everyone else sits in a second row with smaller images.
 */

export interface TeamMember {
  id: string
  name: string
  role: string
  /** Italic one-liner shown under leadership profiles only. Omit to hide. */
  specialty?: string
  /** Leadership row shown larger and separated from specialists. */
  leadership?: boolean
  image?: string
}

export const team: TeamMember[] = [
  {
    id: 'nazif',
    name: 'Nazif',
    role: 'Co-Founder & Brand Strategy Director',
    leadership: true,
    image: HEADS_PHOTOS.nazif,
  },
  {
    id: 'saad',
    name: 'Saad',
    role: 'Co-Founder & Creative Director',
    leadership: true,
    image: HEADS_PHOTOS.saad,
    specialty: 'Creative execution, on-set direction, and film production.',
  },
  {
    id: 'nuoman',
    name: 'Nuoman',
    role: 'Paid Advertising Specialist',
    image: getVerticalPhoto(6),
  },
  {
    id: 'labib',
    name: 'Labib',
    role: 'Visual Effects & Motion Designer',
    image: getVerticalPhoto(2),
  },
  {
    id: 'yussuf',
    name: 'Yussuf',
    role: 'Lead Web Developer',
    image: getVerticalPhoto(5),
  },
  {
    id: 'mahdee',
    name: 'Mahdee',
    role: 'Web Implementation Specialist',
    image: getVerticalPhoto(3),
  },
]
