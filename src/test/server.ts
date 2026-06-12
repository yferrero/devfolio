import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// MSW intercepts at the network level: the app code under test runs its
// real fetch + apiGet path, and only the HTTP response is faked. Nothing
// in src/ is mocked.
export const server = setupServer(...handlers)
