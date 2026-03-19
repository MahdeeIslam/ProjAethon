'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '@/data/testimonials'
import Container from '@/components/ui/Container'

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="relative py-12">
      <Container narrow>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif mb-12 leading-relaxed opacity-100 font-bold">
              &ldquo;{currentTestimonial.quote}&rdquo;
            </blockquote>
            <div className="mt-10">
              <p className="font-bold text-xl md:text-2xl mb-2 opacity-100">{currentTestimonial.name}</p>
              <p className="text-sm md:text-base opacity-70 tracking-wide uppercase font-medium">
                {currentTestimonial.role}, {currentTestimonial.organization}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <button
          onClick={goToPrevious}
          onKeyDown={(e) => e.key === 'Enter' && goToPrevious()}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 border border-bone/20 hover:border-bone/40 bg-obsidian/60 backdrop-blur-sm hover:bg-obsidian/80 transition-all duration-300 opacity-70 hover:opacity-100"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={goToNext}
          onKeyDown={(e) => e.key === 'Enter' && goToNext()}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 border border-bone/20 hover:border-bone/40 bg-obsidian/60 backdrop-blur-sm hover:bg-obsidian/80 transition-all duration-300 opacity-70 hover:opacity-100"
          aria-label="Next testimonial"
        >
          <ChevronRight size={18} />
        </button>

        {/* Indicator Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              onKeyDown={(e) => e.key === 'Enter' && setCurrentIndex(index)}
              className={`transition-all duration-300 ${
                index === currentIndex ? 'w-8 h-1 bg-bone' : 'w-1.5 h-1.5 rounded-full bg-bone/30 hover:bg-bone/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}
