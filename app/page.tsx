import type { Metadata } from 'next'
import HeroShowreel from '@/components/HeroShowreel'
import VerticalReelsCarousel from '@/components/VerticalReelsCarousel'
import SectorsProofBand from '@/components/home/SectorsProofBand'
import WorkInMotionRail from '@/components/home/WorkInMotionRail'
import FeaturedCaseStudiesModule from '@/components/home/FeaturedCaseStudiesModule'
import ProcessSection from '@/components/home/ProcessSection'
import ServicesSection from '@/components/home/ServicesSection'
import HomeContactSection from '@/components/HomeContactSection'

export const metadata: Metadata = {
  title: 'Home',
  description: 'AETHON — World-class visual systems. Strategy, production, and distribution in lockstep.',
}

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero showreel — reel fits only in this top section, then content follows */}
      <HeroShowreel />

      {/* 2. Rolling vertical reels carousel (light bg) */}
      <VerticalReelsCarousel />

      {/* 3. Sectors proof band */}
      <SectorsProofBand />

      {/* 4. Work in motion rail (horizontal reels) */}
      <WorkInMotionRail />

      {/* 5. Featured case studies (hero card + grid + results snapshot) */}
      <FeaturedCaseStudiesModule />

      {/* 6. Our 4 step process + CTA */}
      <ProcessSection />

      {/* 7. Services menu */}
      <ServicesSection />

      {/* 8. Contact us section */}
      <HomeContactSection />

      {/* Bottom header is in layout — reveals near bottom */}
    </div>
  )
}
