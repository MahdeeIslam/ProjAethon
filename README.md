# Premium Muslim Community Creative Agency - Marketing Site

A production-ready marketing site for a premium Muslim community creative/marketing agency. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Features

- **Premium Design**: Monochrome dark theme (Obsidian & Bone) with serif headers and sans-serif body text
- **Performance Optimized**: Lighthouse-minded, lazy loading, optimized media
- **SEO Ready**: Complete metadata, OpenGraph, sitemap, robots.txt, structured data
- **Accessible**: Semantic HTML, keyboard navigation, focus management
- **Responsive**: Mobile-first design with sticky CTAs
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── services/          # Services page
│   ├── portfolio/         # Portfolio page
│   ├── case-studies/      # Case studies page
│   ├── who-we-are/        # About page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── CTAButton.tsx      # Call-to-action button
│   ├── StickyCTA.tsx      # Sticky CTA bar
│   ├── HeroLoop.tsx       # Hero video section
│   ├── Lightbox.tsx       # Gallery lightbox modal
│   ├── TestimonialCarousel.tsx
│   ├── LogoMarquee.tsx
│   └── ...
├── data/                  # Content data models
│   ├── portfolio.ts
│   ├── caseStudies.ts
│   ├── testimonials.ts
│   ├── services.ts
│   ├── founders.ts
│   ├── pricing.ts
│   └── organisations.ts
├── lib/                   # Utility modules
│   └── brand.ts          # Brand configuration (single source of truth)
└── public/                # Static assets
    └── placeholders/      # Media placeholders
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Adding Content & Media

### Replacing Placeholder Media

The site uses placeholder media throughout. All placeholders are clearly labeled in code comments for easy replacement.

#### Placeholder Strategy

- **No stock imagery**: All placeholders are abstract "gallery plates" (noise + gradients + subtle lines)
- **Local assets only**: All placeholders live in `/public/placeholders/`
- **Clear labeling**: Each placeholder has a code comment indicating what to replace

#### Required Media Files

Add your actual media files to `/public/placeholders/`:

1. **Hero Video** (Required):
   - File: `hero-loop.mp4`
   - Format: Silent cinematic background loop (MP4, H.264)
   - Recommended: 1920x1080, 30fps, muted, looped
   - Poster: `hero-poster.jpg` (fallback image, 1920x1080)
   - Location: Referenced in `components/HeroStatement.tsx`

2. **Portfolio Items**:
   - Thumbnails: `portfolio-1.jpg`, `portfolio-2.jpg`, etc.
   - Videos: `portfolio-1-video.mp4`, `portfolio-2-video.mp4`, etc.
   - Images: `portfolio-1-1.jpg`, `portfolio-1-2.jpg`, etc.
   - Update paths in `/data/portfolio.ts`
   - Location: Referenced in `components/FeaturedWorkFeed.tsx` and `app/portfolio/page.tsx`

3. **Case Study Assets**:
   - Videos: `case-1-video.mp4`, `case-2-video.mp4`, etc.
   - Images: `case-1-1.jpg`, `case-1-2.jpg`, etc.
   - Update paths in `/data/caseStudies.ts`
   - Location: Referenced in `app/case-studies/page.tsx`

4. **Other Assets**:
   - Testimonials: `testimonial-1.jpg`, `testimonial-2.jpg`, etc.
   - Founders: `founder-nazif.jpg`, `founder-barisa.jpg`, `founder-saad.jpg`
   - Logos: `logo-1.svg`, `logo-2.svg`, etc. (monochrome versions)
   - OpenGraph Image: `og-image.jpg` (1200x630px, place in `/public/`)

#### How to Replace Placeholders

1. **Hero Video**:
   ```tsx
   // In components/HeroStatement.tsx
   // Replace: <source src="/placeholders/hero-loop.mp4" type="video/mp4" />
   // With your actual video file path
   ```

2. **Gallery Plates** (Portfolio/Case Studies):
   ```tsx
   // In components/FeaturedWorkFeed.tsx and app/portfolio/page.tsx
   // Replace placeholder divs with:
   // <Image src={project.thumbnail} alt={project.title} fill className="object-cover" />
   ```

3. **Case Study Media**:
   ```tsx
   // In app/case-studies/page.tsx
   // Replace placeholder divs with actual Image/Video components
   ```

#### Placeholder Generation (Optional)

If you need to generate placeholder "gallery plates" before final assets:

1. Create abstract images (noise + gradients + subtle lines)
2. Use tools like:
   - CSS gradients + noise textures
   - Image editing software (Photoshop, Figma)
   - Online placeholder generators (with custom styling)
3. Ensure placeholders match the Obsidian & Bone aesthetic
4. Use consistent aspect ratios (16:10 for portfolio, 4:3 for case studies)

