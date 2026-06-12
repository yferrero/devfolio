import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'
import { makeStore } from '@/app/store'
import NotesPage from './NotesPage'

// A fresh store per test keeps tests isolated — this is why makeStore is a
// factory instead of only exporting the app singleton.
function renderPage() {
  return render(
    <Provider store={makeStore({ notes: [] })}>
      <NotesPage />
    </Provider>,
  )
}

describe('<NotesPage />', () => {
  it('shows the empty state with no notes', () => {
    renderPage()
    expect(screen.getByText(/no notes yet/i)).toBeInTheDocument()
  })

  it('adds a flashcard through the form', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.type(screen.getByLabelText('Question'), 'What does useRef return?')
    await user.type(screen.getByLabelText('Answer'), 'A stable mutable object.')
    await user.click(screen.getByRole('button', { name: /add flashcard/i }))

    expect(screen.getByText('What does useRef return?')).toBeInTheDocument()
    // The form clears after submit
    expect(screen.getByLabelText('Question')).toHaveValue('')
  })

  it('flips a card to reveal the answer and deletes it', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.type(screen.getByLabelText('Question'), 'Q?')
    await user.type(screen.getByLabelText('Answer'), 'The answer.')
    await user.click(screen.getByRole('button', { name: /add flashcard/i }))

    await user.click(screen.getByText('Q?'))
    expect(screen.getByText('The answer.')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /delete/i }))
    expect(screen.getByText(/no notes yet/i)).toBeInTheDocument()
  })
})
