import { Link } from 'react-router-dom'
import type { Project } from '../data'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <li className="card p-4">
      <div className="flex items-baseline justify-between gap-2">
        <Link
          to={`/projects/${project.id}`}
          className="font-semibold hover:underline"
        >
          {project.title}
        </Link>
        <span className="text-xs text-gray-500">{project.year}</span>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {project.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </li>
  )
}
