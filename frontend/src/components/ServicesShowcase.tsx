import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVICES } from '../lib/data'
import { cn } from '../lib/utils'
import SectionHeading from './SectionHeading'

function Headline({ text, accent }: { text: string; accent: string }) {
  const index = text.toLowerCase().indexOf(accent.toLowerCase())
  if (index === -1) return <>{text}</>
  const before = text.slice(0, index)
  const match = text.slice(index, index + accent.length)
  const after = text.slice(index + accent.length)
  return (
    <>
      {before}
      <span className="text-yellow">{match}</span>
      {after}
    </>
  )
}

function serviceId(label: string) {
  return `service-${label.toLowerCase().replace(/\s+/g, '-')}`
}

export default function ServicesShowcase() {
  const [active, setActive] = useState(0)
  const panelRefs = useRef<(HTMLElement | null)[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const panels = panelRefs.current.filter(Boolean) as HTMLElement[]
    if (!panels.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const index = panels.indexOf(visible.target as HTMLElement)
        if (index >= 0) setActive(index)
      },
      { rootMargin: '-28% 0px -40% 0px', threshold: [0.2, 0.45, 0.7] },
    )

    panels.forEach((panel) => observer.observe(panel))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index === active) {
        void video.play().catch(() => undefined)
      } else {
        video.pause()
      }
    })
  }, [active])

  const scrollToService = (index: number) => {
    setActive(index)
    panelRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="What we do"
        title="Four services. One studio built to ship."
        description="Pick a lane, or combine them — most of our clients start with a website and end up learning to run it themselves."
      />

      <div className="mt-16 grid items-start gap-10 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-12 xl:gap-16">
        <nav
          aria-label="Services"
          className="top-24 z-10 flex gap-2 overflow-x-auto bg-bg py-2 lg:sticky lg:flex-col lg:gap-1 lg:overflow-visible lg:py-0"
        >
          {SERVICES.map((item, index) => {
            const selected = index === active
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => scrollToService(index)}
                aria-current={selected ? 'true' : undefined}
                className={cn(
                  'flex shrink-0 items-center gap-3 rounded-full px-3 py-2.5 text-left text-sm transition-colors lg:rounded-none lg:px-0 lg:py-3',
                  selected ? 'bg-muted text-ink lg:bg-transparent' : 'text-ink-faint hover:text-ink',
                )}
              >
                <span
                  className={cn(
                    'hidden h-1.5 w-1.5 shrink-0 rounded-full lg:block',
                    selected ? 'bg-yellow' : 'bg-line',
                  )}
                />
                <span className={selected ? 'font-semibold' : 'font-medium'}>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="flex flex-col">
          {SERVICES.map((item, index) => {
            const Icon = item.icon
            return (
              <article
                key={item.label}
                id={serviceId(item.label)}
                ref={(node) => {
                  panelRefs.current[index] = node
                }}
                className="grid scroll-mt-28 items-center gap-8 border-t border-line py-16 first:border-t-0 first:pt-0 sm:gap-10 lg:grid-cols-2 lg:py-20"
              >
                <div className="flex flex-col">
                  <p className="mb-5 flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-yellow uppercase">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                    {item.title}
                  </p>
                  <h3 className="max-w-md text-4xl leading-[1.08] font-semibold tracking-tight text-ink sm:text-5xl">
                    <Headline text={item.headline} accent={item.accentWord} />
                  </h3>
                  <p className="mt-5 max-w-md text-base text-ink-soft">{item.description}</p>
                  <Link
                    to={item.to}
                    className="mt-8 inline-flex w-fit text-sm font-semibold text-ink transition-colors hover:text-yellow"
                  >
                    Learn more →
                  </Link>
                </div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ececec]">
                  <video
                    ref={(node) => {
                      videoRefs.current[index] = node
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                    src={item.video}
                    poster={item.poster}
                    muted
                    loop
                    playsInline
                    preload={index === 0 ? 'auto' : 'metadata'}
                  />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
