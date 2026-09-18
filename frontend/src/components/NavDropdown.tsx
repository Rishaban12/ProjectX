import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { NavLink as NavLinkItem } from '../lib/data'

type NavDropdownProps = {
  label: string
  to: string
  items: NavLinkItem[]
  onDark?: boolean
}

export default function NavDropdown({ label, to, items, onDark = false }: NavDropdownProps) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()
  const isActive = to !== '/' && location.pathname === to

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
    setOpen(true)
  }

  return (
    <div className="relative" onMouseEnter={handleOpen} onMouseLeave={scheduleClose}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex cursor-pointer items-center gap-1 rounded-[10px] px-4 py-2 text-[15px] font-medium tracking-[-0.01em] transition-colors ${
          onDark
            ? isActive
              ? 'text-white hover:bg-white/10'
              : 'text-white/85 hover:bg-white/10 hover:text-white'
            : isActive
              ? 'text-ink hover:bg-ink/5'
              : 'text-ink-soft hover:bg-ink/5 hover:text-ink'
        }`}
      >
        {label}
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
            className={`absolute top-full left-0 z-50 mt-5 w-56 overflow-hidden rounded-2xl border p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ${
              onDark ? 'border-white/10 bg-[#0b211d]' : 'border-line bg-surface'
            }`}
          >
            {items.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`block rounded-[10px] px-3 py-2.5 text-sm transition-colors ${
                  onDark ? 'text-white/85 hover:bg-white/5 hover:text-white' : 'text-ink-soft hover:bg-ink/5 hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
