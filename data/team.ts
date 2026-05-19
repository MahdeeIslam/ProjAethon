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
    image: '/team/nazif.jpg',
  },
  {
    id: 'saad',
    name: 'Saad',
    role: 'Co-Founder & Creative Director',
    leadership: true,
    image: '/team/saad.jpg',
    specialty: 'Creative execution, on-set direction, and film production.',
  },
  {
    id: 'nuoman',
    name: 'Nuoman',
    role: 'Paid Advertising Specialist',
    image: '/team/nuoman.jpg',
  },
  {
    id: 'labib',
    name: 'Labib',
    role: 'Visual Effects & Motion Designer',
    image: '/team/labib.jpg',
  },
  {
    id: 'yussuf',
    name: 'Yussuf',
    role: 'Lead Web Developer',
    image: '/team/yussuf.jpg',
  },
  {
    id: 'mahdee',
    name: 'Mahdee',
    role: 'Web Implementation Specialist',
    image: '/team/mahdee.jpg',
  },
]
