'use client'

import { useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { isYouTubeUrl } from '@/lib/youtube'
import YouTubeEmbed from '@/components/YouTubeEmbed'

interface MediaItem {
  type: 'image' | 'video'
  url: string
  caption?: string
}

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  media: MediaItem[]
  currentIndex: number
  onNavigate: (index: number) => void
}

export default function Lightbox({ isOpen, onClose, media, currentIndex, onNavigate }: LightboxProps) {
  const lightboxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // Focus trap
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        } else if (e.key === 'ArrowLeft') {
          onNavigate(currentIndex > 0 ? currentIndex - 1 : media.length - 1)
        } else if (e.key === 'ArrowRight') {
          onNavigate(currentIndex < media.length - 1 ? currentIndex + 1 : 0)
        }
      }
      
      window.addEventListener('keydown', handleKeyDown)
      
      // Focus the lightbox container for accessibility
      if (lightboxRef.current) {
        lightboxRef.current.focus()
      }
      
      return () => {
        document.body.style.overflow = 'unset'
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen, currentIndex, media.length, onClose, onNavigate])

  if (!isOpen || media.length === 0) return null

  const currentMedia = media[currentIndex]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-obsidian/98 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
          ref={lightboxRef}
          tabIndex={-1}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative max-w-7xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 hover:opacity-100 opacity-60 transition-opacity duration-300 border border-bone/20 hover:border-bone/40 bg-obsidian/60 backdrop-blur-sm"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {/* Media Container */}
            <div className="relative bg-obsidian/40 backdrop-blur-sm border border-bone/10">
              {currentMedia.type === 'video' ? (
                isYouTubeUrl(currentMedia.url) ? (
                  <div className="relative w-full max-h-[80vh] aspect-video">
                    <YouTubeEmbed
                      url={currentMedia.url}
                      title={currentMedia.caption || 'Video'}
                      autoplay
                      muted
                      loop
                      controls
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                ) : (
                  <video
                    src={currentMedia.url}
                    autoPlay
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    className="w-full h-auto max-h-[80vh] object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <img
                  src={currentMedia.url}
                  alt={currentMedia.caption || 'Gallery image'}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              )}
              {currentMedia.caption && (
                <div className="p-4 border-t border-bone/10 bg-obsidian/60">
                  <p className="text-xs tracking-wide uppercase opacity-60 mb-1">Caption</p>
                  <p className="text-sm opacity-90">{currentMedia.caption}</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            {media.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onNavigate(currentIndex > 0 ? currentIndex - 1 : media.length - 1)
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 border border-bone/20 hover:border-bone/40 bg-obsidian/80 backdrop-blur-sm hover:bg-obsidian/90 transition-all duration-300 opacity-80 hover:opacity-100"
                  aria-label="Previous"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onNavigate(currentIndex < media.length - 1 ? currentIndex + 1 : 0)
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 border border-bone/20 hover:border-bone/40 bg-obsidian/80 backdrop-blur-sm hover:bg-obsidian/90 transition-all duration-300 opacity-80 hover:opacity-100"
                  aria-label="Next"
                >
                  <ChevronRight size={20} />
                </button>
                
                {/* Indicator Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-obsidian/80 backdrop-blur-sm px-4 py-2 border border-bone/10">
                  {media.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        onNavigate(index)
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'bg-bone w-6' : 'bg-bone/30 hover:bg-bone/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
