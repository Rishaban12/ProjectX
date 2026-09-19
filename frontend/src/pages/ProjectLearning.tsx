import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'

const PATHS = [
  {
    title: 'Custom Projects',
    description:
      'Built from scratch around your own idea, problem statement and college requirements — a project that is genuinely yours.',
    className: 'bg-violet-100',
  },
  {
    title: 'Pre-Built Projects',
    description:
      'Start from a working project in your domain and customize it — faster to get moving, still yours to explain and defend.',
    className: 'bg-blue-100',
  },
]

const NEEDS_FIELDS = [
  'Title',
  'Problem statement',
  'Project domain',
  'Preferred tech stack',
  'Team size',
  'College / course',
  'Deadline',
  'Budget',
  'Basic idea',
  'Phone number',
]

const CONFIRM_QUESTIONS = [
  'Are you sure? Rate your confirmation.',
  'How far have you already developed the project?',
  'Preferred way to communicate — WhatsApp, phone call, or Google Meet.',
  'Give us 2 days to understand your project.',
]

const TRACKING_FEATURES = [
  'Project Techstack Learnings',
  'Coding & Schema Design',
  'Do one Project Features',
  'Bug Fixing',
  'Project Quiz & Tech Quiz',
  'Architecture Design (Drag & Drop)',
  'Resume Guidance',
]

const BUILD_STAGES = [
  {
    title: 'Communication',
    description: 'Regular updates on progress, shared straight to your projects and docs.',
  },
  {
    title: 'Document Generator',
    description: 'Comparison notes and a cost estimate, so you always know where things stand.',
  },
  {
    title: 'Dashboards',
    description: 'Track priority, communication history, and who on our team is assigned to you.',
  },
]

export default function ProjectLearning() {
  const [transitioning, setTransitioning] = useState(false)
  const lifecycleRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: lifecycleProgress } = useScroll({
    target: lifecycleRef,
    offset: ['start end', 'start start'],
  })
  const lifecycleMarginX = useTransform(lifecycleProgress, [0, 1], ['12vw', '0vw'])
  const lifecycleRadius = useTransform(lifecycleProgress, [0, 1], ['32px', '0px'])
  const zScale = useTransform(lifecycleProgress, [0, 1], [0.6, 1.4])
  const zOpacity = useTransform(lifecycleProgress, [0, 0.6, 1], [0, 0.1, 0.07])

  const goToLifecycle = () => {
    if (transitioning) return
    setTransitioning(true)
    window.setTimeout(() => {
      lifecycleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 350)
    window.setTimeout(() => {
      setTransitioning(false)
    }, 1000)
  }

  return (
    <>
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block skew-x-12 font-display text-8xl font-black text-white"
            >
              Z
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <PageHero
        eyebrow="Rural Tech Empowerment"
        description={
          <>
            Pick a custom-built project or a pre-built one —
            <br />
            we scope it, build it with you, and keep you in the loop the whole way.
          </>
        }
        navTheme="dark"
        decoration={
          <div aria-hidden className="absolute inset-0">
            <img
              src="/images/project_learning.jpeg"
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-ink/45" />
          </div>
        }
      >
        Project Learning
      </PageHero>

      {/* Two paths */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
            Two ways to learn by building
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {PATHS.map((path, i) => (
            <Reveal key={path.title} delay={i * 0.08} y={0} x={i === 0 ? -80 : 80}>
              <div
                onClick={i === 0 ? goToLifecycle : undefined}
                role={i === 0 ? 'button' : undefined}
                tabIndex={i === 0 ? 0 : undefined}
                className={`animate-float flex flex-col gap-3 rounded-2xl border border-line p-8 ${path.className} ${
                  i === 0 ? 'cursor-pointer' : ''
                }`}
                style={{ animationDelay: `${i * 0.7}s` }}
              >
                <h3 className="font-display text-xl font-bold text-ink">{path.title}</h3>
                <p className="text-sm leading-6 text-ink-soft">{path.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lifecycle — grows to full width and reveals a giant Z watermark as you scroll in */}
      <motion.section
        ref={lifecycleRef}
        data-nav-theme="dark"
        style={{ marginLeft: lifecycleMarginX, marginRight: lifecycleMarginX, borderRadius: lifecycleRadius }}
        className="relative overflow-hidden bg-ink px-6 py-20"
      >
        <motion.span
          aria-hidden
          style={{ scale: zScale, opacity: zOpacity }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[46vw] leading-none font-black text-white select-none"
        >
          Z
        </motion.span>

        <div className="relative mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium tracking-[0.2em] text-white/50 uppercase">How it works</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            From idea to a project you can defend
          </h2>
        </div>

        <div className="relative mt-14 grid gap-8 lg:grid-cols-3">
          <Reveal className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-7">
            <span className="w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-white/60 uppercase">
              Step 1
            </span>
            <h3 className="font-display text-lg font-bold text-white">Tell us what you need</h3>
            <ul className="flex flex-wrap gap-2">
              {NEEDS_FIELDS.map((field) => (
                <li
                  key={field}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/70"
                >
                  {field}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-7">
            <span className="w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-white/60 uppercase">
              Step 2
            </span>
            <h3 className="font-display text-lg font-bold text-white">We confirm the details</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-white/70">
              {CONFIRM_QUESTIONS.map((q) => (
                <li key={q} className="flex gap-2">
                  <span className="text-white/40">·</span>
                  {q}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-7">
            <span className="w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-white/60 uppercase">
              Step 3
            </span>
            <h3 className="font-display text-lg font-bold text-white">We scope and build it</h3>
            <div>
              <p className="text-sm font-semibold text-white">Project Tracking</p>
              <ul className="mt-1.5 flex flex-col gap-1.5">
                {TRACKING_FEATURES.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-white/70">
                    <span className="text-white/40">·</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <ul className="flex flex-col gap-3">
              {BUILD_STAGES.map((stage) => (
                <li key={stage.title}>
                  <p className="text-sm font-semibold text-white">{stage.title}</p>
                  <p className="text-sm text-white/70">{stage.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </motion.section>

      {/* Final choice */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
          Ready to start? Pick your path.
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact" className="btn-primary group">
            Build a Custom Project
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/contact" className="btn-secondary">
            Choose a Pre-Built Project
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  )
}
