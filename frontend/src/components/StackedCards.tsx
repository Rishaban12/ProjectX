import { motion, useScroll, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { useRef } from 'react'
import type { Track } from '../lib/data'

function StackedCard({
  track,
  index,
  total,
}: {
  track: Track
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.2', 'end 0.2'],
  })

  const isLast = index === total - 1
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.92])
  const opacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, isLast ? 1 : 0.6])

  const Icon = track.icon
  const top = `calc(7rem + ${index * 16}px)`

  return (
    <article
      ref={ref}
      style={{ top, zIndex: index + 1 }}
      className={isLast ? 'sticky' : 'sticky mb-[38vh]'}
    >
      <motion.div
        style={{ scale, opacity, transformOrigin: 'top center' }}
        className="mx-auto w-full max-w-3xl"
      >
        <div className="card flex flex-col gap-5 rounded-2xl p-7 sm:p-9">
          <div className="flex items-center justify-between gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line text-ink-soft">
              <Icon className="h-6 w-6" />
            </span>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink-faint">
                {track.level}
              </span>
              <span className="font-mono text-xs text-ink-faint">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>
          <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">{track.title}</h3>
          <p className="max-w-2xl text-sm text-ink-soft sm:text-base">{track.description}</p>
          <ul className="mt-auto grid grid-cols-1 gap-2 border-t border-line pt-4 sm:grid-cols-2">
            {track.topics.map((topic) => (
              <li key={topic} className="flex items-center gap-2 text-sm text-ink-faint">
                <Check className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </article>
  )
}

export default function StackedCards({ tracks }: { tracks: Track[] }) {
  return (
    <div className="relative pb-8">
      {tracks.map((track, i) => (
        <StackedCard key={track.title} track={track} index={i} total={tracks.length} />
      ))}
    </div>
  )
}
