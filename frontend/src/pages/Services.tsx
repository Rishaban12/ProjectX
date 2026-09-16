import { Check, Sparkles } from 'lucide-react'
import { Boxes, Globe2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'

const BUSINESS_TIERS = [
  {
    name: 'Starter',
    price: '₹14,999',
    tag: 'Single-page presence',
    features: ['1–3 page website', 'Mobile responsive design', 'Contact form + maps', 'Basic SEO setup', '7-day delivery'],
  },
  {
    name: 'Growth',
    price: '₹34,999',
    tag: 'Most popular',
    highlighted: true,
    features: [
      'Up to 8 pages',
      'Custom UI design',
      'Blog / catalog system',
      'Payment / booking integration',
      'Analytics dashboard',
      '14-day delivery',
    ],
  },
  {
    name: 'Scale',
    price: 'Custom',
    tag: 'Full platform',
    features: [
      'E-commerce / web app',
      'Admin dashboard',
      'Third-party integrations',
      'Performance & security hardening',
      'Dedicated support window',
    ],
  },
]

const STUDENT_DOMAINS = [
  'Web Development',
  'AI / Machine Learning',
  'Mobile Apps',
  'IoT & Embedded Systems',
  'Data Science',
  'Cybersecurity',
  'Blockchain',
  'Cloud & DevOps',
]

const STUDENT_INCLUDES = [
  'Idea validation & scoping call',
  'System design + architecture diagram',
  'Full source code with clean documentation',
  'Report / thesis-ready write-up',
  'PPT for review & final defense',
  'Viva-voce preparation session',
]

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        description="Two very different audiences, one standard: work you can actually launch, submit, and defend."
      >
        Built for businesses that are growing, and students who are{' '}
        <span className="page-hero-accent">building</span>.
      </PageHero>

      {/* Business websites */}
      <section id="business" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-16">
        <div className="grid items-start gap-10 md:grid-cols-2 lg:gap-14">
          <Reveal className="flex flex-col gap-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line text-ink-soft">
              <Globe2 className="h-6 w-6" />
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Websites for growing businesses
            </h2>
            <p className="text-ink-soft">
              Whether you run a boutique, a clinic, a logistics outfit, or a local service business — your
              website is often the first impression. We design and build sites that load fast, look premium,
              and convert visitors into customers.
            </p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                'Custom design, not templates',
                'Mobile-first & SEO ready',
                'E-commerce & booking systems',
                'Analytics & growth tracking',
                'CMS so you can self-edit',
                '30-day post-launch support',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-ink-soft">
                  <Check className="h-4 w-4 shrink-0 text-ink-faint" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="overflow-hidden rounded-2xl border border-line bg-white">
            <img
              src="/images/business-website.png"
              alt="Laptop and phone showing a boutique business website with yellow calls to action"
              className="block h-auto w-full object-contain"
            />
            <div className="border-t border-line px-5 py-4">
              <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-ink-faint uppercase">
                Example industries we serve
              </p>
              <div className="flex flex-wrap gap-2">
                {['Retail & D2C', 'Clinics & Wellness', 'Logistics', 'Education', 'Real Estate', 'Restaurants', 'Local Services', 'Manufacturing'].map(
                  (tag) => (
                    <span key={tag} className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink-soft">
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Pricing */}
        <div className="mt-20 grid gap-6 md:grid-cols-3 md:items-end">
          {BUSINESS_TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08} y={tier.highlighted ? 40 : 22}>
              <div
                className={`group relative flex h-full flex-col gap-6 overflow-hidden rounded-2xl p-7 transition-transform duration-300 sm:p-8 ${
                  tier.highlighted
                    ? 'border border-yellow/50 bg-gradient-to-b from-yellow/10 to-transparent shadow-[0_30px_80px_-30px_rgba(255,212,0,0.35)] md:-translate-y-6 md:scale-[1.03]'
                    : 'card hover:-translate-y-1'
                }`}
              >
                {/* ghost index number, bleeding off the corner */}
                <span className="font-display pointer-events-none absolute -top-8 -right-3 text-[8rem] leading-none font-bold text-ink/5 select-none sm:text-[9rem]">
                  0{i + 1}
                </span>

                {tier.highlighted && (
                  <span className="relative flex w-fit items-center gap-1 self-end rounded-full bg-yellow px-3 py-1 text-xs font-semibold text-bg">
                    <Sparkles className="h-3 w-3" /> {tier.tag}
                  </span>
                )}

                <div className="relative flex flex-col gap-1">
                  {!tier.highlighted && (
                    <p className="font-mono text-xs tracking-widest text-ink-faint uppercase">{tier.tag}</p>
                  )}
                  <h3 className="font-display text-2xl font-bold text-ink">{tier.name}</h3>
                </div>

                <div className="relative flex items-baseline gap-2 border-y border-line py-5">
                  <span className="font-display text-4xl font-bold text-ink sm:text-5xl">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-sm text-ink-faint">one-time</span>}
                </div>

                <ul className="relative flex flex-1 flex-col gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink-soft">
                      <Check className="h-4 w-4 shrink-0 text-ink-faint" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`flex w-full items-center justify-center ${
                    tier.highlighted ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  Choose {tier.name}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Student projects */}
      <section id="students" className="mx-auto max-w-7xl scroll-mt-32 px-6 py-24">
        <div className="grid items-start gap-10 md:grid-cols-2 lg:gap-14">
          <Reveal className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-line bg-white">
              <img
                src="/images/student-projects.png"
                alt="Laptop, project report, and viva slides for a student tech project in yellow and black"
                className="block h-auto w-full object-contain"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08} className="flex min-w-0 flex-col gap-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line text-ink-soft">
              <Boxes className="h-6 w-6" />
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Student tech projects</h2>
            <p className="text-ink-soft">
              We work alongside you — not behind your back — to build mini, major and final-year projects you
              genuinely understand. Every project comes with mentorship, documentation, and viva prep so you can
              present it with confidence.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                { label: 'Mini Projects', price: 'from ₹2,999' },
                { label: 'Major Projects', price: 'from ₹7,999' },
                { label: 'Final Year', price: 'from ₹14,999' },
                { label: 'Research-based', price: 'Custom quote' },
              ].map((p) => (
                <div key={p.label} className="card rounded-xl p-4">
                  <p className="text-xs text-ink-faint">{p.label}</p>
                  <p className="font-display mt-1 font-bold text-ink">{p.price}</p>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn-primary mt-2 w-fit">
              Discuss Your Project Idea
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-line bg-white p-6">
            <p className="mb-3 text-[11px] font-medium tracking-[0.16em] text-ink-faint uppercase">
              Domains we cover
            </p>
            <div className="flex flex-wrap gap-2">
              {STUDENT_DOMAINS.map((d) => (
                <span key={d} className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink-soft">
                  {d}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.06} className="rounded-2xl border border-line bg-white p-6">
            <p className="mb-3 text-[11px] font-medium tracking-[0.16em] text-ink-faint uppercase">
              What's included
            </p>
            <ul className="flex flex-col gap-2">
              {STUDENT_INCLUDES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-ink-soft">
                  <Check className="h-4 w-4 shrink-0 text-ink-faint" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Not sure which service fits?"
        description="Tell us what you're trying to build — we'll point you to the right service, tier, or track."
      />
    </>
  )
}
