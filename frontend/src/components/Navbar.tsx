import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS, RESOURCES_MENU, WHY_US_MENU } from '../lib/data'
import NavDropdown from './NavDropdown'
import ServicesMegaMenu from './ServicesMegaMenu'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [onDark, setOnDark] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)

      const navBandY = 44
      let dark = false
      document.querySelectorAll('[data-nav-theme="dark"]').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= navBandY && rect.bottom >= navBandY) dark = true
      })
      setOnDark(dark)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ease-in-out ${
        scrolled ? 'px-4 py-3 sm:px-6' : 'px-0 py-0'
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between border transition-all duration-200 ease-in-out ${
          scrolled
            ? `max-w-4xl rounded-2xl px-4 py-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl ${
                onDark ? 'border-white/10 bg-ink/60' : 'border-transparent bg-surface/95'
              }`
            : `max-w-[calc(100%-444px)] py-3 backdrop-blur-xl ${
                onDark ? 'border-transparent bg-ink/60' : 'border-transparent bg-surface/80'
              }`
        }`}
      >
        <div className="flex items-center gap-16">
          <Link
            to="/"
            aria-label="Zecqora home"
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
            className="relative z-10 flex items-center gap-2"
          >
            <span
              className={`relative flex h-8 w-8 items-center justify-center rounded-md border transition-colors ${
                onDark ? 'border-white/20 text-white/80' : 'border-line text-ink-soft'
              }`}
            >
              <span className="inline-block skew-x-12 font-display text-base font-black leading-none">Z</span>
            </span>
            <span
              className={`overflow-hidden text-[20px] font-bold whitespace-nowrap tracking-[-0.03em] transition-all duration-200 ease-in-out ${
                onDark ? 'text-white' : 'text-ink'
              } ${scrolled ? 'max-w-0 opacity-0' : 'max-w-[160px] opacity-100'}`}
            >
              zecqora
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => {
              if (link.to === '/services') return <ServicesMegaMenu key={link.to} onDark={onDark} />
              if (link.label === 'Why us') {
                return (
                  <NavDropdown key={link.to} label={link.label} to={link.to} items={WHY_US_MENU} onDark={onDark} />
                )
              }
              if (link.label === 'Resources') {
                return (
                  <NavDropdown
                    key={link.to}
                    label={link.label}
                    to={link.to}
                    items={RESOURCES_MENU}
                    onDark={onDark}
                  />
                )
              }
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1 rounded-[10px] px-4 py-2 text-[15px] font-medium tracking-[-0.01em] transition-colors ${
                      onDark
                        ? isActive
                          ? 'text-white hover:bg-white/10'
                          : 'text-white/85 hover:bg-white/10 hover:text-white'
                        : isActive
                          ? 'text-ink hover:bg-ink/5'
                          : 'text-ink-soft hover:bg-ink/5 hover:text-ink'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden md:block">
            <Link
              to="/contact"
              className={`btn-primary px-5 py-2.5 ${onDark ? '!bg-bg !text-ink' : ''}`}
            >
              Engineer It
            </Link>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border md:hidden ${
              onDark ? 'border-white/20 text-white' : 'border-line text-ink'
            }`}
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
            className="border-b border-line bg-surface/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-3">
              {NAV_LINKS.map((link) => {
                const submenu = link.label === 'Why us' ? WHY_US_MENU : link.label === 'Resources' ? RESOURCES_MENU : null

                if (submenu) {
                  return (
                    <div key={link.to} className="flex flex-col">
                      <span className="px-4 pt-3 pb-1 text-xs font-semibold tracking-[0.08em] text-ink-faint uppercase">
                        {link.label}
                      </span>
                      {submenu.map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          className={({ isActive }) =>
                            `rounded-[10px] px-4 py-3 text-sm font-medium ${
                              isActive ? 'text-yellow' : 'text-ink-soft'
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  )
                }

                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `rounded-[10px] px-4 py-3 text-sm font-medium ${
                        isActive ? 'text-yellow' : 'text-ink-soft'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              })}
              <Link to="/contact" className="btn-primary mt-1 px-4 py-3">
                Engineer It
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
