export function encodeMediaPath(p: string): string {
  // Keep absolute remote URLs intact except for safely encoded pathname segments.
  if (/^https?:\/\//i.test(p)) {
    try {
      const u = new URL(p)
      u.pathname = u.pathname
        .split('/')
        .map((seg) => {
          if (!seg) return seg
          try {
            return encodeURIComponent(decodeURIComponent(seg))
          } catch {
            return encodeURIComponent(seg)
          }
        })
        .join('/')
      return u.toString()
    } catch {
      return p
    }
  }

  return p
    .split('/')
    .map((s) => {
      if (!s) return s
      try {
        return encodeURIComponent(decodeURIComponent(s))
      } catch {
        return encodeURIComponent(s)
      }
    })
    .join('/')
}
