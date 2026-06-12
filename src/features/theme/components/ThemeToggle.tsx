import { useThemeStore } from '../store'

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme)
  const toggle = useThemeStore((state) => state.toggle)

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
