import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ErrorFallback } from '@/components/ErrorFallback'
import { Spinner } from '@/components/Spinner'
import { ThemeToggle, useApplyTheme } from '@/features/theme'

const navItems = [
  { to: '/projects', label: 'Projects' },
  { to: '/github', label: 'GitHub' },
  { to: '/notes', label: 'Notes' },
  { to: '/pomodoro', label: 'Pomodoro' },
  { to: '/contact', label: 'Contact' },
  { to: '/performance', label: 'Performance' },
]

export function Layout() {
  useApplyTheme()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <header className="sticky top-0 z-10 border-b border-gray-200/60 bg-white/80 backdrop-blur-md dark:border-gray-800/60 dark:bg-gray-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="gradient-text text-lg font-bold">
            devfolio
          </Link>
          <nav className="flex flex-wrap items-center gap-1">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-500/10 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Catches render errors from any page. Keyed by pathname so
            navigating away from a crashed page resets the boundary. */}
        <ErrorBoundary FallbackComponent={ErrorFallback} key={location.pathname}>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  )
}
