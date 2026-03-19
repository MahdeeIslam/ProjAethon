import { NextResponse } from 'next/server'
import { readdirSync, existsSync } from 'fs'
import { join } from 'path'

export const dynamic = 'force-dynamic'

/** Serves horizontal reels for Work in Motion rail (landing page). */
export async function GET() {
  try {
    const horizontalDir = join(process.cwd(), 'public', 'placeholders', 'reels', 'Horizontal')
    if (!existsSync(horizontalDir)) {
      return NextResponse.json({ paths: [] })
    }
    const files = readdirSync(horizontalDir, { withFileTypes: true })
    const mp4 = files
      .filter((f) => f.isFile() && f.name.toLowerCase().endsWith('.mp4'))
      .map((f) => `/placeholders/reels/Horizontal/${f.name}`)
    return NextResponse.json({ paths: mp4 })
  } catch {
    return NextResponse.json({ paths: [] })
  }
}
