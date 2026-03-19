'use client'

import { portfolioItems } from '@/data/portfolioLegacy'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/motion/Reveal'
import RevealGroup from '@/components/motion/RevealGroup'

export default function FeaturedWorkFeed() {
  // Featured projects (first 8 items for editorial feed)
  const featuredProjects = portfolioItems.slice(0, 8)
  const shouldReduceMotion = useReducedMotion()

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      institutional: 'Institutional',
      impact: 'Impact',
      signature: 'Signature',
    }
    return labels[category] || category
  }

  const getCategoryShort = (category: string) => {
    const shorts: Record<string, string> = {
      institutional: 'I',
      impact: 'Im',
      signature: 'Si',
    }
    return shorts[category] || category.charAt(0).toUpperCase()
  }

  return (
    <section className="relative py-28 md:py-44 lg:py-52 bg-gradient-to-b from-obsidian/20 via-obsidian/15 to-obsidian/20 overflow-hidden">
      {/* Subtle background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
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
                    opacity: [0.02, 0.1, 0.02],
                    scale: [1, 1.3, 1],
                  }
            }
            transition={{
              duration: 6 + Math.random() * 2,
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
            <div className="mb-20 md:mb-24 lg:mb-28">
              <span className="text-xs md:text-sm uppercase tracking-[0.15em] opacity-70 mb-8 block text-center font-medium">Portfolio</span>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 md:mb-10 tracking-tight text-center">
                Featured Work
              </h2>
              <p className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto text-center font-medium leading-relaxed">
                Curated selection of premium creative projects.
              </p>
            </div>
          </Reveal>

          {/* Vertical feed of featured projects - Enhanced */}
          <RevealGroup stagger={0.1} delay={0.2} className="space-y-0">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
              >
                <Link
                  href={`/portfolio#${project.id}`}
                  className="block group relative"
                >
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{
                      background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)'
                    }}
                  />

                  <div className="flex flex-col md:flex-row gap-10 md:gap-16 py-14 md:py-20 border-b border-bone/10 last:border-b-0 group-hover:border-bone/25 transition-colors duration-700 relative">
                    {/* Large image plate with effects */}
                    <div className="md:w-2/3 aspect-[16/10] bg-bone/5 relative overflow-hidden border border-bone/12 group-hover:border-bone/30 transition-all duration-700 hover-lift">
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
                          className="absolute inset-0 opacity-0 group-hover:opacity-15"
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

                    {/* Project info - Enhanced */}
                    <div className="md:w-1/3 flex flex-col justify-center relative">
                      {/* Decorative corner accent */}
                      <motion.div 
                        className="absolute top-0 right-0 w-8 h-8 border-t border-r border-bone/15 opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0 }}
                        whileHover={shouldReduceMotion ? {} : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />

                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs uppercase tracking-[0.1em] opacity-65 font-semibold px-3 py-1 border border-bone/15 bg-obsidian/20">
                          {getCategoryShort(project.category)}
                        </span>
                        <span className="text-xs opacity-40">•</span>
                        <span className="text-xs opacity-65 font-medium">{project.year}</span>
                      </div>
                      
                      <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-5 tracking-tight group-hover:opacity-90 transition-opacity duration-500 leading-tight">
                        {project.title}
                      </h3>
                      
                      <p className="text-base md:text-lg lg:text-xl opacity-85 mb-6 leading-relaxed font-medium">
                        {project.results}
                      </p>
                      
                      <div className="flex flex-wrap gap-2.5 mt-4">
                        <motion.span 
                          className="text-xs uppercase tracking-[0.1em] opacity-70 border border-bone/18 px-3 py-1.5 bg-obsidian/20 group-hover:opacity-85 group-hover:border-bone/30 transition-all duration-500"
                          whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                        >
                          {getCategoryLabel(project.category)}
                        </motion.span>
                        <motion.span 
                          className="text-xs uppercase tracking-[0.1em] opacity-70 border border-bone/18 px-3 py-1.5 bg-obsidian/20 group-hover:opacity-85 group-hover:border-bone/30 transition-all duration-500"
                          whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                        >
                          {project.client}
                        </motion.span>
                      </div>

                      {/* View indicator */}
                      <div className="flex items-center gap-2 mt-6 opacity-0 group-hover:opacity-70 transition-opacity duration-500">
                        <span className="text-xs uppercase tracking-wider">View Project</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </RevealGroup>

          {/* View all link - Enhanced */}
          <Reveal delay={0.3}>
            <div className="mt-20 md:mt-24 lg:mt-28 text-center">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-3 text-base md:text-lg opacity-80 hover:opacity-100 transition-all duration-500 border-b border-bone/25 hover:border-bone/60 pb-1 group/link font-medium"
              >
                <span>View All Work</span>
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

