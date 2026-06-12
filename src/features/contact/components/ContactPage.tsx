import { ContactForm } from './ContactForm'

export default function ContactPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">Contact</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Validated with a Zod schema through React Hook Form — try submitting
        it empty.
      </p>
      <ContactForm />
    </section>
  )
}
