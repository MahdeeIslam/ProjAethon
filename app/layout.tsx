import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyCTA from '@/components/StickyCTA'
import BackToTop from '@/components/BackToTop'
import LoadingGate from '@/components/LoadingGate'
import BottomHeader from '@/components/BottomHeader'
import { BRAND_NAME, BRAND_DESCRIPTION, SITE_URL, LOGO_URL } from '@/lib/brand'

export const metadata: Metadata = {
  title: {
    default: `${BRAND_NAME} | Cinematic Ihsan`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: BRAND_DESCRIPTION,
  keywords: ['Muslim marketing agency', 'Islamic content production', 'institutional marketing', 'cinematography', 'nasheed audio', 'premium creative agency', BRAND_NAME],
  authors: [{ name: BRAND_NAME }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} | Cinematic Ihsan`,
    description: BRAND_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`, // Placeholder - replace with actual OG image
        width: 1200,
        height: 630,
        alt: BRAND_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: BRAND_NAME,
    description: BRAND_DESCRIPTION,
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: BRAND_NAME,
              description: BRAND_DESCRIPTION,
              url: SITE_URL,
              logo: LOGO_URL,
              sameAs: [
                // Add social media URLs when available
              ],
            }),
          }}
        />
      </head>
      <body>
        <LoadingGate>
          <Header />
          <main>{children}</main>
          <Footer />
          <BottomHeader />
          <StickyCTA />
          <BackToTop />
        </LoadingGate>
      </body>
    </html>
  )
}

