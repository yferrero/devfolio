import { Link } from 'react-router-dom'

const features = [
  {
    to: '/projects',
    title: 'Projects',
    description: 'Searchable, filterable gallery built on plain React state.',
    tech: 'useState + derived state',
  },
  {
    to: '/github',
    title: 'GitHub feed',
    description: 'Live repositories with caching, retries and error states.',
    tech: 'TanStack Query',
  },
  {
    to: '/notes',
    title: 'Flashcards',
    description: 'Interview notes with persistence and pure reducers.',
    tech: 'Redux Toolkit',
  },
  {
    to: '/pomodoro',
    title: 'Pomodoro',
    description: 'Study timer covering refs, intervals and effect cleanup.',
    tech: 'Zustand',
  },
  {
    to: '/contact',
    title: 'Contact',
    description: 'Schema-validated form with accessible error messages.',
    tech: 'React Hook Form + Zod',
  },
  {
    to: '/performance',
    title: 'Performance',
    description: 'Memoization demo with visible render counters.',
    tech: 'memo + useMemo + useCallback',
  },
]

export function Home() {
  return (
    <section className="relative">
      {/* Decorative glow behind the hero (see .hero-glow in index.css). */}
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute -inset-x-8 -top-24 h-[26rem] opacity-10 blur-2xl dark:opacity-25"
      />

      <div className="relative pt-14 pb-16 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
          A portfolio that doubles as an{' '}
          <span className="gradient-text">interview-prep playground</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-400">
          Hi, I&apos;m Yens. Every section here is a complete, end-to-end
          feature built with a different part of the React ecosystem — written
          to be read.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/projects" className="btn-primary">
            Explore the features
          </Link>
          <a
            href="https://github.com/yferrero/devfolio"
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            Source on GitHub
          </a>
        </div>
      </div>

      <ul className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <li key={feature.to}>
            <Link to={feature.to} className="card block h-full p-5">
              <h2 className="font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
              <p className="mt-4 text-xs font-medium text-primary-600 dark:text-primary-300">
                {feature.tech}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
