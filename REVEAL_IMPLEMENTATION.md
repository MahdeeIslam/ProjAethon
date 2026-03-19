# Rhythmic Reveal on Scroll - Implementation Summary

## Overview
Implemented a museum-quality "rhythmic reveal on scroll" system across the Aethon site using IntersectionObserver for performance and accessibility.

## Files Created

### Core Reveal System
1. **`components/motion/Reveal.tsx`**
   - Single element reveal component
   - Props: `delay`, `duration`, `offset`, `once`, `direction`, `className`
   - Uses IntersectionObserver for performance
   - Respects `prefers-reduced-motion`

2. **`components/motion/RevealGroup.tsx`**
   - Staggered reveal for lists/grids
   - Props: `stagger`, `delay`, `duration`, `offset`, `once`, `direction`, `className`
   - Automatically applies staggered delays to children

## Files Modified

### Home Page Components
- `components/FeaturedWorkFeed.tsx` - Added reveals to heading and staggered reveals to project feed
- `components/ReputationGap.tsx` - Replaced Framer Motion with Reveal components, staggered bullet points
- `components/WhatWeDo.tsx` - Replaced Framer Motion with Reveal components, staggered pillar blocks
- `components/InvestmentMenu.tsx` - Replaced Framer Motion with Reveal components, staggered pricing cards
- `components/TheUnion.tsx` - Replaced Framer Motion with Reveal components, staggered founder cards
- `components/PortfolioPillars.tsx` - Added reveals to heading and staggered reveals to pillar grid
- `app/page.tsx` - Added reveals to testimonials section and logo marquee

### Other Pages
- `app/portfolio/page.tsx` - Added reveals to filter chips and staggered reveals to grid items
- `app/case-studies/page.tsx` - Added reveals throughout case study articles (title, problem, intervention, results, media, testimonial, related work)
- `app/services/page.tsx` - Added reveals to callout and staggered reveals to pillar blocks
- `app/who-we-are/page.tsx` - Added reveals to sections and staggered reveals to founders and values
- `app/contact/page.tsx` - Added reveals to contact sections and form

## Placeholder Media

### Directory Structure Created
- `/public/placeholders/plates/` - For abstract gallery plates
- `/public/placeholders/posters/` - For video poster images
- `/public/placeholders/hero-loop.mp4` - Hero video placeholder (TODO: Replace)

### Placeholder Implementation
- All placeholder media uses abstract "gallery plate" styling (gradients + noise + lines)
- Clear TODO comments added next to each placeholder usage
- Placeholders are visually distinct but maintain Obsidian & Bone aesthetic

## Reveal Timing & Rhythm

### Home Page Flow
1. Hero statement - No delay (immediate)
2. Featured Work Feed - Heading reveals, then items stagger (0.08s between items)
3. What We Do - Heading → subtitle → pillars stagger (0.15s between pillars)
4. Reputation Gap - Kicker → title → subtitle → bullets stagger (0.1s between bullets)
5. Portfolio Pillars - Kicker → title → subtitle → pillars stagger (0.1s between pillars)
6. Investment Menu - Kicker → title → subtitle → cards stagger (0.15s between cards)
7. The Union - Kicker → title → subtitle → founders stagger (0.1s between founders)
8. Testimonials - Kicker → title → carousel
9. Logo Marquee - Fade in

### Other Pages
- Similar rhythmic pattern applied consistently
- Sections reveal sequentially with appropriate delays
- Grid items stagger for visual rhythm

## Performance & Accessibility

### Performance
- Uses IntersectionObserver (no scroll listeners)
- CSS transitions (no heavy JS animations)
- `willChange` only when animating
- `once=true` by default (no re-animation)

### Accessibility
- Respects `prefers-reduced-motion` (immediate reveal, no transforms)
- No `display: none` (uses opacity/transform only)
- Content always accessible to screen readers
- Keyboard navigation intact

## TODO: Replace Placeholder Media

1. **Hero Video**: Replace `/public/placeholders/hero-loop.mp4` with actual silent cinematic loop
2. **Hero Poster**: Replace `/public/placeholders/posters/hero-poster.jpg` with actual poster image
3. **Portfolio Thumbnails**: Replace gallery plates in:
   - `components/FeaturedWorkFeed.tsx` - Portfolio feed items
   - `components/PortfolioPillars.tsx` - Pillar thumbnails
   - `app/portfolio/page.tsx` - Portfolio grid items
4. **Case Study Assets**: Replace gallery plates in `app/case-studies/page.tsx`:
   - Media plates (images/videos)
   - Related work thumbnails
5. **All placeholders marked with TODO comments** in code

## Testing Checklist

- [ ] Test on mobile devices (avoid jank)
- [ ] Test with `prefers-reduced-motion` enabled
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Verify no layout shift during reveals
- [ ] Check performance on slow devices
- [ ] Test all pages for consistent reveal rhythm

