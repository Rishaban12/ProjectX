import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState('0')

  const numeric = parseInt(value.replace(/[^0-9]/g, ''), 10)
  const suffix = value.replace(/[0-9]/g, '')

  useEffect(() => {
    if (!inView || Number.isNaN(numeric)) {
      if (Number.isNaN(numeric)) setDisplay(value)
      return
    }
    const duration = 1200
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(Math.round(eased * numeric).toString())
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, numeric, value])

  return (
    <span ref={ref}>
      {display}
      {!Number.isNaN(numeric) ? suffix : ''}
    </span>
  )
}
