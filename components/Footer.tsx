import Link from 'next/link'
import Logo from '@/components/Logo'
import Container from '@/components/ui/Container'
import {
  BRAND_NAME,
  BRAND_TAGLINE,
  BRAND_WORDMARK,
  CONTACT_EMAIL,
  CONTACT_ABN,
  SOCIAL_LINKS,
} from '@/lib/brand'

const NAV_COLUMN_ONE = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
]

const NAV_COLUMN_TWO = [
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden>
      <path d="M19.32 6.6a5.6 5.6 0 0 1-3.42-1.16 5.6 5.6 0 0 1-2.16-3.36h-3.3v12.66a2.66 2.66 0 1 1-2.66-2.66c.26 0 .5.04.74.1V8.86a5.94 5.94 0 1 0 5.22 5.9V9.78a8.86 8.86 0 0 0 5.58 1.94V8.4a5.6 5.6 0 0 1 0 0z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const SOCIALS = [
  { label: 'Instagram', href: SOCIAL_LINKS.instagram, icon: InstagramIcon },
  { label: 'TikTok', href: SOCIAL_LINKS.tiktok, icon: TikTokIcon },
  { label: 'Facebook', href: SOCIAL_LINKS.facebook, icon: FacebookIcon },
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, icon: LinkedinIcon },
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-obsidian">
      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* Brand column — logo at full footer height, tagline beneath */}
          <div className="md:col-span-5 lg:col-span-5">
            <Link
              href="/"
              className="group inline-flex items-center gap-5 transition-opacity hover:opacity-90"
              aria-label={`${BRAND_NAME} home`}
            >
              <span
                className="flex items-center justify-center"
                aria-hidden
              >
                <Logo className="h-32 w-auto md:h-40 lg:h-44 opacity-100" />
              </span>
              <span className="sr-only">{BRAND_NAME}</span>
              <span className="hidden text-3xl font-bold uppercase tracking-[0.18em] text-bone md:inline lg:text-4xl">
                {BRAND_WORDMARK}
              </span>
            </Link>
            <p className="mt-6 max-w-[360px] text-sm leading-relaxed text-bone/70 md:text-base">
              {BRAND_TAGLINE}
            </p>
          </div>

          {/* Navigation — split across two columns */}
          <nav
            className="md:col-span-4 lg:col-span-4"
            aria-label="Footer navigation"
          >
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-bone/45 mb-4">
              Navigate
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <ul className="space-y-3 text-sm text-bone/80">
                {NAV_COLUMN_ONE.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-bone"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 text-sm text-bone/80">
                {NAV_COLUMN_TWO.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-bone"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Contact column — email, ABN, socials */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-bone/45 mb-4">
              Connect
            </h4>
            <ul className="space-y-3 text-sm text-bone/80">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors hover:text-bone"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="text-bone/65">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-bone/45">
                  ABN
                </span>
                <span className="mt-0.5 inline-block tabular-nums">{CONTACT_ABN}</span>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3" aria-label="Social links">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone/75 transition-colors hover:border-bone/60 hover:text-bone focus:outline-none focus:ring-2 focus:ring-bone/40 focus:ring-offset-2 focus:ring-offset-obsidian"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--line)] text-center text-[11px] uppercase tracking-[0.15em] text-bone/40">
          © {new Date().getFullYear()} {BRAND_NAME} — All rights reserved
        </div>
      </Container>
    </footer>
  )
}
