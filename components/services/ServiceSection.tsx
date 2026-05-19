import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'
import type { ServiceSectionData } from '@/data/servicesPage'
import CapabilityCard from './CapabilityCard'

const CONTAINER_MAX = 'max-w-[1440px]'

interface ServiceSectionProps {
  service: ServiceSectionData
}

export default function ServiceSection({ service }: ServiceSectionProps) {
  const hasGroups = !!service.capabilityGroups?.length

  return (
    <section
      id={service.id}
      className="scroll-mt-[90px] border-b border-bone/10 py-16 md:py-20 lg:py-28 md:scroll-mt-[120px]"
    >
      <div className={`mx-auto w-full ${CONTAINER_MAX} px-6 md:px-10`}>
        <Reveal>
          <header className="mb-12 max-w-[80ch] md:mb-16">
            <h2 className="text-4xl font-bold uppercase leading-[1.05] tracking-tight text-bone md:text-5xl lg:text-6xl">
              {service.title}
            </h2>
            <p className="mt-5 text-lg leading-snug text-bone/85 md:text-xl lg:text-2xl">
              {service.subheading}
            </p>
          </header>
        </Reveal>

        {hasGroups ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.capabilityGroups!.map((group) => (
              <Reveal key={group.heading}>
                <div className="flex h-full flex-col gap-3">
                  {group.heading && (
                    <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-bone/55">
                      {group.heading}
                    </h3>
                  )}
                  <div className="flex flex-col gap-3">
                    {group.items.map((item) => (
                      <CapabilityCard key={item.title} title={item.title} />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <RevealGroup
            stagger={0.04}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {service.capabilities!.map((cap) => (
              <CapabilityCard key={cap.title} title={cap.title} />
            ))}
          </RevealGroup>
        )}
      </div>
    </section>
  )
}
