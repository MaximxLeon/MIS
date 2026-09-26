import { z } from 'zod';

import {
  mapOrganizationToResponse,
  mapOrganizationWithOwnersToResponse,
} from '@/server/organization/mapper';
import { OrganizationService } from '@/server/organization/service';
import {
  query,
  resolver,
} from '@gqloom/core';
import { useContext } from '@gqloom/core/context';

import { GraphQLContext } from '../../context';
import {
  Organization,
  OrganizationWithOwners,
} from '../../schema/organization';

const organizationService = new OrganizationService();

export const organizationResolver = resolver({
  organization: query(Organization)
    .input({
      id: z.string(),
    })
    .resolve(async ({ id }) => {
      const organization = await organizationService.getById(id);

      return mapOrganizationToResponse(organization);
    }),

  organizations: query(z.array(OrganizationWithOwners)).resolve(async () => {
    const organizations = await organizationService.getAllWithOwners();

    return organizations.map(mapOrganizationWithOwnersToResponse);
  }),

  myOrganizations: query(z.array(OrganizationWithOwners)).resolve(async () => {
    const context = useContext<GraphQLContext>();

    if (!context.userId) {
      throw new Error("Необходима авторизация");
    }

    const organizations = await organizationService.getAllForUserWithOwners(
      context.userId,
    );

    return organizations.map(mapOrganizationWithOwnersToResponse);
  }),
});
