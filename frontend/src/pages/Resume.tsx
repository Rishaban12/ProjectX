import { Check, FileText, MessageCircle, Sparkles, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { LinkedinIcon } from '../components/BrandIcons'

const STEPS = [
  { icon: MessageCircle, title: 'Career Intake Call', description: '20-min conversation on your goals, target roles, and story.' },
  { icon: FileText, title: 'Draft & ATS Pass', description: 'Resume drafted, keyword-matched, and formatted to pass ATS filters.' },
  { icon: LinkedinIcon, title: 'LinkedIn Alignment', description: 'Headline, summary, and experience rewritten to match your resume.' },
  { icon: Target, title: 'Mock Interview', description: 'A practice round focused on how you talk about your adapted skills.' },
]

const PACKAGES = [
  { name: 'Resume Refresh', price: '₹1,499', features: ['ATS-optimized resume', '1 revision round', '48-hour delivery'] },
  {
    name: 'Career Studio',
    price: '₹3,999',
    highlighted: true,
    features: ['ATS-optimized resume', 'LinkedIn profile rewrite', '2 revision rounds', 'Mock interview session'],
  },
  { name: 'Full Reposition', price: '₹7,499', features: ['Everything in Career Studio', 'Cover letter templates', 'Job-search strategy call', '30 days of support'] },
]

export default function Resume() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-40 pb-16 text-center">
        <SectionHeading
          eyebrow="Resume & Career Studio"
          title="A resume that reflects the technology you've actually adapted to."
          description="ATS-optimized, recruiter-tested, and built around the skills that matter for where you're headed next."
        />
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="card flex h-full flex-col gap-4 rounded-2xl p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow text-ink">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">{step.title}</h3>
                  <p className="text-sm text-ink-soft">{step.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Before / after style comparison */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-red-500/25 bg-card p-7 shadow-sm">
              <span className="w-fit rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-600">Before</span>
              <ul className="flex flex-col gap-3 text-sm text-ink-faint">
                <li>Generic template, no keyword targeting</li>
                <li>Buzzwords without measurable outcomes</li>
                <li>Skills list disconnected from target role</li>
                <li>No AI / modern-tool literacy signaled</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-green/30 bg-card p-7 shadow-sm">
              <div className="animate-blob absolute -top-10 -right-10 h-40 w-40 rounded-full bg-green/15 blur-3xl" />
              <span className="w-fit rounded-full bg-green/15 px-3 py-1 text-xs font-medium text-green">After ProjectX</span>
              <ul className="relative flex flex-col gap-3 text-sm text-ink">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" /> ATS-matched to the exact job description
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" /> Quantified impact in every bullet
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" /> Skills mapped to current role requirements
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" /> AI-tool fluency clearly signaled
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading eyebrow="Packages" title="Pick your level of career reset" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <Reveal key={pkg.name}>
              <div
                className={`relative flex h-full flex-col gap-6 rounded-2xl p-7 ${
                  pkg.highlighted ? 'border-2 border-yellow bg-yellow/10' : 'card'
                }`}
              >
                {pkg.highlighted && (
                  <span className="absolute -top-3 left-7 flex items-center gap-1 rounded-full bg-yellow px-3 py-1 text-xs font-semibold text-ink">
                    <Sparkles className="h-3 w-3" /> Best value
                  </span>
                )}
                <div>
                  <h3 className="font-display text-xl font-bold text-ink">{pkg.name}</h3>
                  <p className="mt-2 text-3xl font-bold text-ink">{pkg.price}</p>
                </div>
                <ul className="flex flex-1 flex-col gap-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink-soft">
                      <Check className="h-4 w-4 shrink-0 text-orange" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`rounded-lg px-5 py-3 text-center text-sm font-semibold transition-transform hover:scale-105 ${
                    pkg.highlighted ? 'bg-ink text-white' : 'border border-line-strong text-ink'
                  }`}
                >
                  Choose {pkg.name}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Ready for a resume that keeps up with you?"
        description="Send us your current resume (or none at all) — we'll take it from there."
        primary={{ label: 'Book My Slot', to: '/contact' }}
        secondary={{ label: 'Explore Learning Hub', to: '/learning' }}
      />
    </>
  )
}
