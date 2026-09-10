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
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-cyan-300 uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-bold text-balance text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && <p className="text-base text-white/60 sm:text-lg">{description}</p>}
    </Reveal>
  )
}
