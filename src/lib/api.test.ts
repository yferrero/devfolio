import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApiError, apiGet } from './api'

function stubFetch(response: Response) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response))
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('apiGet', () => {
  it('returns parsed JSON for a 2xx response', async () => {
    stubFetch(new Response(JSON.stringify({ hello: 'world' }), { status: 200 }))

    await expect(apiGet('https://example.com/data')).resolves.toEqual({
      hello: 'world',
    })
  })

  it('throws ApiError with the status for a non-2xx response', async () => {
    stubFetch(new Response('not found', { status: 404 }))

    const promise = apiGet('https://example.com/missing')

    await expect(promise).rejects.toBeInstanceOf(ApiError)
    await expect(promise).rejects.toMatchObject({ status: 404 })
  })
})
