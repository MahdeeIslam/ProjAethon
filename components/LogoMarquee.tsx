'use client'

import { organisations } from '@/data/organisations'
import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'

export default function LogoMarquee() {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...organisations, ...organisations]
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="overflow-hidden border-y border-bone/5 bg-obsidian/50">
      <Container className="py-12 md:py-16">
        <motion.div
          className="flex gap-16 md:gap-24 items-center"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, -(organisations.length * 250)],
                }
          }
          transition={
            shouldReduceMotion
              ? {}
              : {
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 40,
                    ease: 'linear',
                  },
                }
          }
        >
          {duplicatedLogos.map((org, index) => (
            <div
              key={`${org.id}-${index}`}
              className="flex-shrink-0 opacity-30 hover:opacity-50 transition-opacity duration-300"
            >
              {/* Placeholder for logo - replace with actual logo component */}
              <div className="w-40 md:w-48 h-16 flex items-center justify-center text-xs font-medium tracking-wide uppercase">
                {org.name}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </div>
  )
}
