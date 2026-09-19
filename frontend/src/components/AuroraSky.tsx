import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

type Speck = {
  x: number
  y: number
  r: number
  twinkle: number
  phase: number
  vx: number
  vy: number
  trail: number
}

export default function AuroraSky() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let specks: Speck[] = []
    let time = 0
    let frame = 0
    let visible = true

    const spawn = (fromTop: boolean): Speck => {
      const asteroid = Math.random() < 0.14
      return {
        x: Math.random() * width * 1.15 - width * 0.08,
        y: fromTop ? -Math.random() * 80 : Math.random() * height,
        r: asteroid ? 1.2 + Math.random() * 1.1 : 0.35 + Math.random() * 0.85,
        twinkle: asteroid ? 0.82 : 0.32 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        vx: 0.12 + Math.random() * 0.22,
        vy: asteroid ? 0.55 + Math.random() * 0.45 : 0.12 + Math.random() * 0.22,
        trail: asteroid ? 18 + Math.random() * 22 : 0,
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.floor(wrap.clientWidth))
      height = Math.max(1, Math.floor(wrap.clientHeight))
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((width * height) / 1600)
      specks = Array.from({ length: Math.max(70, count) }, () => spawn(false))
    }

    const wrapSpeck = (speck: Speck) => {
      if (speck.y > height + 30 || speck.x > width + 30) {
        Object.assign(speck, spawn(true))
      }
    }

    const paint = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height)
      for (const speck of specks) {
        const pulse = animate
          ? speck.twinkle * (0.45 + 0.55 * (0.5 + 0.5 * Math.sin(time * 1.4 + speck.phase)))
          : speck.twinkle * 0.7

        if (speck.trail > 0) {
          const gradient = ctx.createLinearGradient(
            speck.x - speck.vx * speck.trail,
            speck.y - speck.vy * speck.trail,
            speck.x,
            speck.y,
          )
          gradient.addColorStop(0, 'rgba(255,255,255,0)')
          gradient.addColorStop(1, `rgba(255,255,255,${pulse * 0.55})`)
          ctx.strokeStyle = gradient
          ctx.lineWidth = Math.max(0.7, speck.r * 0.7)
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(speck.x - speck.vx * speck.trail, speck.y - speck.vy * speck.trail)
          ctx.lineTo(speck.x, speck.y)
          ctx.stroke()
        }

        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, pulse)})`
        ctx.arc(speck.x, speck.y, speck.r, 0, Math.PI * 2)
        ctx.fill()

        if (animate) {
          speck.x += speck.vx
          speck.y += speck.vy
          wrapSpeck(speck)
        }
      }
    }

    const tick = () => {
      if (!visible) return
      time += 0.016
      paint(true)
      frame = requestAnimationFrame(tick)
    }

    resize()
    paint(!reduced)

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (reduced) return
        if (visible) frame = requestAnimationFrame(tick)
        else cancelAnimationFrame(frame)
      },
      { threshold: 0.05 },
    )
    observer.observe(wrap)
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    if (!reduced) frame = requestAnimationFrame(tick)

    return () => {
      visible = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      ro.disconnect()
    }
  }, [reduceMotion])

  return (
    <div ref={wrapRef} className="hs-aurora-sky" aria-hidden="true">
      <div className="hs-aurora-dusk" />
      <div className="hs-aurora-veil" />
      <canvas ref={canvasRef} className="hs-aurora-stars" />
    </div>
  )
}
