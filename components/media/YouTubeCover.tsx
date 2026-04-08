'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { ReelAspect } from '@/data/reelMeta'
import { toYouTubeEmbedUrl } from '@/lib/youtube'

const ASPECT_CLASS: Record<ReelAspect, string> = {
  landscape: 'yt-cover--landscape',
  portrait: 'yt-cover--portrait',
  square: 'yt-cover--square',
}

const IFRAME_ALLOW =
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'

/**
 * Single implementation of YouTube “cover mode” (no cqw/cqh).
 * Sizing uses measured container pixels via ResizeObserver + transform scale.
 */
export default function YouTubeCover({
  youtubeId,
  aspect,
  coverScale,
  className = '',
  showControls = false,
  autoplay = true,
  muted = true,
  loop = true,
  title = 'Video',
}: {
  youtubeId: string
  aspect: ReelAspect
  coverScale: number
  className?: string
  showControls?: boolean
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  title?: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const embed = useMemo(
    () =>
      toYouTubeEmbedUrl(`https://youtu.be/${youtubeId}`, {
        autoplay,
        muted,
        loop,
        controls: showControls,
        enableJsApi: true,
      }),
    [youtubeId, autoplay, muted, loop, showControls]
  )

  const nudgeAutoplay = useCallback(() => {
    const frame = iframeRef.current
    if (!frame?.contentWindow) return
    const post = (func: 'mute' | 'playVideo') => {
      frame.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func, args: [] }),
        '*'
      )
    }
    // Send multiple nudges because some browsers delay player readiness.
    post('mute')
    post('playVideo')
    window.setTimeout(() => {
      post('mute')
      post('playVideo')
    }, 300)
    window.setTimeout(() => {
      post('mute')
      post('playVideo')
    }, 900)
  }, [])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--yt-cw', `${Math.max(1, r.width)}px`)
      el.style.setProperty('--yt-ch', `${Math.max(1, r.height)}px`)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  if (!embed) return null

  return (
    <div
      ref={rootRef}
      className={`yt-cover-root pointer-events-none ${className}`.trim()}
      style={{ ['--yt-cover-scale' as string]: String(coverScale) }}
    >
      <div className={`yt-cover-inner ${ASPECT_CLASS[aspect]}`}>
        <iframe
          ref={iframeRef}
          className="yt-cover-iframe"
          src={embed}
          title={title}
          allow={IFRAME_ALLOW}
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={nudgeAutoplay}
          allowFullScreen
        />
      </div>
    </div>
  )
}
