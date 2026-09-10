import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Counter from '../components/Counter'
import CTASection from '../components/CTASection'
import Marquee from '../components/Marquee'
import Reveal from '../components/Reveal'
import RocketIllustration from '../components/RocketIllustration'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import { PROCESS, SERVICES, STATS, TESTIMONIALS } from '../lib/data'

const TECH = [
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'TypeScript',
  'TensorFlow',
  'MongoDB',
  'AWS',
  'Figma',
  'Tailwind CSS',
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative px-6 pt-40 pb-24 text-center">
        <RocketIllustration className="pointer-events-none absolute top-28 right-[4%] z-0 hidden w-56 lg:block xl:right-[7%] xl:w-64" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-xs font-medium text-ink-soft"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue" />
          Websites &middot; Student Projects &middot; Tech Learning &middot; Careers
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display max-w-4xl text-4xl leading-[1.05] font-bold tracking-tight text-balance text-ink sm:text-6xl md:text-7xl"
        >
          We build your <span className="text-gradient">website</span>, your{' '}
          <span className="text-gradient">project</span>, and your{' '}
          <span className="text-gradient">next skill</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-ink-soft"
        >
          ProjectX is a technology studio for growing businesses and ambitious students — we design websites,
          engineer student projects, run hands-on AI &amp; coding sessions, and build the resumes that get you hired.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-blue px-7 py-4 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/learning"
            className="group inline-flex items-center gap-2 rounded-lg border border-line-strong px-7 py-4 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
          >
            <Play className="h-4 w-4 fill-ink text-ink" />
            Explore Learning Hub
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid w-full max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-display text-2xl font-bold text-ink sm:text-3xl">
                <Counter value={stat.value} />
              </span>
              <span className="text-center text-xs text-ink-faint">{stat.label}</span>
            </div>
          ))}
        </motion.div>
        </div>
      </section>

      <Marquee items={TECH} />

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="What we do"
          title="Four services. One studio built to ship."
          description="Pick a lane, or combine them — most of our clients start with a website and end up learning to run it themselves."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} delay={i * 0.08} />
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="How it works"
          title="A process that keeps you in the loop"
          description="No black boxes. You see every wireframe, every commit, every draft before it's final."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {PROCESS.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal key={step.title} delay={i * 0.1} className="relative">
                <div className="card flex h-full flex-col gap-4 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink/5 text-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-3xl font-bold text-ink/10">0{i + 1}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink">{step.title}</h3>
                  <p className="text-sm text-ink-soft">{step.description}</p>
                </div>
                {i < PROCESS.length - 1 && (
                  <div className="absolute top-1/2 -right-3 hidden h-px w-6 bg-gradient-to-r from-line-strong to-transparent md:block" />
                )}
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Learning highlight */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="card grid overflow-hidden rounded-2xl md:grid-cols-2">
          <Reveal className="flex flex-col justify-center gap-6 p-10 sm:p-14">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-xs font-medium text-orange uppercase">
              AI Invasion &amp; Adaptiveness
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              The tech is changing fast. Learn to adapt faster than it does.
            </h2>
            <p className="text-ink-soft">
              Our signature learning track goes beyond "how to prompt ChatGPT" — we teach you to spot where AI is
              reshaping your field, and how to stay indispensable inside it.
            </p>
            <Link
              to="/learning"
              className="group inline-flex w-fit items-center gap-2 rounded-lg bg-orange px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              See Learning Tracks
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="relative min-h-[280px] overflow-hidden bg-surface">
            <div className="animate-blob absolute top-10 right-10 h-56 w-56 rounded-full bg-pastel-pink/60 blur-3xl" />
            <div className="animate-blob absolute bottom-10 left-10 h-56 w-56 rounded-full bg-pastel-violet/60 blur-3xl [animation-delay:6s]" />
            <div className="relative flex h-full flex-col items-center justify-center gap-4 p-10 text-center">
              {['Prompt Engineering', 'AI Product Building', 'Workflow Automation', 'Ethics & Guardrails'].map(
                (tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="card rounded-full px-5 py-2.5 text-sm font-medium text-ink"
                  >
                    {tag}
                  </motion.span>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Trusted by"
          title="Businesses, students, and career switchers"
          description="A few of the people we’ve built with."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="card flex h-full flex-col gap-5 rounded-2xl p-7">
                <p className="text-lg text-ink">"{t.quote}"</p>
                <div className="mt-auto flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-ink-faint">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  )
}
