import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // GitHub data changes rarely; 5 min staleTime avoids refetching on
      // every mount/focus and keeps us well under the unauthenticated
      // rate limit (60 requests/hour).
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
})

export function AppProviders({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
