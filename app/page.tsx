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
      {/* 1. Hero showreel — full-page background video + positioning */}
      <HeroShowreel />

      {/* 2. Work in motion — rolling reels carousel */}
      <VerticalReelsCarousel />

      {/* 3. Featured case studies */}
      <FeaturedCaseStudiesModule />

      {/* 4. One agency. Full capability. */}
      <ServicesSection />

      {/* 5. Work with us */}
      <HomeContactSection />
    </div>
  )
}
