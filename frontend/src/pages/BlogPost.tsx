import { Clock } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import { BLOG_POSTS } from '../lib/data'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = BLOG_POSTS.find((candidate) => candidate.slug === slug)
  const related = BLOG_POSTS.filter((candidate) => candidate.slug !== slug).slice(0, 3)

  if (!post) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="hero-title text-4xl text-ink sm:text-5xl">Post not found</h1>
        <p className="max-w-md text-ink-soft">
          We couldn't find that article. It may have moved — take a look at everything we've written.
        </p>
        <Link to="/blog" className="btn-primary">
          Back to Blog
        </Link>
      </section>
    )
  }

  return (
    <>
      <section className="relative overflow-hidden bg-yellow px-6 pt-28 pb-20">
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
          <div>
            <p className="text-sm font-medium text-ink/70">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link to="/blog" className="hover:underline">
                Blog
              </Link>
            </p>
            <h1 className="font-display mt-6 max-w-xl text-4xl leading-[1.08] font-semibold tracking-[-0.045em] text-ink sm:text-5xl lg:text-[3.4rem]">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink/75">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-yellow">
                {post.author
                  .split(' ')
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join('')}
              </span>
              <span>{post.author}</span>
              <span aria-hidden="true">·</span>
              <span>{post.date}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-32px_rgba(16,42,36,0.35)]">
            <img src={post.image} alt={post.imageAlt} className="block h-auto w-full object-contain" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-bg [clip-path:ellipse(80%_100%_at_50%_100%)]" />
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <Reveal className="flex flex-col gap-6">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-base leading-8 text-ink-soft">
              {paragraph}
            </p>
          ))}
        </Reveal>
        <Link
          to="/blog"
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
        >
          ← Back to Blog
        </Link>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink">More from the studio</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/blog/${item.slug}`}
                className="group overflow-hidden rounded-2xl border border-line bg-white"
              >
                <div className="aspect-[16/10] bg-[#f6f3ea]">
                  <img src={item.image} alt={item.imageAlt} className="h-full w-full object-contain" />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">{item.category}</p>
                  <h3 className="font-display mt-2 text-lg font-semibold tracking-[-0.03em] text-ink group-hover:underline">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CTASection />
    </>
  )
}
