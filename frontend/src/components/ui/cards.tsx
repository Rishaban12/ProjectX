import { cn } from '@/lib/utils'

export type BlogCard = {
  image: string
  title: string
  category: string
}

const DEFAULT_POSTS: BlogCard[] = [
  {
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    title: 'Color Psychology in UI: How to Choose the Right Palette',
    category: 'UI/UX design',
  },
  {
    image: 'https://images.unsplash.com/photo-1588345921523-c2dcd7f0f55a?w=800&q=80',
    title: 'Understanding Typography: Crafting a Visual Voice for Your Brand',
    category: 'Branding',
  },
  {
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80',
    title: 'Design Thinking in Practice: How to Solve Real User Problems',
    category: 'Product Design',
  },
]

export default function Cards({ posts = DEFAULT_POSTS, className }: { posts?: BlogCard[]; className?: string }) {
  return (
    <div className={cn('flex w-full flex-col items-center', className)}>
      <h2 className="font-display text-3xl font-semibold text-ink">Latest Blog</h2>
      <p className="mt-2 max-w-lg text-center text-sm text-ink-faint">
        Stay ahead of the curve with fresh content on code, design, startups, and everything in between.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-8">
        {posts.map((post) => (
          <article key={post.title} className="w-full max-w-72 transition duration-300 hover:-translate-y-0.5">
            <img className="rounded-xl" src={post.image} alt={post.title} />
            <h3 className="mt-3 text-base font-medium text-ink">{post.title}</h3>
            <p className="mt-1 text-xs font-medium text-yellow">{post.category}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
