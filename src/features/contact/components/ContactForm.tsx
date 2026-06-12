import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { contactSchema, type ContactInput } from '../schema'

export function ContactForm() {
  const [sent, setSent] = useState(false)

  // Unlike NoteForm (controlled inputs + useState), React Hook Form keeps
  // inputs UNCONTROLLED: register() wires them up via refs, so typing
  // doesn't re-render the component. Validation runs through the Zod
  // schema via the resolver.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) })

  async function onSubmit(data: ContactInput) {
    // No backend in this project — simulate the network call. Swap this
    // for a real POST (e.g. Formspree) to make the form live.
    await new Promise((resolve) => setTimeout(resolve, 400))
    console.info('contact form submitted', data)
    reset()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="mt-6 rounded-xl border border-green-300 p-6 dark:border-green-900">
        <p className="font-medium">Thanks! Your message was sent.</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-3 text-sm underline"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mt-6 flex max-w-lg flex-col gap-4"
    >
      <Field label="Name" id="name" error={errors.name?.message}>
        <input
          id="name"
          type="text"
          {...register('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={inputClass}
        />
      </Field>

      <Field label="Email" id="email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={inputClass}
        />
      </Field>

      <Field label="Message" id="message" error={errors.message?.message}>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={inputClass}
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="self-start rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40 dark:bg-gray-100 dark:text-gray-900"
      >
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string
  id: string
  error: string | undefined
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass =
  'rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 aria-[invalid=true]:border-red-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-400'
