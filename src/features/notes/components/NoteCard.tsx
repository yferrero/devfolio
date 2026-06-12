import { useState } from 'react'
import { useAppDispatch } from '@/app/store'
import { noteDeleted, type Note } from '../notesSlice'

export function NoteCard({ note }: { note: Note }) {
  // Whether a card is flipped is ephemeral UI state — it belongs to the
  // component, not the store.
  const [flipped, setFlipped] = useState(false)
  const dispatch = useAppDispatch()

  return (
    <li className="rounded-xl border border-gray-200 dark:border-gray-800">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="w-full p-4 text-left"
        aria-expanded={flipped}
      >
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {flipped ? 'Answer' : 'Question'}
        </p>
        <p className="mt-1 text-sm">{flipped ? note.answer : note.question}</p>
      </button>
      <div className="border-t border-gray-100 px-4 py-2 dark:border-gray-900">
        <button
          type="button"
          onClick={() => dispatch(noteDeleted(note.id))}
          className="text-xs text-gray-400 hover:text-red-600 dark:hover:text-red-400"
        >
          Delete
        </button>
      </div>
    </li>
  )
}
