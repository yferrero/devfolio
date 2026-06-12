import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import notesReducer, { type NotesState } from '@/features/notes/notesSlice'

const PERSIST_KEY = 'devfolio-notes'

function loadPersistedNotes(): NotesState | undefined {
  try {
    const raw = localStorage.getItem(PERSIST_KEY)
    return raw ? (JSON.parse(raw) as NotesState) : undefined
  } catch {
    return undefined
  }
}

// Factory instead of a bare singleton so tests can create a fresh,
// isolated store per test.
export function makeStore(preloadedNotes?: NotesState) {
  return configureStore({
    reducer: { notes: notesReducer },
    preloadedState: preloadedNotes ? { notes: preloadedNotes } : undefined,
  })
}

export const store = makeStore(loadPersistedNotes())

// Hand-rolled persistence (contrast with Zustand's persist middleware in
// the theme feature): rehydrate above, save on every state change here.
store.subscribe(() => {
  localStorage.setItem(PERSIST_KEY, JSON.stringify(store.getState().notes))
})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// Pre-typed hooks so components never repeat the RootState/AppDispatch types.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
