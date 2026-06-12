import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        This page doesn&apos;t exist.
      </p>
      <Link to="/" className="mt-4 inline-block underline">
        Back home
      </Link>
    </section>
  )
}
