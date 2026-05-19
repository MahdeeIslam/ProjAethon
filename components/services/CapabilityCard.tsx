interface CapabilityCardProps {
  title: string
}

export default function CapabilityCard({ title }: CapabilityCardProps) {
  return (
    <div className="rounded-2xl border border-bone/10 bg-bone/[0.02] p-5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-bone/20 hover:bg-bone/[0.04] hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <h4 className="text-base font-bold tracking-tight text-bone md:text-lg">
        {title}
      </h4>
    </div>
  )
}
