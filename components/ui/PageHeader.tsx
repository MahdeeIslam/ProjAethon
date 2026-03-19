import Logo from '@/components/Logo'
import { BRAND_NAME } from '@/lib/brand'

interface PageHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export default function PageHeader({ title, subtitle, className = '' }: PageHeaderProps) {
  return (
    <div className={`mb-16 md:mb-20 ${className}`}>
      <div className="flex items-center gap-5 mb-10 justify-center">
        <Logo className="h-16 md:h-20 lg:h-24 w-auto opacity-100" />
        <span className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight opacity-90">{BRAND_NAME}</span>
      </div>
      <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 text-center tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl opacity-80 text-center leading-relaxed max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}

