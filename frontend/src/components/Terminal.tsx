import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { motion, useInView } from 'framer-motion'

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

type SequenceContextValue = {
  completeItem: (index: number) => void
  activeIndex: number
  sequenceStarted: boolean
}

const SequenceContext = createContext<SequenceContextValue | null>(null)
const ItemIndexContext = createContext<number | null>(null)

function useSequence() {
  return useContext(SequenceContext)
}

function useItemIndex() {
  return useContext(ItemIndexContext)
}

export function AnimatedSpan({
  children,
  delay = 0,
  className,
  startOnView = false,
}: {
  children: ReactNode
  delay?: number
  className?: string
  startOnView?: boolean
}) {
  const elementRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(elementRef, { amount: 0.3, once: true })
  const sequence = useSequence()
  const itemIndex = useItemIndex()
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!sequence || itemIndex === null) return
    if (!sequence.sequenceStarted || hasStarted) return
    if (sequence.activeIndex === itemIndex) setHasStarted(true)
  }, [sequence, hasStarted, itemIndex])

  const shouldAnimate = sequence ? hasStarted : startOnView ? isInView : true

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: -5 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      transition={{ duration: 0.3, delay: sequence ? 0 : delay / 1000 }}
      className={cn('grid text-sm font-normal tracking-tight', className)}
      onAnimationComplete={() => {
        if (sequence && itemIndex !== null) sequence.completeItem(itemIndex)
      }}
    >
      {children}
    </motion.div>
  )
}

export function TypingAnimation({
  children,
  className,
  duration = 55,
  delay = 0,
  startOnView = true,
}: {
  children: string
  className?: string
  duration?: number
  delay?: number
  startOnView?: boolean
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [started, setStarted] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(elementRef, { amount: 0.3, once: true })
  const sequence = useSequence()
  const itemIndex = useItemIndex()
  const hasSequence = sequence !== null
  const completeItemRef = useRef(sequence?.completeItem)
  const itemIndexRef = useRef(itemIndex)

  useEffect(() => {
    completeItemRef.current = sequence?.completeItem
    itemIndexRef.current = itemIndex
  }, [sequence?.completeItem, itemIndex])

  useEffect(() => {
    let startTimeout: ReturnType<typeof setTimeout> | undefined

    if (hasSequence && itemIndex !== null) {
      if (sequence?.sequenceStarted && !started && sequence.activeIndex === itemIndex) {
        setStarted(true)
      }
    } else if (!startOnView || isInView) {
      startTimeout = setTimeout(() => setStarted(true), delay)
    }

    return () => {
      if (startTimeout) clearTimeout(startTimeout)
    }
  }, [delay, startOnView, isInView, started, hasSequence, sequence, itemIndex])

  useEffect(() => {
    if (!started) return

    let i = 0
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.slice(0, i + 1))
        i += 1
      } else {
        clearInterval(typingEffect)
        const completeItem = completeItemRef.current
        const currentIndex = itemIndexRef.current
        if (completeItem && currentIndex !== null) completeItem(currentIndex)
      }
    }, duration)

    return () => clearInterval(typingEffect)
  }, [children, duration, started])

  return (
    <motion.span ref={elementRef} className={cn('text-sm font-normal tracking-tight', className)}>
      {displayedText}
    </motion.span>
  )
}

export function Terminal({
  children,
  className,
  sequence = true,
  startOnView = true,
}: {
  children: ReactNode
  className?: string
  sequence?: boolean
  startOnView?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.3, once: true })
  const [activeIndex, setActiveIndex] = useState(0)
  const sequenceHasStarted = sequence ? !startOnView || isInView : false

  const contextValue = useMemo<SequenceContextValue | null>(() => {
    if (!sequence) return null
    return {
      completeItem: (index: number) => {
        setActiveIndex((current) => (index === current ? current + 1 : current))
      },
      activeIndex,
      sequenceStarted: sequenceHasStarted,
    }
  }, [sequence, activeIndex, sequenceHasStarted])

  const wrappedChildren = useMemo(() => {
    if (!sequence) return children
    return Children.toArray(children).map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>
        {child}
      </ItemIndexContext.Provider>
    ))
  }, [children, sequence])

  const content = (
    <div
      ref={containerRef}
      className={cn(
        'z-0 w-full max-w-lg overflow-hidden rounded-xl border border-line bg-bg',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-ink-faint">projectx — zsh</span>
      </div>
      <pre className="min-h-[240px] p-4">
        <code className="font-mono grid gap-y-1 overflow-auto text-ink-soft">{wrappedChildren}</code>
      </pre>
    </div>
  )

  if (!sequence) return content

  return <SequenceContext.Provider value={contextValue}>{content}</SequenceContext.Provider>
}
