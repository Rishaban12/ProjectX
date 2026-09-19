import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronRight, Flame } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SERVICES_MENU, slugifyService } from '../lib/data'

const GENERIC_TARGETS = ['/services', '/services#business']

export default function ServicesMegaMenu({ onDark = false }: { onDark?: boolean }) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()
  const isActive = location.pathname === '/services'

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }

  const handleOpen = () => {
    cancelClose()
    setActiveIndex(0)
    setOpen(true)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex cursor-pointer items-center gap-1 rounded-[10px] px-4 py-2 text-[15px] font-medium whitespace-nowrap tracking-[-0.01em] transition-colors ${
          onDark
            ? isActive
              ? 'text-white hover:bg-white/10'
              : 'text-white/85 hover:bg-white/10 hover:text-white'
            : isActive
              ? 'text-ink'
              : 'text-ink-soft hover:bg-ink/5 hover:text-ink'
        }`}
      >
        Services
        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className={`absolute top-full left-0 z-50 mt-5 flex w-[640px] overflow-hidden rounded-2xl border shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ${
              onDark ? 'border-white/10 bg-[#0b211d]' : 'border-line bg-surface'
            }`}
          >
            <div className={`w-64 shrink-0 border-r p-2 ${onDark ? 'border-white/10' : 'border-line'}`}>
              {SERVICES_MENU.map((category, i) => (
                <button
                  key={category.label}
                  type="button"
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-[10px] border px-3.5 py-3 text-left text-sm font-medium transition-colors ${
                    onDark
                      ? i === activeIndex
                        ? 'border-white/15 bg-white/5 text-white'
                        : 'border-transparent text-white/85 hover:border-white/15 hover:bg-white/5 hover:text-white'
                      : i === activeIndex
                        ? 'border-line bg-ink/5 text-ink'
                        : 'border-transparent text-ink-soft hover:border-line hover:bg-ink/5 hover:text-ink'
                  }`}
                >
                  {category.label}
                  <ChevronRight className="h-4 w-4 shrink-0 opacity-50" />
                </button>
              ))}
            </div>

            <div className="flex-1 p-3">
              {SERVICES_MENU[activeIndex].items.map((item) => (
                <Link
                  key={item.label}
                  to={GENERIC_TARGETS.includes(item.to) ? `/services/${slugifyService(item.label)}` : item.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-start justify-between gap-2 rounded-[10px] px-3 py-2.5 text-sm transition-colors ${
                    onDark
                      ? 'text-white/85 hover:bg-white/5 hover:text-white'
                      : 'text-ink-soft hover:bg-ink/5 hover:text-ink'
                  }`}
                >
                  <span>
                    <span className="block">{item.label}</span>
                    {item.description && (
                      <span className={`mt-0.5 block text-xs ${onDark ? 'text-white/35' : 'text-ink-faint'}`}>
                        {item.description}
                      </span>
                    )}
                  </span>
                  {item.hot && (
                    <span className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-orange">
                      <Flame className="h-3 w-3" />
                      HOT
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
