import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ContactForm } from './ContactForm'

describe('<ContactForm />', () => {
  it('shows a validation error per field when submitted empty', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.click(screen.getByRole('button', { name: /send message/i }))

    const alerts = await screen.findAllByRole('alert')
    expect(alerts).toHaveLength(3)
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
      'Enter a valid email address',
    )
  })

  it('clears the field error once the input becomes valid', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.click(screen.getByRole('button', { name: /send message/i }))
    await screen.findAllByRole('alert')

    await user.type(screen.getByLabelText('Email'), 'yens@example.com')

    expect(
      screen.queryByText('Enter a valid email address'),
    ).not.toBeInTheDocument()
  })

  it('submits valid input and shows the success state', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText('Name'), 'Yens')
    await user.type(screen.getByLabelText('Email'), 'yens@example.com')
    await user.type(
      screen.getByLabelText('Message'),
      'Hello! This message is long enough to pass validation.',
    )
    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(
      await screen.findByText(/thanks! your message was sent/i),
    ).toBeInTheDocument()
  })
})
