'use client'

import type { CSSProperties } from 'react'
import type { NormalizedReel, ReelContext } from '@/lib/media/normalizeReel'
import { DEBUG_REEL_LAYOUT, debugReelLayout, getCoverScale } from '@/lib/media/normalizeReel'
import { encodeMediaPath } from '@/lib/media/encodeMediaPath'
import YouTubeCover from '@/components/media/YouTubeCover'
import ReelVideo from '@/components/media/ReelVideo'

export default function ReelSurface({
  reel,
  context,
  className = '',
  mediaClassName = '',
  title = 'Video',
  autoplay = true,
  muted = true,
  loop = true,
  showControls = false,
  reduceMotion = false,
  videoStyle,
  onVideoError,
  onVideoReady,
}: {
  reel: NormalizedReel
  context: ReelContext
  className?: string
  /** Classes on the actual video / YouTube root (e.g. opacity, hover scale). */
  mediaClassName?: string
  title?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  showControls?: boolean
  reduceMotion?: boolean
  videoStyle?: CSSProperties
  onVideoError?: () => void
  onVideoReady?: () => void
}) {
  if (reduceMotion) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] ${mediaClassName}`.trim()}
      />
    )
  }

  const coverScale = reel.source === 'youtube' ? getCoverScale(reel, context) : 1

  const debug = DEBUG_REEL_LAYOUT ? (
    <div className="pointer-events-none absolute bottom-1 left-1 z-[200] max-w-[95%] truncate rounded bg-black/80 px-1.5 py-0.5 font-mono text-[10px] text-lime-300">
      {debugReelLayout(reel, context)} {reel.title ?? ''}
    </div>
  ) : null

  if (reel.source === 'mp4') {
    return (
      <div className={`absolute inset-0 ${className}`.trim()}>
        <ReelVideo
          src={encodeMediaPath(reel.src)}
          poster={reel.poster}
          className={mediaClassName}
          autoplay={autoplay}
          muted={muted}
          loop={loop}
          style={videoStyle}
          onError={onVideoError}
          onLoadedData={onVideoReady}
        />
        {debug}
      </div>
    )
  }

  if (!reel.youtubeId) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] ${className}`.trim()} />
    )
  }

  return (
    <div className={`absolute inset-0 ${className}`.trim()}>
      <YouTubeCover
        youtubeId={reel.youtubeId}
        aspect={reel.aspect}
        coverScale={coverScale}
        className={`absolute inset-0 ${mediaClassName}`.trim()}
        title={title}
        autoplay={autoplay}
        muted={muted}
        loop={loop}
        showControls={showControls}
      />
      {debug}
    </div>
  )
}
