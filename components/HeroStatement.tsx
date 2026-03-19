'use client'

import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import Logo from '@/components/Logo'
import CTAButton from '@/components/CTAButton'
import { BRAND_NAME } from '@/lib/brand'
import { YT } from '@/data/videoUrls'
import { isYouTubeUrl } from '@/lib/youtube'
import YouTubeEmbed from '@/components/YouTubeEmbed'

export default function HeroStatement() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [showPoster, setShowPoster] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isAudioEnabled
    }
  }, [isAudioEnabled])

  const handleVideoLoad = () => {
    setShowPoster(false)
  }

  const useYouTube = isYouTubeUrl(YT.heroLoop)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed silent loop video - museum framing */}
      <div className="absolute inset-0 z-0">
        {useYouTube ? (
          <YouTubeEmbed
            url={YT.heroLoop}
            title="Aethon hero loop"
            autoplay
            muted={!isAudioEnabled}
            loop
            controls={false}
            className="w-full h-full"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            playsInline
            muted={!isAudioEnabled}
            onLoadedData={handleVideoLoad}
            preload="metadata"
            className="w-full h-full object-cover opacity-60"
            poster="/placeholders/posters/hero-poster.jpg"
          >
            <source src={YT.heroLoop} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        
        {/* Subtle gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/40 to-obsidian/80" />
      </div>

      {/* Fallback poster */}
      {showPoster && (
        <div className="absolute inset-0 z-10 bg-obsidian/95 flex items-center justify-center">
          <div className="text-center opacity-40">
            <p className="text-xs tracking-wider uppercase mb-1">Hero Video Placeholder</p>
            <p className="text-xs opacity-60">Set `YT.heroLoop` in `data/videoUrls.ts`</p>
          </div>
        </div>
      )}

      {/* Statement-first content */}
      <div className="relative z-20 container mx-auto px-6 md:px-8 lg:px-12 py-20 md:py-32">
        <div className="max-w-5xl">
          {/* Logo + Brand */}
          <div className="flex items-center gap-4 mb-12 opacity-90">
            <Logo className="h-12 md:h-16 w-auto" />
            <span className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">{BRAND_NAME}</span>
          </div>

          {/* Big headline (statement-first) */}
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight leading-none">
            Tier-1 cinematography with strict vocal-only/nasheed audio standard.
          </h1>

          {/* One credibility line */}
          <p className="text-xl md:text-2xl lg:text-3xl opacity-95 mb-12 leading-relaxed max-w-4xl font-normal">
            Premium creative agency for institutions seeking excellence. Outsourced marketing department from production to paid distribution.
          </p>

          {/* Primary CTA prominent */}
          <div className="flex items-center gap-6">
            <CTAButton variant="primary" />
            <span className="text-sm opacity-70 hidden md:block">We accept limited partners per quarter</span>
          </div>
        </div>
      </div>

      {/* Optional audio toggle - minimalist style */}
      <button
        onClick={() => setIsAudioEnabled(!isAudioEnabled)}
        className="absolute bottom-8 right-8 z-30 p-3 border border-bone/20 hover:border-bone/40 transition-all duration-300 bg-obsidian/70 backdrop-blur-sm hover:bg-obsidian/85 group"
        aria-label={isAudioEnabled ? 'Mute audio' : 'Enable audio (Vocal-Only/Nasheed)'}
      >
        {isAudioEnabled ? (
          <Volume2 size={18} className="opacity-80 group-hover:opacity-100 transition-opacity" />
        ) : (
          <VolumeX size={18} className="opacity-60 group-hover:opacity-80 transition-opacity" />
        )}
      </button>
    </section>
  )
}

