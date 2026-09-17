import { z } from 'zod';

import { ERROR_CODES } from '@/constants/error-codes';

export const ApiErrorResponseSchema = z.object({
  error: z.object({
    status: z.number(),

    code: z.enum(ERROR_CODES),

    message: z.string(),

    details: z.unknown().optional(),
  }),
});

export type TApiErrorResponseDTO = z.infer<typeof ApiErrorResponseSchema>;
