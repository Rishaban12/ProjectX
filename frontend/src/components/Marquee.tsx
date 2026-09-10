export default function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-line bg-surface py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />
      <div className="animate-marquee flex w-max gap-16">
        {loop.map((item, i) => (
          <span
            key={i}
            className="font-display flex items-center gap-3 text-lg font-semibold whitespace-nowrap text-ink-faint"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue/50" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
