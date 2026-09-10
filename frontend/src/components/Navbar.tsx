import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../lib/data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div
          className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
            scrolled ? 'border border-line bg-surface/85 shadow-sm backdrop-blur-md' : ''
          }`}
        >
          <Link to="/" className="flex items-center gap-2">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-blue">
              <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-ink">
              Project<span className="text-gradient">X</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'bg-ink/5 text-ink' : 'text-ink-soft hover:text-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/contact"
              className="rounded-lg bg-blue px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              Start a Project
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-6 mt-2 rounded-2xl md:hidden"
          >
            <div className="card flex flex-col gap-1 rounded-2xl p-3 shadow-xl">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium ${
                      isActive ? 'bg-ink/5 text-ink' : 'text-ink-soft'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="mt-1 rounded-lg bg-blue px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
