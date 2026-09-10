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
                <div className="glass flex h-full flex-col gap-4 rounded-3xl p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-lime-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-sm text-white/55">{step.description}</p>
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
            <div className="glass flex h-full flex-col gap-4 rounded-3xl border border-red-500/20 p-7">
              <span className="w-fit rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-300">Before</span>
              <ul className="flex flex-col gap-3 text-sm text-white/50">
                <li>Generic template, no keyword targeting</li>
                <li>Buzzwords without measurable outcomes</li>
                <li>Skills list disconnected from target role</li>
                <li>No AI / modern-tool literacy signaled</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-emerald-400/30 p-7">
              <div className="animate-blob absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
              <span className="w-fit rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">After ProjectX</span>
              <ul className="relative flex flex-col gap-3 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> ATS-matched to the exact job description
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> Quantified impact in every bullet
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> Skills mapped to current role requirements
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> AI-tool fluency clearly signaled
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
                className={`relative flex h-full flex-col gap-6 rounded-3xl p-7 ${
                  pkg.highlighted
                    ? 'border-2 border-lime-400/40 bg-gradient-to-b from-lime-400/10 to-transparent'
                    : 'glass'
                }`}
              >
                {pkg.highlighted && (
                  <span className="absolute -top-3 left-7 flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-400 to-lime-400 px-3 py-1 text-xs font-semibold text-black">
                    <Sparkles className="h-3 w-3" /> Best value
                  </span>
                )}
                <div>
                  <h3 className="font-display text-xl font-bold text-white">{pkg.name}</h3>
                  <p className="mt-2 text-3xl font-bold text-white">{pkg.price}</p>
                </div>
                <ul className="flex flex-1 flex-col gap-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                      <Check className="h-4 w-4 shrink-0 text-lime-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`rounded-full px-5 py-3 text-center text-sm font-semibold transition-transform hover:scale-105 ${
                    pkg.highlighted ? 'bg-gradient-to-r from-emerald-400 to-lime-400 text-black' : 'border border-white/15 text-white'
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
