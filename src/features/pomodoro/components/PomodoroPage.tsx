import { useEffect } from 'react'
import { useInterval } from '../hooks'
import { formatSeconds, usePomodoroStore } from '../store'

export default function PomodoroPage() {
  const mode = usePomodoroStore((s) => s.mode)
  const secondsLeft = usePomodoroStore((s) => s.secondsLeft)
  const isRunning = usePomodoroStore((s) => s.isRunning)
  const completedSessions = usePomodoroStore((s) => s.completedSessions)
  const { start, pause, reset, tick } = usePomodoroStore.getState()

  // The interval only exists while running; pausing sets delay to null,
  // which cleans the old interval up (see useInterval).
  useInterval(tick, isRunning ? 1000 : null)

  // Side effect with cleanup: show the countdown in the tab title and
  // restore it when leaving the page.
  useEffect(() => {
    document.title = `${formatSeconds(secondsLeft)} · ${mode} — devfolio`
    return () => {
      document.title = 'devfolio'
    }
  }, [secondsLeft, mode])

  return (
    <section className="text-center">
      <h1 className="text-2xl font-bold">Pomodoro</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {mode === 'focus' ? 'Focus session' : 'Break'} — completed sessions:{' '}
        {completedSessions}
      </p>

      <p className="mt-8 font-mono text-7xl font-bold tabular-nums">
        {formatSeconds(secondsLeft)}
      </p>

      <div className="mt-8 flex justify-center gap-3">
        {isRunning ? (
          <button type="button" onClick={pause} className="btn-primary">
            Pause
          </button>
        ) : (
          <button type="button" onClick={start} className="btn-primary">
            Start
          </button>
        )}
        <button type="button" onClick={reset} className="btn-outline">
          Reset
        </button>
      </div>
    </section>
  )
}
