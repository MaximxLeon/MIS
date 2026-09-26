import {
  OrganizationResponseDTO,
  OrganizationWithOwnersResponseDTO,
} from '@/shared/api/organization/dto';
import { asObjectType } from '@gqloom/zod';

export const Organization = OrganizationResponseDTO.register(asObjectType, {
  name: "Organization",
});

export const OrganizationWithOwners =
  OrganizationWithOwnersResponseDTO.register(asObjectType, {
    name: "OrganizationWithOwners",
  });

