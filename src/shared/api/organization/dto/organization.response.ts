import { z } from 'zod';

export const OrganizationResponseDTO = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string().nullable(),

  inn: z.string().nullable(),
  kpp: z.string().nullable(),
  ogrn: z.string().nullable(),

  legalAddress: z.string().nullable(),

  phone: z.string().nullable(),
  email: z.string().nullable(),
  website: z.string().nullable(),

  createdAt: z.string(),
  updatedAt: z.string(),
});

export type OrganizationResponse = z.infer<typeof OrganizationResponseDTO>;
