import { useAppSelector } from '@/app/store'
import { selectNotes } from '../notesSlice'
import { NoteCard } from './NoteCard'
import { NoteForm } from './NoteForm'

export default function NotesPage() {
  const notes = useAppSelector(selectNotes)

  return (
    <section>
      <h1 className="text-2xl font-bold">Notes</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Interview flashcards stored in Redux. Click a card to flip it.
      </p>
      <NoteForm />
      {notes.length === 0 ? (
        <p className="mt-8 text-gray-600 dark:text-gray-400">
          No notes yet — add your first flashcard above.
        </p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </ul>
      )}
    </section>
  )
}
