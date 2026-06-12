import { apiGet } from '@/lib/api'

export interface Repo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
  fork: boolean
}

export const GITHUB_USERNAME = 'yferrero'

export function getRepos(signal?: AbortSignal) {
  return apiGet<Repo[]>(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`,
    { signal },
  )
}
