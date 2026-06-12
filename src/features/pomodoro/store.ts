import { create } from 'zustand'

export const FOCUS_SECONDS = 25 * 60
export const BREAK_SECONDS = 5 * 60

export type Mode = 'focus' | 'break'

interface PomodoroState {
  mode: Mode
  secondsLeft: number
  isRunning: boolean
  completedSessions: number
  start: () => void
  pause: () => void
  reset: () => void
  tick: () => void
}

// All timer LOGIC lives here as plain state transitions — testable without
// rendering anything. The actual setInterval lives in the component layer
// (see hooks.ts), because scheduling is a side effect tied to the UI.
export const usePomodoroStore = create<PomodoroState>()((set) => ({
  mode: 'focus',
  secondsLeft: FOCUS_SECONDS,
  isRunning: false,
  completedSessions: 0,

  start: () => set({ isRunning: true }),
  pause: () => set({ isRunning: false }),
  reset: () =>
    set((state) => ({
      isRunning: false,
      secondsLeft: state.mode === 'focus' ? FOCUS_SECONDS : BREAK_SECONDS,
    })),

  tick: () =>
    set((state) => {
      if (state.secondsLeft > 1) {
        return { secondsLeft: state.secondsLeft - 1 }
      }
      // Session over: switch mode, stop, and credit a finished focus session.
      const nextMode: Mode = state.mode === 'focus' ? 'break' : 'focus'
      return {
        mode: nextMode,
        secondsLeft: nextMode === 'focus' ? FOCUS_SECONDS : BREAK_SECONDS,
        isRunning: false,
        completedSessions:
          state.mode === 'focus'
            ? state.completedSessions + 1
            : state.completedSessions,
      }
    }),
}))

export function formatSeconds(total: number): string {
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
