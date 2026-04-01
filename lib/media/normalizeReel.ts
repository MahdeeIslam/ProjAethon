import type { ReelAspect, ReelMeta } from '@/data/reelMeta'
import { reelMetaById } from '@/data/reelMeta'
import { extractYouTubeId, isYouTubeUrl } from '@/lib/youtube'

export const GLOBAL_YT_COVER_SCALE = 1.28

export const DEBUG_REEL_LAYOUT = false

export type ReelContext = 'hero' | 'featured' | 'grid' | 'modal'

export type NormalizedReel = {
  id: string
  source: 'mp4' | 'youtube'
  aspect: ReelAspect
  coverScale?: number
  heroCoverScale?: number
  featuredCoverScale?: number
  gridCoverScale?: number
  modalCoverScale?: number
  youtubeId?: string
  src: string
  poster?: string
  title?: string
  forceCoverMode?: boolean
}

function lookupMeta(youtubeId: string | null): ReelMeta | undefined {
  if (!youtubeId) return undefined
  return (
    reelMetaById[youtubeId] ??
    reelMetaById[youtubeId.replace(/-/g, '')] ??
    undefined
  )
}

/** URL / path heuristics — last resort when `reelMetaById` has no entry. */
function heuristicAspectFromUrl(raw: string): ReelAspect {
  const lower = raw.toLowerCase()
  if (lower.includes('/shorts/')) return 'portrait'
  if (lower.includes('youtube.com/shorts')) return 'portrait'
  if (lower.includes('/vertical/') || lower.includes('/reels/vertical/')) return 'portrait'
  return 'landscape'
}

export function getReelAspect(reel: NormalizedReel): ReelAspect {
  return reel.aspect
}

export function getCoverScale(reel: NormalizedReel, context: ReelContext): number {
  const g = GLOBAL_YT_COVER_SCALE
  switch (context) {
    case 'hero':
      return reel.heroCoverScale ?? reel.coverScale ?? g
    case 'featured':
      return reel.featuredCoverScale ?? reel.coverScale ?? g
    case 'grid':
      return reel.gridCoverScale ?? reel.coverScale ?? g
    case 'modal':
      return reel.modalCoverScale ?? reel.coverScale ?? g
    default:
      return reel.coverScale ?? g
  }
}

function mergeMetaIntoNormalized(
  base: Omit<NormalizedReel, 'aspect'> & { aspect?: ReelAspect },
  meta: ReelMeta | undefined,
  heuristicAspect: ReelAspect
): NormalizedReel {
  const aspect = meta?.aspect ?? base.aspect ?? heuristicAspect
  return {
    id: meta?.youtubeId ?? meta?.id ?? base.id,
    source: base.source,
    aspect,
    coverScale: meta?.coverScale,
    heroCoverScale: meta?.heroCoverScale,
    featuredCoverScale: meta?.featuredCoverScale,
    gridCoverScale: meta?.gridCoverScale,
    modalCoverScale: meta?.modalCoverScale,
    youtubeId: meta?.youtubeId ?? base.youtubeId,
    src: base.src,
    poster: meta?.poster ?? base.poster,
    title: meta?.title ?? base.title,
    forceCoverMode: meta?.forceCoverMode,
  }
}

/**
 * Normalize a raw URL or path string from API / static arrays into `NormalizedReel`.
 */
export function normalizeReelInput(raw: string): NormalizedReel {
  const trimmed = raw.trim()
  const isMp4 =
    trimmed.toLowerCase().endsWith('.mp4') ||
    trimmed.includes('/reels/') ||
    trimmed.includes('/placeholders/')

  if (isMp4 && !isYouTubeUrl(trimmed)) {
    const fileBase = trimmed.split('/').pop()?.replace(/\.mp4$/i, '') ?? trimmed
    const id = `mp4:${fileBase}`
    const heuristic = heuristicAspectFromUrl(trimmed)
    const meta = Object.values(reelMetaById).find((m) => m.fileSlug && fileBase.toLowerCase().includes(m.fileSlug.toLowerCase()))
    return mergeMetaIntoNormalized(
      {
        id,
        source: 'mp4',
        src: trimmed,
        poster: undefined,
        title: fileBase,
      },
      meta,
      heuristic
    )
  }

  const ytId = extractYouTubeId(trimmed)
  const meta = lookupMeta(ytId)
  const heuristic = heuristicAspectFromUrl(trimmed)

  return mergeMetaIntoNormalized(
    {
      id: ytId ?? trimmed,
      source: 'youtube',
      src: trimmed,
      youtubeId: ytId ?? undefined,
      title: undefined,
    },
    meta,
    heuristic
  )
}

export function debugReelLayout(reel: NormalizedReel, context: ReelContext): string {
  if (!DEBUG_REEL_LAYOUT) return ''
  const scale = reel.source === 'youtube' ? getCoverScale(reel, context) : 1
  return `[reel ${reel.source} id=${reel.id} aspect=${reel.aspect} scale=${scale.toFixed(2)} ctx=${context}]`
}
