export type SortOrder = 'newest' | 'title'

interface FilterBarProps {
  query: string
  onQueryChange: (query: string) => void
  tags: string[]
  activeTag: string | null
  onTagChange: (tag: string | null) => void
  sort: SortOrder
  onSortChange: (sort: SortOrder) => void
}

// Presentational component: all state lives in the parent, every control is
// a controlled input (value comes from props, changes go up via callbacks).
export function FilterBar({
  query,
  onQueryChange,
  tags,
  activeTag,
  onTagChange,
  sort,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search projects…"
          aria-label="Search projects"
          className="input w-full max-w-sm"
        />
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOrder)}
          aria-label="Sort projects"
          className="input"
        >
          <option value="newest">Newest first</option>
          <option value="title">By title</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
        <TagButton
          label="All"
          active={activeTag === null}
          onClick={() => onTagChange(null)}
        />
        {tags.map((tag) => (
          <TagButton
            key={tag}
            label={tag}
            active={activeTag === tag}
            onClick={() => onTagChange(tag)}
          />
        ))}
      </div>
    </div>
  )
}

function TagButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? 'bg-primary-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  )
}
