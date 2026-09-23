import { z } from 'zod';

export const SearchQueryDTO = z.object({
  search: z.string().trim().optional(),
});

export type SearchQuery = z.infer<typeof SearchQueryDTO>;
