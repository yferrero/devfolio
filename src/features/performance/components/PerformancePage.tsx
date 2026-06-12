import { useCallback, useMemo, useState } from 'react'
import { expensiveStats, generateItems } from '../data'
import { MemoRow, Row } from './Row'

// Static data belongs outside the component: generating it inside would
// rebuild 5000 objects on every render.
const items = generateItems(5000)
const ROWS_SHOWN = 5

export default function PerformancePage() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  // State that has nothing to do with the list — its only job is to force
  // parent re-renders so you can watch which rows re-render with it.
  const [, forceRender] = useState(0)

  const visible = useMemo(
    () =>
      items.filter((item) =>
        item.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  )

  // Recomputed only when `visible` changes. Re-rendering the parent for any
  // other reason (the button below) reuses the memoized result and skips
  // the expensive work entirely.
  const stats = useMemo(() => expensiveStats(visible), [visible])

  // Stable function identity across renders. Without useCallback, every
  // render would pass MemoRow a brand-new function, its props would never
  // be shallow-equal, and memo() would be useless.
  const handleSelect = useCallback((id: number) => setSelectedId(id), [])

  const shown = visible.slice(0, ROWS_SHOWN)

  return (
    <section>
      <h1 className="text-2xl font-bold">Performance</h1>
      <p className="mt-2 max-w-prose text-gray-600 dark:text-gray-400">
        {items.length.toLocaleString()} items, filtered with useMemo and
        aggregated by a deliberately slow function. Click the button and watch
        the render counters: memoized rows skip re-renders, plain rows
        don&apos;t.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter items…"
          aria-label="Filter items"
          className="w-full max-w-xs rounded-lg border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-400"
        />
        <button
          type="button"
          onClick={() => forceRender((n) => n + 1)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Re-render parent
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        {stats.count.toLocaleString()} matching items · average price $
        {stats.averagePrice.toFixed(2)}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <section aria-label="Memoized rows">
          <h2 className="text-sm font-semibold">
            memo(Row) <span className="font-normal text-gray-500">+ useCallback</span>
          </h2>
          <ul className="mt-3 flex flex-col gap-2">
            {shown.map((item) => (
              <MemoRow
                key={item.id}
                item={item}
                selected={item.id === selectedId}
                onSelect={handleSelect}
              />
            ))}
          </ul>
        </section>

        <section aria-label="Plain rows">
          <h2 className="text-sm font-semibold">
            Row <span className="font-normal text-gray-500">(no memo)</span>
          </h2>
          <ul className="mt-3 flex flex-col gap-2">
            {shown.map((item) => (
              <Row
                key={item.id}
                item={item}
                selected={item.id === selectedId}
                onSelect={handleSelect}
              />
            ))}
          </ul>
        </section>
      </div>

      <p className="mt-6 max-w-prose text-sm text-gray-500">
        The honest footnote: with {ROWS_SHOWN} rows, none of this memoization
        is worth it — the overhead of comparing props can exceed the render it
        saves. Memoize when profiling shows a real cost, not by default.
      </p>
    </section>
  )
}
