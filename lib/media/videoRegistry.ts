/**
 * Lightweight global registry to coordinate non-hero preview videos.
 *
 * Goals:
 *  - Prevent dozens of `<video>` elements from playing simultaneously and
 *    burning CPU/network when the user scrolls through a media-heavy page.
 *  - Keep an eye on which clips are currently active and pause the
 *    least-recently-used one once we exceed `MAX_CONCURRENT`.
 *
 * Hero videos can opt out by passing `priority: true` (they always play).
 */

/**
 * Max simultaneous non-priority videos. Tuned for a marketing showcase site
 * where multiple cards should feel alive at once without burning CPU/battery.
 * Hero and other `priority` videos do not count toward this cap.
 */
const MAX_CONCURRENT = 8

type Entry = {
  el: HTMLVideoElement
  priority: boolean
  lastPlayed: number
}

const entries = new Set<Entry>()

function findEntry(el: HTMLVideoElement): Entry | undefined {
  for (const entry of entries) {
    if (entry.el === el) return entry
  }
  return undefined
}

export function registerVideo(el: HTMLVideoElement, priority = false): () => void {
  const entry: Entry = { el, priority, lastPlayed: 0 }
  entries.add(entry)
  return () => {
    entries.delete(entry)
  }
}

/** Called whenever a non-priority video becomes the "active" playing tile. */
export function notifyPlaying(el: HTMLVideoElement): void {
  const entry = findEntry(el)
  if (!entry) return
  entry.lastPlayed = performance.now()
  if (entry.priority) return

  const playing = Array.from(entries).filter(
    (e) => !e.priority && !e.el.paused && !e.el.ended
  )
  if (playing.length <= MAX_CONCURRENT) return

  // Pause the least-recently-played non-priority videos until we're under the cap.
  const sorted = [...playing].sort((a, b) => a.lastPlayed - b.lastPlayed)
  const toPause = sorted.slice(0, playing.length - MAX_CONCURRENT)
  for (const target of toPause) {
    if (target.el !== el) {
      try {
        target.el.pause()
      } catch {
        /* swallow — the element may already be detached */
      }
    }
  }
}
