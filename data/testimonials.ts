export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Ahmed Hassan',
    role: 'Principal',
    organization: 'Islamic School Network',
    quote: 'They transformed our institution\'s presence. The quality and strategic approach exceeded every expectation. Our enrollment doubled.',
    image: '/placeholders/testimonial-1.jpg',
  },
  {
    id: '2',
    name: 'Fatima Al-Rashid',
    role: 'Board Member',
    organization: 'Community Foundation',
    quote: 'Finally, a team that understands institutional gravity. Their work reflects the excellence we stand for.',
    image: '/placeholders/testimonial-2.jpg',
  },
  {
    id: '3',
    name: 'Omar Khan',
    role: 'CEO',
    organization: 'Educational Trust',
    quote: 'The vocal-only standard was non-negotiable for us. They delivered tier-1 cinematography with complete cultural alignment.',
    image: '/placeholders/testimonial-3.jpg',
  },
  {
    id: '4',
    name: 'Aisha Malik',
    role: 'Executive Director',
    organization: 'Community Center',
    quote: 'Our impact was invisible before. Now we have recognition, funding, and a clear narrative. Game-changing partnership.',
    image: '/placeholders/testimonial-4.jpg',
  },
];

