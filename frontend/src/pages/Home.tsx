import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Counter from '../components/Counter'
import CTASection from '../components/CTASection'
import Marquee from '../components/Marquee'
import Reveal from '../components/Reveal'
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
      <section className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-40 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
          Websites &middot; Student Projects &middot; Tech Learning &middot; Careers
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display max-w-4xl text-4xl leading-[1.05] font-bold text-balance text-white sm:text-6xl md:text-7xl"
        >
          We build your <span className="text-gradient">website</span>, your{' '}
          <span className="text-gradient">project</span>, and your{' '}
          <span className="text-gradient">next skill</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-white/60"
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
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-500 px-7 py-4 text-sm font-semibold text-black transition-transform hover:scale-105"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/learning"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Play className="h-4 w-4 fill-white text-white" />
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
              <span className="font-display text-2xl font-bold text-white sm:text-3xl">
                <Counter value={stat.value} />
              </span>
              <span className="text-center text-xs text-white/45">{stat.label}</span>
            </div>
          ))}
        </motion.div>
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
                <div className="glass flex h-full flex-col gap-4 rounded-3xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cyan-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-3xl font-bold text-white/10">0{i + 1}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-sm text-white/55">{step.description}</p>
                </div>
                {i < PROCESS.length - 1 && (
                  <div className="absolute top-1/2 -right-3 hidden h-px w-6 bg-gradient-to-r from-white/20 to-transparent md:block" />
                )}
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Learning highlight */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="glass grid overflow-hidden rounded-3xl md:grid-cols-2">
          <Reveal className="flex flex-col justify-center gap-6 p-10 sm:p-14">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-pink-300 uppercase">
              AI Invasion &amp; Adaptiveness
            </span>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              The tech is changing fast. Learn to adapt faster than it does.
            </h2>
            <p className="text-white/60">
              Our signature learning track goes beyond "how to prompt ChatGPT" — we teach you to spot where AI is
              reshaping your field, and how to stay indispensable inside it.
            </p>
            <Link
              to="/learning"
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              See Learning Tracks
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="relative min-h-[280px] overflow-hidden bg-white/[0.02]">
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="animate-blob absolute top-10 right-10 h-56 w-56 rounded-full bg-pink-500/25 blur-3xl" />
            <div className="animate-blob absolute bottom-10 left-10 h-56 w-56 rounded-full bg-violet-500/25 blur-3xl [animation-delay:6s]" />
            <div className="relative flex h-full flex-col items-center justify-center gap-4 p-10 text-center">
              {['Prompt Engineering', 'AI Product Building', 'Workflow Automation', 'Ethics & Guardrails'].map(
                (tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="glass rounded-full px-5 py-2.5 text-sm font-medium text-white"
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
              <div className="glass flex h-full flex-col gap-5 rounded-3xl p-7">
                <p className="text-lg text-white/80">"{t.quote}"</p>
                <div className="mt-auto flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-cyan-400 to-pink-500 text-sm font-bold text-black">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/45">{t.role}</p>
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
