import 'server-only';

import type {
  Organization,
  User,
} from '@/server/prisma/generated/prisma/client';
import { mapUserToResponse } from '@/server/user/mapper';
import { OrganizationWithOwnersResponse } from '@/shared/api/organization/dto';

export function mapOrganizationWithOwnersToResponse(
  organization: Organization & {
    owners: User[];
  },
): OrganizationWithOwnersResponse {
  return {
    id: organization.id,
    name: organization.name,
    shortName: organization.shortName,
    inn: organization.inn,
    kpp: organization.kpp,
    ogrn: organization.ogrn,
    legalAddress: organization.legalAddress,
    phone: organization.phone,
    email: organization.email,
    website: organization.website,
    createdAt: organization.createdAt.toISOString(),
    updatedAt: organization.updatedAt.toISOString(),
    owners: organization.owners.map(mapUserToResponse),
  };
}