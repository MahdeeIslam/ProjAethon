'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { notifyPlaying, registerVideo } from '@/lib/media/videoRegistry'

/**
 * Lazy `<video>` wrapper used by every non-hero clip on the site.
 *
 * Behaviour:
 *  - Does not assign `src` until the element is near the viewport
 *    (IntersectionObserver, rootMargin: 400px).
 *  - Uses `preload="none"` so nothing is fetched on initial page load.
 *  - Pauses automatically when scrolled out of view; resumes on re-enter.
 *  - Coordinates with the global video registry to cap concurrent playback.
 *  - Falls back to the poster (and notifies the parent via `onError`)
 *    if the video can't be loaded.
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
  /** Hero / always-on videos opt out of concurrency caps and lazy mounting. */
  priority?: boolean
  style?: CSSProperties
  onError?: () => void
  onLoadedData?: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldMount, setShouldMount] = useState(priority)
  const [isInView, setIsInView] = useState(priority)

  // Global play coordination — register/unregister with the shared registry.
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    return registerVideo(el, priority)
  }, [priority])

  // Reset mount/view state if the source changes mid-flight (rare).
  useEffect(() => {
    if (priority) return
    setShouldMount(false)
    setIsInView(false)
  }, [src, priority])

  // Mount the source only when the tile is near the viewport.
  useEffect(() => {
    if (priority) return
    const el = videoRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        const visible = entry.isIntersecting
        setIsInView(visible)
        if (visible) setShouldMount(true)
      },
      { rootMargin: '400px 0px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [priority])

  // Play / pause based on viewport visibility.
  useEffect(() => {
    const el = videoRef.current
    if (!el || !autoplay) return

    if (isInView && shouldMount) {
      el.play()
        .then(() => notifyPlaying(el))
        .catch(() => {
          /* autoplay may be blocked — poster stays visible until interaction */
        })
    } else if (!isInView && !priority) {
      try {
        el.pause()
      } catch {
        /* element may be detached */
      }
    }
  }, [isInView, shouldMount, autoplay, priority])

  return (
    <video
      ref={videoRef}
      src={shouldMount ? src : undefined}
      poster={poster}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      autoPlay={priority && autoplay}
      // Priority tiles aggressively prefetch so the showcase reels feel
      // simultaneously alive on first paint. Lazy tiles stay polite.
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
