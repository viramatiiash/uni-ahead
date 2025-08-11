import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, "*Ім'я має містити мінімум 2 символи"),
  surname: z.string().min(2, '*Прізвище має містити мінімум 2 символи'),
  email: z.string().email('*Введіть коректний email'),
  tel: z.string().regex(/^\+380\d{9}$/, '*Введіть телефон у форматі: +380XXXXXXXXX'),
  services: z.array(z.string()).min(1, '*Оберіть хоча б одну послугу'),
  contactMethods: z
    .array(z.string())
    .min(1, "*Оберіть хоча б один спосіб зв'язку"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
