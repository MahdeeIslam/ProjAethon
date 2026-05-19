import Reveal from '@/components/motion/Reveal'
import { getHorizontalPhoto } from '@/data/placeholderPhotos'

const CONTAINER_MAX = 'max-w-[1440px]'

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden border-b border-bone/10 bg-obsidian py-20 md:py-28 lg:py-36">
      {/* Background photo */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.22]"
        style={{ backgroundImage: `url(${getHorizontalPhoto(2)})` }}
        aria-hidden
      />
      {/* Tone-down gradient over photo */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/50 to-obsidian"
        aria-hidden
      />
      {/* Subtle film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className={`relative mx-auto w-full ${CONTAINER_MAX} px-6 md:px-10`}>
        <Reveal>
          <div className="max-w-[80ch]">
            <h1 className="mb-6 text-4xl font-bold uppercase leading-[1.05] tracking-tight text-bone md:text-6xl lg:text-7xl">
              Services
            </h1>
            <p className="text-xl font-medium leading-snug text-bone/95 md:text-2xl lg:text-3xl">
              Content, brand and growth, built around what actually moves audiences.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
