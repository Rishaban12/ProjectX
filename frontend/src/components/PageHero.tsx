import type { ReactNode } from 'react'

export default function PageHero({
  eyebrow,
  children,
  description,
}: {
  eyebrow: string
  children: ReactNode
  description: string
}) {
  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden px-6 pt-32 pb-20">
      <div aria-hidden className="page-hero-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.55)_42%,transparent_74%)]"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <span className="inline-flex items-center rounded-sm bg-yellow px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-ink uppercase">
          {eyebrow}
        </span>
        <h1 className="hero-title mt-8 max-w-4xl text-5xl text-balance text-ink sm:text-6xl lg:text-[4.35rem]">
          {children}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
          {description}
        </p>
      </div>
    </section>
  )
}
