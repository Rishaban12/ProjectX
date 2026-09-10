import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'

export default function CTASection({
  title = 'Have an idea? Let’s make it real.',
  description = 'Whether it’s a business website, a student project, or leveling up your skills — tell us what you’re building.',
  primary = { label: 'Start a Project', to: '/contact' },
  secondary = { label: 'Explore Learning Hub', to: '/learning' },
}: {
  title?: string
  description?: string
  primary?: { label: string; to: string }
  secondary?: { label: string; to: string }
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="relative overflow-hidden rounded-2xl border border-line bg-surface px-8 py-16 text-center sm:px-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-pastel-violet/40 blur-[100px]" />
        <div className="relative flex flex-col items-center gap-6">
          <h2 className="font-display max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
          <p className="max-w-xl text-ink-soft">{description}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={primary.to}
              className="group inline-flex items-center gap-2 rounded-lg bg-blue px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              {primary.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to={secondary.to}
              className="rounded-lg border border-line-strong px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
