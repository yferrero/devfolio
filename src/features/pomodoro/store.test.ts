import { beforeEach, describe, expect, it } from 'vitest'
import {
  BREAK_SECONDS,
  FOCUS_SECONDS,
  formatSeconds,
  usePomodoroStore,
} from './store'

describe('pomodoro store', () => {
  beforeEach(() => {
    usePomodoroStore.setState({
      mode: 'focus',
      secondsLeft: FOCUS_SECONDS,
      isRunning: false,
      completedSessions: 0,
    })
  })

  it('tick decrements the remaining seconds', () => {
    usePomodoroStore.getState().tick()
    expect(usePomodoroStore.getState().secondsLeft).toBe(FOCUS_SECONDS - 1)
  })

  it('switches to break and credits a session when focus runs out', () => {
    usePomodoroStore.setState({ secondsLeft: 1, isRunning: true })

    usePomodoroStore.getState().tick()

    const state = usePomodoroStore.getState()
    expect(state.mode).toBe('break')
    expect(state.secondsLeft).toBe(BREAK_SECONDS)
    expect(state.isRunning).toBe(false)
    expect(state.completedSessions).toBe(1)
  })

  it('switches back to focus without crediting a session after a break', () => {
    usePomodoroStore.setState({ mode: 'break', secondsLeft: 1 })

    usePomodoroStore.getState().tick()

    const state = usePomodoroStore.getState()
    expect(state.mode).toBe('focus')
    expect(state.secondsLeft).toBe(FOCUS_SECONDS)
    expect(state.completedSessions).toBe(0)
  })

  it('reset restores the duration of the current mode and stops', () => {
    usePomodoroStore.setState({ secondsLeft: 42, isRunning: true })

    usePomodoroStore.getState().reset()

    const state = usePomodoroStore.getState()
    expect(state.secondsLeft).toBe(FOCUS_SECONDS)
    expect(state.isRunning).toBe(false)
  })
})

describe('formatSeconds', () => {
  it('formats as mm:ss with zero padding', () => {
    expect(formatSeconds(FOCUS_SECONDS)).toBe('25:00')
    expect(formatSeconds(61)).toBe('01:01')
    expect(formatSeconds(9)).toBe('00:09')
  })
})
