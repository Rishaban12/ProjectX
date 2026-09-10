import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { FORMATS, LEARNING_TRACKS } from '../lib/data'

export default function Learning() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-40 pb-16 text-center">
        <SectionHeading
          eyebrow="Learning Hub"
          title="Learn the tech that's changing your industry — before it changes without you."
          description="Live, hands-on sessions on coding, AI adoption and adaptiveness — for students, teams, and institutions."
        />
      </section>

      {/* Tracks */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {LEARNING_TRACKS.map((track, i) => {
            const Icon = track.icon
            return (
              <Reveal key={track.title} delay={i * 0.08}>
                <div className="card flex h-full flex-col gap-5 rounded-2xl p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink-faint">
                      {track.level}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink">{track.title}</h3>
                  <p className="text-sm text-ink-soft">{track.description}</p>
                  <ul className="mt-auto grid grid-cols-2 gap-2 border-t border-line pt-4">
                    {track.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-xs text-ink-faint">
                        <Check className="h-3.5 w-3.5 shrink-0 text-orange" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Formats */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading eyebrow="Formats" title="Learn the way that fits your schedule" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FORMATS.map((format, i) => {
            const Icon = format.icon
            return (
              <Reveal key={format.title} delay={i * 0.08}>
                <div className="card flex h-full flex-col items-center gap-4 rounded-2xl p-8 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-ink/5 text-blue">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">{format.title}</h3>
                  <p className="text-sm text-ink-soft">{format.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Curriculum highlight banner */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="card overflow-hidden rounded-2xl p-8 sm:p-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="flex flex-col gap-5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-xs font-medium text-orange uppercase">
                Flagship Track
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                AI Invasion &amp; Adaptiveness
              </h2>
              <p className="text-ink-soft">
                A 6-week track built for people who don't want to be replaced by AI — they want to be the one
                operating it. You'll learn to identify AI-driven shifts in your field, integrate AI tools into
                real workflows, and build small AI-powered projects of your own.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {['Week 1: AI Landscape', 'Week 2: Prompting', 'Week 3: Tool Integration', 'Week 4: Automations', 'Week 5: Build a Project', 'Week 6: Present & Adapt'].map(
                  (w) => (
                    <div key={w} className="rounded-xl border border-line bg-surface px-3 py-2.5 text-xs text-ink-soft">
                      {w}
                    </div>
                  ),
                )}
              </div>
              <Link
                to="/contact"
                className="group mt-2 inline-flex w-fit items-center gap-2 rounded-lg bg-orange px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                Reserve Your Seat
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="animate-spin-slow absolute h-56 w-56 rounded-full border border-dashed border-line-strong" />
              <div className="animate-blob absolute h-40 w-40 rounded-full bg-pastel-violet/50 blur-2xl" />
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-orange text-center">
                <span className="font-display px-4 text-sm font-bold text-white">6 Weeks · Live · Certified</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <CTASection
        title="Bring this training to your campus or team"
        description="We run custom workshops for colleges and companies — tell us your group size and goals."
        primary={{ label: 'Book a Workshop', to: '/contact' }}
        secondary={{ label: 'View All Services', to: '/services' }}
      />
    </>
  )
}
