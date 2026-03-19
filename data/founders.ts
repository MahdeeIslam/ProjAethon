export interface Founder {
  id: string;
  name: string;
  role: string;
  credibility: string[];
  image?: string;
}

export const founders: Founder[] = [
  {
    id: '1',
    name: 'Nazif',
    role: 'Creative Director & Cinematographer',
    credibility: [
      'Award-winning filmmaker with 10+ years in premium production',
      'Specialized in institutional storytelling and brand films',
    ],
    image: '/placeholders/founder-nazif.jpg',
  },
  {
    id: '2',
    name: 'Barisa',
    role: 'Strategy & Distribution Lead',
    credibility: [
      'Former marketing executive with proven track record in B2B growth',
      'Expert in paid media, conversion optimization, and institutional positioning',
    ],
    image: '/placeholders/founder-barisa.jpg',
  },
  {
    id: '3',
    name: 'Saad',
    role: 'Production & Operations Director',
    credibility: [
      'Production veteran managing complex institutional projects',
      'Ensures flawless execution, cultural alignment, and client excellence',
    ],
    image: '/placeholders/founder-saad.jpg',
  },
];

