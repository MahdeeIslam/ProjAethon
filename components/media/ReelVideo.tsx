'use client'

import type { CSSProperties } from 'react'

export default function ReelVideo({
  src,
  poster,
  className = '',
  autoplay = true,
  muted = true,
  loop = true,
  playsInline = true,
  style,
  onError,
  onLoadedData,
}: {
  src: string
  poster?: string
  className?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
  style?: CSSProperties
  onError?: () => void
  onLoadedData?: () => void
}) {
  return (
    <video
      src={src}
      poster={poster}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      autoPlay={autoplay}
      preload="metadata"
      onError={onError}
      onLoadedData={onLoadedData}
      className={`absolute inset-0 h-full w-full object-cover object-center ${className}`.trim()}
      style={style}
    />
  )
}
