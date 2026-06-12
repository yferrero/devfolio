import { Link, useParams } from 'react-router-dom'
import { projects } from '../data'

export function ProjectDetailPage() {
  // The id comes from the URL (route: /projects/:id) — the URL is the state.
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <section>
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link to="/projects" className="mt-4 inline-block underline">
          Back to projects
        </Link>
      </section>
    )
  }

  return (
    <section>
      <Link
        to="/projects"
        className="text-sm text-gray-500 hover:underline dark:text-gray-400"
      >
        ← Back to projects
      </Link>
      <h1 className="mt-2 text-2xl font-bold">{project.title}</h1>
      <p className="mt-1 text-sm text-gray-500">{project.year}</p>
      <p className="mt-4 max-w-prose text-gray-600 dark:text-gray-400">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex gap-4 text-sm">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Source code
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Live site
          </a>
        )}
      </div>
    </section>
  )
}
