import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'

export interface Note {
  id: string
  question: string
  answer: string
  createdAt: number
}

export interface NotesState {
  notes: Note[]
}

// Seed flashcards so the page has study content on first visit; once the
// user changes anything, the persisted state takes over.
const initialState: NotesState = {
  notes: [
    {
      id: 'seed-1',
      question: 'What is derived state and why avoid storing it?',
      answer:
        'Values computable from existing state/props should be computed during render, not stored in useState — a stored copy can drift from its source of truth.',
      createdAt: Date.now(),
    },
    {
      id: 'seed-2',
      question: 'useMemo vs useCallback?',
      answer:
        'useMemo memoizes a computed value; useCallback memoizes the function itself (useCallback(fn, deps) === useMemo(() => fn, deps)). Both are referential-stability tools, not magic performance fixes.',
      createdAt: Date.now(),
    },
    {
      id: 'seed-3',
      question: 'Why can Redux reducers "mutate" state in RTK?',
      answer:
        'createSlice wraps reducers with Immer: you write mutating syntax against a draft, and Immer produces an immutable update. Outside Immer, real mutation would break time travel and change detection.',
      createdAt: Date.now(),
    },
  ],
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    noteAdded: {
      // The prepare callback generates id/timestamp so the reducer stays
      // pure — side effects like nanoid() don't belong inside a reducer.
      prepare(input: { question: string; answer: string }) {
        return {
          payload: { ...input, id: nanoid(), createdAt: Date.now() },
        }
      },
      reducer(state, action: PayloadAction<Note>) {
        // "Mutation" is safe here: Immer turns it into an immutable update.
        state.notes.unshift(action.payload)
      },
    },
    noteDeleted(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((note) => note.id !== action.payload)
    },
  },
  selectors: {
    selectNotes: (state) => state.notes,
  },
})

export const { noteAdded, noteDeleted } = notesSlice.actions
export const { selectNotes } = notesSlice.selectors
export default notesSlice.reducer
