import { useState } from 'react'
import { useAppDispatch } from '@/app/store'
import { noteAdded } from '../notesSlice'

export function NoteForm() {
  // Form input is local UI state; only the submitted note goes to Redux.
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const dispatch = useAppDispatch()

  const canSubmit = question.trim() !== '' && answer.trim() !== ''

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    dispatch(noteAdded({ question: question.trim(), answer: answer.trim() }))
    setQuestion('')
    setAnswer('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Question — e.g. What does useRef return?"
        aria-label="Question"
        className="input"
      />
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Answer"
        aria-label="Answer"
        rows={3}
        className="input"
      />
      <button
        type="submit"
        disabled={!canSubmit}
        className="btn-primary self-start"
      >
        Add flashcard
      </button>
    </form>
  )
}
