import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'
import { PROCESS } from '../lib/data'
import './how-we-work.css'

const HOLD = 0.68

function holdEase(raw: number, total: number) {
  const max = Math.max(total - 1, 1)
  const t = Math.min(Math.max(raw, 0), 1) * max
  if (t >= max) return max
  const index = Math.floor(t)
  const f = t - index
  if (f <= HOLD) return index
  const u = (f - HOLD) / (1 - HOLD)
  return index + u * u * (3 - 2 * u)
}

function Pane({
  index,
  slide,
  step,
}: {
  index: number
  slide: MotionValue<number>
  step: (typeof PROCESS)[number]
}) {
  const x = useTransform(slide, (c) => `${(index - c) * 100}%`)
  const opacity = useTransform(slide, (c) => {
    const offset = Math.abs(index - c)
    if (offset > 0.98) return 0
    return 1
  })
  const zIndex = useTransform(slide, (c) => Math.round(10 - Math.abs(index - c) * 4))

  return (
    <motion.article className="hww-pane" style={{ x, opacity, zIndex }}>
      <div className="hww-copy">
        <span className="hww-index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
      <div className="hww-visual">
        <img src={step.image} alt={step.imageAlt} />
      </div>
    </motion.article>
  )
}

export default function HowWeWorkCarousel({ children }: { children?: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  })
  const total = PROCESS.length
  const stepped = useTransform(scrollYProgress, (v) => holdEase(v, total))
  const slide = useSpring(stepped, { stiffness: 54, damping: 22, mass: 0.7, restDelta: 0.001 })
  const [active, setActive] = useState(0)

  useMotionValueEvent(slide, 'change', (value) => {
    setActive(Math.round(value))
  })

  const goTo = (index: number) => {
    const el = wrapRef.current
    if (!el) return
    const travel = el.offsetHeight - window.innerHeight
    const target = index === 0 ? 0 : index === total - 1 ? 1 : (index + HOLD * 0.25) / (total - 1)
    const top = el.getBoundingClientRect().top + window.scrollY + travel * target
    window.scrollTo({ top, behavior: 'smooth' })
  }

  if (reduced) {
    return (
      <div className="hww-static hs-wrap">
        {children}
        {PROCESS.map((step, i) => (
          <article key={step.title} className="hww-pane is-static">
            <div className="hww-copy">
              <span className="hww-index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            <div className="hww-visual">
              <img src={step.image} alt={step.imageAlt} />
            </div>
          </article>
        ))}
      </div>
    )
  }

  return (
    <div ref={wrapRef} className="hww-pin" style={{ height: `${total * 160}vh` }}>
      <div className="hww-sticky">
        {children}
        <div className="hs-wrap hww-stage-wrap">
          <div className="hww-stage" aria-label="How we work steps">
            {PROCESS.map((step, i) => (
              <Pane key={step.title} index={i} slide={slide} step={step} />
            ))}
          </div>
          <div className="hww-dots" role="tablist" aria-label="Process steps">
            {PROCESS.map((step, i) => (
              <button
                key={step.title}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={step.title}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
