import type { Metadata } from 'next'
import { SERVICES } from '@/data/servicesPage'
import ServicesHero from '@/components/services/ServicesHero'
import ServiceNavigator from '@/components/services/ServiceNavigator'
import ServiceSection from '@/components/services/ServiceSection'
import EngagementOptions from '@/components/services/EngagementOptions'
import ServicesFAQ from '@/components/services/ServicesFAQ'
import PrincipleCard from '@/components/services/PrincipleCard'
import ServicesCTAPanel from '@/components/services/ServicesCTAPanel'

export const metadata: Metadata = {
  title: 'Services',
  description: 'World-class production, engineered for growth. Strategy, production, and distribution in lockstep.',
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-obsidian text-bone">
      <ServicesHero />
      <ServiceNavigator />

      {SERVICES.map((service) => (
        <ServiceSection key={service.id} service={service} />
      ))}

      <EngagementOptions />
      <ServicesFAQ />
      <PrincipleCard />
      <ServicesCTAPanel />
    </div>
  )
}
