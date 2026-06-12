import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import PerformancePage from './PerformancePage'

function firstRowOf(regionName: RegExp) {
  const region = screen.getByRole('region', { name: regionName })
  return within(region).getAllByRole('listitem')[0]
}

describe('<PerformancePage />', () => {
  it('filters items and recomputes the stats', async () => {
    const user = userEvent.setup()
    render(<PerformancePage />)

    expect(screen.getByText(/5,000 matching items/)).toBeInTheDocument()

    await user.type(screen.getByLabelText('Filter items'), 'Item 0001')

    expect(screen.getByText(/^1 matching items/)).toBeInTheDocument()
  })

  it('memoized rows skip parent re-renders, plain rows do not', async () => {
    const user = userEvent.setup()
    render(<PerformancePage />)

    expect(firstRowOf(/memoized rows/i)).toHaveTextContent('renders: 1')
    expect(firstRowOf(/plain rows/i)).toHaveTextContent('renders: 1')

    const button = screen.getByRole('button', { name: /re-render parent/i })
    await user.click(button)
    await user.click(button)
    await user.click(button)

    // memo() + useCallback kept the memoized row's props identical, so it
    // never re-rendered; the plain row re-rendered with every parent render.
    expect(firstRowOf(/memoized rows/i)).toHaveTextContent('renders: 1')
    expect(firstRowOf(/plain rows/i)).toHaveTextContent('renders: 4')
  })

  it('selecting a row re-renders even memoized rows whose props changed', async () => {
    const user = userEvent.setup()
    render(<PerformancePage />)

    const memoFirstRow = firstRowOf(/memoized rows/i)
    await user.click(within(memoFirstRow).getByRole('button'))

    // Its `selected` prop changed from false to true, so memo() correctly
    // let it re-render.
    expect(firstRowOf(/memoized rows/i)).toHaveTextContent('renders: 2')
  })
})
