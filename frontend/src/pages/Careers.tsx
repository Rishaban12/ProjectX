import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import PageHero from '../components/PageHero'
import ScribbleHighlight from '../components/ScribbleHighlight'

export default function Careers() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        description="Join a team building modern software and AI solutions that solve real-world business challenges."
        actions={
          <Link to="/contact" className="btn-primary group">
            Careers
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        }
      >
        <ScribbleHighlight>
          <span className="text-ink">Grow with Zecqora.</span>
        </ScribbleHighlight>
      </PageHero>

      <CTASection
        title="Don't see your role listed?"
        description="We're always open to hearing from people who want to build something real — reach out anyway."
        primary={{ label: 'Get in Touch', to: '/contact' }}
        secondary={{ label: 'About Zecqora', to: '/about' }}
      />
    </>
  )
}
