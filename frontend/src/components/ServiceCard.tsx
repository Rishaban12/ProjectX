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
        className="group glass relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20"
      >
        <div
          className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${service.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
        />
        <div className="flex items-start justify-between">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent} text-black`}
          >
            <Icon className="h-6 w-6" strokeWidth={2} />
          </span>
          <ArrowUpRight className="h-5 w-5 text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-xl font-bold text-white">{service.title}</h3>
          <p className="text-sm text-white/55">{service.description}</p>
        </div>

        <ul className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-4">
          {service.points.map((point) => (
            <li key={point} className="flex items-center gap-2 text-xs text-white/50">
              <Check className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
              {point}
            </li>
          ))}
        </ul>
      </Link>
    </Reveal>
  )
}
