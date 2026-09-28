import { z } from 'zod';

/**
 * Contact form contract (Slice 4.1).
 * Validated before every EmailJS send; length caps keep the payload bounded
 * so the public template endpoint cannot be abused with megabyte messages.
 */
export const contactSchema = z.object({
  from_name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(80, 'Name must be 80 characters or fewer'),
  from_email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .max(254, 'Email must be 254 characters or fewer')
    .pipe(z.email({ message: 'Enter a valid email address' })),
  subject: z
    .string()
    .trim()
    .min(1, 'Subject is required')
    .max(120, 'Subject must be 120 characters or fewer'),
  message: z
    .string()
    .trim()
    .min(1, 'Message is required')
    .max(2000, 'Message must be 2000 characters or fewer'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
