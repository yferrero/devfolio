import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { mockRepos } from '@/test/handlers'
import { server } from '@/test/server'
import GithubPage from './GithubPage'

const REPOS_URL = 'https://api.github.com/users/:username/repos'

// Fresh QueryClient per test: no cache shared between tests, and
// retry: false so the error test fails fast instead of retrying.
function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <GithubPage />
    </QueryClientProvider>,
  )
}

describe('<GithubPage />', () => {
  it('shows a spinner, then the repos from the API', async () => {
    renderPage()

    expect(screen.getByRole('status')).toBeInTheDocument()

    expect(await screen.findByText('devfolio')).toBeInTheDocument()
    expect(screen.getByText('aprendiendo-react')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(mockRepos.length)
  })

  it('shows the empty state for a user with no repos', async () => {
    server.use(http.get(REPOS_URL, () => HttpResponse.json([])))
    renderPage()

    expect(
      await screen.findByText(/no public repositories yet/i),
    ).toBeInTheDocument()
  })

  it('shows an error with retry, and recovers when retried', async () => {
    // First response fails; resetHandlers-style override is per-test, so
    // after server.use is replaced below, the default success handler wins.
    server.use(
      http.get(REPOS_URL, () => HttpResponse.json({}, { status: 500 }), {
        once: true,
      }),
    )
    const user = userEvent.setup()
    renderPage()

    expect(await screen.findByRole('alert')).toHaveTextContent(/500/)

    await user.click(screen.getByRole('button', { name: /retry/i }))

    expect(await screen.findByText('devfolio')).toBeInTheDocument()
  })
})
