'use client'

import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import Kicker from '@/components/ui/Kicker'
import DisplayTitle from '@/components/ui/DisplayTitle'
import Logo from '@/components/Logo'
import { BRAND_NAME } from '@/lib/brand'
import { YT } from '@/data/videoUrls'
import { isYouTubeUrl } from '@/lib/youtube'
import YouTubeEmbed from '@/components/YouTubeEmbed'

export default function HeroLoop() {
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 z-[2] texture-overlay opacity-30" />
      
      {/* Video Background with Gradient Overlays */}
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
            className="w-full h-full object-cover opacity-75"
            poster="/placeholders/hero-poster.jpg"
          >
            <source src={YT.heroLoop} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        
        {/* Elegant gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/20 to-obsidian/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-obsidian/30" />
      </div>

      {/* Fallback poster */}
      {showPoster && (
        <div className="absolute inset-0 z-10 bg-obsidian/90 flex items-center justify-center">
          <div className="text-center opacity-50">
            <p className="text-xs tracking-wider uppercase mb-1">Hero Video Placeholder</p>
            <p className="text-xs opacity-60">Set `YT.heroLoop` in `data/videoUrls.ts`</p>
          </div>
        </div>
      )}

      {/* Museum Label Content Overlay */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-5 mb-10">
          <Logo className="h-16 md:h-20 lg:h-24 w-auto opacity-100" />
          <Kicker className="opacity-80 text-sm md:text-base">{BRAND_NAME}</Kicker>
        </div>
        
        <DisplayTitle 
          as="h1" 
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-10 tracking-tight leading-none"
        >
          Cinematic Ihsan
        </DisplayTitle>
        
        <div className="max-w-3xl mx-auto space-y-5">
          <p className="text-xl md:text-2xl lg:text-3xl opacity-100 leading-relaxed font-normal">
            Tier-1 cinematography with strict vocal-only/nasheed audio standard.
          </p>
          <p className="text-base md:text-lg lg:text-xl opacity-90 leading-relaxed">
            Premium creative agency for institutions seeking excellence.
          </p>
        </div>
      </div>

      {/* Elegant Audio Toggle - Museum Style */}
      <button
        onClick={() => setIsAudioEnabled(!isAudioEnabled)}
        className="absolute bottom-8 right-8 z-30 p-3 border border-bone/20 hover:border-bone/40 transition-all duration-300 bg-obsidian/60 backdrop-blur-sm hover:bg-obsidian/80 group"
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
