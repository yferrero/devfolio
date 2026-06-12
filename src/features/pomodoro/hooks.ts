import { useEffect, useRef } from 'react'

/**
 * The classic useInterval hook (Dan Abramov's pattern) — interview gold
 * because it combines three concepts:
 *
 * 1. STALE CLOSURES: a naive setInterval(callback, delay) inside useEffect
 *    captures the callback from that render forever. Storing the latest
 *    callback in a ref lets the interval always call the current one.
 * 2. useRef: a mutable box that survives re-renders without causing them.
 * 3. EFFECT CLEANUP: the returned clearInterval runs on unmount and before
 *    the effect re-runs — without it, intervals leak and stack up.
 *
 * Passing delay = null pauses the interval.
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}
