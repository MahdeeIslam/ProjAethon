import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Request a strategic consultation. We accept a limited number of partners per quarter.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

