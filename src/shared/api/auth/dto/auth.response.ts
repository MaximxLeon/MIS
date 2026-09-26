import { z } from 'zod';

import { UserResponseDTO } from '@/shared/api/user';

export const AuthResponseDto = z.object({
  user: UserResponseDTO,
});

export type TAuthResponseDTO = z.infer<typeof AuthResponseDto>;
