import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'

interface Position {
  x: number
  y: number
}

const SPRING_CONFIG = { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 }
const SCALE_SPRING_CONFIG = { stiffness: 300, damping: 20 }

function PaperRocket() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.55))' }}
    >
      {/* Origami dart / paper rocket — nose points up at rest. */}
      <path d="M16 2.5 L5 27 L16 21.2 Z" fill="#2a2c33" />
      <path d="M16 2.5 L27 27 L16 21.2 Z" fill="#14151c" />
      <path d="M16 2.5 L13.2 21.2 L16 18.4 L18.8 21.2 Z" fill="#3d4150" />
      <path d="M16 2.5 L16 21.2" stroke="#5a5e6c" strokeWidth="0.85" strokeLinecap="round" />
      <path d="M16 8 L8.5 24.5" stroke="#ffffff" strokeWidth="0.45" opacity="0.2" />
      <path d="M16 8 L23.5 24.5" stroke="#6a6e7c" strokeWidth="0.45" opacity="0.55" />
      <path
        d="M16 2.5 L27 27 L16 21.2 L5 27 Z"
        fill="none"
        stroke="#14151c"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * A rotating, velocity-aware cursor that points in the direction of travel
 * and eases via spring physics — the "smooth cursor" pattern popularized by
 * Magic UI's registry component, reimplemented directly since that path is
 * a copy-in component rather than an installable package.
 * Only active on fine-pointer devices; touch is untouched.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)

  const lastMousePos = useRef<Position>({ x: 0, y: 0 })
  const velocity = useRef<Position>({ x: 0, y: 0 })
  const lastUpdateTime = useRef(Date.now())
  const previousAngle = useRef(0)
  const accumulatedRotation = useRef(0)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const rotation = useMotionValue(0)
  const scale = useMotionValue(1)

  const springX = useSpring(cursorX, SPRING_CONFIG)
  const springY = useSpring(cursorY, SPRING_CONFIG)
  const springRotation = useSpring(rotation, SPRING_CONFIG)
  const springScale = useSpring(scale, SCALE_SPRING_CONFIG)

  useLayoutEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    let shrinkTimeout: ReturnType<typeof setTimeout> | null = null

    const onMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY }
      const currentTime = Date.now()
      const deltaTime = currentTime - lastUpdateTime.current

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        }
      }
      lastUpdateTime.current = currentTime
      lastMousePos.current = currentPos

      cursorX.set(currentPos.x)
      cursorY.set(currentPos.y)

      const speed = Math.hypot(velocity.current.x, velocity.current.y)

      if (speed > 0.1) {
        const currentAngle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90
        let angleDiff = currentAngle - previousAngle.current
        if (angleDiff > 180) angleDiff -= 360
        if (angleDiff < -180) angleDiff += 360

        accumulatedRotation.current += angleDiff
        rotation.set(accumulatedRotation.current)
        previousAngle.current = currentAngle

        scale.set(0.92)
        if (shrinkTimeout) clearTimeout(shrinkTimeout)
        shrinkTimeout = setTimeout(() => scale.set(1), 150)
      }
    }

    window.addEventListener('mousemove', onMove)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      if (shrinkTimeout) clearTimeout(shrinkTimeout)
    }
  }, [cursorX, cursorY, rotation, scale])

  if (!enabled) return null

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: springX,
        top: springY,
        x: '-50%',
        y: '-12%',
        rotate: springRotation,
        originX: 0.5,
        originY: 0.08,
        scale: springScale,
        zIndex: 100,
      }}
      className="pointer-events-none"
    >
      <PaperRocket />
    </motion.div>
  )
}
