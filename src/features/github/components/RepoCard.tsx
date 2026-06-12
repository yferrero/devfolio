import type { Repo } from '../api'

const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

export function RepoCard({ repo }: { repo: Repo }) {
  return (
    <li className="rounded-xl border border-gray-200 p-4 transition-colors hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600">
      <div className="flex items-baseline justify-between gap-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="font-semibold hover:underline"
        >
          {repo.name}
        </a>
        {repo.stargazers_count > 0 && (
          <span className="text-xs text-gray-500">★ {repo.stargazers_count}</span>
        )}
      </div>
      {repo.description && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {repo.description}
        </p>
      )}
      <p className="mt-3 text-xs text-gray-500">
        {repo.language && <span className="mr-3">{repo.language}</span>}
        Updated {dateFormat.format(new Date(repo.updated_at))}
        {repo.fork && <span className="ml-3">(fork)</span>}
      </p>
    </li>
  )
}
