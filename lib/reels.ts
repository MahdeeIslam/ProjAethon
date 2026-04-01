import type { CaseStudy } from '@/data/caseStudies'
import { shuffleArray } from '@/lib/shuffle'

/** TODO: Map reel slug to correct case study. Prefer horizontal reel paths for featured grid. */
export function getReelForCaseStudy(
  caseStudy: CaseStudy,
  horizontalPaths: string[]
): string | null {
  if (horizontalPaths.length === 0) return null
  if (caseStudy.featuredReelSlug) {
    const match = horizontalPaths.find((p) =>
      p.toLowerCase().includes(caseStudy.featuredReelSlug!.toLowerCase())
    )
    if (match) return match
  }
  const shuffled = shuffleArray([...horizontalPaths])
  return shuffled[0] ?? null
}
