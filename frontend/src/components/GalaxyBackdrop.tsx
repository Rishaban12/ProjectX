import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  r: number
  twinkle: number
  speed: number
  phase: number
}

type Meteor = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
}

export default function GalaxyBackdrop() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let stars: Star[] = []
    let meteor: Meteor | null = null
    let time = 0
    let frame = 0
    let visible = true

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round((width * height) / 900)
      stars = Array.from({ length: Math.max(140, count) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() < 0.14 ? 1.55 : Math.random() * 1.05 + 0.28,
        twinkle: 0.35 + Math.random() * 0.65,
        speed: 0.55 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const spawnMeteor = () => {
      meteor = {
        x: width * (0.05 + Math.random() * 0.65),
        y: height * Math.random() * 0.4,
        vx: 3.4 + Math.random() * 2.2,
        vy: 1.5 + Math.random() * 1.1,
        life: 1,
      }
    }

    const paintStars = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height)

      for (const star of stars) {
        const alpha = animate
          ? star.twinkle * (0.4 + 0.6 * Math.sin(time * star.speed + star.phase))
          : star.twinkle * 0.75
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fill()

        if (star.r > 1.25) {
          ctx.beginPath()
          ctx.fillStyle = `rgba(186, 210, 255, ${alpha * 0.22})`
          ctx.arc(star.x, star.y, star.r * 3.4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (animate && meteor) {
        meteor.x += meteor.vx
        meteor.y += meteor.vy
        meteor.life -= 0.014
        const tailX = meteor.x - meteor.vx * 9
        const tailY = meteor.y - meteor.vy * 9
        const gradient = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y)
        gradient.addColorStop(0, 'rgba(255,255,255,0)')
        gradient.addColorStop(1, `rgba(255, 226, 170, ${Math.max(meteor.life, 0)})`)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(meteor.x, meteor.y)
        ctx.stroke()
        if (meteor.life <= 0 || meteor.x > width + 40 || meteor.y > height + 40) meteor = null
      }
    }

    const tick = () => {
      if (!visible) return
      time += 0.016
      if (!meteor && Math.random() < 0.007) spawnMeteor()
      paintStars(true)
      frame = requestAnimationFrame(tick)
    }

    resize()
    paintStars(!reduceMotion)

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (reduceMotion) return
        if (visible) frame = requestAnimationFrame(tick)
        else cancelAnimationFrame(frame)
      },
      { threshold: 0.08 },
    )
    observer.observe(wrap)

    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    if (!reduceMotion) frame = requestAnimationFrame(tick)

    return () => {
      visible = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      ro.disconnect()
    }
  }, [])

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 overflow-hidden bg-ink">
      <motion.div
        aria-hidden
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 56, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 h-[230%] w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-80"
        style={{
          background:
            'conic-gradient(from 200deg, transparent 0 16%, rgba(155,123,255,0.28) 26%, transparent 38%, rgba(52,226,240,0.14) 50%, transparent 60%, rgba(255,127,192,0.18) 72%, transparent 84%)',
          filter: 'blur(34px)',
        }}
      />
      <div className="animate-blob absolute -top-[45%] -left-[12%] h-[78%] w-[58%] rounded-full bg-[#6b4dff]/50 blur-[92px]" />
      <div className="animate-blob absolute -right-[18%] -bottom-[40%] h-[72%] w-[52%] rounded-full bg-[#34e2f0]/28 blur-[100px] [animation-delay:-8s]" />
      <div className="animate-blob absolute top-[18%] right-[22%] h-[46%] w-[38%] rounded-full bg-[#ff7fc0]/28 blur-[80px] [animation-delay:-14s]" />
      <div className="animate-blob absolute bottom-[8%] left-[28%] h-[36%] w-[30%] rounded-full bg-[#fed24f]/12 blur-[70px] [animation-delay:-4s]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,9,20,0.28)_58%,rgba(7,9,20,0.72)_100%)]" />
    </div>
  )
}
