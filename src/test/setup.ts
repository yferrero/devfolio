import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// RTL only auto-cleans the DOM between tests when test globals are enabled;
// we run Vitest without globals, so register the cleanup explicitly.
afterEach(() => {
  cleanup()
})
