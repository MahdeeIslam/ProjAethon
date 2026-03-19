# Placeholder Media Guide

This document outlines what placeholder media files are needed and where to place them.

## Required Placeholders

### Hero Section
- **File**: `/public/placeholders/hero-loop.mp4`
  - Silent cinematic background video loop
  - Recommended: 1920x1080, H.264 codec, optimized for web
  - Duration: 10-30 seconds (will loop)
  - Should showcase best work

- **File**: `/public/placeholders/hero-poster.jpg`
  - Fallback poster image for video
  - Recommended: 1920x1080, optimized JPEG
  - Should be a compelling frame from the video

### Portfolio Items
For each portfolio item in `/data/portfolio.ts`, you'll need:

- **Thumbnails**: `/public/placeholders/portfolio-{id}.jpg`
  - Recommended: 1200x800, optimized JPEG
  - Should represent the project visually

- **Videos**: `/public/placeholders/portfolio-{id}-video.mp4`
  - Project videos
  - Recommended: 1920x1080, H.264, optimized

- **Additional Images**: `/public/placeholders/portfolio-{id}-{n}.jpg`
  - Additional project images (n = 1, 2, 3, etc.)

### Case Studies
For each case study in `/data/caseStudies.ts`:

- **Videos**: `/public/placeholders/case-{id}-video.mp4`
- **Images**: `/public/placeholders/case-{id}-{n}.jpg`

### Testimonials
- **Files**: `/public/placeholders/testimonial-{id}.jpg`
  - Headshots or representative images
  - Recommended: 400x400, square format

### Founders
- **Files**: 
  - `/public/placeholders/founder-nazif.jpg`
  - `/public/placeholders/founder-barisa.jpg`
  - `/public/placeholders/founder-saad.jpg`
  - Recommended: 800x800, square format, professional headshots

### Organization Logos
- **Files**: `/public/placeholders/logo-{id}.svg`
  - Monochrome SVG versions of client logos
  - Should be optimized for web
  - Use bone color (#F5F5F2) or ensure they work on dark background

### OpenGraph Image
- **File**: `/public/og-image.jpg`
  - Social sharing image
  - Recommended: 1200x630px
  - Should represent the brand and be compelling for social shares

## Quick Placeholder Generation

If you need temporary placeholders while waiting for final assets:

### Using ImageMagick (Command Line)
```bash
# Generate placeholder images
for i in {1..6}; do
  convert -size 1200x800 xc:#1A1A1A -pointsize 24 -fill "#F5F5F2" -gravity center -annotate +0+0 "Portfolio $i" public/placeholders/portfolio-$i.jpg
done
```

### Using Online Tools
- **Placeholder.com**: https://placeholder.com
- **Placeholder.pics**: https://placeholder.pics
- **DummyImage**: https://dummyimage.com

### Using CSS Placeholders
The current implementation uses CSS placeholders (colored divs) that will work until real assets are added.

## Video Optimization Tips

1. **Compress videos**: Use HandBrake or FFmpeg
   ```bash
   ffmpeg -i input.mp4 -vcodec h264 -acodec aac -crf 23 -preset slow output.mp4
   ```

2. **Generate poster images**:
   ```bash
   ffmpeg -i video.mp4 -ss 00:00:01 -vframes 1 poster.jpg
   ```

3. **Create multiple resolutions**: Consider responsive video sources

## File Naming Convention

- Use kebab-case (lowercase with hyphens)
- Be consistent with IDs from data files
- Keep file sizes optimized for web

## Next Steps

1. Replace all placeholder references in data files with actual paths
2. Optimize all images (use tools like ImageOptim, Squoosh)
3. Optimize all videos (compress, use appropriate codecs)
4. Test loading performance
5. Update alt text and captions in data files

