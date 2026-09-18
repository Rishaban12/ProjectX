import { Link, useParams } from 'react-router-dom'
import CTASection from '../components/CTASection'
import PageHero from '../components/PageHero'
import ScribbleHighlight from '../components/ScribbleHighlight'
import { SERVICES_MENU, slugifyService } from '../lib/data'

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()

  for (const category of SERVICES_MENU) {
    const item = category.items.find((candidate) => slugifyService(candidate.label) === slug)
    if (!item) continue

    return (
      <>
        <PageHero
          eyebrow={category.label}
          description={item.description ?? `Explore how ${item.label} can move your business forward.`}
        >
          {category.label === 'AI & Automation' ? (
            <>
              <ScribbleHighlight className="whitespace-normal" style={{ whiteSpace: 'normal' }}>
                <span className="text-ink">Technologies keep moving. We move with it.</span>
              </ScribbleHighlight>
              <span className="mt-4 block text-2xl font-semibold text-ink-soft sm:text-3xl">{item.label}</span>
            </>
          ) : (
            <ScribbleHighlight>
              <span className="text-ink">{item.label}</span>
            </ScribbleHighlight>
          )}
        </PageHero>
        <CTASection />
      </>
    )
  }

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="hero-title text-4xl text-ink sm:text-5xl">Service not found</h1>
      <p className="max-w-md text-ink-soft">
        We couldn't find that service. It may have moved — take a look at everything we offer.
      </p>
      <Link to="/services" className="btn-primary">
        Back to Services
      </Link>
    </section>
  )
}
