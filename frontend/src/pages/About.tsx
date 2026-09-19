import CTASection from '../components/CTASection'
import FloatingStatCards from '../components/FloatingStatCards'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import ScribbleHighlight from '../components/ScribbleHighlight'

const FOUNDERS = [
  { name: 'Arjun R.', role: 'Founder & CEO' },
  { name: 'Sneha K.', role: 'Co-Founder & CTO' },
  { name: 'Rahul V.', role: 'Co-Founder & Head of AI' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        description="At Zecqora, we engineer customized software and AI solutions that help businesses grow with secure, scalable and intelligent technology."
        titleSize="text-4xl sm:text-5xl lg:text-[3.5rem]"
        decoration={<FloatingStatCards />}
      >
        We build technology that moves businesses forward
      </PageHero>

      <section className="mx-auto max-w-[1460px] px-6 py-16 text-left sm:py-20">
        <p className="hero-title text-2xl text-ink sm:text-3xl lg:text-[2rem]">
          <span className="block">
            <ScribbleHighlight className="whitespace-normal">
              <span className="text-ink">Advanced technology for every business.</span>
            </ScribbleHighlight>
          </span>
          <span className="block text-ink-soft">
            Zecqora was founded to bring software and AI to businesses that are ready to grow.
          </span>
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {FOUNDERS.map((founder, i) => (
            <Reveal key={founder.name} delay={i * 0.08} className="flex flex-col gap-3">
              <div className="aspect-square w-full rounded-2xl border border-line bg-card" />
              <div>
                <p className="font-display text-base font-semibold text-ink">{founder.name}</p>
                <p className="text-sm text-ink-faint">{founder.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  )
}
