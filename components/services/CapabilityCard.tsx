interface CapabilityCardProps {
  title: string
  description: string
  tag?: string
}

export default function CapabilityCard({ title, description, tag }: CapabilityCardProps) {
  return (
    <div className="group rounded-2xl border border-bone/10 bg-bone/[0.02] p-5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-bone/20 hover:bg-bone/[0.04] hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {tag && (
        <span className="text-xs font-medium uppercase tracking-wider text-bone/55">
          {tag}
        </span>
      )}
      <h4 className="mt-1.5 line-clamp-2 text-base font-bold tracking-tight text-bone">
        {title}
      </h4>
      <p className="mt-1.5 max-w-[42ch] text-sm leading-relaxed text-bone/80">
        {description}
      </p>
    </div>
  )
}
