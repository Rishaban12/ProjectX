import { ArrowRight, Clock, Search, Star } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { BLOG_POSTS } from '../lib/data'

const CATEGORIES = ['All', ...Array.from(new Set(BLOG_POSTS.map((post) => post.category)))]

export default function Blog() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return BLOG_POSTS.filter(
      (post) =>
        (category === 'All' || post.category === category) &&
        (q === '' || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q)),
    )
  }, [category, query])

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <section className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                cat === category
                  ? 'border-ink bg-ink text-white'
                  : 'border-line text-ink-soft hover:border-line-strong hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full min-w-[220px] rounded-full border border-line bg-white py-2 pr-4 pl-10 text-sm text-ink outline-none focus:border-line-strong sm:w-64"
          />
        </div>
      </div>

      {!featured ? (
        <p className="mt-16 text-center text-sm text-ink-faint">No articles match that search.</p>
      ) : (
        <div className="mt-10 flex flex-col gap-10">
          <Reveal>
            <article className="overflow-hidden rounded-[28px] border border-line bg-white">
              <div className="grid md:grid-cols-2">
                <Link to={`/blog/${featured.slug}`} className="relative block min-h-[280px] bg-[#f6f3ea]">
                  <img
                    src={featured.image}
                    alt={featured.imageAlt}
                    className="h-full w-full object-contain"
                  />
                  <span className="absolute top-5 left-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-ink">
                    {featured.category}
                  </span>
                </Link>
                <div className="flex flex-col justify-center border-t border-line px-7 py-8 md:border-t-0 md:border-l-4 md:border-l-yellow md:px-10">
                  <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
                    <Star className="h-3.5 w-3.5 text-yellow" fill="currentColor" />
                    Featured
                  </p>
                  <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-faint">
                    <span>{featured.date}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {featured.readTime}
                    </span>
                    <span>@ {featured.author}</span>
                  </p>
                  <h1 className="font-display mt-4 text-3xl leading-[1.15] font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
                    <Link to={`/blog/${featured.slug}`} className="hover:underline">
                      {featured.title}
                    </Link>
                  </h1>
                  <p className="mt-4 max-w-md text-sm leading-7 text-ink-soft">{featured.excerpt}</p>
                  <Link
                    to={`/blog/${featured.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>

          {rest.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.06}>
                  <Link to={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
                    <div className="aspect-[16/10] bg-[#f6f3ea]">
                      <img src={post.image} alt={post.imageAlt} className="h-full w-full object-contain" />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <p className="text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
                        {post.category}
                      </p>
                      <h2 className="font-display text-lg leading-snug font-semibold tracking-[-0.03em] text-ink group-hover:underline">
                        {post.title}
                      </h2>
                      <p className="mt-auto text-xs text-ink-faint">
                        {post.date} · {post.readTime}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
