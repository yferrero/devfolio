import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { ErrorFallback } from '@/components/ErrorFallback'
import { Spinner } from '@/components/Spinner'
import { ThemeToggle, useApplyTheme } from '@/features/theme'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/github', label: 'GitHub' },
  { to: '/notes', label: 'Notes' },
  { to: '/pomodoro', label: 'Pomodoro' },
  { to: '/contact', label: 'Contact' },
]

export function Layout() {
  useApplyTheme()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <nav className="flex gap-1">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
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
