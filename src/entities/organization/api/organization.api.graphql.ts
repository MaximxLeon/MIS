import { graphqlRequest } from '@/shared/api/graphql/client';
import {
  MyOrganizationsDocument,
  MyOrganizationsQuery,
  OrganizationsDocument,
  OrganizationsQuery,
} from '@/shared/api/graphql/generated/graphql';

export const organizationGraphqlApi = {
  getAll: async (): Promise<OrganizationsQuery> => {
    return graphqlRequest(OrganizationsDocument, {});
  },
  getByOwn: async (): Promise<MyOrganizationsQuery> => {
    return graphqlRequest(MyOrganizationsDocument, {});
  },
};
