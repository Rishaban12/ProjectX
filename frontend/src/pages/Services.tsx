import { Check, ShoppingBag, Sparkles } from 'lucide-react'
import { Boxes, Globe2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

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
      <section className="mx-auto max-w-5xl px-6 pt-40 pb-16 text-center">
        <SectionHeading
          eyebrow="Services"
          title="Built for businesses that are growing, and students who are building."
          description="Two very different audiences, one standard: work you can actually launch, submit, and defend."
        />
      </section>

      {/* Business websites */}
      <section id="business" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal className="flex flex-col gap-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue text-white">
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
                  <Check className="h-4 w-4 shrink-0 text-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="card relative overflow-hidden rounded-2xl p-8">
            <div className="animate-blob absolute -top-10 -right-10 h-48 w-48 rounded-full bg-pastel-aqua/60 blur-3xl" />
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs text-ink-faint">
                <ShoppingBag className="h-4 w-4" /> Example industries we serve
              </div>
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
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {BUSINESS_TIERS.map((tier) => (
            <Reveal key={tier.name}>
              <div
                className={`relative flex h-full flex-col gap-6 rounded-2xl p-7 ${
                  tier.highlighted ? 'border-2 border-blue/40 bg-blue/5' : 'card'
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-7 flex items-center gap-1 rounded-full bg-blue px-3 py-1 text-xs font-semibold text-white">
                    <Sparkles className="h-3 w-3" /> {tier.tag}
                  </span>
                )}
                <div>
                  {!tier.highlighted && <p className="mb-1 text-xs text-ink-faint">{tier.tag}</p>}
                  <h3 className="font-display text-xl font-bold text-ink">{tier.name}</h3>
                  <p className="mt-2 text-3xl font-bold text-ink">{tier.price}</p>
                </div>
                <ul className="flex flex-1 flex-col gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink-soft">
                      <Check className="h-4 w-4 shrink-0 text-blue" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`rounded-lg px-5 py-3 text-center text-sm font-semibold transition-transform hover:scale-105 ${
                    tier.highlighted ? 'bg-blue text-white' : 'border border-line-strong text-ink'
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
      <section id="students" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal delay={0.1} className="order-2 md:order-1">
            <div className="card relative overflow-hidden rounded-2xl p-8">
              <div className="animate-blob absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-green/20 blur-3xl [animation-delay:4s]" />
              <div className="relative flex flex-col gap-4">
                <p className="text-xs text-ink-faint">Domains we cover</p>
                <div className="flex flex-wrap gap-2">
                  {STUDENT_DOMAINS.map((d) => (
                    <span key={d} className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink-soft">
                      {d}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs text-ink-faint">What's included</p>
                <ul className="flex flex-col gap-2">
                  {STUDENT_INCLUDES.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink-soft">
                      <Check className="h-4 w-4 shrink-0 text-green" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal className="order-1 flex flex-col gap-5 md:order-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green text-white">
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
            <Link
              to="/contact"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg bg-green px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              Discuss Your Project Idea
            </Link>
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
