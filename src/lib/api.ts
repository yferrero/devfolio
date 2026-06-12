export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

interface RequestOptions {
  signal?: AbortSignal
  timeoutMs?: number
}

/**
 * Minimal typed fetch wrapper. Handles fetch's two classic gotchas:
 * - fetch does NOT reject on HTTP errors (404, 500…) — we throw ApiError
 * - fetch has no timeout — we combine the caller's signal with a timeout one
 */
export async function apiGet<T>(
  url: string,
  { signal, timeoutMs = 10_000 }: RequestOptions = {},
): Promise<T> {
  const signals = [AbortSignal.timeout(timeoutMs)]
  if (signal) signals.push(signal)

  const response = await fetch(url, {
    signal: AbortSignal.any(signals),
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new ApiError(response.status, `GET ${url} failed with ${response.status}`)
  }

  return response.json() as Promise<T>
}
