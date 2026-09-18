import { Check, FileText, MessageCircle, Sparkles, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import ResumeStudioDemo from '../components/ResumeStudioDemo'
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
      <PageHero
        eyebrow="Resume & Career Studio"
        description="ATS-optimized, recruiter-tested, and built around the skills that matter for where you're headed next."
      >
        A resume that reflects the technology you’ve actually{' '}
        <span className="page-hero-accent">adapted to</span>.
      </PageHero>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="card flex h-full flex-col gap-4 rounded-2xl p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-ink-soft">
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

      {/* Animated rewrite + before / after */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-start gap-10 md:grid-cols-2 lg:gap-14">
          <Reveal className="min-w-0">
            <ResumeStudioDemo />
          </Reveal>
          <Reveal delay={0.08} className="flex min-w-0 flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-7">
              <span className="w-fit rounded-sm border border-line px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
                Before
              </span>
              <ul className="flex flex-col gap-3 text-sm text-ink-faint">
                <li>Generic template, no keyword targeting</li>
                <li>Buzzwords without measurable outcomes</li>
                <li>Skills list disconnected from target role</li>
                <li>No AI / modern-tool literacy signaled</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-7">
              <span className="w-fit rounded-sm border border-line bg-surface px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-ink uppercase">
                After Zecqora
              </span>
              <ul className="flex flex-col gap-3 text-sm text-ink">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" /> ATS-matched to the exact job description
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" /> Quantified impact in every bullet
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" /> Skills mapped to current role requirements
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" /> AI-tool fluency clearly signaled
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
                  pkg.highlighted ? 'border-2 border-ink bg-ink/5' : 'card'
                }`}
              >
                {pkg.highlighted && (
                  <span className="absolute -top-3 left-7 flex items-center gap-1 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink">
                    <Sparkles className="h-3 w-3" /> Best value
                  </span>
                )}
                <div>
                  <h3 className="font-display text-xl font-bold text-ink">{pkg.name}</h3>
                  <p className="mt-2 text-3xl font-normal text-ink">{pkg.price}</p>
                </div>
                <ul className="flex flex-1 flex-col gap-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink-soft">
                      <Check className="h-4 w-4 shrink-0 text-ink-faint" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`text-center ${pkg.highlighted ? 'btn-primary' : 'btn-secondary'}`}
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
