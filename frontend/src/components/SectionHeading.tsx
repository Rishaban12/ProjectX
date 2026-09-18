import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  variant = 'light',
}: {
  eyebrow: string
  title: string
  description?: string
  align?: 'center' | 'left'
  variant?: 'light' | 'dark'
}) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  const isDark = variant === 'dark'

  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignClass}`}>
      <span
        className={`text-[11px] font-medium tracking-[0.2em] uppercase ${isDark ? 'text-white/50' : 'text-ink-faint'}`}
      >
        {eyebrow}
      </span>
      <h2
        className={`font-display text-3xl font-semibold tracking-[-0.04em] text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.12] ${isDark ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-base sm:text-lg ${isDark ? 'text-white/70' : 'text-ink-soft'}`}>{description}</p>
      )}
    </Reveal>
  )
}
