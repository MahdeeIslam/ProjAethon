export interface PricingTier {
  id: string;
  name: string;
  price: number;
  growthVelocity: string;
  inclusions: string[];
}

export const pricingTiers: PricingTier[] = [
  {
    id: '1',
    name: 'Foundation',
    price: 5000,
    growthVelocity: 'Steady Growth',
    inclusions: [
      'Quarterly content production (2-3 videos)',
      'Basic paid distribution',
      'Monthly strategy consultation',
      'Standard reporting',
      'Vocal-only/nasheed audio standard',
    ],
  },
  {
    id: '2',
    name: 'Acceleration',
    price: 6500,
    growthVelocity: 'Rapid Growth',
    inclusions: [
      'Monthly content production (4-5 videos)',
      'Advanced paid distribution & optimization',
      'Bi-weekly strategy consultation',
      'Detailed analytics & ROI tracking',
      'Priority support & faster turnaround',
      'Vocal-only/nasheed audio standard',
    ],
  },
  {
    id: '3',
    name: 'Transformation',
    price: 7500,
    growthVelocity: 'Exponential Growth',
    inclusions: [
      'Unlimited content production',
      'Full-service marketing department',
      'Weekly strategy consultation',
      'Dedicated account manager',
      'Custom distribution strategies',
      'Premium brand positioning',
      'Vocal-only/nasheed audio standard',
      'Quarterly brand audits',
    ],
  },
];

