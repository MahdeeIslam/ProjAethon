'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Mounts a single Lenis smooth-scroll instance on `<html>`.
 *
 * Why we have this:
 * - Metropolis-inspired "ultra smooth scrolling" feel — the wheel/touchpad
 *   delta is interpolated over multiple frames instead of jumping instantly,
 *   which makes large pages feel cinematic rather than abrupt.
 * - Anchor links (e.g. `<a href="#portfolio-grid">`) still work — Lenis hooks
 *   into them automatically.
 *
 * Bypassed entirely if the user has `prefers-reduced-motion: reduce`. In that
 * case native browser scrolling stays intact (no easing, no rAF loop), which
 * is the right call for accessibility.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      // Smaller `lerp` = smoother but laggier; 0.10–0.14 is a sweet spot
      // for a premium feel without feeling unresponsive.
      lerp: 0.11,
      // Slightly extended wheel delta so scroll feels generous on trackpads
      // and weighty on a mouse wheel.
      wheelMultiplier: 1.05,
      touchMultiplier: 1.6,
      // Allow native scroll within nested overflow containers (modals, etc.)
      // so the contact form, portfolio modal, etc. don't fight Lenis.
      smoothWheel: true,
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return null
}
