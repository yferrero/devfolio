import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useThemeStore } from '../store'
import { ThemeToggle } from './ThemeToggle'

describe('<ThemeToggle />', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'light' })
  })

  it('switches the theme when clicked', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: /switch to dark mode/i })
    await user.click(button)

    expect(useThemeStore.getState().theme).toBe('dark')
    expect(
      screen.getByRole('button', { name: /switch to light mode/i }),
    ).toBeInTheDocument()
  })
})
