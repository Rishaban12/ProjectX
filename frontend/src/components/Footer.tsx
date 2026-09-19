import { Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LinkedinIcon } from './BrandIcons'
import { NAV_LINKS } from '../lib/data'

export default function Footer() {
  return (
    <footer data-nav-theme="dark" className="relative z-20 isolate flex min-h-screen flex-col bg-ink">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <Link
            to="/"
            aria-label="Zecqora home"
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
            className="flex items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 text-white/80">
              <span className="inline-block skew-x-12 font-display text-lg font-black leading-none">Z</span>
            </span>
            <span className="text-[17px] font-bold tracking-[-0.03em] text-white">zecqora</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-white/60">Get in touch</span>
            <div className="flex gap-3">
              <a
                href="mailto:zecqora@gmail.com"
                aria-label="Email us"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="tel:+919876543210"
                aria-label="Call us"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-12 sm:grid-cols-2">
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Navigate</h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/50 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Services</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/50">
              <li>Business Websites</li>
              <li>Student Projects</li>
              <li>AI Adoption Sessions</li>
              <li>Resume Studio</li>
            </ul>
          </div>

        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Zecqora. All rights reserved.</p>
          <p>Build. Adapt. Grow.</p>
        </div>
      </div>

      <div aria-hidden className="relative z-0 mt-2 w-full overflow-hidden select-none">
        <svg viewBox="0 40 1000 180" className="block h-auto w-full">
          <text
            x="500"
            y="172"
            textAnchor="middle"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fontSize="180"
            fontWeight="900"
            fontFamily="'Inter Tight', Inter, Arial, sans-serif"
            fill="#ffffff"
            opacity="0.05"
          >
            zecqora
          </text>
        </svg>
      </div>

      <div className="flex-1" />
    </footer>
  )
}
