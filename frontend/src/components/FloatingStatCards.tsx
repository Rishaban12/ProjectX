import { motion } from 'framer-motion'

type FloatingCard = {
  big: string
  small: string
  logo?: string
  className: string
  style: { top?: string; bottom?: string; left?: string; right?: string; rotate: number }
  duration: number
  delay: number
}

const CARDS: FloatingCard[] = [
  {
    big: '100%',
    small: 'built around you',
    className: 'bg-yellow-100',
    style: { top: '18%', left: '26%', rotate: -6 },
    duration: 7,
    delay: 0,
  },
  {
    big: 'Faster',
    small: 'with intelligent engineering',
    className: 'bg-cyan-100',
    style: { top: '14%', right: '24%', rotate: 4 },
    duration: 8,
    delay: 1.2,
  },
  {
    big: 'Scalable',
    small: 'technology by design',
    className: 'bg-pink-100',
    style: { bottom: '26%', left: '20%', rotate: -4 },
    duration: 9,
    delay: 2.4,
  },
  {
    big: 'Any Business',
    small: 'any technology need',
    className: 'bg-emerald-100',
    style: { bottom: '28%', right: '22%', rotate: 5 },
    duration: 7.5,
    delay: 0.8,
  },
  {
    big: 'AI + Software',
    small: 'engineered together',
    className: 'bg-violet-100',
    style: { bottom: '10%', left: '42%', rotate: -2 },
    duration: 8.5,
    delay: 3.2,
  },
]

export default function FloatingStatCards() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {CARDS.map((card, i) => (
        <motion.div
          key={i}
          className={`absolute w-40 rounded-2xl p-5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)] ${card.className}`}
          style={{
            top: card.style.top,
            bottom: card.style.bottom,
            left: card.style.left,
            right: card.style.right,
            rotate: card.style.rotate,
          }}
          animate={{
            filter: ['blur(7px)', 'blur(0px)', 'blur(0px)', 'blur(7px)'],
            opacity: [0.45, 1, 1, 0.45],
          }}
          transition={{
            duration: card.duration,
            repeat: Infinity,
            repeatType: 'loop',
            delay: card.delay,
            ease: 'easeInOut',
            times: [0, 0.35, 0.65, 1],
          }}
        >
          <p className="font-display text-3xl font-bold text-ink">{card.big}</p>
          <p className="mt-1 text-xs text-ink-soft">{card.small}</p>
          {card.logo && <p className="mt-8 text-sm font-semibold text-ink/70">{card.logo}</p>}
        </motion.div>
      ))}
    </div>
  )
}
