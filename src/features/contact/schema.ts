import { z } from 'zod'

// One schema, two jobs: runtime validation (resolver in ContactForm) and
// the static type below via z.infer — the type can never drift from the
// validation rules.
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name needs at least 2 characters'),
  email: z.email('Enter a valid email address'),
  message: z
    .string()
    .trim()
    .min(10, 'Message needs at least 10 characters')
    .max(500, 'Message can be at most 500 characters'),
})

export type ContactInput = z.infer<typeof contactSchema>
