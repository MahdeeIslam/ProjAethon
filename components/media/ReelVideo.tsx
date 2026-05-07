'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { notifyPlaying, registerVideo } from '@/lib/media/videoRegistry'

/**
 * Smart `<video>` wrapper used by every clip on the site.
 *
 * Two modes:
 *   • Lazy (default) — src is unset until the tile is near the viewport,
 *     `preload="none"` keeps page-load light. Plays in / pauses out of view.
 *   • Priority — src is set immediately and `preload="auto"` warms the
 *     buffer right away, but playback is still gated by viewport visibility.
 *     This means visible tiles play instantly (already buffered), while
 *     off-screen tiles are paused so the browser's video decoder isn't
 *     overloaded by 16+ simultaneously decoding clips. It's the only way to
 *     make a media-heavy marquee actually move on real devices.
 */
export default function ReelVideo({
  src,
  poster,
  className = '',
  autoplay = true,
  muted = true,
  loop = true,
  playsInline = true,
  priority = false,
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
  /** Eager-load src + bypass concurrency caps. Visibility still controls play. */
  priority?: boolean
  style?: CSSProperties
  onError?: () => void
  onLoadedData?: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldMount, setShouldMount] = useState(priority)
  const [isInView, setIsInView] = useState(false)

  // Register with the shared registry so the cap can pause LRU non-priority clips.
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    return registerVideo(el, priority)
  }, [priority])

  // Reset mount/view if a non-priority src swaps mid-flight (rare).
  useEffect(() => {
    if (priority) return
    setShouldMount(false)
    setIsInView(false)
  }, [src, priority])

  // IntersectionObserver gates playback for everyone. Lazy tiles also gate `src`.
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        const visible = entry.isIntersecting
        setIsInView(visible)
        if (visible && !priority) setShouldMount(true)
      },
      { rootMargin: '400px 0px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [priority])

  // Play in view, pause out of view. Applies to both modes — keeps the GPU/CPU sane.
  useEffect(() => {
    const el = videoRef.current
    if (!el || !autoplay) return

    if (isInView && shouldMount) {
      const playPromise = el.play()
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.then(() => notifyPlaying(el)).catch(() => {
          /* autoplay blocked — first frame will stay visible until interaction */
        })
      }
    } else if (!isInView) {
      try {
        el.pause()
      } catch {
        /* element may be detached */
      }
    }
  }, [isInView, shouldMount, autoplay])

  return (
    <video
      ref={videoRef}
      src={shouldMount ? src : undefined}
      poster={poster}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      autoPlay={priority && autoplay}
      // Priority tiles warm the buffer ahead of time; lazy tiles stay polite.
      preload={priority ? 'auto' : 'none'}
      onError={onError}
      onLoadedData={onLoadedData}
      onPlay={() => {
        const el = videoRef.current
        if (el) notifyPlaying(el)
      }}
      className={`absolute inset-0 h-full w-full object-cover object-center ${className}`.trim()}
      style={style}
    />
  )
}
