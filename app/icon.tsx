import { ImageResponse } from 'next/og'
import { BRAND_NAME } from '@/lib/brand'

// Generate favicon dynamically
// 
// ALTERNATIVE: Place static files in /app/ directory:
// - app/icon.png (or icon.svg) - will override this file
// - app/apple-icon.png - for Apple devices
// - public/favicon.ico - traditional favicon
//
// Recommended: Use your logo as favicon
// 1. Export logo at 32x32px (or SVG)
// 2. Place as app/icon.png or app/icon.svg
// 3. Delete this file (icon.tsx)

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#1A1A1A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F5F5F2',
          fontFamily: 'serif',
          fontWeight: 'bold',
        }}
      >
        A
      </div>
    ),
    {
      ...size,
    }
  )
}

