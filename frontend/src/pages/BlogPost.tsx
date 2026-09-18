import { Link, useParams } from 'react-router-dom'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import { BLOG_POSTS } from '../lib/data'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = BLOG_POSTS.find((candidate) => candidate.slug === slug)

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
      <section className="relative overflow-hidden px-6 pt-32 pb-16">
        <Reveal className="relative z-10 mx-auto flex max-w-3xl flex-col items-start gap-5">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-[11px] font-medium text-yellow uppercase">
            {post.category}
          </span>
          <h1 className="hero-title text-4xl text-ink sm:text-5xl">{post.title}</h1>
          <p className="text-sm text-ink-faint">
            {post.author} · {post.date} · {post.readTime}
          </p>
        </Reveal>
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

      <CTASection />
    </>
  )
}
