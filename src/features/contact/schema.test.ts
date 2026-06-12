import { describe, expect, it } from 'vitest'
import { contactSchema } from './schema'

const valid = {
  name: 'Yens',
  email: 'yens@example.com',
  message: 'Hello, I would like to talk about a role.',
}

describe('contactSchema', () => {
  it('accepts valid input', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects an invalid email', () => {
    const result = contactSchema.safeParse({ ...valid, email: 'not-an-email' })

    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('Enter a valid email address')
  })

  it('rejects a too-short message', () => {
    const result = contactSchema.safeParse({ ...valid, message: 'hi' })

    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe(
      'Message needs at least 10 characters',
    )
  })
})
