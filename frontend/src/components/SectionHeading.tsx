import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string
  title: string
  description?: string
  align?: 'center' | 'left'
}) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignClass}`}>
      <span className="text-[11px] font-medium tracking-[0.2em] text-ink-faint uppercase">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-balance text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.12]">
        {title}
      </h2>
      {description && <p className="text-base text-ink-soft sm:text-lg">{description}</p>}
    </Reveal>
  )
}
