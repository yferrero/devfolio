import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FOCUS_SECONDS, usePomodoroStore } from '../store'
import PomodoroPage from './PomodoroPage'

// Note: these tests use fireEvent instead of userEvent. userEvent simulates
// real interaction more faithfully (and is the default choice elsewhere in
// this repo), but it waits internally on real timers — which deadlocks once
// vi.useFakeTimers() owns the clock. fireEvent is synchronous, so it pairs
// cleanly with fake timers.
describe('<PomodoroPage />', () => {
  beforeEach(() => {
    usePomodoroStore.setState({
      mode: 'focus',
      secondsLeft: FOCUS_SECONDS,
      isRunning: false,
      completedSessions: 0,
    })
    // Fake timers let the test control time instead of waiting real seconds.
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('counts down while running and stops when paused', () => {
    render(<PomodoroPage />)

    expect(screen.getByText('25:00')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /start/i }))
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(screen.getByText('24:57')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /pause/i }))
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(screen.getByText('24:57')).toBeInTheDocument()
  })

  it('reset returns to the full duration', () => {
    render(<PomodoroPage />)

    fireEvent.click(screen.getByRole('button', { name: /start/i }))
    act(() => {
      vi.advanceTimersByTime(10_000)
    })
    expect(screen.getByText('24:50')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /reset/i }))
    expect(screen.getByText('25:00')).toBeInTheDocument()
  })
})
