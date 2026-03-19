'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  offset?: string // rootMargin for IntersectionObserver
  once?: boolean
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  offset = '-50px',
  once = true,
  direction = 'up',
  className = '',
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const elementRef = useRef<HTMLDivElement>(null)

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

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [offset, once])

  const getTransform = () => {
    if (!shouldAnimate || isVisible) return 'translateY(0) translateX(0)'
    
    switch (direction) {
      case 'up':
        return 'translateY(10px)'
      case 'down':
        return 'translateY(-20px)'
      case 'left':
        return 'translateX(20px)'
      case 'right':
        return 'translateX(-20px)'
      default:
        return 'translateY(0) translateX(0)'
    }
  }

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: shouldAnimate && !isVisible ? 0 : 1,
        transform: getTransform(),
        transition: shouldAnimate
          ? `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`
          : 'none',
        willChange: shouldAnimate && !isVisible ? 'opacity, transform' : 'auto',
      }}
    >
      {children}
    </div>
  )
}

