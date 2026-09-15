import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { EARTH_PINS, type EarthPin } from '../../lib/earthPins'

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
  interactive?: boolean
  showHint?: boolean
}

type GeoFeature = {
  type: string
  properties?: Record<string, string>
  geometry: {
    type: 'Polygon' | 'MultiPolygon'
    coordinates: number[][][] | number[][][][]
  }
}

type LandCollection = {
  features: GeoFeature[]
}

interface DotData {
  lng: number
  lat: number
}

const DESKTOP_OFFSETS = [
  { x: 0, y: -58 },
  { x: 54, y: -20 },
  { x: 34, y: 48 },
  { x: -34, y: 48 },
  { x: -54, y: -20 },
] as const

const COMPACT_OFFSETS = [
  { x: 0, y: -46 },
  { x: 42, y: 26 },
  { x: -42, y: 26 },
] as const

const COMPACT_PIN_IDS = new Set(['bengaluru', 'chennai', 'thanjavur'])

function PinPhoto({ pin }: { pin: EarthPin }) {
  const [src, setSrc] = useState(pin.image)
  return (
    <img
      src={src}
      alt={pin.city}
      className="h-full w-full object-cover"
      onError={() => setSrc(pin.placeholder)}
    />
  )
}

export default function RotatingEarth({
  width = 800,
  height = 600,
  className = '',
  interactive = true,
  showHint = true,
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pinRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const lineRefs = useRef<Record<string, SVGLineElement | null>>({})
  const lbRef = useRef<HTMLDivElement | null>(null)
  const pauseRef = useRef(false)
  const activePinRef = useRef<string | null>(null)
  const compactRef = useRef(false)
  const [error, setError] = useState<string | null>(null)
  const [activePin, setActivePin] = useState<string | null>(null)
  const [compact, setCompact] = useState(false)

  const visiblePins = compact
    ? EARTH_PINS.filter((pin) => COMPACT_PIN_IDS.has(pin.id))
    : EARTH_PINS

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const sync = () => {
      compactRef.current = mq.matches
      setCompact(mq.matches)
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return

    const size = Math.min(width, height, window.innerWidth - 40, window.innerHeight - 80)
    const containerWidth = size
    const containerHeight = size
    const radius = size / 2 - 2

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    context.scale(dpr, dpr)

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)
    const graticule = d3.geoGraticule()

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }

      return inside
    }

    const pointInFeature = (point: [number, number], feature: GeoFeature): boolean => {
      const geometry = feature.geometry

      if (geometry.type === 'Polygon') {
        const coordinates = geometry.coordinates as number[][][]
        if (!pointInPolygon(point, coordinates[0])) return false
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) return false
        }
        return true
      }

      if (geometry.type === 'MultiPolygon') {
        for (const polygon of geometry.coordinates as number[][][][]) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }
            if (!inHole) return true
          }
        }
      }

      return false
    }

    const generateDotsInPolygon = (feature: GeoFeature, dotSpacing: number) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature.geometry as d3.GeoPermissibleObjects)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds
      if (!Number.isFinite(minLng) || !Number.isFinite(maxLat) || maxLat < -55) return dots

      const stepSize = dotSpacing * 0.1

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) dots.push(point)
        }
      }

      return dots
    }

    const allDots: DotData[] = []
    let landFeatures: LandCollection | undefined

    const updatePins = () => {
      const displayW = canvas.clientWidth || containerWidth
      const scale = displayW / containerWidth
      const [lambda, phi] = projection.rotate()
      const pole: [number, number] = [-lambda, -phi]
      const pinList = compactRef.current
        ? EARTH_PINS.filter((pin) => COMPACT_PIN_IDS.has(pin.id))
        : EARTH_PINS
      const pinOffsets = compactRef.current ? COMPACT_OFFSETS : DESKTOP_OFFSETS

      let hubX = 0
      let hubY = 0
      let hubCount = 0
      const placed: { pin: EarthPin; x: number; y: number; ox: number; oy: number }[] = []

      pinList.forEach((pin, i) => {
        const el = pinRefs.current[pin.id]
        const line = lineRefs.current[pin.id]
        const visible = d3.geoDistance([pin.lng, pin.lat], pole) <= Math.PI / 2
        const projected = projection([pin.lng, pin.lat])

        if (!el || !projected || !visible) {
          if (el) {
            el.style.opacity = '0'
            el.style.pointerEvents = 'none'
          }
          if (line) line.style.opacity = '0'
          return
        }

        const x = projected[0] * scale
        const y = projected[1] * scale
        const ox = pinOffsets[i].x
        const oy = pinOffsets[i].y

        el.style.opacity = activePinRef.current && activePinRef.current !== pin.id ? '0.35' : '1'
        el.style.pointerEvents = activePinRef.current && activePinRef.current !== pin.id ? 'none' : 'auto'
        el.style.transform = `translate3d(${x + ox}px, ${y + oy}px, 0) translate(-50%, -50%)`
        el.style.zIndex = activePinRef.current === pin.id ? '50' : String(10 + i)

        hubX += x
        hubY += y
        hubCount += 1
        placed.push({ pin, x, y, ox, oy })
      })

      const lb = lbRef.current
      if (!hubCount || !lb) {
        if (lb) lb.style.opacity = '0'
        placed.forEach(({ pin }) => {
          const line = lineRefs.current[pin.id]
          if (line) line.style.opacity = '0'
        })
        return
      }

      const hx = hubX / hubCount
      const hy = hubY / hubCount
      lb.style.opacity = '1'
      lb.style.transform = `translate3d(${hx}px, ${hy}px, 0) translate(-50%, -50%)`

      placed.forEach(({ pin, x, y, ox, oy }) => {
        const line = lineRefs.current[pin.id]
        if (!line) return
        line.style.opacity = '0.7'
        line.setAttribute('x1', String(hx))
        line.setAttribute('y1', String(hy))
        line.setAttribute('x2', String(x + ox))
        line.setAttribute('y2', String(y + oy))
      })
    }

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.strokeStyle = 'rgba(0,0,0,0.28)'
      context.lineWidth = 1 * scaleFactor
      context.stroke()

      context.beginPath()
      path(graticule())
      context.strokeStyle = 'rgba(0,0,0,0.2)'
      context.lineWidth = 1 * scaleFactor
      context.globalAlpha = 0.35
      context.stroke()
      context.globalAlpha = 1

      if (landFeatures) {
        context.beginPath()
        landFeatures.features.forEach((feature) => {
          path(feature.geometry as d3.GeoPermissibleObjects)
        })
        context.strokeStyle = 'rgba(0,0,0,0.45)'
        context.lineWidth = 1 * scaleFactor
        context.stroke()

        const [lambda, phi] = projection.rotate()
        const pole: [number, number] = [-lambda, -phi]

        allDots.forEach((dot) => {
          if (d3.geoDistance([dot.lng, dot.lat], pole) > Math.PI / 2) return
          const projected = projection([dot.lng, dot.lat])
          if (!projected) return
          context.beginPath()
          context.arc(projected[0], projected[1], 1.15 * scaleFactor, 0, 2 * Math.PI)
          context.fillStyle = 'rgba(0,0,0,0.92)'
          context.fill()
        })
      }

      updatePins()
    }

    const loadWorldData = async () => {
      try {
        const response = await fetch('/land-110m.json')
        if (!response.ok) throw new Error('Failed to load land data')

        const raw = (await response.json()) as LandCollection
        landFeatures = {
          features: raw.features.map((feature) => ({
            type: 'Feature',
            properties: feature.properties ?? {},
            geometry: feature.geometry,
          })),
        }

        render()

        const spacing = compactRef.current ? 28 : 20
        landFeatures.features.forEach((feature) => {
          generateDotsInPolygon(feature, spacing).forEach(([lng, lat]) => {
            allDots.push({ lng, lat })
          })
        })

        render()
      } catch {
        setError('Failed to load land map data')
      }
    }

    const rotation: [number, number, number] = [-79, -12, 0]
    let autoRotate = true
    const rotationSpeed = 0.28

    const rotate = () => {
      if (autoRotate && !pauseRef.current) {
        rotation[0] += rotationSpeed
        projection.rotate(rotation)
        render()
      } else {
        updatePins()
      }
    }

    render()
    void loadWorldData()

    const rotationTimer = d3.timer(rotate)

    const handleMouseDown = (event: MouseEvent) => {
      if (!interactive) return
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const startRotation = [...rotation]

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5
        const dx = moveEvent.clientX - startX
        const dy = moveEvent.clientY - startY

        rotation[0] = startRotation[0] + dx * sensitivity
        rotation[1] = startRotation[1] - dy * sensitivity
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))

        projection.rotate(rotation)
        render()
      }

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        setTimeout(() => {
          autoRotate = true
        }, 10)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    const handleWheel = (event: WheelEvent) => {
      if (!interactive) return
      event.preventDefault()
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1
      const newRadius = Math.max(radius * 0.5, Math.min(radius * 3, projection.scale() * scaleFactor))
      projection.scale(newRadius)
      render()
    }

    if (interactive) {
      canvas.addEventListener('mousedown', handleMouseDown)
      canvas.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      rotationTimer.stop()
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('wheel', handleWheel)
    }
  }, [width, height, interactive])

  if (error) {
    return (
      <div className={`flex items-center justify-center rounded-2xl bg-card p-8 ${className}`}>
        <div className="text-center">
          <p className="mb-2 font-semibold text-red-400">Error loading Earth visualization</p>
          <p className="text-sm text-ink-faint">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`hero-globe-stage relative ${className}`}
      onMouseEnter={() => {
        pauseRef.current = true
      }}
      onMouseLeave={() => {
        pauseRef.current = false
        activePinRef.current = null
        setActivePin(null)
      }}
    >
      <canvas
        ref={canvasRef}
        className="mx-auto block aspect-square max-h-full w-full max-w-full bg-transparent object-contain"
      />

      <div className="pointer-events-none absolute inset-0">
        <svg className="absolute inset-0 h-full w-full overflow-visible">
          {visiblePins.map((pin) => (
            <line
              key={pin.id}
              ref={(node) => {
                lineRefs.current[pin.id] = node
              }}
              x1="0"
              y1="0"
              x2="0"
              y2="0"
              stroke="rgba(255,212,0,0.28)"
              strokeWidth="1"
              opacity="0"
            />
          ))}
        </svg>

        <div
          ref={lbRef}
          className="absolute top-0 left-0 z-30 opacity-0"
          aria-hidden
        >
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="hero-lb-core absolute inset-0 rounded-md border border-yellow/35 bg-yellow/10" />
            <span className="relative h-1.5 w-1.5 rounded-sm bg-yellow" />
          </span>
        </div>

        {visiblePins.map((pin) => (
          <button
            key={pin.id}
            type="button"
            ref={(node) => {
              pinRefs.current[pin.id] = node
            }}
            onClick={() => {
              setActivePin((current) => {
                const next = current === pin.id ? null : pin.id
                activePinRef.current = next
                return next
              })
            }}
            className={`earth-pin absolute top-0 left-0 ${
              activePin === pin.id ? 'z-50' : activePin ? 'z-10' : 'z-20'
            }`}
            aria-label={`${pin.city} teammate`}
          >
            <span className="relative flex h-12 w-12 items-center justify-center lg:h-12 lg:w-12">
              <span className="absolute inset-0 animate-pulse-soft rounded-full border border-line-strong" />
              <span className="relative h-9 w-9 overflow-hidden rounded-full border border-line-strong bg-surface shadow-[0_0_18px_rgba(255,212,0,0.35)] lg:h-10 lg:w-10">
                <PinPhoto pin={pin} />
              </span>
            </span>
            {activePin === pin.id && (
              <span className="absolute bottom-[calc(100%+12px)] left-1/2 z-50 w-36 -translate-x-1/2 rounded-xl border border-line bg-surface p-2 text-center shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
                <span className="mx-auto mb-2 block h-20 w-20 overflow-hidden rounded-full border border-line">
                  <PinPhoto pin={pin} />
                </span>
                <span className="block text-sm font-semibold text-ink">{pin.city}</span>
              </span>
            )}
          </button>
        ))}
      </div>

      {showHint && (
        <div className="absolute bottom-4 left-4 rounded-md bg-surface/80 px-2 py-1 text-xs text-ink-faint">
          Hover to pause • Click a person
        </div>
      )}
    </div>
  )
}
