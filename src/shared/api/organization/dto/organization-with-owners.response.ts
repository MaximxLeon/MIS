import { z } from 'zod';

import { UserResponseDTO } from '../../user';
import { OrganizationResponseDTO } from './organization.response';

export const OrganizationWithOwnersResponseDTO = OrganizationResponseDTO.extend(
  {
    owners: z.array(UserResponseDTO),
  },
);

export type OrganizationWithOwnersResponse = z.infer<
  typeof OrganizationWithOwnersResponseDTO
>;
