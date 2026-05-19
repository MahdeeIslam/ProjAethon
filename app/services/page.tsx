import type { Metadata } from 'next'
import { SERVICES } from '@/data/servicesPage'
import ServicesHero from '@/components/services/ServicesHero'
import ServiceNavigator from '@/components/services/ServiceNavigator'
import ServiceSection from '@/components/services/ServiceSection'
import ServicesCTAPanel from '@/components/services/ServicesCTAPanel'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Content, brand and growth, built around what actually moves audiences.',
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-obsidian text-bone">
      <ServicesHero />
      <ServiceNavigator />

      {SERVICES.map((service) => (
        <ServiceSection key={service.id} service={service} />
      ))}

      <ServicesCTAPanel />
    </div>
  )
}
