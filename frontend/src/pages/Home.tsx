import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Counter from '../components/Counter'
import CTASection from '../components/CTASection'
import Marquee from '../components/Marquee'
import Reveal from '../components/Reveal'
import ScribbleHighlight from '../components/ScribbleHighlight'
import SectionHeading from '../components/SectionHeading'
import ServicesShowcase from '../components/ServicesShowcase'
import { AnimatedSpan, Terminal, TypingAnimation } from '../components/Terminal'
import TreeGrowth from '../components/TreeGrowth'
import { AnimatedTestimonials } from '../components/ui/animated-testimonials'
import { PROCESS, STATS, TESTIMONIALS } from '../lib/data'

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
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 420], [1, 0])
  const heroY = useTransform(scrollY, [0, 420], [0, 70])

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[92vh] overflow-hidden px-6 pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-3xl">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="flex flex-col items-start text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title max-w-xl text-5xl text-ink sm:text-6xl lg:text-[4.35rem]"
            >
              Ask for anything, we'll{' '}
              <ScribbleHighlight>
                <span className="text-ink">engineer it</span>
              </ScribbleHighlight>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-lg text-[15px] leading-7 text-ink-soft sm:text-base"
            >
              Zecqora is a technology studio for growing businesses and ambitious students — we design websites,
              engineer student projects, run hands-on AI &amp; coding sessions, and build the resumes that get you hired.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center justify-start gap-4"
            >
              <Link to="/contact" className="btn-primary group">
                Start Your Project
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link to="/learning" className="btn-secondary">
                Explore Learning Hub
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 grid w-full max-w-lg grid-cols-2 gap-6 sm:grid-cols-4"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col items-start gap-1">
                  <span className="font-display text-2xl font-bold text-ink sm:text-3xl">
                    <Counter value={stat.value} />
                  </span>
                  <span className="text-left text-xs text-ink-faint">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-ink-faint"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </section>

      <Marquee items={TECH} />

      {/* Learning highlight — dark promo band, right after the hero */}
      <section className="relative overflow-hidden bg-ink px-6 py-24 text-center">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 font-mono text-xs font-medium text-yellow uppercase">
            AI Invasion &amp; Adaptiveness
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The tech is changing fast. Learn to adapt faster than it does.
          </h2>
          <p className="text-white/70">
            Our signature learning track goes beyond "how to prompt ChatGPT" — we teach you to spot where AI is
            reshaping your field, and how to stay indispensable inside it.
          </p>
          <Link
            to="/learning"
            className="inline-flex items-center gap-2 rounded-sm bg-white px-6 py-3 text-[11px] font-semibold tracking-[0.14em] text-ink uppercase transition-transform hover:scale-105"
          >
            See Learning Tracks
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto mt-14 flex max-w-lg justify-center">
          <Terminal className="relative">
            <TypingAnimation>&gt; Prompt Engineering</TypingAnimation>
            <AnimatedSpan className="text-white/50">✔ Track loaded.</AnimatedSpan>
            <TypingAnimation>&gt; AI Product Building</TypingAnimation>
            <AnimatedSpan className="text-white/50">✔ Track loaded.</AnimatedSpan>
            <TypingAnimation>&gt; Workflow Automation</TypingAnimation>
            <AnimatedSpan className="text-white/50">✔ Track loaded.</AnimatedSpan>
            <TypingAnimation>&gt; Ethics &amp; Guardrails</TypingAnimation>
            <AnimatedSpan className="text-white/50">✔ Track loaded.</AnimatedSpan>
            <TypingAnimation className="text-white/50">Ready to adapt.</TypingAnimation>
          </Terminal>
        </Reveal>
      </section>

      <ServicesShowcase />

      {/* Process — grows in as a tree while you scroll */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="How it works"
          title="A process that keeps you in the loop"
          description="Four steps. One studio. You stay in the loop from first brief to launch."
        />
        <div className="mt-8">
          <TreeGrowth steps={PROCESS} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedTestimonials
            className="bg-transparent py-0"
            badgeText="Trusted by"
            title="Businesses, students, and career switchers"
            subtitle="A few of the people we've built with."
            autoRotateInterval={6000}
            // trustedCompaniesTitle="Teams and stacks we work with"
            // trustedCompanies={['Google', 'Microsoft', 'Airbnb', 'Spotify', 'Netflix']}
            testimonials={TESTIMONIALS.map((item) => ({
              id: item.id,
              name: item.name,
              role: item.role,
              company: item.company,
              content: item.quote,
              rating: item.rating,
              avatar: item.avatar,
            }))}
          />
        </div>
      </section>

      <CTASection />
    </>
  )
}
