import { NextResponse } from 'next/server'
import { readdirSync, existsSync } from 'fs'
import { join } from 'path'

export const dynamic = 'force-dynamic'

/** Serves vertical reels only (for landing page). Horizontal reels live in reels/Horizontal/. */
export async function GET() {
  try {
    const verticalDir = join(process.cwd(), 'public', 'placeholders', 'reels', 'Vertical')
    if (!existsSync(verticalDir)) {
      return NextResponse.json({ paths: [] })
    }
    const files = readdirSync(verticalDir, { withFileTypes: true })
    const mp4 = files
      .filter((f) => f.isFile() && f.name.toLowerCase().endsWith('.mp4'))
      .map((f) => `/placeholders/reels/Vertical/${f.name}`)
    return NextResponse.json({ paths: mp4 })
  } catch {
    return NextResponse.json({ paths: [] })
  }
}
