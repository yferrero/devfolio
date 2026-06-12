import { useEffect } from 'react'
import { useThemeStore } from './store'

/**
 * Syncs the theme to a `dark` class on <html>, which Tailwind's
 * custom dark variant (see index.css) picks up. Call once, in the Layout.
 */
export function useApplyTheme() {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])
}
