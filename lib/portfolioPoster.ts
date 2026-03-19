import type { PortfolioItem } from '@/data/portfolio'

/**
 * Returns poster URL for a portfolio item.
 * Use real poster if available; otherwise a premium placeholder with diagonal texture, gradient, and AETHON watermark.
 */
export function getPosterForItem(item: PortfolioItem): string {
  if (item.poster) return item.poster

  // Placeholder: diagonal texture + gradient + AETHON watermark (opacity 0.06)
  const w = 600
  const h = 400
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#252525"/>
      <stop offset="100%" style="stop-color:#1a1a1a"/>
    </linearGradient>
    <pattern id="diag" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(245,245,242,0.03)" stroke-width="0.5"/>
      <line x1="0" y1="0" x2="20" y2="0" stroke="rgba(245,245,242,0.03)" stroke-width="0.5"/>
    </pattern>
    <linearGradient id="overlay" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:rgba(0,0,0,0.5)"/>
      <stop offset="100%" style="stop-color:transparent"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#diag)"/>
  <rect width="100%" height="100%" fill="url(#overlay)"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Helvetica Neue,Helvetica,Arial,sans-serif" font-size="28" font-weight="600" fill="rgba(245,245,242,0.06)" letter-spacing="0.2em">AETHON</text>
</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`
}
