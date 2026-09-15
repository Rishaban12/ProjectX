import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Counter from '../components/Counter'
import CTASection from '../components/CTASection'
import Marquee from '../components/Marquee'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import ServicesShowcase from '../components/ServicesShowcase'
import { AnimatedSpan, Terminal, TypingAnimation } from '../components/Terminal'
import TreeGrowth from '../components/TreeGrowth'
import { AnimatedTestimonials } from '../components/ui/animated-testimonials'
import RotatingEarth from '../components/ui/wireframe-dotted-globe'
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
        <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2 lg:gap-8">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="flex flex-col items-start text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="font-display max-w-xl text-5xl leading-[1.08] font-semibold tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.35rem]"
            >
              We build your website, your project, and your{' '}
              <span className="text-yellow">next skill</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-lg text-[15px] leading-7 text-ink-soft sm:text-base"
            >
              ProjectX is a technology studio for growing businesses and ambitious students — we design websites,
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

          <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[520px] lg:justify-self-end">
            <RotatingEarth
              width={520}
              height={520}
              interactive={false}
              showHint={false}
              className="h-full w-full"
            />
          </div>
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

      {/* Learning highlight */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="card grid overflow-hidden rounded-2xl md:grid-cols-2">
          <Reveal className="flex flex-col justify-center gap-6 p-10 sm:p-14">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-xs font-medium text-yellow uppercase">
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
              className="btn-primary group"
            >
              See Learning Tracks
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-surface p-6 sm:p-10">
            <div className="animate-blob absolute top-10 right-10 h-56 w-56 rounded-full bg-pastel-pink/30 blur-3xl" />
            <div className="animate-blob absolute bottom-10 left-10 h-56 w-56 rounded-full bg-pastel-violet/30 blur-3xl [animation-delay:6s]" />
            <Terminal className="relative">
              <TypingAnimation>&gt; Prompt Engineering</TypingAnimation>
              <AnimatedSpan className="text-ink-faint">✔ Track loaded.</AnimatedSpan>
              <TypingAnimation>&gt; AI Product Building</TypingAnimation>
              <AnimatedSpan className="text-ink-faint">✔ Track loaded.</AnimatedSpan>
              <TypingAnimation>&gt; Workflow Automation</TypingAnimation>
              <AnimatedSpan className="text-ink-faint">✔ Track loaded.</AnimatedSpan>
              <TypingAnimation>&gt; Ethics &amp; Guardrails</TypingAnimation>
              <AnimatedSpan className="text-ink-faint">✔ Track loaded.</AnimatedSpan>
              <TypingAnimation className="text-ink-faint">Ready to adapt.</TypingAnimation>
            </Terminal>
          </Reveal>
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
