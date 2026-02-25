import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Votre nom est requis.'),
  email: z.email('Adresse email invalide.'),
  subject: z.string().min(1, "L'objet est requis."),
  message: z
    .string()
    .min(10, 'Votre message doit faire au moins 10 caractères.'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
