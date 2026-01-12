import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, { message: 'Le nom doit contenir au moins 2 caractères' })
    .max(50, { message: 'Le nom ne peut pas dépasser 50 caractères' }),

  email: z.string()
    .email({ message: 'Veuillez entrer une adresse email valide' })
    .max(100, { message: 'L\'email ne peut pas dépasser 100 caractères' }),

  phone: z.string()
    .min(6, { message: 'Le téléphone doit contenir au moins 6 chiffres' })
    .max(20, { message: 'Le téléphone ne peut pas dépasser 20 caractères' })
    .regex(/^[0-9+ ]{6,20}$/, { message: 'Format de téléphone invalide. Utilisez uniquement des chiffres, espaces et le signe +' }),

  ville: z.string()
    .min(2, { message: 'La ville doit contenir au moins 2 caractères' })
    .max(50, { message: 'La ville ne peut pas dépasser 50 caractères' }),

  address: z.string()
    .min(2, { message: 'L\'adresse doit contenir au moins 2 caractères' })
    .max(100, { message: 'L\'adresse ne peut pas dépasser 100 caractères' }),

  message: z.string()
    .min(10, { message: 'Le message doit contenir au moins 10 caractères' })
    .max(500, { message: 'Le message ne peut pas dépasser 500 caractères' }),

  recaptchaToken: z.string()
    .min(1, { message: 'Veuillez valider le reCAPTCHA' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;