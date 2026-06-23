import { z } from 'zod';

/**
 * French phone number: 10 digits starting with 0, or international format +33 followed by 9 digits.
 * Examples: 0612345678, +33612345678
 */
const frenchPhoneRegex = /^(\+33[1-9][0-9]{8}|0[1-9][0-9]{8})$/;

export const orderSchema = z.object({
  customer_first_name: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères.'),

  customer_last_name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères.'),

  customer_email: z
    .string()
    .email('Adresse e-mail invalide.'),

  customer_phone: z
    .string()
    .regex(frenchPhoneRegex, 'Numéro de téléphone invalide (ex. 0612345678 ou +33612345678).'),

  shipping_address: z
    .string()
    .min(10, "L'adresse de livraison doit contenir au moins 10 caractères."),

  /**
   * Quantity is fixed at 1 — this is a limited drop with one size.
   * The field is included in the schema for type completeness.
   * It is not editable by the user in the form.
   */
  quantity: z.number().int().min(1).max(1),

  customer_note: z
    .string()
    .max(500, 'La note ne peut pas dépasser 500 caractères.')
    .optional(),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
