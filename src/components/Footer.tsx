import { Mail, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GithubIcon, InstagramIcon, LinkedinIcon } from './BrandIcons'
import { NAV_LINKS } from '../lib/data'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-surface/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-cyan-400 to-pink-500">
                <Zap className="h-5 w-5 text-black" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-bold text-white">
                Project<span className="text-gradient">X</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm text-white/50">
              Websites for growing businesses, real-world student projects, and hands-on tech learning —
              built by people who ship.
            </p>
            <div className="flex gap-3">
              {[GithubIcon, LinkedinIcon, InstagramIcon, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

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

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Get in touch</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/50">
              <li>hello@projectx.dev</li>
              <li>+91 98765 43210</li>
              <li>Mon–Sat, 10am–7pm IST</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} ProjectX. All rights reserved.</p>
          <p>Build. Learn. Adapt.</p>
        </div>
      </div>
    </footer>
  )
}
