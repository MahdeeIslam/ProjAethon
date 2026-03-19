import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#1A1A1A',
        bone: '#F5F5F2',
        accent: '#D4AF37', // Subtle gold accent for CTAs
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      spacing: {
        'section': '8rem',
        'section-sm': '4rem',
      },
    },
  },
  plugins: [],
}
export default config

