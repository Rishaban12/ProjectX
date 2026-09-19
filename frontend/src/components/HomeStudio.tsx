import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Code2, Layers, Plus, Quote, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SERVICES, TESTIMONIALS } from '../lib/data'
import AuroraSky from './AuroraSky'
import HowWeWorkCarousel from './HowWeWorkCarousel'
import './home-studio.css'

function Entrance({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={{ opacity: 0, y: reduced ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: reduced ? 0 : .65 }}>{children}</motion.div>
}

const questions = [
  ['Where do we start?', 'Bring us your idea, business challenge, or project brief. We’ll discuss what you need and agree on the scope, timeline, and next steps before we begin.'],
  ['Can you work with an existing website or idea?', 'Yes. We can review what you already have and help you decide what to improve, rebuild, or develop next. Share the details through our contact page.'],
  ['Will I understand my student project?', 'That is central to the process. Mentorship, source code walkthroughs, documentation, and demo preparation help you understand and present your own work.'],
  ['What happens after launch?', 'We plan deployment, handover, and training with you. The support window and any ongoing maintenance are agreed as part of your project scope.'],
]

export default function HomeStudio() {
  const [service, setService] = useState(0)
  const [direction, setDirection] = useState(1)
  const reduced = useReducedMotion()
  const current = SERVICES[service]
  const pickService = (index: number) => {
    if (index === service) return
    setDirection(index > service ? 1 : -1)
    setService(index)
  }
  return <div className="home-studio">
    <section className="hs-section hs-services" aria-labelledby="hs-services-title">
      <div className="hs-wrap">
        <Entrance className="hs-heading"><div><p className="hs-kicker"><span />01 / WHAT WE DO</p><h2 id="hs-services-title">Big ambitions.<br /><span>Thoughtfully built.</span></h2></div><p>A digital presence. A project that matters. Your next career move. One studio to help you move forward.</p></Entrance>
        <div className="hs-service-picker" role="group" aria-label="Explore our services">{SERVICES.map((item, i) => <button key={item.label} aria-pressed={service === i} onClick={() => pickService(i)}><item.icon size={17} /><span>{item.label}</span>{service === i && <motion.span className="hs-selected" layoutId="hs-service-selected" transition={{ duration: reduced ? 0 : .35, ease: [0.22, 1, 0.36, 1] }} />}</button>)}</div>
        <div className="hs-service-panel" id="hs-service-panel">
          <div className="hs-service-content">
            <div className="hs-service-copy-slot">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`copy-${service}`}
                className="hs-service-copy"
                custom={direction}
                initial={reduced ? false : { opacity: 0, x: direction * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -24 }}
                transition={{ duration: reduced ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="hs-index">0{service + 1} / OUR EXPERTISE</span>
                <h3>{current.title}</h3>
                <p>{current.description}</p>
                <ul>{current.points.map(point => <li key={point}><Check size={15} />{point}</li>)}</ul>
                <Link className="hs-link" to={current.to}>Explore {current.label.toLowerCase()}<ArrowUpRight size={19} /></Link>
              </motion.div>
            </AnimatePresence>
            </div>
            <div className="hs-preview">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={current.image}
                  src={current.image}
                  alt={current.imageAlt}
                  className="hs-preview-image"
                  custom={direction}
                  initial={reduced ? false : { opacity: 0, x: direction * 48, scale: 1.04 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction * -36, scale: 0.98 }}
                  transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
        <Entrance className="hs-principles">{[[Code2, 'Engineered to last', 'Clean foundations. Room to grow.'], [Layers, 'Designed around you', 'Your goals shape every decision.'], [Sparkles, 'Clarity at every step', 'Real conversations. No guesswork.']].map(([Icon, title, text]) => { const Mark = Icon as typeof Code2; return <div key={String(title)}><Mark size={20} /><div><h3>{String(title)}</h3><p>{String(text)}</p></div></div> })}</Entrance>
      </div>
    </section>

    <section className="hs-how" aria-labelledby="hs-process-title">
      <HowWeWorkCarousel>
        <div className="hs-wrap">
          <Entrance className="hs-heading hs-how-heading">
            <div>
              <p className="hs-kicker"><span />02 / HOW WE WORK</p>
              <h2 id="hs-process-title">From a first conversation<br />to <em>something real.</em></h2>
            </div>
            <p>From discovery to launch, each step is handled the same way — one structured process, with you in the loop. Scroll to move through the work.</p>
          </Entrance>
        </div>
      </HowWeWorkCarousel>
    </section>

    <div className="hs-aurora-band">
      <div className="hs-aurora-sticky">
        <AuroraSky />
      </div>
      <div className="hs-aurora-content">
        <section className="hs-section hs-voices" aria-labelledby="hs-voices-title"><div className="hs-wrap"><Entrance className="hs-heading"><div><p className="hs-kicker"><span />03 / THE PEOPLE BEHIND THE PROJECTS</p><h2 id="hs-voices-title">Good work.<br /><span>Better relationships.</span></h2></div><Link to="/wall-of-voices" className="hs-link">Visit the wall of voices<ArrowUpRight size={18} /></Link></Entrance><div className="hs-quotes">{TESTIMONIALS.slice(0, 3).map((t, i) => <Entrance key={t.id} className={`hs-quote hs-quote-${i}`}><Quote size={29} strokeWidth={1.2} aria-hidden="true" /><blockquote>{t.quote}</blockquote><div className="hs-person"><span className="hs-avatar" aria-hidden="true">{t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span><div><strong>{t.name}</strong><p>{t.role} · {t.company}</p></div></div></Entrance>)}</div></div></section>

        <section className="hs-faq" aria-labelledby="hs-faq-title">
          <div className="hs-wrap">
            <Entrance className="hs-faq-head">
              <div>
                <p className="hs-kicker"><span />A LITTLE CLARITY</p>
                <h2 id="hs-faq-title">Before we <span>get started.</span></h2>
              </div>
              <p className="hs-faq-lead">A few answers before we talk. If yours isn’t here, a short note is enough.</p>
            </Entrance>
            <div className="hs-faq-list">
              {questions.map(([q, a], i) => (
                <details key={q} className="hs-faq-item">
                  <summary>
                    <span className="hs-faq-index">0{i + 1}</span>
                    <span className="hs-faq-q">{q}</span>
                    <span className="hs-faq-toggle" aria-hidden="true"><Plus size={18} /></span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="hs-closing" aria-labelledby="hs-closing-title">
          <Entrance className="hs-wrap hs-closing-finale">
            <p className="hs-kicker"><span />LET’S MAKE IT HAPPEN</p>
            <h2 id="hs-closing-title">Your next big thing<br />starts <span>right here.</span></h2>
            <p className="hs-closing-lead">A rough idea is enough. We’ll help you find the right next step — website, student project, or something new.</p>
            <Link className="hs-cta" to="/contact">Tell us what you’re thinking<ArrowUpRight size={21} /></Link>
            <ul className="hs-closing-points">
              <li><Check size={16} /><span>Clear scope before we begin</span></li>
              <li><Check size={16} /><span>English & Tamil</span></li>
              <li><Check size={16} /><span>No polished brief needed</span></li>
            </ul>
          </Entrance>
        </section>
      </div>
    </div>
  </div>
}
