import { ArrowDown } from 'lucide-react'

const BEFORE_STEPS = [
  'Manual development',
  'Specialized teams',
  'Longer development cycles',
  'Higher technical complexity',
]

const TODAY_STEPS = [
  'AI-assisted engineering',
  'Intelligent automation',
  'Faster development workflows',
  'More accessible technology',
]

const ZECQORA_STEPS = ['Business Need', 'Intelligence', 'Engineering', 'Technology', 'Impact']

function StepFlow({ steps, textClassName = 'text-ink-soft' }: { steps: string[]; textClassName?: string }) {
  return (
    <div className={`flex flex-col items-center text-center text-sm leading-6 ${textClassName}`}>
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col">
          <span>{step}</span>
          {i < steps.length - 1 && (
            <div className="flex justify-center">
              <ArrowDown className="my-1.5 h-3.5 w-3.5 text-ink-faint/60" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const BELIEFS = [
  {
    number: '01',
    title: 'Technology Without Boundaries',
    description:
      'Advanced technology should be accessible to businesses regardless of their size, location, or technical background.',
  },
  {
    number: '02',
    title: 'Build Around the Need',
    description:
      'There is no one-size-fits-all solution. We understand the requirement first, then design and engineer technology around it.',
  },
  {
    number: '03',
    title: 'AI as a Capability',
    description:
      'AI is not just a feature or trend. We help businesses understand where AI creates value and integrate it meaningfully into their products and operations.',
  },
  {
    number: '04',
    title: 'Engineering with Purpose',
    description:
      'Good software is more than code. Architecture, security, scalability, performance, usability, and maintainability matter from the beginning.',
  },
  {
    number: '05',
    title: 'Continuous Adaptation',
    description: 'Technology never stands still. We build solutions that can evolve as businesses, users, and technologies change.',
  },
]

export default function Manifesto() {
  return (
    <article className="mx-auto max-w-2xl px-6 pt-32 pb-24">
      <h1 className="hero-title text-4xl text-ink sm:text-5xl">Technology keeps moving. We move with it.</h1>

      <div className="mt-14 flex flex-col gap-14">
        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink">Before AI</h2>
          <p className="text-lg leading-8 text-ink-soft">
            Building software required significant time, specialized teams, planning, development, testing,
            deployment, and continuous maintenance. For many businesses, especially smaller and non-technical
            businesses, technology could feel expensive, complex, and difficult to access.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink">Then came the cloud</h2>
          <p className="text-lg leading-8 text-ink-soft">
            Cloud platforms, open-source technologies, frameworks, and modern development tools made software
            faster to build, easier to deploy, and more accessible to businesses of different sizes.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink">Now comes intelligent engineering</h2>
          <p className="text-lg leading-8 text-ink-soft">
            AI is changing how software is designed, developed, tested, analyzed, and maintained. Tasks that
            once required substantial manual effort can increasingly be assisted by intelligent systems,
            allowing engineers to focus more on architecture, decisions, creativity, and solving the actual
            business problem.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink">This is where Zecqora comes in</h2>
          <p className="text-lg leading-8 text-ink-soft">
            We use advanced intelligence, modern engineering, and AI-powered development to turn business
            requirements into technology with less complexity and more efficiency.
          </p>
          <p className="font-display text-xl font-semibold text-ink">
            A business should not need to become a technology company just to benefit from technology.
          </p>
          <p className="text-lg leading-8 text-ink-soft">
            Whether it is a rural business without a digital presence, a non-technical company looking to
            modernize, or a technology-driven organization building its next product, Zecqora helps bridge the
            gap between the business problem and the technology required to solve it.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink">Our mission</h2>
          <p className="text-lg leading-8 text-ink-soft">
            To make modern software and AI accessible to every business — bringing advanced technology closer
            to businesses that have traditionally been left behind by the pace of technological change.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-2xl font-semibold text-ink">From complexity to capability</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-3 rounded-2xl border border-line bg-ink/[0.03] p-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">Before</p>
              <StepFlow steps={BEFORE_STEPS} />
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-line bg-[color:var(--color-pastel-violet)]/[0.06] p-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">Today</p>
              <StepFlow steps={TODAY_STEPS} />
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-yellow/50 bg-yellow/10 p-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-ink uppercase">Zecqora</p>
              <StepFlow steps={ZECQORA_STEPS} textClassName="text-ink" />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="font-display text-2xl font-semibold text-ink">We believe in</h2>
          <div className="flex flex-col gap-8">
            {BELIEFS.map((belief) => (
              <div key={belief.number} className="flex gap-5">
                <span className="font-display shrink-0 text-sm font-semibold text-ink-faint">{belief.number}</span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-lg font-semibold text-ink">{belief.title}</h3>
                  <p className="text-base leading-7 text-ink-soft">{belief.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink">Our belief</h2>
          <p className="text-lg leading-8 text-ink-soft">
            You shouldn't need to understand the complexity of technology to benefit from it.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink">Our purpose</h2>
          <p className="text-lg leading-8 text-ink-soft">Bring advanced technology to every business, wherever they are.</p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink">Our direction</h2>
          <p className="text-lg leading-8 text-ink-soft">
            From rural businesses to modern enterprises, we help turn technology from a barrier into an
            opportunity.
          </p>
        </section>
      </div>
    </article>
  )
}
