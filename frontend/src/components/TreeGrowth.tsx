import { forwardRef, useRef, type ReactNode, type RefObject } from 'react'
import { Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AnimatedBeam } from './ui/animated-beam'
import { cn } from '@/lib/utils'

export type TreeStep = {
  title: string
  description: string
  icon: LucideIcon
}

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: ReactNode }>(
  ({ className, children }, ref) => (
    <div
      ref={ref}
      className={cn(
        'z-10 flex size-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white shadow-[0_0_20px_-12px_rgba(0,0,0,0.55)] sm:size-16',
        className,
      )}
    >
      {children}
    </div>
  ),
)
Circle.displayName = 'Circle'

function StepNode({
  step,
  nodeRef,
}: {
  step: TreeStep
  nodeRef: RefObject<HTMLDivElement | null>
}) {
  const Icon = step.icon
  return (
    <div className="z-10 flex w-[7.5rem] flex-col items-center gap-2 sm:w-36">
      <Circle ref={nodeRef}>
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.8} />
      </Circle>
      <p className="font-display text-center text-base text-white sm:text-lg">{step.title}</p>
      <p className="text-center text-xs leading-snug text-white/50 sm:text-sm">{step.description}</p>
    </div>
  )
}

/**
 * How-it-works map: circular step icons around a Zecqora hub,
 * connected with Magic UI animated beams.
 */
export default function TreeGrowth({ steps }: { steps: TreeStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hubRef = useRef<HTMLDivElement>(null)
  const topLeftRef = useRef<HTMLDivElement>(null)
  const bottomLeftRef = useRef<HTMLDivElement>(null)
  const topRightRef = useRef<HTMLDivElement>(null)
  const bottomRightRef = useRef<HTMLDivElement>(null)

  const [topLeft, bottomLeft, topRight, bottomRight] = [
    steps[0],
    steps[1],
    steps[2],
    steps[3],
  ]

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex w-full max-w-5xl items-center justify-center p-6 sm:min-h-[560px] sm:p-10"
    >
      <div className="relative flex h-full min-h-[420px] w-full max-w-3xl flex-col items-stretch justify-between gap-8 sm:min-h-0 sm:gap-10">
        <div className="flex flex-row items-start justify-between">
          {topLeft ? <StepNode step={topLeft} nodeRef={topLeftRef} /> : <span />}
          {topRight ? <StepNode step={topRight} nodeRef={topRightRef} /> : <span />}
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <Circle ref={hubRef} className="size-16 border-0 bg-yellow text-bg shadow-[0_0_28px_rgba(255,212,0,0.35)] sm:size-20">
            <Zap className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={2} />
          </Circle>
          <p className="font-display text-sm tracking-wide text-white">Zecqora</p>
        </div>

        <div className="flex flex-row items-start justify-between">
          {bottomLeft ? <StepNode step={bottomLeft} nodeRef={bottomLeftRef} /> : <span />}
          {bottomRight ? <StepNode step={bottomRight} nodeRef={bottomRightRef} /> : <span />}
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={topLeftRef}
        toRef={hubRef}
        pathType="elbow"
        pathColor="var(--color-yellow)"
        pathOpacity={0.85}
        pathWidth={2.25}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={bottomLeftRef}
        toRef={hubRef}
        pathType="elbow"
        pathColor="var(--color-yellow)"
        pathOpacity={0.85}
        pathWidth={2.25}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={topRightRef}
        toRef={hubRef}
        pathType="elbow"
        pathColor="var(--color-yellow)"
        pathOpacity={0.85}
        pathWidth={2.25}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={bottomRightRef}
        toRef={hubRef}
        pathType="elbow"
        pathColor="var(--color-yellow)"
        pathOpacity={0.85}
        pathWidth={2.25}
        reverse
      />
    </div>
  )
}
