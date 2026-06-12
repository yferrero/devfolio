import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { projects } from '../data'
import ProjectsPage from './ProjectsPage'

// The page renders <Link>s, so it needs a router in the test too.
function renderPage() {
  return render(
    <MemoryRouter>
      <ProjectsPage />
    </MemoryRouter>,
  )
}

describe('<ProjectsPage />', () => {
  it('shows all projects by default', () => {
    renderPage()
    expect(screen.getAllByRole('listitem')).toHaveLength(projects.length)
  })

  it('filters projects by search query', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.type(screen.getByRole('searchbox'), 'weather')

    expect(screen.getByText('Weather Now')).toBeInTheDocument()
    expect(screen.queryByText('Markdown Editor')).not.toBeInTheDocument()
  })

  it('filters projects by tag', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: 'api' }))

    const shown = screen.getAllByRole('listitem')
    const withApiTag = projects.filter((p) => p.tags.includes('api'))
    expect(shown).toHaveLength(withApiTag.length)
  })

  it('shows an empty state when nothing matches', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.type(screen.getByRole('searchbox'), 'zzzz')

    expect(screen.getByText(/no projects match/i)).toBeInTheDocument()
  })
})
