import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import GalaxyBackdrop from './GalaxyBackdrop'
import Magnetic from './Magnetic'
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
      <Reveal className="relative overflow-hidden rounded-2xl border border-white/10 px-8 py-16 text-center sm:px-16">
        <GalaxyBackdrop />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="font-display max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
          <p className="max-w-xl text-white/70">{description}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link
                to={primary.to}
                className="btn-primary group hover:scale-105"
              >
                {primary.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to={secondary.to}
                className="rounded-lg border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {secondary.label}
              </Link>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
