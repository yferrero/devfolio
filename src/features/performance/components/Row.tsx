import { memo, useRef } from 'react'
import type { Item } from '../data'

interface RowProps {
  item: Item
  selected: boolean
  onSelect: (id: number) => void
}

// The render-count ref is a demo trick: it increments on every render so
// you can SEE memoization working. (In dev, StrictMode double-invokes
// renders, so counts grow by 2 — the comparison still holds.)
// Mutating/reading a ref during render is normally a bug — the linter is
// right to flag it — but counting renders is the rare case that requires it.
export function Row({ item, selected, onSelect }: RowProps) {
  const renders = useRef(0)
  // eslint-disable-next-line react-hooks/refs
  renders.current += 1

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(item.id)}
        className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors ${
          selected
            ? 'border-gray-900 dark:border-gray-100'
            : 'border-gray-200 hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600'
        }`}
      >
        <span>
          {item.name} <span className="text-gray-500">${item.price.toFixed(2)}</span>
        </span>
        <span className="text-xs text-gray-400">
          {/* eslint-disable-next-line react-hooks/refs */}
          renders: {renders.current}
        </span>
      </button>
    </li>
  )
}

// memo() skips re-rendering when props are shallow-equal. It only works if
// the props actually KEEP their identity — see the useCallback note in
// PerformancePage.
export const MemoRow = memo(Row)
