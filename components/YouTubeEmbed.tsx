'use client'

import { toYouTubeEmbedUrl } from '@/lib/youtube'

const iframeAllow =
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'

/**
 * Plain YouTube iframe (no “cover” math). Use `YouTubeCover` + `ReelSurface` for full-bleed / cropped embeds.
 */
export default function YouTubeEmbed({
  url,
  title,
  className,
  autoplay = false,
  muted = true,
  loop = false,
  controls = false,
}: {
  url: string
  title: string
  className?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
}) {
  const embed = toYouTubeEmbedUrl(url, { autoplay, muted, loop, controls })
  if (!embed) return null

  return (
    <iframe
      className={className}
      src={embed}
      title={title}
      allow={iframeAllow}
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  )
}
