import Link from 'next/link'
import Logo from '@/components/Logo'
import Container from '@/components/ui/Container'
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/brand'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-obsidian">
      <Container className="py-10 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          <div>
            <Link
              href="/"
              className="flex items-center gap-3 mb-4 hover:opacity-90 transition-opacity inline-block"
            >
              <Logo className="h-8 w-auto opacity-100" />
              <span className="text-base font-bold uppercase tracking-tight text-bone md:text-lg">
                {BRAND_NAME}
              </span>
            </Link>
            <p className="text-sm text-bone/60 leading-relaxed max-w-[240px]">
              {BRAND_TAGLINE}. Premium creative agency for institutions.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-bone/50 mb-3">
              Navigate
            </h4>
            <ul className="space-y-2 text-sm text-bone/70">
              <li><Link href="/" className="hover:text-bone transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-bone transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-bone transition-colors">Portfolio</Link></li>
              <li><Link href="/case-studies" className="hover:text-bone transition-colors">Case Studies</Link></li>
              <li><Link href="/about" className="hover:text-bone transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-bone transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-bone/50 mb-3">
              Connect
            </h4>
            <div className="space-y-2 text-sm text-bone/70">
              <p><a href="mailto:hello@yourdomain.com" className="hover:text-bone transition-colors">hello@yourdomain.com</a></p>
              <p><a href="tel:+1234567890" className="hover:text-bone transition-colors">+1 (234) 567-8900</a></p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[var(--line)] text-center text-[11px] uppercase tracking-wider text-bone/40">
          © {new Date().getFullYear()} {BRAND_NAME}
        </div>
      </Container>
    </footer>
  )
}
