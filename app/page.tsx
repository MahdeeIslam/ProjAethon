import type { Metadata } from 'next'
import HeroShowreel from '@/components/HeroShowreel'
import VerticalReelsCarousel from '@/components/VerticalReelsCarousel'
import FeaturedCaseStudiesModule from '@/components/home/FeaturedCaseStudiesModule'
import ServicesSection from '@/components/home/ServicesSection'
import HomeContactSection from '@/components/HomeContactSection'

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Aethon — Built for organisations that take quality seriously. Full-service production, design, websites, and paid campaigns under one roof.',
}

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/*
        Metropolis-style sticky hero: the showreel is pinned to the
        viewport (`position: sticky; top: 0; height: 100vh`) while the
        rest of the page scrolls up and over it. Content sections sit
        in a sibling block with a higher z-index and their own opaque
        background so the hero is fully obscured once they're in view.
      */}
      <div className="relative">
        <div className="sticky top-0 z-0 h-screen">
          <HeroShowreel />
        </div>

        <div className="relative z-10 bg-obsidian">
          {/* 2. Work in motion — rolling reels carousel */}
          <VerticalReelsCarousel />

          {/* 3. Featured case studies */}
          <FeaturedCaseStudiesModule />

          {/* 4. One agency. Full capability. */}
          <ServicesSection />

          {/* 5. Work with us */}
          <HomeContactSection />
        </div>
      </div>
    </div>
  )
}
