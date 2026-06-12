import { describe, expect, it } from 'vitest'
import reducer, {
  noteAdded,
  noteDeleted,
  type NotesState,
} from './notesSlice'

// Reducers are pure functions: state in, action in, new state out.
// That's why they're the easiest thing in a React app to test.
const empty: NotesState = { notes: [] }

describe('notes slice', () => {
  it('adds a note with a generated id and timestamp', () => {
    const state = reducer(empty, noteAdded({ question: 'Q?', answer: 'A.' }))

    expect(state.notes).toHaveLength(1)
    expect(state.notes[0]).toMatchObject({ question: 'Q?', answer: 'A.' })
    expect(state.notes[0].id).toBeTruthy()
  })

  it('prepends new notes', () => {
    let state = reducer(empty, noteAdded({ question: 'first', answer: 'a' }))
    state = reducer(state, noteAdded({ question: 'second', answer: 'b' }))

    expect(state.notes.map((n) => n.question)).toEqual(['second', 'first'])
  })

  it('deletes a note by id', () => {
    const withNote = reducer(empty, noteAdded({ question: 'Q?', answer: 'A.' }))
    const state = reducer(withNote, noteDeleted(withNote.notes[0].id))

    expect(state.notes).toHaveLength(0)
  })

  it('does not mutate the previous state (Immer)', () => {
    const state = reducer(empty, noteAdded({ question: 'Q?', answer: 'A.' }))

    expect(empty.notes).toHaveLength(0)
    expect(state).not.toBe(empty)
  })
})
