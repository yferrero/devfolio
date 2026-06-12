export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  year: number
  repoUrl: string
  liveUrl?: string
}

// Placeholder content — replace with your real projects.
export const projects: Project[] = [
  {
    id: 'devfolio',
    title: 'Devfolio',
    description:
      'This site: a portfolio that doubles as an interview-prep playground, with one state library per feature.',
    tags: ['react', 'typescript', 'tailwind'],
    year: 2026,
    repoUrl: 'https://github.com/yferrero/devfolio',
    liveUrl: 'https://yferrero.github.io/devfolio/',
  },
  {
    id: 'task-tracker',
    title: 'Task Tracker',
    description:
      'Kanban-style task board with drag and drop, local persistence and keyboard navigation.',
    tags: ['react', 'typescript'],
    year: 2025,
    repoUrl: 'https://github.com/yferrero/task-tracker',
  },
  {
    id: 'weather-now',
    title: 'Weather Now',
    description:
      'Weather dashboard consuming a public API, with geolocation and a 5-day forecast.',
    tags: ['react', 'api'],
    year: 2025,
    repoUrl: 'https://github.com/yferrero/weather-now',
  },
  {
    id: 'recipe-finder',
    title: 'Recipe Finder',
    description:
      'Search and filter recipes by ingredient, with debounced input and infinite scroll.',
    tags: ['react', 'api', 'tailwind'],
    year: 2024,
    repoUrl: 'https://github.com/yferrero/recipe-finder',
  },
  {
    id: 'markdown-editor',
    title: 'Markdown Editor',
    description:
      'Split-pane markdown editor with live preview, syntax highlighting and autosave.',
    tags: ['typescript', 'css'],
    year: 2024,
    repoUrl: 'https://github.com/yferrero/markdown-editor',
  },
]

export const allTags = [...new Set(projects.flatMap((p) => p.tags))].sort()
