import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './server'

// RTL only auto-cleans the DOM between tests when test globals are enabled;
// we run Vitest without globals, so register the cleanup explicitly.
afterEach(() => {
  cleanup()
})

// Any request without a handler fails the test — no accidental real
// network calls from the test suite.
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
