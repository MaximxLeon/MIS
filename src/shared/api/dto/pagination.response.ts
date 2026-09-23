import { z } from 'zod';

export const PaginationResponseDTO = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),

  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),

  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

export type PaginationResponse = z.infer<typeof PaginationResponseDTO>;
