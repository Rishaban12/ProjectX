import type { ReactNode } from 'react'

export default function PageHero({
  eyebrow,
  children,
  description,
  titleSize = 'text-5xl sm:text-6xl lg:text-[4.35rem]',
  actions,
  decoration,
  navTheme,
}: {
  eyebrow: string
  children: ReactNode
  description: ReactNode
  titleSize?: string
  actions?: ReactNode
  decoration?: ReactNode
  navTheme?: 'dark'
}) {
  return (
    <section
      data-nav-theme={navTheme}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32 pb-20"
    >
      {decoration}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <span
          className={`text-[11px] font-semibold tracking-[0.18em] uppercase ${
            navTheme === 'dark' ? 'text-white/70' : 'text-ink-soft'
          }`}
        >
          {eyebrow}
        </span>
        <h1
          className={`hero-title mt-8 max-w-4xl text-balance ${navTheme === 'dark' ? 'text-white' : 'text-ink'} ${titleSize}`}
        >
          {children}
        </h1>
        <p
          className={`mt-8 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${
            navTheme === 'dark' ? 'text-white/70' : 'text-ink-soft'
          }`}
        >
          {description}
        </p>
        {actions && <div className="mt-8 flex flex-wrap items-center justify-center gap-4">{actions}</div>}
      </div>
    </section>
  )
}
