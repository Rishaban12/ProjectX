type IconProps = { className?: string }

export function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2.5A9.5 9.5 0 0 0 8.9 21v-2.9c-2.7.6-3.3-1.1-3.3-1.1-.4-1.1-1-1.4-1-1.4" />
      <path d="M15.1 21v-3c0-.9-.3-1.5-.8-1.9 2.6-.3 5.2-1.3 5.2-5.6 0-1.2-.4-2.2-1.2-3 .1-.3.5-1.5-.1-3-1.7-.3-3.2.8-3.2.8a10.3 10.3 0 0 0-6 0s-1.5-1.1-3.2-.8c-.6 1.5-.2 2.7-.1 3-.8.8-1.2 1.8-1.2 3" />
    </svg>
  )
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 10h4v10H4z" />
      <path d="M14 20v-5.2c0-1.5.8-2.8 2.4-2.8s2.6 1.1 2.6 3.2V20h-4" />
      <path d="M12 10h4v1.4" />
      <circle cx="6" cy="5.5" r="1.8" />
    </svg>
  )
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="none" />
    </svg>
  )
}
