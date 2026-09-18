import { Heart } from 'lucide-react'
import Reveal from '../components/Reveal'
import { TESTIMONIALS } from '../lib/data'

export default function WallOfVoices() {
  return (
    <section data-nav-theme="dark" className="min-h-screen bg-ink px-6 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <span className="text-[11px] font-semibold tracking-[0.18em] text-white/50 uppercase">
            Wall of Voices
          </span>
          <h1 className="font-display relative inline-flex items-start gap-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Hear what our clients have to say.
            <Heart className="mt-1.5 h-7 w-7 shrink-0 -rotate-6 text-yellow" strokeWidth={1.5} />
          </h1>
        </Reveal>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.05} className="mb-6 break-inside-avoid">
              <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/50">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-6 text-white/80">{t.quote}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
