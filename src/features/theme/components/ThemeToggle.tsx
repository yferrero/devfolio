import { useThemeStore } from '../store'

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme)
  const toggle = useThemeStore((state) => state.toggle)

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className="ml-1 rounded-full border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:border-primary-400 dark:border-gray-700 dark:hover:border-primary-400"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
