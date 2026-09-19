import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import HeroFlowField from '../components/HeroFlowField'
import HomeStudio from '../components/HomeStudio'
import Reveal from '../components/Reveal'
import ScribbleHighlight from '../components/ScribbleHighlight'
import { AnimatedSpan, Terminal, TypingAnimation } from '../components/Terminal'
import { STATS } from '../lib/data'

export default function Home() {
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 420], [1, 0])
  const heroY = useTransform(scrollY, [0, 420], [0, 70])

  const darkBandRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: darkBandProgress } = useScroll({
    target: darkBandRef,
    offset: ['start end', 'start start'],
  })
  const darkBandMarginX = useTransform(darkBandProgress, [0, 1], ['12vw', '0vw'])
  const darkBandRadius = useTransform(darkBandProgress, [0, 1], ['32px', '0px'])

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-32 pr-6 pb-20 pl-28">
        <HeroFlowField />
        <div className="relative z-10 max-w-3xl">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="flex flex-col items-start text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title text-5xl text-ink sm:text-6xl lg:text-[4.35rem]"
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
              className="mt-8 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg"
            >
              We engineer tailored software and AI solutions built around your business -
              <br />
              secure, scalable, and designed to deliver lasting value.
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
                Connect With Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick highlights strip */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-8 border-t border-line pt-10 sm:grid-cols-5">
          {STATS.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 0.06} className="flex flex-col gap-1">
              <span className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-sm text-ink-soft">{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Learning highlight — dark promo band, right after the hero */}
      <motion.section
        ref={darkBandRef}
        data-nav-theme="dark"
        style={{ marginLeft: darkBandMarginX, marginRight: darkBandMarginX, borderRadius: darkBandRadius }}
        className="relative overflow-hidden bg-ink px-6 py-24 text-center"
      >
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
      </motion.section>

      <HomeStudio />
    </>
  )
}
