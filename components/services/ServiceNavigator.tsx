'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { SERVICE_NAV_ITEMS } from '@/data/servicesPage'

const CONTAINER_MAX = 'max-w-[1120px]'

export default function ServiceNavigator() {
  const [activeId, setActiveId] = useState<string | null>(SERVICE_NAV_ITEMS[0].id)
  const [isStuck, setIsStuck] = useState(false)
  const pillsRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sections = SERVICE_NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[]
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const id = entry.target.getAttribute('id')
          if (id) setActiveId(id)
        }
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: 0 }
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isStuck || !pillsRef.current) return
    const activeEl = pillsRef.current.querySelector('[data-active="true"]')
    activeEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeId, isStuck])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div ref={sentinelRef} className="h-px" aria-hidden />
      {isStuck && <div className="h-[72px] md:h-20" aria-hidden />}
      <div
        className={`border-b border-bone/10 bg-obsidian transition-all duration-200 ${
          isStuck ? 'fixed left-0 right-0 top-0 z-40 border-bone/10 bg-obsidian/92 backdrop-blur-md' : 'relative'
        }`}
      >
        <div className={`mx-auto w-full ${CONTAINER_MAX} px-6 py-3 md:px-10 md:py-4`}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-bone/65">
            Choose a service
          </p>
          <div
            ref={pillsRef}
            className="services-nav-pills-edge flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap md:snap-none"
            style={{ scrollPaddingLeft: 24, scrollPaddingRight: 24 }}
          >
            {SERVICE_NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                data-active={activeId === item.id ? 'true' : undefined}
                onClick={() => handleClick(item.id)}
                className={`shrink-0 snap-center rounded-full border px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-bone/30 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian motion-reduce:transition-none ${
                  activeId === item.id
                    ? 'border-bone/35 bg-bone/12 text-bone'
                    : 'border-bone/15 text-bone/75 hover:border-bone/25 hover:text-bone/95'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
