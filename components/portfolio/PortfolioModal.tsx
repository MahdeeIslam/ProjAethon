'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { PortfolioItem } from '@/data/portfolio'
import { getPosterForItem } from '@/lib/portfolioPoster'
import { isYouTubeUrl } from '@/lib/youtube'
import YouTubeEmbed from '@/components/YouTubeEmbed'

function encodePath(p: string): string {
  return p.split('/').map((s) => encodeURIComponent(s)).join('/')
}

interface PortfolioModalProps {
  isOpen: boolean
  item: PortfolioItem | null
  allItems: PortfolioItem[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function PortfolioModal({
  isOpen,
  item,
  allItems,
  currentIndex,
  onClose,
  onNavigate,
}: PortfolioModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onNavigate(currentIndex > 0 ? currentIndex - 1 : allItems.length - 1)
      else if (e.key === 'ArrowRight') onNavigate(currentIndex < allItems.length - 1 ? currentIndex + 1 : 0)
    }

    window.addEventListener('keydown', handleKeyDown)
    modalRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, currentIndex, allItems.length, onClose, onNavigate])

  useEffect(() => {
    const v = videoRef.current
    if (!v || !item) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isOpen && !prefersReduced) {
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [isOpen, item])

  const [prefersReduced, setPrefersReduced] = useState(false)
  useEffect(() => {
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const src = item ? encodePath(item.src) : ''
  const useYouTube = item ? isYouTubeUrl(item.src) : false
  const poster = item ? getPosterForItem(item) : ''
  const nextIndex = currentIndex < allItems.length - 1 ? currentIndex + 1 : 0
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : allItems.length - 1

  return (
    <AnimatePresence>
      {isOpen && item && (
      <motion.div
        key="portfolio-modal"
        ref={modalRef}
        tabIndex={-1}
        initial={prefersReduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={prefersReduced ? undefined : { opacity: 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/95 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-title"
      >
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? undefined : { opacity: 0, y: 12 }}
          transition={{ duration: prefersReduced ? 0 : 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="relative flex h-full w-full max-w-7xl flex-col overflow-hidden p-4 md:p-6"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded border border-bone/20 p-2 text-bone/80 transition hover:border-bone/40 hover:text-bone"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left: Video */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <div className="relative w-full max-w-4xl aspect-video bg-black/40 rounded-xl overflow-hidden">
            {prefersReduced ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]">
                <span className="text-sm uppercase tracking-wider text-bone/50">Video preview</span>
              </div>
            ) : (
              useYouTube && item ? (
                <YouTubeEmbed
                  url={item.src}
                  title={`${item.title} video`}
                  autoplay
                  muted
                  loop
                  controls
                  className="h-full w-full"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={src}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  poster={poster}
                  className="h-full w-full object-contain"
                />
              )
            )}
          </div>
        </div>

        <div className="mt-4 px-1 md:px-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-bone/70">
            {item.client} · {item.year}
          </p>
          <h2 id="portfolio-modal-title" className="mt-1 text-lg font-bold tracking-tight text-bone md:text-xl">
            {item.title}
          </h2>
        </div>

        {/* Bottom: Next/Prev - visible, subtle */}
        {allItems.length > 1 && (
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg border border-bone/15 bg-black/35 px-2 py-2 backdrop-blur-sm md:bottom-6 md:left-1/2 md:right-auto md:w-[360px] md:-translate-x-1/2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNavigate(prevIndex)
              }}
              className="flex items-center gap-2 rounded border border-bone/20 px-3 py-2 text-sm text-bone/80 transition hover:border-bone/40 hover:text-bone"
              aria-label="Previous project"
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">Previous project</span>
            </button>
            <span className="text-xs font-medium text-bone/60">
              {currentIndex + 1} / {allItems.length}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNavigate(nextIndex)
              }}
              className="flex items-center gap-2 rounded border border-bone/20 px-3 py-2 text-sm text-bone/80 transition hover:border-bone/40 hover:text-bone"
              aria-label="Next project"
            >
              <span className="hidden sm:inline">Next project</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  )
}
