import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="text-gradient font-display text-7xl font-bold">404</p>
      <h1 className="font-display mt-4 text-2xl font-bold text-white">This page didn't ship yet</h1>
      <p className="mt-2 text-white/55">The page you're looking for doesn't exist — let's get you back on track.</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-500 px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </section>
  )
}
