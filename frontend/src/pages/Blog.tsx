import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { BLOG_POSTS, type BlogPost } from '../lib/data'

const PAGE_SIZE = 3
const CATEGORIES = ['All', ...Array.from(new Set(BLOG_POSTS.map((post) => post.category)))]

const THUMB_PALETTES = [
  'bg-yellow text-ink',
  'bg-ink text-white',
  'bg-[color:var(--color-pastel-violet)] text-white',
  'bg-[color:var(--color-pastel-peach)] text-ink',
  'bg-[color:var(--color-pastel-cyan)] text-ink',
  'bg-[color:var(--color-indigo)] text-white',
]

function paletteFor(slug: string) {
  let hash = 0
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return THUMB_PALETTES[hash % THUMB_PALETTES.length]
}

function Thumbnail({ post, textClassName }: { post: BlogPost; textClassName: string }) {
  return (
    <div
      className={`flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl p-5 text-center transition-transform duration-300 group-hover:scale-[1.02] ${paletteFor(post.slug)}`}
    >
      <span className={`font-display font-black uppercase leading-tight tracking-tight ${textClassName}`}>
        {post.title}
      </span>
    </div>
  )
}

export default function Blog() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return BLOG_POSTS.filter(
      (post) =>
        (category === 'All' || post.category === category) &&
        (q === '' || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q)),
    )
  }, [category, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const featuredPair = currentPage === 1 ? pageItems.slice(0, 2) : []
  const smallItems = currentPage === 1 ? pageItems.slice(2) : pageItems

  function updateCategory(next: string) {
    setCategory(next)
    setPage(1)
  }

  function updateQuery(next: string) {
    setQuery(next)
    setPage(1)
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <h1 className="hero-title text-5xl text-ink sm:text-6xl">Blog</h1>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateCategory(cat)}
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
            onChange={(e) => updateQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full min-w-[220px] rounded-full border border-line bg-surface py-2 pl-10 pr-4 text-sm text-ink outline-none focus:border-line-strong sm:w-64"
          />
        </div>
      </div>

      {pageItems.length === 0 ? (
        <p className="mt-16 text-center text-sm text-ink-faint">No articles match that search.</p>
      ) : (
        <div className="mt-10 flex flex-col gap-10">
          {featuredPair.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {featuredPair.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.06}>
                  <Link to={`/blog/${post.slug}`} className="group flex cursor-pointer flex-col gap-4">
                    <Thumbnail post={post} textClassName="text-xl sm:text-2xl" />
                    <div>
                      <p className="text-xs text-ink-faint">
                        {post.category} · {post.date}
                      </p>
                      <h2 className="font-display mt-1 text-lg font-semibold tracking-[-0.02em] text-ink group-hover:underline">
                        {post.title}
                      </h2>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          {smallItems.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {smallItems.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.05}>
                  <Link to={`/blog/${post.slug}`} className="group flex cursor-pointer flex-col gap-3">
                    <Thumbnail post={post} textClassName="text-sm" />
                    <div>
                      <p className="text-xs text-ink-faint">
                        {post.category} · {post.date}
                      </p>
                      <h3 className="font-display mt-1 text-sm font-semibold tracking-[-0.01em] text-ink group-hover:underline">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="sticky bottom-6 z-20 mt-14 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-line bg-surface/95 p-1.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border text-sm font-medium transition-colors ${
                  p === currentPage
                    ? 'border-ink bg-ink text-white'
                    : 'border-line text-ink-soft hover:border-line-strong hover:text-ink'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
