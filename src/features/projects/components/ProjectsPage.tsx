import { useState } from 'react'
import { allTags, projects } from '../data'
import { FilterBar, type SortOrder } from './FilterBar'
import { ProjectCard } from './ProjectCard'

export default function ProjectsPage() {
  // The page owns the filter state and passes it down (lifting state up):
  // FilterBar renders the controls, this component decides what they mean.
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [sort, setSort] = useState<SortOrder>('newest')

  // Derived state: the visible list is computed from existing state on every
  // render. Storing it in its own useState would duplicate the source of
  // truth and let the copies drift apart.
  const normalizedQuery = query.trim().toLowerCase()
  const visible = projects
    .filter(
      (project) =>
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery),
    )
    .filter((project) => activeTag === null || project.tags.includes(activeTag))
    .toSorted((a, b) =>
      sort === 'newest' ? b.year - a.year : a.title.localeCompare(b.title),
    )

  return (
    <section>
      <h1 className="text-2xl font-bold">Projects</h1>
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        tags={allTags}
        activeTag={activeTag}
        onTagChange={setActiveTag}
        sort={sort}
        onSortChange={setSort}
      />
      {visible.length === 0 ? (
        <p className="mt-8 text-gray-600 dark:text-gray-400">
          No projects match your search.
        </p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      )}
    </section>
  )
}
