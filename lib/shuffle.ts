/**
 * Fisher–Yates shuffle. Returns a new array; does not mutate the original.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashSeed(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return h >>> 0
}

/** Same order for the same seed (e.g. per session). */
export function shuffleDeterministic<T>(array: T[], seed: string): T[] {
  const result = [...array]
  const rand = mulberry32(hashSeed(seed) || 1)
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/** Client: stable for one tab session; SSR: fixed key. */
export function getReelShuffleSeed(): string {
  if (typeof window === 'undefined') return 'ssr-aethon-reels'
  try {
    let s = sessionStorage.getItem('aethon-reel-seed')
    if (!s) {
      s = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
      sessionStorage.setItem('aethon-reel-seed', s)
    }
    return s
  } catch {
    return 'fallback-seed'
  }
}
