import type { Organization } from '@/server/prisma/generated/prisma/client';
import { OrganizationResponse } from '@/shared/api/organization';

export function mapOrganizationToResponse(
  organization: Organization,
): OrganizationResponse {
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
  };
}
