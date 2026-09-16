import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const WEAK = [
  'Worked on various projects and tasks as needed',
  'Team player with good communication skills',
  'Familiar with computers, MS Office and internet',
]

const STRONG = [
  'Shipped 4 client sites — 38% faster load times',
  'ATS-mapped resume + LinkedIn for target roles',
  'Built AI-assisted reporting used in viva defense',
]

const SKILLS = [
  { label: 'ATS keywords', after: 92 },
  { label: 'Quantified impact', after: 86 },
  { label: 'AI-tool fluency', after: 80 },
]

export default function ResumeStudioDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-80px' })
  const [rewritten, setRewritten] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [score, setScore] = useState(48)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setRewritten(true)
      setScore(92)
      return
    }
    if (!inView) return

    let cancelled = false
    const timers: number[] = []
    let raf = 0

    const runScore = () => {
      const start = performance.now()
      const tick = (now: number) => {
        if (cancelled) return
        const t = Math.min((now - start) / 900, 1)
        setScore(Math.round(48 + 44 * (1 - (1 - t) ** 3)))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const cycle = () => {
      if (cancelled) return
      setRewritten(false)
      setScore(48)
      setScanning(true)
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return
          setScanning(false)
          setRewritten(true)
          runScore()
        }, 2400),
      )
      timers.push(window.setTimeout(cycle, 7600))
    }

    cycle()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      cancelAnimationFrame(raf)
    }
  }, [inView])

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-line bg-white p-5 sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-[11px] font-medium tracking-[0.16em] text-ink-faint uppercase">Live rewrite</p>
        <span className="rounded-sm bg-yellow px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-ink uppercase">
          {rewritten ? 'ATS ready' : 'Scanning'}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-line bg-white p-5 sm:p-6">
        {scanning && (
          <span className="resume-scan-line pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-yellow/0 via-yellow/50 to-yellow/0" />
        )}

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-lg font-bold text-ink">Priya Menon</p>
            <p className="mt-0.5 text-xs text-ink-soft">
              {rewritten ? 'Product Engineer · AI-adapted workflows' : 'Looking for opportunities'}
            </p>
          </div>
          <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full border-2 border-yellow bg-white">
            <span className="font-display text-xl font-bold leading-none text-ink">{score}</span>
            <span className="mt-0.5 text-[9px] font-medium tracking-[0.12em] text-ink-faint uppercase">ATS</span>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2.5">
          {SKILLS.map((skill) => (
            <div key={skill.label}>
              <div className="mb-1 flex items-center justify-between text-[11px] text-ink-soft">
                <span>{skill.label}</span>
                <span>{rewritten ? skill.after : Math.round(skill.after * 0.42)}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-line">
                <motion.div
                  className="h-full origin-left rounded-full bg-yellow"
                  animate={{ width: rewritten ? `${skill.after}%` : `${Math.round(skill.after * 0.42)}%` }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-[10px] font-medium tracking-[0.16em] text-ink-faint uppercase">Experience</p>
        <ul className="mt-2 flex min-h-[5.5rem] flex-col gap-2">
          <AnimatePresence mode="wait">
            {(rewritten ? STRONG : WEAK).map((line) => (
              <motion.li
                key={line}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.28 }}
                className={`text-sm leading-snug ${rewritten ? 'text-ink' : 'text-ink-faint'}`}
              >
                {rewritten && <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-yellow" />}
                {line}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  )
}
