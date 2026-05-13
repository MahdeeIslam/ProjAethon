'use client'

import { useMemo } from 'react'
import type { CaseStudy } from '@/data/caseStudies'
import { normalizeReelInput } from '@/lib/media/normalizeReel'
import ReelSurface from '@/components/media/ReelSurface'

/**
 * Renders the main media block on a case study detail page.
 *
 * Three layouts, picked off `study.mediaLayout`:
 *   - 'triple-vertical'      : 3 vertical reels stacked side-by-side
 *   - 'side-vertical'        : 1 vertical reel on the right with text left
 *   - 'horizontal-with-tour' : 1 full-width horizontal reel
 *
 * For 'side-vertical' the caller passes `leftContent` (the Problem +
 * Solution body) which renders alongside the reel.
 *
 * The "tour" photo strip used by 'horizontal-with-tour' is rendered by
 * `CaseStudyTour` separately so the page can interleave it with copy.
 */

interface ReelPlateProps {
  src: string
  title: string
  aspect: 'portrait' | 'landscape'
}

function ReelPlate({ src, title, aspect }: ReelPlateProps) {
  const reel = useMemo(() => normalizeReelInput(src), [src])
  const wrapperClass =
    aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-video'

  return (
    <div
      className={`group relative w-full overflow-hidden rounded-[18px] border border-[rgba(245,245,242,0.10)] bg-obsidian shadow-[0_18px_50px_rgba(0,0,0,0.4)] ${wrapperClass}`}
    >
      <ReelSurface
        reel={reel}
        context="grid"
        title={title}
        autoplay
        muted
        loop
        mediaClassName="transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.02]"
      />
    </div>
  )
}

interface CaseStudyMediaProps {
  study: CaseStudy
  leftContent?: React.ReactNode
}

export default function CaseStudyMedia({
  study,
  leftContent,
}: CaseStudyMediaProps) {
  if (study.mediaLayout === 'triple-vertical') {
    const reels = study.mediaReels.slice(0, 3)
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
        {reels.map((src, i) => (
          <ReelPlate
            key={`${study.id}-vert-${i}`}
            src={src}
            title={`${study.client} reel ${i + 1}`}
            aspect="portrait"
          />
        ))}
      </div>
    )
  }

  if (study.mediaLayout === 'side-vertical') {
    const reelSrc = study.mediaReels[0]
    return (
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
        <div className="lg:col-span-7 xl:col-span-7">{leftContent}</div>
        <div className="lg:col-span-5 xl:col-span-5">
          <div className="mx-auto w-full max-w-[420px] lg:sticky lg:top-28">
            {reelSrc && (
              <ReelPlate
                src={reelSrc}
                title={`${study.client} reel`}
                aspect="portrait"
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  // horizontal-with-tour
  const reelSrc = study.mediaReels[0]
  if (!reelSrc) return null
  return (
    <ReelPlate
      src={reelSrc}
      title={`${study.client} reel`}
      aspect="landscape"
    />
  )
}

interface CaseStudyTourProps {
  photos: string[]
  client: string
}

export function CaseStudyTour({ photos, client }: CaseStudyTourProps) {
  if (photos.length === 0) return null
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
      {photos.slice(0, 3).map((src, i) => (
        <div
          key={`${client}-tour-${i}`}
          className="group aspect-[4/3] overflow-hidden rounded-[16px] border border-[rgba(245,245,242,0.10)] bg-cover bg-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:scale-[1.01]"
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden
        />
      ))}
    </div>
  )
}