### 2. Update Content Data

Edit the data files in `/data/`:

- `portfolio.ts` - Portfolio items
- `caseStudies.ts` - Case study content
- `testimonials.ts` - Client testimonials
- `services.ts` - Service offerings
- `founders.ts` - Founder profiles
- `pricing.ts` - Pricing tiers
- `organisations.ts` - Client logos

### 3. Brand Assets

#### Logo Setup

1. **Place your logo file** in `/public/` directory:
   - Preferred: `/public/aethon-logo.svg` (SVG for crisp scaling)
   - Alternative: `/public/aethon-logo.png` (PNG/WebP for raster)
   - Fallback: `/public/logo.svg` or `/public/logo.png`

2. **Update logo path** in `/lib/brand.ts`:
   ```ts
   export const LOGO_PATH = '/aethon-logo.svg' // Change if your filename differs
   ```

3. **Logo formats**:
   - **SVG** (preferred): Crisp at any size, smaller file size
   - **PNG/WebP**: Use for complex graphics, ensure 2x resolution for retina

4. **Logo appears in**:
   - Header (left side, with wordmark)
   - Footer (with brand name)
   - Structured data (JSON-LD)

#### Favicon

Next.js automatically generates favicons from `app/icon.tsx`. For custom favicons:

1. **Static files** (recommended):
   - Place `icon.png` or `icon.svg` in `/app/` directory
   - Next.js will automatically use it
   - For multiple sizes: `apple-icon.png`, `favicon.ico` in `/public/`

2. **Dynamic generation**:
   - Current setup uses `app/icon.tsx` to generate a simple "A" favicon
   - Replace with your logo-based design

#### Environment Variables

1. **Set site URL**:
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```
   - Used for: OpenGraph URLs, sitemap, robots.txt, structured data
   - Fallback: `http://localhost:3000` (development)

2. **Other variables** (optional):
   - Contact form email service keys
   - Analytics IDs
   - API keys

### 4. Update Site Metadata

1. **Domain & URLs**: 
   - Set `NEXT_PUBLIC_SITE_URL` in `.env.local` (see Brand Assets above)
   - All URLs are automatically generated from this variable

2. **Contact Information**:
   - Set public email in `lib/brand.ts` (`CONTACT_EMAIL`; used by Footer, portfolio mailto links, etc.)
   - Update phone in:
     - `components/Footer.tsx`
     - `app/contact/page.tsx`

3. **OpenGraph Image**:
   - Place `/public/og-image.jpg` (1200x630px)
   - URL is automatically generated from `NEXT_PUBLIC_SITE_URL`

### 4. Integrate Contact Form

The contact form in `app/contact/page.tsx` currently logs to console. Integrate with:

- **Email Service**: SendGrid, Resend, or similar
- **Form Handler**: Formspree, Netlify Forms, or custom API route
- **CRM**: HubSpot, Salesforce, etc.

### 5. Add Calendly Integration

Replace the Calendly placeholder in `app/contact/page.tsx`:

```tsx
// Install: npm install react-calendly
import { InlineWidget } from 'react-calendly'

// Replace placeholder div with:
<InlineWidget url="https://calendly.com/your-username/consultation" />
```

## Design System

### Colors

- **Obsidian**: `#1A1A1A` (background)
- **Bone**: `#F5F5F2` (text)
- **Accent**: `#D4AF37` (subtle gold for CTAs)

### Typography

- **Headers**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Spacing

- Section padding: `8rem` (desktop), `4rem` (mobile)
- Museum-like margins and breathing room

## Performance Optimization

- Images: Use Next.js Image component for optimized loading
- Videos: Lazy load, use poster images, optimize formats
- Fonts: Self-hosted or optimized Google Fonts (already configured)
- Code splitting: Automatic with Next.js App Router

## SEO Checklist

- ✅ Metadata per page
- ✅ OpenGraph tags
- ✅ Twitter Card tags
- ✅ Structured data (Organization schema)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Semantic HTML headings
- ✅ Alt text for images (add when replacing placeholders)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

1. Build: `npm run build`
2. Start: `npm start`
3. Configure environment variables if needed

## Customization

### Change Accent Color

Edit `tailwind.config.ts`:

```ts
accent: '#YOUR_COLOR', // Replace #D4AF37
```

### Change Fonts

1. Update Google Fonts import in `app/globals.css`
2. Update font variables in `tailwind.config.ts`
3. Update font classes in `app/layout.tsx`

### Modify CTA Text

Edit `components/CTAButton.tsx`:

```tsx
Request a Strategic Consultation // Change this text
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - All rights reserved

## Support

For questions or issues, contact: aethon2026@gmail.com (see `CONTACT_EMAIL` in `lib/brand.ts`)

---

**Built with Cinematic Ihsan (Excellence)**

