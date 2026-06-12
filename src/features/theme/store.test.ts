import { beforeEach, describe, expect, it } from 'vitest'
import { useThemeStore } from './store'

describe('theme store', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'light' })
  })

  it('defaults to dark mode', () => {
    // getInitialState is unaffected by the setState in beforeEach.
    expect(useThemeStore.getInitialState().theme).toBe('dark')
  })

  it('toggles between light and dark', () => {
    useThemeStore.getState().toggle()
    expect(useThemeStore.getState().theme).toBe('dark')

    useThemeStore.getState().toggle()
    expect(useThemeStore.getState().theme).toBe('light')
  })
})
