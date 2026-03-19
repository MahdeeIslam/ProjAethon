'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import CTAButton from './CTAButton'
import Logo from './Logo'
import { Menu, X } from 'lucide-react'
import Container from '@/components/ui/Container'
import { BRAND_NAME } from '@/lib/brand'

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[rgba(26,26,26,0.72)] backdrop-blur-[12px] border-b border-[var(--line)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="h-14 md:h-16 flex items-center">
        <Container className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity group shrink-0"
          >
            <Logo className="h-8 w-auto md:h-9 flex-shrink-0 opacity-100" />
            <span className="text-base md:text-lg font-bold uppercase tracking-tight text-bone">
              {BRAND_NAME}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-3 px-2 text-[13px] font-medium tracking-[0.14em] uppercase transition-colors ${
                  pathname === link.href ? 'text-bone' : 'text-bone/70 hover:text-bone'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-2 left-2 right-2 h-px bg-bone/40" />
                )}
              </Link>
            ))}
            <div className="ml-4 pl-6 border-l border-[var(--line)]">
              <CTAButton compact />
            </div>
          </div>

          <button
            className="lg:hidden p-2 opacity-70 hover:opacity-100 transition-opacity"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </Container>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--line)] bg-obsidian/95 backdrop-blur-md z-50">
          <Container className="py-5 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium tracking-wide ${
                  pathname === link.href
                    ? 'opacity-100 border-l-2 border-accent pl-4'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[var(--line)]">
              <CTAButton variant="primary" />
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
