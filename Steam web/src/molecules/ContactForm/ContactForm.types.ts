import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя слишком длинное'),
  email: z.string().email('Введите корректный email'),
  phone: z
    .string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/u, 'Введите корректный номер телефона')
    .optional()
    .or(z.literal('')),
  businessType: z.enum(['restaurant', 'salon', 'other']),
  message: z
    .string()
    .min(10, 'Сообщение должно содержать минимум 10 символов')
    .max(1000, 'Сообщение слишком длинное'),
});

export type ContactFormData = z.infer<typeof contactSchema>; 