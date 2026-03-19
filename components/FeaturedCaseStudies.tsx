'use client'

import Link from 'next/link'
import { caseStudies } from '@/data/caseStudies'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'

export default function FeaturedCaseStudies() {
  // Get first 3 case studies
  const featured = caseStudies.slice(0, 3)
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative py-28 md:py-44 lg:py-52 bg-gradient-to-b from-obsidian/30 via-obsidian/25 to-obsidian/30 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-bone/4 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: 0,
            }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.05 }
                : {
                    opacity: [0.02, 0.12, 0.02],
                    scale: [1, 1.4, 1],
                  }
            }
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.008] pointer-events-none" 
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(245,245,242,0.08) 30px, rgba(245,245,242,0.08) 60px)'
        }}
      />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20 md:mb-24 lg:mb-28">
              <span className="text-xs md:text-sm uppercase tracking-[0.15em] opacity-70 mb-8 block font-medium">Case Studies</span>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 md:mb-10 tracking-tight">
                Featured Results
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl opacity-90 max-w-4xl mx-auto font-medium leading-relaxed">
                Real outcomes from premium creative work.
              </p>
            </div>
          </Reveal>

          <RevealGroup stagger={0.15} delay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {featured.map((study, index) => {
              const firstMetric = study.atAGlance[0]

              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.01 }}
                >
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="block border border-bone/12 hover:border-bone/35 transition-all duration-700 group hover-lift bg-obsidian/25 hover:bg-obsidian/40 relative overflow-hidden"
                  >
                    {/* Subtle glow effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                      style={{
                        background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)'
                      }}
                    />

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

                    {/* Image placeholder with creative effects */}
                    <div className="aspect-[4/3] bg-bone/5 relative overflow-hidden border-b border-bone/10 group-hover:border-bone/30 transition-colors duration-700">
                      {/* Animated gradient overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-obsidian/25 via-bone/5 to-obsidian/25 group-hover:from-obsidian/35 group-hover:via-bone/10 group-hover:to-obsidian/35 transition-all duration-700"
                        animate={
                          shouldReduceMotion
                            ? {}
                            : {
                                backgroundPosition: ['0% 0%', '100% 100%'],
                              }
                        }
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: 'easeInOut',
                        }}
                      />
                      
                      <div className="w-full h-full relative">
                        {/* Animated pattern */}
                        <motion.div 
                          className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-700" 
                          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(245,245,242,0.1) 10px, rgba(245,245,242,0.1) 20px)' }}
                          animate={
                            shouldReduceMotion
                              ? {}
                              : {
                                  backgroundPosition: ['0px 0px', '20px 20px'],
                                }
                          }
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                        
                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-20"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(245,245,242,0.3), transparent)',
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
                        
                        <p className="absolute inset-0 flex items-center justify-center text-xs opacity-30 group-hover:opacity-45 transition-opacity duration-700 uppercase tracking-wider z-10">
                          Gallery Plate
                        </p>
                      </div>
                    </div>

                    <div className="p-10 md:p-12 lg:p-14 relative">
                      {/* Decorative corner accents */}
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

                      {/* Tags from At A Glance */}
                      <div className="flex flex-wrap gap-2.5 mb-6">
                        {study.atAGlance?.slice(0, 2).map((item, tagIndex) => (
                          <motion.span
                            key={tagIndex}
                            className="text-xs uppercase tracking-[0.1em] opacity-65 border border-bone/18 px-3 py-1.5 bg-obsidian/30 group-hover:opacity-85 group-hover:border-bone/30 transition-all duration-500"
                            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                          >
                            {item.value} {item.label}
                          </motion.span>
                        ))}
                      </div>

                      {/* Title with hover effect */}
                      <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-5 tracking-tight group-hover:opacity-90 transition-opacity duration-500 leading-tight">
                        {study.title}
                      </h3>

                      {/* 1-line result with emphasis */}
                      {firstMetric && (
                        <div className="mb-6 relative">
                          <motion.p 
                            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight opacity-95 relative z-10"
                            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                          >
                            {firstMetric.value} {firstMetric.label}
                          </motion.p>
                          {/* Subtle underline animation */}
                          <motion.span
                            className="absolute bottom-0 left-0 h-px bg-bone/30"
                            initial={{ width: 0 }}
                            whileHover={shouldReduceMotion ? {} : { width: '100%' }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                      )}

                      {/* CTA link with icon animation */}
                      <div className="flex items-center gap-2 group/link">
                        <p className="text-sm md:text-base opacity-75 group-hover:opacity-100 transition-opacity duration-500 border-b border-bone/25 group-hover:border-bone/60 pb-1 inline-block font-medium">
                          Read case study
                        </p>
                        <motion.div
                          animate={
                            shouldReduceMotion
                              ? {}
                              : {
                                  x: [0, 4, 0],
                                }
                          }
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <ArrowRight size={16} className="opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </RevealGroup>

          {/* View all link with creative treatment */}
          <Reveal delay={0.4}>
            <div className="text-center mt-16 md:mt-20 lg:mt-24">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-3 text-base md:text-lg opacity-80 hover:opacity-100 transition-all duration-500 border-b border-bone/25 hover:border-bone/60 pb-1 group/link"
              >
                <span className="font-medium">View All Case Studies</span>
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          x: [0, 5, 0],
                        }
                  }
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <ArrowRight size={18} className="opacity-80 group-hover/link:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

