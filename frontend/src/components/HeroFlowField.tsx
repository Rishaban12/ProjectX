import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

type Particle = { t: number; a: number; r: number; s: number }

function knot(t: number) {
  const p = 3
  const q = 2
  const phi = t * Math.PI * 2
  const rad = 0.72 * Math.cos(q * phi) + 1.55
  return {
    x: rad * Math.cos(p * phi),
    y: rad * Math.sin(p * phi) * 0.78,
    z: -0.9 * Math.sin(q * phi),
  }
}

function sub(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }
}

function cross(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }) {
  return { x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x }
}

function norm(v: { x: number; y: number; z: number }) {
  const l = Math.hypot(v.x, v.y, v.z) || 1
  return { x: v.x / l, y: v.y / l, z: v.z / l }
}

export default function HeroFlowField() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let particles: Particle[] = []
    let time = 0
    let frame = 0
    let visible = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.floor(wrap.clientWidth))
      height = Math.max(1, Math.floor(wrap.clientHeight))
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = width < 800 ? 1400 : 2600
      particles = Array.from({ length: count }, () => ({
        t: Math.random(),
        a: Math.random() * Math.PI * 2,
        r: 0.08 + Math.random() * 0.16,
        s: 0.9 + Math.random() * 1.4,
      }))
    }

    const paint = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height)
      const cx = width * (width < 800 ? 0.5 : 0.7)
      const cy = height * 0.5
      const scale = Math.min(width, height) * (width < 800 ? 0.28 : 0.32)
      const rotY = 0.4 + time * 0.11
      const rotX = 0.72
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)
      const flow = animate ? time * 0.028 : 0

      for (const p of particles) {
        const t = (p.t + flow) % 1
        const pos = knot(t)
        const tan = norm(sub(knot((t + 0.004) % 1), pos))
        const bin = norm(cross(tan, { x: 0.12, y: 0.96, z: 0.25 }))
        const nor = cross(bin, tan)
        const tube = p.r * (1 + 0.08 * Math.sin(t * 12 + time))
        let x = pos.x + (nor.x * Math.cos(p.a) + bin.x * Math.sin(p.a)) * tube
        let y = pos.y + (nor.y * Math.cos(p.a) + bin.y * Math.sin(p.a)) * tube
        let z = pos.z + (nor.z * Math.cos(p.a) + bin.z * Math.sin(p.a)) * tube

        const xz = x * cosY - z * sinY
        z = x * sinY + z * cosY
        x = xz
        const yz = y * cosX - z * sinX
        z = y * sinX + z * cosX
        y = yz

        const depth = 5 / (5 + z)
        const px = cx + x * scale * depth
        const py = cy + y * scale * depth
        if (px < -6 || px > width + 6 || py < -6 || py > height + 6) continue

        const near = (z + 1.6) / 3.2
        const yellow = near > 0.45
        const alpha = (0.35 + depth * 0.5) * (width < 800 ? 0.75 : 1)
        ctx.fillStyle = yellow
          ? `rgba(254,210,79,${alpha})`
          : `rgba(16,42,36,${alpha * 0.85})`
        const size = p.s * (0.55 + depth * 0.85)
        ctx.beginPath()
        ctx.arc(px, py, size, 0, Math.PI * 2)
        ctx.fill()
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
    <div ref={wrapRef} className="hero-flow" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-flow-canvas" />
    </div>
  )
}
