import { PricingTier } from '@/data/pricing'
import CTAButton from './CTAButton'
import Kicker from '@/components/ui/Kicker'

interface PricingCardProps {
  tier: PricingTier
  isRecommended?: boolean
}

export default function PricingCard({ tier, isRecommended = false }: PricingCardProps) {
  return (
    <div className={`
      border relative p-6 md:p-8 transition-all duration-500 group flex flex-col h-full
      ${isRecommended 
        ? 'border-bone/30 bg-bone/5 hover:border-bone/40 hover:bg-bone/10' 
        : 'border-bone/10 hover:border-bone/25 hover:bg-bone/5'
      }
    `}>
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Kicker className="text-xs opacity-60">Recommended</Kicker>
        </div>
      )}
      
      <div className="mb-6">
        <Kicker className="mb-3 opacity-70">{tier.growthVelocity}</Kicker>
        <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 tracking-tight">{tier.name}</h3>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight">${tier.price.toLocaleString()}</span>
          <span className="text-sm md:text-base opacity-70 font-normal">/month</span>
        </div>
      </div>
      
      <ul className="space-y-3 mb-6 flex-1">
        {tier.inclusions.map((inclusion, index) => (
          <li key={index} className="flex items-start gap-2 text-sm md:text-base leading-relaxed opacity-95 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-accent mt-1 opacity-70 text-lg flex-shrink-0">•</span>
            <span>{inclusion}</span>
          </li>
        ))}
      </ul>
      
      <CTAButton variant={isRecommended ? 'primary' : 'secondary'} className="w-full text-center mt-auto" />
    </div>
  )
}
