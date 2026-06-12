import { useQuery } from '@tanstack/react-query'
import { GITHUB_USERNAME, getRepos } from './api'

export function useRepos() {
  return useQuery({
    queryKey: ['github', 'repos', GITHUB_USERNAME],
    // React Query hands the queryFn an AbortSignal: if the component
    // unmounts or the query is superseded mid-flight, the request is
    // cancelled — no race conditions, no setting state after unmount.
    queryFn: ({ signal }) => getRepos(signal),
  })
}
