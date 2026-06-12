import { Spinner } from '@/components/Spinner'
import { GITHUB_USERNAME } from '../api'
import { useRepos } from '../hooks'
import { RepoCard } from './RepoCard'

export default function GithubPage() {
  // One hook gives us all four states a fetch can be in. The component's
  // only job is rendering them — caching and refetching live in the query.
  const { data: repos, isPending, isError, error, refetch } = useRepos()

  return (
    <section>
      <h1 className="text-2xl font-bold">GitHub</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Latest repositories of{' '}
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          @{GITHUB_USERNAME}
        </a>
        , fetched live with TanStack Query.
      </p>

      {isPending ? (
        <Spinner />
      ) : isError ? (
        <div role="alert" className="mt-6">
          <p className="text-gray-600 dark:text-gray-400">
            Couldn&apos;t load repositories: {error.message}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      ) : repos.length === 0 ? (
        <p className="mt-6 text-gray-600 dark:text-gray-400">
          No public repositories yet.
        </p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </ul>
      )}
    </section>
  )
}
