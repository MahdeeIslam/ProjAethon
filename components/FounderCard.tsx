'use client'

import { useState } from 'react'
import { Founder } from '@/data/founders'
import { motion } from 'framer-motion'
import Kicker from '@/components/ui/Kicker'

interface FounderCardProps {
  founder: Founder
}

export default function FounderCard({ founder }: FounderCardProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="border border-bone/12 p-8 md:p-10 lg:p-12 hover:border-bone/30 transition-all duration-700 group bg-obsidian/20 hover:bg-obsidian/30 hover-lift">
      {/* Founder image - Enhanced */}
      <div className="aspect-square bg-bone/5 mb-8 relative overflow-hidden border border-bone/10 group-hover:border-bone/25 transition-all duration-700">
        {founder.image && !imageError ? (
          <>
            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-obsidian/30 via-bone/5 to-obsidian/30">
                <span className="text-xs tracking-wider uppercase opacity-40">{founder.name}</span>
              </div>
            )}
            <img
              src={founder.image}
              alt={founder.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } group-hover:scale-105`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true)
                setImageLoaded(false)
              }}
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-obsidian/30 via-bone/5 to-obsidian/30">
            <span className="text-xs tracking-wider uppercase opacity-50">{founder.name}</span>
          </div>
        )}
      </div>
      
      <Kicker className="mb-5 opacity-75 group-hover:opacity-95 transition-opacity duration-500">{founder.role}</Kicker>
      <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight group-hover:opacity-90 transition-opacity duration-500">{founder.name}</h3>
      
      <div className="space-y-4 text-base md:text-lg leading-relaxed opacity-95 group-hover:opacity-100 transition-opacity duration-500">
        {founder.credibility.map((line, index) => (
          <p key={index} className="font-medium">{line}</p>
        ))}
      </div>
    </div>
  )
}
