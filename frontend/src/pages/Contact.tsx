import { AlertCircle, Check, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { EARTH_PINS } from '../lib/earthPins'

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

const INTERESTS = ['Business Website', 'Student Project', 'Learning Session', 'Resume Studio', 'Something else']

const POINTS = [
  'A reply within one business day',
  'Clear next steps for websites, student projects, or learning',
  'Honest scope and pricing — no templates copy-pasted blindly',
  'A 15-minute call if you’d rather talk it through',
]

const inputClass =
  'h-11 w-full rounded-xl border border-line bg-bg px-3.5 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-line-strong'

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: INTERESTS[0],
    message: '',
  })
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const update = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }))
  const fullName = `${form.firstName} ${form.lastName}`.trim()

  const sendViaMailto = () => {
    const subject = encodeURIComponent(`New enquiry: ${form.interest} — ${fullName}`)
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${form.email}\nPhone: ${form.phone || '—'}\nInterested in: ${form.interest}\n\nMessage:\n${form.message}`,
    )
    window.location.href = `mailto:hello@projectx.dev?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!WEB3FORMS_ACCESS_KEY) {
      sendViaMailto()
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New enquiry: ${form.interest} — ${fullName}`,
          from_name: 'ProjectX website',
          name: fullName,
          email: form.email,
          phone: form.phone,
          interest: form.interest,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setForm({ firstName: '', lastName: '', email: '', phone: '', interest: INTERESTS[0], message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-line p-6 sm:p-10 lg:p-14">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex max-w-xl flex-col text-left">
            <h1 className="font-display text-4xl leading-[1.1] font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              A clearer way to start what you’re building.
            </h1>

            <p className="mt-6 text-sm font-medium text-ink">What to expect on the call</p>
            <ul className="mt-4 flex flex-col gap-3">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" strokeWidth={2} />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <p className="text-xs text-ink-faint">Endorsed by operators we meet</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {EARTH_PINS.map((person) => (
                    <img
                      key={person.id}
                      src={person.image}
                      alt={person.city}
                      className="h-8 w-8 rounded-full border-2 border-bg object-cover"
                    />
                  ))}
                </div>
                <p className="max-w-[14rem] text-xs leading-snug text-ink-faint">
                  The studio across Bengaluru, Chennai, Thanjavur &amp; Mannargudi
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface/80 p-5 sm:p-6">
            <h2 className="font-display text-lg font-semibold text-ink">Book a live, 15-minute conversation</h2>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-xs text-ink-faint">
                  First name*
                  <input
                    required
                    value={form.firstName}
                    onChange={(e) => update('firstName', e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-xs text-ink-faint">
                  Last name*
                  <input
                    required
                    value={form.lastName}
                    onChange={(e) => update('lastName', e.target.value)}
                    className={inputClass}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5 text-xs text-ink-faint">
                Work email*
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={inputClass}
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-xs text-ink-faint">
                  Phone
                  <input
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+91"
                    className={inputClass}
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-xs text-ink-faint">
                  I’m interested in*
                  <select
                    required
                    value={form.interest}
                    onChange={(e) => update('interest', e.target.value)}
                    className={`${inputClass} appearance-none`}
                  >
                    {INTERESTS.map((interest) => (
                      <option key={interest} value={interest}>
                        {interest}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-1.5 text-xs text-ink-faint">
                How can we help?*
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  className="w-full resize-none rounded-xl border border-line bg-bg px-3.5 py-3 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-line-strong"
                />
              </label>

              <p className="text-[11px] leading-relaxed text-ink-faint">
                We only use this information to get back about your enquiry. You can unsubscribe from follow-ups anytime.
              </p>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary mt-1 h-11 w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>

              {status === 'sent' && (
                <p className="flex items-center gap-2 text-sm text-ink-soft">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  {WEB3FORMS_ACCESS_KEY
                    ? "Message sent — we'll get back within one business day."
                    : 'Your email app should now be open with your message pre-filled — just hit send.'}
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center gap-2 text-sm text-ink-soft">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  Something went wrong. Email us at hello@projectx.dev.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
