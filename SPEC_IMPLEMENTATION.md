# Spec Implementation Summary

## Brand + style

- **AETHON** wordmark used in hero, loading screen, and bottom header (uppercase).
- **Helvetica-style** typography: `--font-sans` and `--font-display` set to `'Helvetica Neue', Helvetica, Arial, sans-serif` in `app/globals.css`. Serif display removed in favour of large sans scale.
- **Palette**: Bone (#F5F5F2) for text in dark sections; Obsidian (#1A1A1A) for dark areas. Home starts with light section (reels carousel) then moves into dark (org marquee, case studies, etc.).
- **Motion**: Slide-up + fade via existing `Reveal` / `RevealGroup` (IntersectionObserver). `prefers-reduced-motion` respected in marquee and loading.
- **Loading**: `LoadingGate` shows AETHON wordmark (fade/slide), then reveals page after a short delay.

## Pages (routes)

| Route            | Content |
|------------------|--------|
| `/`              | Home (showreel hero, reels, orgs, case studies, 4 steps, services, contact) |
| `/portfolio`     | 3 category rows + “More of our work” vertical reels |
| `/about`         | Redirects to `/who-we-are` |
| `/who-we-are`    | About: “Visual Media is Leverage”, What We Solve, team grid, orgs grid |
| `/case-studies`  | Case studies index (cards → detail) |
| `/case-studies/[slug]` | Case study detail (At A Glance, Problem, Solution, Outcome, related, CTA) |
| `/services`      | Intro, 4 service groups, philosophy block |
| `/contact`       | Form (name, email, organisation, budget range, goals, message), Start a Project, Book a Call, validation + success message |

## Files changed / added

### New

- `components/LoadingGate.tsx` – Initial load AETHON wordmark then reveal.
- `components/HeroShowreel.tsx` – Full-viewport hero video, AETHON wordmark at bottom, tagline, View Portfolio, audio toggle.
- `components/VerticalReelsCarousel.tsx` – Vertical reels strip (placeholder videos).
- `components/HomeOrgMarquee.tsx` – Horizontal rolling org names.
- `components/FeaturedCaseStudiesHome.tsx` – 3–5 case study cards with “Read Case Study →”.
- `components/FourStepProcess.tsx` – 4-step process.
- `components/HomeServicesSummary.tsx` – 3 (actually 4) pillars with “Learn more”.
- `components/HomeContactSection.tsx` – Short form + Start a Project / Book a Call.
- `components/BottomHeader.tsx` – Bottom nav revealed near end of scroll.
- `app/about/page.tsx` – Redirect to `/who-we-are`.
- `app/case-studies/[slug]/page.tsx` – Dynamic case study detail.
- `data/team.ts` – Team (leadership + specialists).
- `data/services.ts` – 4 service groups + philosophy text.
- `public/placeholders/README.md`, `plates/.gitkeep`, `reels/.gitkeep`.

### Modified

- `lib/brand.ts` – `BRAND_WORDMARK`, `HERO_TAGLINE`, `HERO_CTA`.
- `app/globals.css` – Helvetica-style fonts, loading keyframes, marquee keyframes.
- `app/layout.tsx` – `LoadingGate`, `BottomHeader`; removed Playfair/Inter.
- `app/page.tsx` – New home structure (hero → spacer → reels → orgs → case studies → 4 steps → services → contact).
- `app/portfolio/page.tsx` – 3 category horizontal rows, lightbox, “More of our work” reels.
- `app/who-we-are/page.tsx` – About copy, What We Solve, team grid, orgs grid, Get in touch.
- `app/case-studies/page.tsx` – Index only (cards linking to `/[slug]`).
- `app/services/page.tsx` – Intro, 4 groups from `data/services.ts`, philosophy.
- `app/contact/page.tsx` – New form fields, validation, success state (no backend).
- `data/caseStudies.ts` – Replaced with 6 spec case studies (slug, atAGlance, problem, solution, outcome, assets, relatedIds).
- `data/portfolio.ts` – `portfolioCategorySections`, `tags` optional.
- `components/Header.tsx` – Nav order, “About” → `/about`, AETHON-style wordmark.
- `components/Footer.tsx` – “About” link.
- `components/FeaturedCaseStudies.tsx` – Uses `atAGlance`, `slug`; link to `/case-studies/[slug]`.
- `components/Lightbox.tsx` – Video: muted, autoPlay, playsInline, loop.

## Placeholder media (TODO)

Add under `/public/placeholders/`:

| Path | Purpose |
|------|--------|
| `hero-showreel.mp4` | Silent looping hero (full viewport). |
| `hero-poster.jpg` | Poster for hero video. |
| `plates/plate-01.jpg` … `plate-12.jpg` | Abstract gallery plates (no stock). |
| `reels/reel-01.mp4` … `reel-06.mp4` | Short vertical loops for reels carousel. |

Code references these paths with TODO comments where appropriate. If a file is missing, the UI falls back to empty or gradient placeholders.

## Scroll / interactions

- **Reveal on scroll**: Existing `Reveal` / `RevealGroup` (slide up + fade).
- **Parallax hero**: Hero video is fixed; a spacer (`h-screen`) lets content scroll over it.
- **Gradient feel**: First content section (reels) is light (`#F5F5F2`); rest dark (Obsidian).
- **Bottom header**: `BottomHeader` appears when scroll is near bottom (Metropolis-style).

## Accessibility & performance

- `prefers-reduced-motion`: Marquee and loading animation disabled when requested.
- Videos: `muted`, `playsInline`, `preload="metadata"`, `poster` where used.
- Contrast and focus styles kept; form validation and success message for contact.
