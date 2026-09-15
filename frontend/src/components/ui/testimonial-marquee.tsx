import { BadgeCheck, CircleUser } from 'lucide-react'
import { useMemo } from 'react'
import { TESTIMONIALS } from '@/lib/data'
import { cn } from '@/lib/utils'

export type MarqueeCard = {
  name: string
  handle: string
  quote: string
}

const DEFAULT_DATA: MarqueeCard[] = TESTIMONIALS.map((item) => ({
  name: item.name,
  handle: item.role,
  quote: item.quote,
}))

function Card({ card }: { card: MarqueeCard }) {
  return (
    <article className="card mx-4 w-72 shrink-0 rounded-lg p-4 transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex gap-2">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-yellow">
          <CircleUser className="h-5 w-5" />
        </span>
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-1">
            <p className="truncate font-medium text-ink">{card.name}</p>
            <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
          </div>
          <span className="truncate text-xs text-ink-faint">{card.handle}</span>
        </div>
      </div>
      <p className="pt-4 text-sm text-ink-soft">“{card.quote}”</p>
    </article>
  )
}

function MarqueeRow({
  data,
  reverse = false,
}: {
  data: MarqueeCard[]
  reverse?: boolean
}) {
  const doubled = useMemo(() => [...data, ...data], [data])

  return (
    <div className="relative mx-auto w-full overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-bg to-transparent md:w-32" />
      <div
        className={cn(
          'animate-marquee flex min-w-[200%] transform-gpu hover:[animation-play-state:paused]',
          reverse ? 'pt-4 pb-8 [animation-direction:reverse]' : 'pt-8 pb-4',
        )}
      >
        {doubled.map((card, i) => (
          <Card key={`${card.name}-${i}`} card={card} />
        ))}
      </div>
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-bg to-transparent md:w-32" />
    </div>
  )
}

export default function TestimonialMarquee({
  row1 = DEFAULT_DATA,
  row2 = [...DEFAULT_DATA].reverse(),
}: {
  row1?: MarqueeCard[]
  row2?: MarqueeCard[]
}) {
  return (
    <div className="flex flex-col">
      <MarqueeRow data={row1} />
      <MarqueeRow data={row2} reverse />
    </div>
  )
}
