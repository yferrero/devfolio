export function Spinner() {
  return (
    <div className="flex justify-center py-12" role="status" aria-label="Loading">
      <div className="size-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-gray-100" />
    </div>
  )
}
