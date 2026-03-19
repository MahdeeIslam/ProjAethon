'use client'

import { useState, useEffect, useRef } from 'react'
import { organisations } from '@/data/organisations'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import Reveal from '@/components/motion/Reveal'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

// Animated counter component
function AnimatedCounter({ 
  value, 
  prefix = '', 
  suffix = '',
  duration = 2 
}: { 
  value: string | number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const shouldReduceMotion = useReducedMotion()

  // Extract numeric value and determine if it's a percentage, currency, or plain number
  const getNumericValue = (val: string | number): number => {
    if (typeof val === 'number') return val
    const cleaned = val.replace(/[^0-9.]/g, '')
    return parseFloat(cleaned) || 0
  }

  const numericValue = getNumericValue(value)
  const isPercentage = typeof value === 'string' && value.includes('%')
  const isCurrency = typeof value === 'string' && value.includes('$')
  const isDecimal = numericValue % 1 !== 0

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      setCount(numericValue)
      return
    }

    let startTime: number | null = null
    const startValue = 0
    const endValue = numericValue

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const elapsed = (currentTime - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startValue + (endValue - startValue) * eased
      
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(endValue)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, numericValue, duration, shouldReduceMotion, isDecimal])

  const formatValue = () => {
    if (isCurrency) {
      return `$${count.toFixed(isDecimal ? 1 : 0)}${suffix || 'M'}`
    }
    if (isPercentage) {
      return `${prefix || '+'}${count.toFixed(0)}${suffix || '%'}`
    }
    return `${prefix}${count.toFixed(isDecimal ? 1 : 0)}${suffix}`
  }

  return (
    <span ref={ref}>
      {shouldReduceMotion || !isInView ? value : formatValue()}
    </span>
  )
}

