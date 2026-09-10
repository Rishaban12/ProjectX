import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Service } from '../lib/data'
import Reveal from './Reveal'

export default function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  const Icon = service.icon
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to={service.to}
        className="group card relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md"
      >
        <div
          className={`absolute -top-16 -right-16 h-40 w-40 rounded-full ${service.accentSoft} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
        />
        <div className="flex items-start justify-between">
          <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.accentBg} ${service.accentIcon}`}>
            <Icon className="h-6 w-6" strokeWidth={2} />
          </span>
          <ArrowUpRight className="h-5 w-5 text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink" />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-xl font-bold text-ink">{service.title}</h3>
          <p className="text-sm text-ink-soft">{service.description}</p>
        </div>

        <ul className="mt-auto flex flex-col gap-2 border-t border-line pt-4">
          {service.points.map((point) => (
            <li key={point} className="flex items-center gap-2 text-xs text-ink-faint">
              <Check className="h-3.5 w-3.5 shrink-0 text-blue" />
              {point}
            </li>
          ))}
        </ul>
      </Link>
    </Reveal>
  )
}
