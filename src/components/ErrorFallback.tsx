import type { FallbackProps } from 'react-error-boundary'

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className="rounded-xl border border-red-300 p-6 dark:border-red-900">
      <h2 className="font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {error instanceof Error ? error.message : String(error)}
      </p>
      <button
        type="button"
        onClick={resetErrorBoundary}
        className="btn-outline mt-4"
      >
        Try again
      </button>
    </div>
  )
}
