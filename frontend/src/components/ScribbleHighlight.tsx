import type { CSSProperties, ReactNode } from 'react'

/**
 * Wraps text with a hand-drawn highlighter-marker scribble behind it —
 * a rough yellow brush stroke, not a clean rectangle. The band stays a
 * consistent thickness across its full width so it can't pinch to zero.
 */
export default function ScribbleHighlight({
  children,
  className = '',
  style,
  color = 'var(--color-yellow)',
  shadow = true,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  color?: string
  shadow?: boolean
}) {
  return (
    <span className={`relative inline-block whitespace-nowrap ${className}`} style={style}>
      <svg
        viewBox="0 0 320 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-3 -inset-y-3 -z-10 h-[calc(100%_+_1.5rem)] w-[calc(100%_+_1.5rem)]"
      >
        {shadow && (
          <path
            d="M-6,36 C36,18 78,32 120,20 C160,10 200,28 240,16
             C272,7 300,16 326,22
             L326,82 C298,92 268,96 240,84
             C200,96 160,88 120,92
             C78,96 36,90 -6,84 Z"
            fill={color}
            opacity="0.5"
            transform="translate(2 -3) rotate(-1.2 160 50)"
          />
        )}
        <path
          d="M-6,40 C36,22 78,36 120,24 C160,14 200,32 240,20
             C272,11 300,20 326,26
             L326,78 C298,88 268,92 240,80
             C200,92 160,84 120,88
             C78,92 36,86 -6,80 Z"
          fill={color}
          transform="rotate(1 160 50)"
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </span>
  )
}
