export function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')

    // https://youtu.be/<id>
    if (host === 'youtu.be') {
      const id = u.pathname.split('/').filter(Boolean)[0]
      return id || null
    }

    // https://youtube.com/watch?v=<id>
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      const v = u.searchParams.get('v')
      if (v) return v

      // https://youtube.com/embed/<id>
      const parts = u.pathname.split('/').filter(Boolean)
      if (parts[0] === 'embed' && parts[1]) return parts[1]
      if (parts[0] === 'shorts' && parts[1]) return parts[1]
    }

    return null
  } catch {
    return null
  }
}

export function isYouTubeUrl(url: string): boolean {
  return extractYouTubeId(url) !== null
}

/** Drop Shorts + hosted vertical reel paths so “horizontal” rails only use landscape sources. */
export function filterLandscapeReelUrls(urls: readonly string[] | string[]): string[] {
  return urls.filter((u) => {
    const lower = u.toLowerCase()
    if (lower.includes('/shorts/')) return false
    if (lower.includes('youtube.com/shorts')) return false
    if (u.includes('/Vertical/') || u.includes('/reels/Vertical/')) return false
    return true
  })
}

export function toYouTubeEmbedUrl(
  url: string,
  opts?: { autoplay?: boolean; muted?: boolean; loop?: boolean; controls?: boolean }
): string | null {
  const id = extractYouTubeId(url)
  if (!id) return null

  const autoplay = opts?.autoplay ? '1' : '0'
  const muted = opts?.muted ? '1' : '0'
  const loop = opts?.loop ? '1' : '0'
  const controls = opts?.controls === false ? '0' : '1'

  // loop requires playlist=<id>
  const params = new URLSearchParams({
    autoplay,
    mute: muted,
    loop,
    playlist: loop === '1' ? id : '',
    controls,
    playsinline: '1',
    rel: '0',
    modestbranding: '1',
  })
  if (loop !== '1') params.delete('playlist')

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`
}

