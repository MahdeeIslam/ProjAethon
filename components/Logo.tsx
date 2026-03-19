'use client'

import { useState } from 'react'
import { LOGO_PATH } from '@/lib/brand'

export default function Logo({ className = 'h-8 w-auto' }: { className?: string }) {
  const [logoError, setLogoError] = useState(false)

  // Don't render logo if it errored or doesn't exist
  if (logoError || !LOGO_PATH) {
    return null
  }

  // Use regular img tag for both SVG and raster to support onError handler
  return (
    <img
      src={LOGO_PATH}
      alt=""
      className={className}
      onError={() => setLogoError(true)}
    />
  )
}
