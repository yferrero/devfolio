import { beforeEach, describe, expect, it } from 'vitest'
import { useThemeStore } from './store'

describe('theme store', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'light' })
  })

  it('starts in light mode', () => {
    expect(useThemeStore.getState().theme).toBe('light')
  })

  it('toggles between light and dark', () => {
    useThemeStore.getState().toggle()
    expect(useThemeStore.getState().theme).toBe('dark')

    useThemeStore.getState().toggle()
    expect(useThemeStore.getState().theme).toBe('light')
  })
})
