import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import GalaxyBackdrop from './GalaxyBackdrop'
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
    <section data-nav-theme="dark" className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="relative overflow-hidden rounded-2xl border border-white/10 px-8 py-16 text-center sm:px-16">
        <GalaxyBackdrop />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          <p className="max-w-xl text-[15px] leading-7 text-white/70">{description}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to={primary.to} className="btn-primary group">
              {primary.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to={secondary.to} className="btn-secondary btn-secondary-on-dark">
              {secondary.label}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
