import { z } from 'zod';

export const OrganizationUpdateDTO = z.object({
  name: z.string().min(1, "Введите название организации").optional(),

  shortName: z.string().optional(),

  inn: z.string().optional(),
  kpp: z.string().optional(),
  ogrn: z.string().optional(),

  legalAddress: z.string().optional(),

  phone: z.string().optional(),
  email: z.email("Некорректный email").optional(),
  website: z.string().optional(),
});

export type OrganizationUpdate = z.infer<typeof OrganizationUpdateDTO>;
