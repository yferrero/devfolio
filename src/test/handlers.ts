import { http, HttpResponse } from 'msw'
import type { Repo } from '@/features/github/api'

export const mockRepos: Repo[] = [
  {
    id: 1,
    name: 'devfolio',
    html_url: 'https://github.com/yferrero/devfolio',
    description: 'Portfolio and interview prep playground',
    language: 'TypeScript',
    stargazers_count: 3,
    updated_at: '2026-06-01T12:00:00Z',
    fork: false,
  },
  {
    id: 2,
    name: 'aprendiendo-react',
    html_url: 'https://github.com/yferrero/aprendiendo-react',
    description: null,
    language: null,
    stargazers_count: 0,
    updated_at: '2026-05-15T08:30:00Z',
    fork: false,
  },
]

// Default happy-path handlers; individual tests override with server.use().
export const handlers = [
  http.get('https://api.github.com/users/:username/repos', () =>
    HttpResponse.json(mockRepos),
  ),
]
