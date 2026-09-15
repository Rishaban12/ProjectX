import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVICES } from '../lib/data'
import { cn } from '../lib/utils'

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
      { rootMargin: '-20% 0px -20% 0px', threshold: [0.35, 0.6, 0.85] },
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
    panelRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative font-sans">
      <div className="mx-auto max-w-4xl px-6 pt-24 pb-6 text-center">
        <p className="text-[11px] font-medium tracking-[0.22em] text-ink-faint uppercase">What we do</p>
        <h2 className="font-display mt-4 text-4xl leading-[1.12] font-semibold tracking-[-0.04em] text-ink sm:text-5xl lg:text-[3.5rem]">
          Four services. One studio built to ship.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-ink-soft sm:text-base">
          Pick a lane, or combine them — most of our clients start with a website and end up learning to run it
          themselves.
        </p>
      </div>

      <div className="mx-auto grid max-w-[92rem] items-start px-6 lg:grid-cols-[11.5rem_minmax(0,1fr)] lg:gap-8 xl:gap-12">
        <nav
          aria-label="Services"
          className="top-24 z-10 flex gap-2 overflow-x-auto bg-bg py-2 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:gap-5 lg:overflow-visible lg:py-0"
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
                  'flex shrink-0 items-center gap-2.5 rounded-full px-3 py-2 text-left text-[13px] tracking-[-0.01em] transition-colors lg:rounded-none lg:px-0 lg:py-0',
                  selected ? 'bg-muted text-ink lg:bg-transparent' : 'text-ink-faint hover:text-ink',
                )}
              >
                <span
                  className={cn(
                    'hidden h-1.5 w-1.5 shrink-0 rounded-full lg:block',
                    selected ? 'bg-yellow' : 'bg-transparent',
                  )}
                />
                <span className={selected ? 'font-medium' : 'font-normal'}>{item.label}</span>
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
                className="flex min-h-[100svh] items-center py-16 lg:py-20"
              >
                <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.28fr)] lg:gap-12 xl:gap-16">
                  <div className="flex max-w-[34rem] flex-col">
                    <div className="mb-6 flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow/15 text-yellow">
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <p className="text-[11px] font-medium tracking-[0.18em] text-yellow uppercase">
                        {item.title}
                      </p>
                    </div>
                    <h3 className="font-display text-[2.15rem] leading-[1.12] font-semibold tracking-[-0.04em] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">
                      {item.headline}
                    </h3>
                    <p className="mt-5 max-w-[28rem] text-[15px] leading-7 text-ink-soft">
                      {item.description}
                    </p>
                    <ul className="mt-6 flex flex-col gap-2.5">
                      {item.points.slice(0, 2).map((point) => (
                        <li key={point} className="flex items-center gap-2.5 text-[13px] text-ink-soft">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Link to={item.to} className="btn-secondary mt-8">
                      Experience {item.label}
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </Link>
                  </div>
                  <div className="relative h-[min(34rem,calc(100svh-8rem))] min-h-[260px] w-full overflow-hidden bg-[#f4f4f4]">
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
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