export default function ProofStack() {
  const metrics = [
    { value: '+340%', label: 'enquiries', prefix: '+', suffix: '%', numeric: 340, icon: '↑' },
    { value: '6', label: 'weeks to launch', prefix: '', suffix: '', numeric: 6, icon: '⚡' },
    { value: '$2.1M', label: 'pipeline influenced', prefix: '$', suffix: 'M', numeric: 2.1, icon: '💰' },
  ]

  const shouldReduceMotion = useReducedMotion()
  const duplicatedOrgs = [...organisations.slice(0, 6), ...organisations.slice(0, 6)]

  return (
    <Section className="relative overflow-hidden border-b border-bone/10 bg-gradient-to-b from-obsidian via-obsidian/98 to-obsidian py-28 md:py-36 lg:py-44">
      {/* Animated background particles - subtle */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-bone/3 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: 0,
            }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.05 }
                : {
                    opacity: [0.03, 0.1, 0.03],
                    scale: [1, 1.3, 1],
                  }
            }
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none" 
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(245,245,242,0.08) 30px, rgba(245,245,242,0.08) 60px)'
        }}
      />
      
      {/* Subtle radial gradient for depth */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(245,245,242,0.015) 0%, transparent 70%)'
        }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                opacity: [0.015, 0.03, 0.015],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <Container narrow>
        <div className="max-w-6xl mx-auto">
          {/* Trusted by text - Enhanced UI/UX */}
          <Reveal>
            <div className="mb-20 md:mb-24 lg:mb-28">
              <div className="flex flex-col items-center gap-8">
                {/* Icon/visual element */}
                <motion.div
                  className="flex items-center gap-2 opacity-60"
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: [1, 1.05, 1],
                        }
                  }
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="w-1 h-10 bg-bone/30" />
                  <div className="w-1 h-16 bg-bone/40" />
                  <div className="w-1 h-10 bg-bone/30" />
                </motion.div>
                
                {/* Main text with better hierarchy - Larger */}
                <div className="text-center">
                  <p className="text-base md:text-lg lg:text-xl xl:text-2xl uppercase tracking-[0.2em] opacity-80 text-center font-semibold mb-3">
                    Trusted by
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl uppercase tracking-[0.15em] opacity-95 text-center font-bold">
                    Institutions and High-Signal Teams
                  </p>
                </div>
                
                {/* Decorative line */}
                <div className="w-32 md:w-40 h-px bg-gradient-to-r from-transparent via-bone/25 to-transparent" />
              </div>
            </div>
          </Reveal>

          {/* Animated scrolling logo marquee - Clean and organized */}
          <Reveal delay={0.1}>
            <div className="relative mb-24 md:mb-28 lg:mb-32 overflow-hidden py-6">
              <div className="absolute inset-0 z-10 pointer-events-none">
                {/* Subtle gradient fade on edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 md:w-40 bg-gradient-to-r from-obsidian via-obsidian/90 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-32 md:w-40 bg-gradient-to-l from-obsidian via-obsidian/90 to-transparent" />
              </div>
              
              <motion.div
                className="flex gap-12 md:gap-16 lg:gap-20 items-center"
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        x: [0, -(organisations.slice(0, 6).length * 250)],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? {}
                    : {
                        x: {
                          repeat: Infinity,
                          repeatType: 'loop',
                          duration: 35,
                          ease: 'linear',
                        },
                      }
                }
              >
                {duplicatedOrgs.map((org, index) => (
                  <motion.div
                    key={`${org.id}-${index}`}
                    className="flex-shrink-0 opacity-30 hover:opacity-75 transition-opacity duration-500"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                  >
                    <div className="text-xs md:text-sm font-medium tracking-wide uppercase whitespace-nowrap px-5 py-2.5 border border-bone/12 hover:border-bone/35 transition-all duration-500 bg-obsidian/15 hover:bg-obsidian/35 hover-lift">
                      {org.name}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Reveal>

          {/* Clean divider with subtle animation */}
          <Reveal delay={0.15}>
            <div className="relative mb-20 md:mb-24 lg:mb-28">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-bone/15 to-transparent relative">
                {/* Subtle animated dots */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-bone/25 rounded-full"
                    style={{
                      left: `${20 + i * 20}%`,
                    }}
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: [1, 1.3, 1],
                            opacity: [0.25, 0.5, 0.25],
                          }
                    }
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Results snapshot with animated counters - Clean and organized */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 lg:gap-12">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  className="text-center group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
                >
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{
                      background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)'
                    }}
                  />
                  
                  <div className="relative border border-bone/12 p-10 md:p-12 lg:p-14 bg-obsidian/30 hover:bg-obsidian/50 hover:border-bone/30 transition-all duration-700 group-hover:shadow-xl group-hover:shadow-bone/5 hover-lift overflow-hidden">
                    {/* Animated border gradient on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: 'linear-gradient(45deg, transparent 30%, rgba(212,175,55,0.08) 50%, transparent 70%)',
                        backgroundSize: '200% 200%',
                      }}
                      animate={
                        shouldReduceMotion
                          ? {}
                          : {
                              backgroundPosition: ['0% 0%', '100% 100%'],
                            }
                      }
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'linear',
                      }}
                    />
                    
                    {/* Clean corner accents */}
                    <motion.div 
                      className="absolute top-0 left-0 w-10 h-10 border-t border-l border-bone/15 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={shouldReduceMotion ? {} : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-bone/15 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={shouldReduceMotion ? {} : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Icon indicator - subtle */}
                    <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-25 transition-opacity duration-500 text-xl">
                      {metric.icon}
                    </div>
                    
                    {/* Number with shimmer effect */}
                    <div className="overflow-hidden relative mb-4 md:mb-5">
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-15"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(245,245,242,0.25), transparent)',
                          transform: 'translateX(-100%)',
                        }}
                        animate={
                          shouldReduceMotion
                            ? {}
                            : {
                                translateX: ['-100%', '200%'],
                              }
                        }
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: 'easeInOut',
                        }}
                      />
                      <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold tracking-tight text-bone leading-[1.1] break-words relative z-10">
                        <AnimatedCounter 
                          value={metric.value}
                          prefix={metric.prefix}
                          suffix={metric.suffix}
                          duration={2.5}
                        />
                      </p>
                    </div>
                    
                    {/* Label with clean underline animation */}
                    <div className="relative">
                      <p className="text-xs md:text-sm uppercase tracking-[0.1em] opacity-70 font-medium relative inline-block">
                        {metric.label}
                        <motion.span
                          className="absolute bottom-0 left-0 h-px bg-bone/35"
                          initial={{ width: 0 }}
                          whileHover={shouldReduceMotion ? {} : { width: '100%' }}
                          transition={{ duration: 0.5 }}
                        />
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

