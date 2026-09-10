import { AlertCircle, CheckCircle2, Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

const INTERESTS = ['Business Website', 'Student Project', 'Learning Session', 'Resume Studio', 'Something else']

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'hello@projectx.dev' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
  { icon: MapPin, label: 'Studio', value: 'Bengaluru, India (remote-first)' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat, 10am – 7pm IST' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', interest: INTERESTS[0], message: '' })
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const update = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const sendViaMailto = () => {
    const subject = encodeURIComponent(`New enquiry: ${form.interest} — ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nInterested in: ${form.interest}\n\nMessage:\n${form.message}`,
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
          subject: `New enquiry: ${form.interest} — ${form.name}`,
          from_name: 'ProjectX website',
          name: form.name,
          email: form.email,
          interest: form.interest,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setForm({ name: '', email: '', interest: INTERESTS[0], message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-40 pb-16 text-center">
        <SectionHeading
          eyebrow="Contact"
          title="Tell us what you're building"
          description="Fill in the form and we'll get back within one business day — or reach us directly below."
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="card rounded-2xl p-7 sm:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-ink-soft">
                  Name
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Your full name"
                    className="rounded-lg border border-line-strong bg-surface px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-blue"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-ink-soft">
                  Email
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@email.com"
                    className="rounded-lg border border-line-strong bg-surface px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-blue"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm text-ink-soft">
                I'm interested in
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => update('interest', interest)}
                      className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                        form.interest === interest
                          ? 'border-transparent bg-blue text-white'
                          : 'border-line-strong bg-surface text-ink-soft hover:text-ink'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </label>

              <label className="flex flex-col gap-2 text-sm text-ink-soft">
                Message
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Tell us about your idea, timeline, and budget..."
                  className="resize-none rounded-lg border border-line-strong bg-surface px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-blue"
                />
              </label>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              {status === 'sent' && (
                <p className="flex items-center gap-2 text-sm text-green">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  {WEB3FORMS_ACCESS_KEY
                    ? "Message sent — we'll get back to you within one business day."
                    : 'Your email app should now be open with your message pre-filled — just hit send.'}
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  Something went wrong sending that. Please email us directly at hello@projectx.dev.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="card flex flex-col gap-6 rounded-2xl p-7 sm:p-8">
              {CONTACT_INFO.map((info) => {
                const Icon = info.icon
                return (
                  <div key={info.label} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5 text-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs text-ink-faint">{info.label}</p>
                      <p className="text-sm font-medium text-ink">{info.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="card relative overflow-hidden rounded-2xl p-8 text-center">
              <div className="animate-blob absolute -top-10 -left-10 h-40 w-40 rounded-full bg-pastel-violet/50 blur-3xl" />
              <p className="font-display relative text-lg font-bold text-ink">Prefer to talk it through?</p>
              <p className="relative mt-2 text-sm text-ink-soft">
                Book a free 15-minute call — no pitch, just a conversation about what you're trying to build.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
