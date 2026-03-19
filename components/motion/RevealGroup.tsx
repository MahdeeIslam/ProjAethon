'use client'

import { ReactNode, Children, useEffect, useRef, useState, cloneElement, isValidElement } from 'react'

interface RevealGroupProps {
  children: ReactNode
  stagger?: number // Delay between each child (in seconds)
  delay?: number // Initial delay before first child
  duration?: number
  offset?: string
  once?: boolean
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  /** Vertical distance in px for up/down direction (default 10) */
  yOffset?: number
  className?: string
}

export default function RevealGroup({
  children,
  stagger = 0.08,
  delay = 0,
  duration = 0.7,
  offset = '-50px',
  once = true,
  direction = 'up',
  yOffset = 10,
  className = '',
}: RevealGroupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      setShouldAnimate(false)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      {
        rootMargin: offset,
        threshold: 0.1,
      }
    )

    const currentContainer = containerRef.current
    if (currentContainer) {
      observer.observe(currentContainer)
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer)
      }
    }
  }, [offset, once])

  const getTransform = () => {
    if (!shouldAnimate || isVisible) return 'translateY(0) translateX(0)'
    
    switch (direction) {
      case 'up':
        return `translateY(${yOffset}px)`
      case 'down':
        return `translateY(-${yOffset}px)`
      case 'left':
        return 'translateX(20px)'
      case 'right':
        return 'translateX(-20px)'
      default:
        return 'translateY(0) translateX(0)'
    }
  }

  // Wrap children in divs with stagger delay
  const childrenArray = Children.toArray(children)
  const staggeredChildren = childrenArray.map((child, index) => {
    const childDelay = delay + index * stagger
    const childKey = isValidElement(child) && child.key ? child.key : index

    return (
      <div
        key={childKey}
        style={{
          opacity: shouldAnimate && !isVisible ? 0 : 1,
          transform: getTransform(),
          transition: shouldAnimate
            ? `opacity ${duration}s ease-out ${childDelay}s, transform ${duration}s ease-out ${childDelay}s`
            : 'none',
          willChange: shouldAnimate && !isVisible ? 'opacity, transform' : 'auto',
        }}
      >
        {child}
      </div>
    )
  })

  return (
    <div ref={containerRef} className={className}>
      {staggeredChildren}
    </div>
  )
}

