'use client'

import { motion, useReducedMotion } from 'framer-motion'
import CTAButton from './CTAButton'
import Reveal from './motion/Reveal'

interface MicroCTAProps {
  prompt: string
  className?: string
}

export default function MicroCTA({ prompt, className = '' }: MicroCTAProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Subtle background effect */}
      <div className="absolute inset-0 opacity-[0.005] pointer-events-none" 
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(245,245,242,0.08) 30px, rgba(245,245,242,0.08) 60px)'
        }}
      />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <Reveal>
          <div className="max-w-6xl mx-auto">
            {/* Elegant divider */}
            <div className="relative mb-12 md:mb-16">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-bone/15 to-transparent relative">
                {/* Subtle animated dots */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-bone/25 rounded-full"
                    style={{
                      left: `${30 + i * 35}%`,
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

            {/* CTA Content */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 pb-12 md:pb-16">
              {/* Prompt text - Enhanced */}
              <div className="flex-1">
                <motion.p 
                  className="text-xl md:text-2xl lg:text-3xl opacity-90 font-medium leading-relaxed"
                  whileHover={shouldReduceMotion ? {} : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {prompt}
                </motion.p>
              </div>

              {/* CTA Button - Enhanced */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <CTAButton variant="primary" />
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

